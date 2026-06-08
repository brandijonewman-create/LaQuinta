// Content engine — cron-triggered article generator.
//
// Pulls the next unused topic from /content/topic-queue.md, drafts a ~1,500-word
// MDX article in the site's editorial voice via the Emergent LLM, writes it to
// /content/blog/<slug>.mdx with frontmatter `draft: true`, marks the topic as
// used, and emails the operator via Resend.
//
// Trigger: POST /api/cron/generate-article with header
//     X-Engine-Secret: <CONTENT_ENGINE_SECRET>
//
// Schedule recommendation: Tue + Fri at 6am Central (use cron-job.org or
// Upstash schedules pointing at this endpoint).

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';
import { site, owner } from '@/lib/site-config';

const QUEUE_PATH = path.join(process.cwd(), 'content', 'topic-queue.md');
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const LLM_KEY = process.env.EMERGENT_LLM_KEY;
const SECRET = process.env.CONTENT_ENGINE_SECRET;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM;
const OWNER_EMAIL = process.env.OWNER_EMAIL;

function slugify(s) {
  return s.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 80);
}

async function callLLM(topic) {
  // Emergent LLM gateway exposes an OpenAI-compatible API at
  // https://integrations.emergentagent.com/llm/v1/chat/completions.
  const systemPrompt = `You write editorial real-estate articles for La Quinta Golf Lifestyle, a guide to golf real estate in La Quinta, California operated by 7671 Enterprises LLC.

VOICE: Elegant, understated, conservative. Direct. No marketing fluff. No exclamation marks. No "discover" / "unlock" / "free" / "instant" / "amazing" language.

POLICY:
- NEVER fabricate specific prices, transaction figures, initiation deposit amounts, or market statistics. Use ranges with qualifiers ("typically", "generally", "indicative") and always recommend verification with a licensed California real-estate professional.
- NEVER name homeowners, members, or celebrities.
- NEVER use the words "independent", "not a brokerage", "no agent affiliation".
- The site works in partnership with California-licensed real-estate professionals.

STRUCTURE: Output strictly valid MDX with:
1. YAML frontmatter: title, date (today, YYYY-MM-DD), excerpt (1 sentence, ~22 words), category (2-3 words), readMin (number, around 8), tldr (5 bullet array of plain strings), faq (4 entries, each with q and a string fields).
2. Body: 1,200-1,500 words. Markdown only. Open with a 1-paragraph thesis, then 3-5 "## H2" sections of 2-4 paragraphs each, then a closing "## Bottom line" paragraph.
3. Internal links: include 2-3 markdown links to existing pages: /communities, /community-quiz, /guides, /architects, /collaborate, or a relevant community page like /communities/pga-west.

Output ONLY the MDX file content. No surrounding code fence. No commentary.`;

  const body = {
    model: 'gpt-5',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Write the next article. Topic:\n\n"${topic}"` },
    ],
  };

  const res = await fetch('https://integrations.emergentagent.com/llm/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LLM_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`LLM HTTP ${res.status}: ${t.slice(0, 400)}`);
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content || '';
}

export async function POST(request) {
  // Auth: shared secret in header
  const provided = request.headers.get('x-engine-secret');
  if (!SECRET || provided !== SECRET) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  try {
    if (!fs.existsSync(QUEUE_PATH)) throw new Error('topic-queue.md missing');
    let raw = fs.readFileSync(QUEUE_PATH, 'utf8');
    const queueMatch = raw.match(/## Queue\n([\s\S]*?)\n## Used/);
    if (!queueMatch) throw new Error('queue section missing');
    const queueLines = queueMatch[1].split('\n').filter((l) => l.startsWith('- '));
    if (!queueLines.length) {
      return NextResponse.json({ ok: false, error: 'queue empty' }, { status: 200 });
    }
    const topic = queueLines[0].replace(/^-\s+/, '').trim();

    // Generate
    let mdx = await callLLM(topic);
    // Ensure draft flag is present
    if (!/^---[\s\S]*?\bdraft:\s*true\b/m.test(mdx)) {
      mdx = mdx.replace(/^(---\n)([\s\S]*?\n---\n)/, (_m, a, b) => `${a}draft: true\n${b}`);
    }
    // Slug + write
    const slug = slugify(topic);
    const today = new Date().toISOString().slice(0, 10);
    let filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    let suffix = 1;
    while (fs.existsSync(filePath)) {
      filePath = path.join(BLOG_DIR, `${slug}-${suffix++}.mdx`);
    }
    fs.writeFileSync(filePath, mdx, 'utf8');

    // Update queue: remove first queue line, append to Used section
    const lines = raw.split('\n');
    const queueStart = lines.findIndex((l) => l.trim() === '## Queue');
    const usedStart = lines.findIndex((l) => l.trim() === '## Used');
    if (queueStart < 0 || usedStart < 0) throw new Error('queue/used header missing');
    // Find first "- " line after queueStart, remove it
    for (let i = queueStart + 1; i < usedStart; i++) {
      if (lines[i].startsWith('- ')) { lines.splice(i, 1); break; }
    }
    // Append the used line at the end of the file
    lines.push(`- ${today} — ${topic}`);
    fs.writeFileSync(QUEUE_PATH, lines.join('\n'), 'utf8');

    // Email notify
    if (RESEND_API_KEY && RESEND_FROM && OWNER_EMAIL) {
      const resend = new Resend(RESEND_API_KEY);
      const url = `${site.url}/blog/${path.basename(filePath, '.mdx')}`;
      await resend.emails.send({
        from: RESEND_FROM,
        to: [OWNER_EMAIL],
        subject: `Draft ready · ${topic}`,
        html: `<p><strong>${topic}</strong> has been drafted and saved as a draft.</p>
<p>Review the file in the repo at <code>content/blog/${path.basename(filePath)}</code>, flip <code>draft: true</code> to <code>draft: false</code>, then redeploy to publish.</p>
<p>Preview URL once deployed: <a href="${url}">${url}</a></p>
<p>— ${site.name} content engine</p>`,
      });
    }

    return NextResponse.json({ ok: true, topic, file: path.basename(filePath) });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e?.message || String(e) }, { status: 500 });
  }
}
