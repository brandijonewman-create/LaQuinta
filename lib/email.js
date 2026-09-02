// Resend wrapper. Fails soft when RESEND_API_KEY is unset.
// Both templates use inline styles only (Gmail-compatible).

import { Resend } from 'resend';
import { owner } from './site-config';
import { partner } from './exclusive-partner';

const KEY = process.env.RESEND_API_KEY || '';
const FROM = process.env.RESEND_FROM || '';
const OWNER = process.env.OWNER_EMAIL || '';
const COLLAB = (process.env.COLLABORATOR_EMAILS || '')
  .split(',').map((s) => s.trim()).filter(Boolean);

const client = KEY ? new Resend(KEY) : null;

const SITE = 'La Quinta Golf Lifestyle';
const NAVY = '#1F3A2E';      // deep palm green serves as our "navy" brand anchor
const GOLD = '#C8A24A';
const SAND = '#FAF6EE';
const INK  = '#1A1714';

function shellHtml(inner) {
  return `<!doctype html><html><body style="margin:0;padding:0;background:${SAND};font-family:Georgia,serif;color:${INK};">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <div style="border-bottom:2px solid ${GOLD};padding-bottom:14px;margin-bottom:24px;">
      <div style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:${GOLD};font-family:Arial,sans-serif;">La Quinta, California</div>
      <div style="font-size:22px;color:${NAVY};margin-top:4px;">${SITE}</div>
    </div>
    ${inner}
    <div style="margin-top:32px;padding-top:18px;border-top:1px solid #D8CCB0;font-size:11px;color:#7A6E60;font-family:Arial,sans-serif;line-height:1.5;">
      ${SITE} is a lifestyle guide. Listings and representation are provided by our California-licensed Exclusive Market Partner. Estimate only — verify with a licensed California real-estate professional before transacting.
    </div>
  </div></body></html>`;
}

export async function sendQuizLeadOwnerEmail({ name, email, phone, matchedCommunity, runnersUp, quizAnswers }) {
  if (!client || !FROM || !OWNER) return { skipped: true, reason: 'missing-config' };
  const to = [OWNER, ...COLLAB];
  const subject = `New lead: ${name} — ${matchedCommunity}`;
  const rows = Object.entries(quizAnswers || {})
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#7A6E60;text-transform:capitalize;font-family:Arial,sans-serif;font-size:12px;">${k}</td><td style="padding:4px 0;color:${INK};font-family:Arial,sans-serif;font-size:13px;">${v}</td></tr>`)
    .join('');
  const runnersHtml = (runnersUp || []).map((r) => `<li>${r}</li>`).join('');
  const inner = `
    <p style="font-size:14px;line-height:1.6;color:${INK};">A new lead just completed the community quiz on the site.</p>
    <table style="width:100%;margin-top:16px;font-family:Arial,sans-serif;font-size:13px;">
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;width:120px;">Name</td><td style="padding:6px 0;"><strong>${name}</strong></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;">Email</td><td style="padding:6px 0;"><a href="mailto:${email}" style="color:${NAVY};">${email}</a></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;">Phone</td><td style="padding:6px 0;">${phone || '—'}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;">Matched community</td><td style="padding:6px 0;"><strong style="color:${NAVY};font-size:15px;font-family:Georgia,serif;">${matchedCommunity}</strong></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;">Runners-up</td><td style="padding:6px 0;"><ul style="margin:0;padding-left:18px;">${runnersHtml}</ul></td></tr>
    </table>
    <div style="margin-top:22px;padding:14px;background:${SAND};border:1px solid #D8CCB0;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:2px;color:${GOLD};margin-bottom:8px;font-family:Arial,sans-serif;">Quiz answers</div>
      <table>${rows}</table>
    </div>`;
  try {
    const { data, error } = await client.emails.send({ from: FROM, to, subject, html: shellHtml(inner) });
    if (error) return { ok: false, error: String(error) };
    return { ok: true, id: data?.id };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}

export async function sendCollaboratorApplicationEmail({ name, email, phone, brokerage, dreLicense, yearsActive, website, specialties, notes }) {
  if (!client || !FROM || !OWNER) return { skipped: true, reason: 'missing-config' };
  const to = [OWNER, ...COLLAB];
  const subject = `New collaborator application: ${name} \u2014 ${brokerage}`;
  const specHtml = (specialties || []).length
    ? `<ul style="margin:4px 0 0;padding-left:18px;">${specialties.map((s) => `<li>${s}</li>`).join('')}</ul>`
    : '\u2014';
  const inner = `
    <p style="font-size:14px;line-height:1.6;color:${INK};">A licensed California real estate professional just applied to become a collaborator.</p>
    <table style="width:100%;margin-top:16px;font-family:Arial,sans-serif;font-size:13px;">
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;width:150px;">Name</td><td style="padding:6px 0;"><strong>${name}</strong></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;">Email</td><td style="padding:6px 0;"><a href="mailto:${email}" style="color:${NAVY};">${email}</a></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;">Phone</td><td style="padding:6px 0;">${phone || '\u2014'}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;">Brokerage</td><td style="padding:6px 0;"><strong>${brokerage}</strong></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;">CA DRE #</td><td style="padding:6px 0;">${dreLicense}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;">Years active</td><td style="padding:6px 0;">${yearsActive || '\u2014'}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;">Website</td><td style="padding:6px 0;">${website ? `<a href="${website}" style="color:${NAVY};">${website}</a>` : '\u2014'}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;vertical-align:top;">Specialties</td><td style="padding:6px 0;">${specHtml}</td></tr>
    </table>
    ${notes ? `<div style="margin-top:22px;padding:14px;background:${SAND};border:1px solid #D8CCB0;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:2px;color:${GOLD};margin-bottom:8px;font-family:Arial,sans-serif;">Notes</div>
      <div style="font-size:13px;line-height:1.6;white-space:pre-wrap;">${notes.replace(/</g, '&lt;')}</div>
    </div>` : ''}`;
  try {
    const { data, error } = await client.emails.send({ from: FROM, to, subject, html: shellHtml(inner) });
    if (error) return { ok: false, error: String(error) };
    return { ok: true, id: data?.id };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}

export async function sendQuizLeadConfirmationEmail({ name, email, matchedCommunity, downloadUrl, baseUrl }) {
  if (!client || !FROM) return { skipped: true, reason: 'missing-config' };
  const fullDownload = downloadUrl?.startsWith('http') ? downloadUrl : `${baseUrl}${downloadUrl}`;
  const subject = `Your La Quinta match: ${matchedCommunity}`;
  const inner = `
    <p style="font-size:15px;line-height:1.65;">Hi ${name?.split(' ')[0] || 'there'},</p>
    <p style="font-size:15px;line-height:1.65;">Thanks for taking the community quiz. Based on your answers, your closest fit among La Quinta\u2019s seven private clubs is:</p>
    <div style="margin:22px 0;padding:18px 22px;background:${NAVY};color:${SAND};">
      <div style="font-size:10px;text-transform:uppercase;letter-spacing:3px;color:${GOLD};font-family:Arial,sans-serif;">Your match</div>
      <div style="font-size:24px;font-family:Georgia,serif;margin-top:6px;">${matchedCommunity}</div>
    </div>
    <p style="font-size:14px;line-height:1.65;">Your printable guide is attached as a download below. It covers the course, the club, the real-estate character, and the questions to ask before you commit.</p>
    <p style="text-align:center;margin:24px 0;">
      <a href="${fullDownload}" style="background:${GOLD};color:${NAVY};text-decoration:none;padding:14px 28px;font-family:Arial,sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;display:inline-block;font-weight:bold;">Download the guide</a>
    </p>
    <p style="font-size:13px;line-height:1.6;color:#5A4E40;">If the button doesn\u2019t work, the link is: <a href="${fullDownload}" style="color:${NAVY};word-break:break-all;">${fullDownload}</a></p>
    <p style="font-size:14px;line-height:1.65;margin-top:24px;">A few notes: this site is a lifestyle guide to La Quinta&rsquo;s golf communities. Listings, private tours, and buyer representation are provided by our California-licensed Exclusive Market Partner. The matched community is a starting point, not a recommendation to transact. No automated marketing emails.</p>
    <p style="font-size:14px;line-height:1.65;margin-top:18px;">— The team at ${owner.name}</p>`;
  try {
    const { data, error } = await client.emails.send({ from: FROM, to: [email], subject, html: shellHtml(inner) });
    if (error) return { ok: false, error: String(error) };
    return { ok: true, id: data?.id };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}


// ---------------------------------------------------------------------------
// Contact-form emails: welcome-package to the inquirer + notification to the
// Exclusive Market Partner (Kathy Schowe) and the site owner. Both templates
// pull the partner's live contact card from lib/exclusive-partner.js so any
// change to the partner is reflected across every future email automatically.
// ---------------------------------------------------------------------------

function partnerCardHtml() {
  return `
    <div style="margin:24px 0;padding:20px;background:#FFFFFF;border:1px solid #D8CCB0;">
      <div style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${GOLD};font-family:Arial,sans-serif;margin-bottom:10px;">Exclusive Market Partner \u2014 La Quinta</div>
      <div style="font-family:Georgia,serif;font-size:22px;color:${NAVY};">${partner.displayName}</div>
      <div style="font-size:12px;color:#5A4E40;font-family:Arial,sans-serif;margin-top:2px;">${partner.brokerage.name} \u00b7 CA DRE #${partner.dreLicense}</div>
      <div style="margin-top:14px;font-size:13px;line-height:1.65;color:${INK};">${partner.bioShort}</div>
      <table style="margin-top:14px;font-family:Arial,sans-serif;font-size:13px;">
        <tr><td style="padding:3px 12px 3px 0;color:#7A6E60;">Phone</td><td style="padding:3px 0;"><a href="tel:${partner.contact.phoneTel}" style="color:${NAVY};">${partner.contact.phone}</a></td></tr>
        <tr><td style="padding:3px 12px 3px 0;color:#7A6E60;">Office</td><td style="padding:3px 0;color:${INK};">${partner.brokerage.address}</td></tr>
      </table>
      <p style="margin-top:14px;text-align:center;">
        <a href="${partner.scheduler.url}" style="background:${GOLD};color:${NAVY};text-decoration:none;padding:12px 22px;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;display:inline-block;font-weight:bold;">${partner.scheduler.label}</a>
      </p>
    </div>`;
}

export async function sendContactWelcomeEmail({ name, email, subject, message, baseUrl }) {
  if (!client || !FROM) return { skipped: true, reason: 'missing-config' };
  const firstName = (name || '').split(' ')[0] || 'there';
  const site = baseUrl || `https://${owner.domain || 'laquintagolflifestyle.com'}`;
  const subj = `Welcome \u2014 next steps for your La Quinta search`;
  const trimmedMsg = (message || '').trim();
  const inner = `
    <p style="font-size:15px;line-height:1.65;">Hi ${firstName},</p>
    <p style="font-size:15px;line-height:1.65;">Thank you for reaching out about <strong>${subject}</strong>. A note has just landed with ${partner.displayName}, our Exclusive Market Partner for La Quinta, who will personally reply within one business day.</p>

    ${trimmedMsg ? `<div style="margin:18px 0;padding:14px 16px;background:${SAND};border-left:3px solid ${GOLD};font-size:13px;color:#5A4E40;font-style:italic;">"${trimmedMsg.slice(0, 600).replace(/</g, '&lt;')}"</div>` : ''}

    <div style="margin-top:26px;padding-top:18px;border-top:1px solid #D8CCB0;">
      <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${GOLD};font-family:Arial,sans-serif;">While You Wait</div>
      <h2 style="font-family:Georgia,serif;font-size:22px;color:${NAVY};margin:8px 0 12px;">Three ways to move faster</h2>
      <ol style="font-size:14px;line-height:1.75;padding-left:20px;color:${INK};">
        <li style="margin-bottom:10px;"><strong>Take the community-fit quiz.</strong> Five short questions and you\u2019ll see the three La Quinta clubs that best match your buyer profile. <a href="${site}/community-quiz" style="color:${NAVY};">Start the quiz \u2192</a></li>
        <li style="margin-bottom:10px;"><strong>Request a private tour.</strong> Kathy can arrange access to any of La Quinta\u2019s private clubs \u2014 The Madison Club, The Hideaway, Andalusia, The Tradition, The Quarry, or La Quinta Country Club \u2014 subject to member sponsorship and club availability.</li>
        <li style="margin-bottom:10px;"><strong>Download the 2026 buyer\u2019s guide.</strong> The definitive La Quinta private-club buyer\u2019s reference \u2014 membership tiers, price bands, and questions to ask before you commit. <a href="${site}/guides/2026-la-quinta-buyers-guide" style="color:${NAVY};">Get the guide \u2192</a></li>
      </ol>
    </div>

    ${partnerCardHtml()}

    <p style="font-size:13px;line-height:1.65;color:#5A4E40;margin-top:18px;">You\u2019re not on a marketing list. This is a private, one-to-one editorial handoff. If you\u2019d rather not hear from us, simply reply STOP and we\u2019ll remove your details.</p>
    <p style="font-size:14px;line-height:1.65;margin-top:18px;">\u2014 The Editorial Team, on behalf of ${owner.name}</p>`;
  try {
    const { data, error } = await client.emails.send({
      from: FROM,
      to: [email],
      replyTo: partner.contact.email,
      subject: subj,
      html: shellHtml(inner),
    });
    if (error) return { ok: false, error: (error && (error.message || JSON.stringify(error))) || String(error) };
    return { ok: true, id: data?.id };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}

export async function sendContactPartnerEmail({ name, email, phone, subject, message, page, baseUrl }) {
  if (!client || !FROM) return { skipped: true, reason: 'missing-config' };
  const site = baseUrl || `https://${owner.domain || 'laquintagolflifestyle.com'}`;
  const pageUrl = page ? `${site}${page}` : null;

  // CONTACT_TEST_MODE guard: when the flag is on (dev / staging / any
  // environment where we do NOT want to email the live Exclusive Market
  // Partner), route notifications ONLY to OWNER_EMAIL. This prevents smoke
  // tests, QA runs, and preview-environment traffic from ever landing in
  // Kathy\u2019s real inbox at schoweproperties@gmail.com.
  const testMode = process.env.CONTACT_TEST_MODE === '1';
  const to = testMode
    ? (OWNER ? [OWNER] : [])
    : [partner.contact.email, ...(OWNER ? [OWNER] : []), ...COLLAB];
  if (to.length === 0) return { skipped: true, reason: 'no-recipients' };

  const subjPrefix = testMode ? '[TEST MODE] ' : '';
  const subj = `${subjPrefix}New lead \u2014 ${subject} \u2014 ${name}`;
  const testBanner = testMode
    ? `<div style="margin-bottom:16px;padding:10px 14px;background:#FDF5E6;border:1px dashed ${GOLD};font-family:Arial,sans-serif;font-size:12px;color:#7A6E60;">
         <strong>CONTACT_TEST_MODE is on.</strong> This notification was NOT sent to ${partner.displayName} (${partner.contact.email}). Set <code>CONTACT_TEST_MODE=0</code> in production.
       </div>`
    : '';
  const inner = `
    ${testBanner}
    <p style="font-size:14px;line-height:1.6;color:${INK};">A new inquiry just came in through the contact form on the site.</p>
    <table style="width:100%;margin-top:16px;font-family:Arial,sans-serif;font-size:13px;">
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;width:130px;">Name</td><td style="padding:6px 0;"><strong>${name}</strong></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;">Email</td><td style="padding:6px 0;"><a href="mailto:${email}" style="color:${NAVY};">${email}</a></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;">Phone</td><td style="padding:6px 0;">${phone ? `<a href="tel:${phone}" style="color:${NAVY};">${phone}</a>` : '\u2014'}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;">Subject</td><td style="padding:6px 0;"><strong style="color:${NAVY};font-family:Georgia,serif;font-size:15px;">${subject}</strong></td></tr>
      ${pageUrl ? `<tr><td style="padding:6px 12px 6px 0;color:#7A6E60;">On page</td><td style="padding:6px 0;"><a href="${pageUrl}" style="color:${NAVY};">${page}</a></td></tr>` : ''}
    </table>
    ${message ? `<div style="margin-top:22px;padding:14px 16px;background:${SAND};border:1px solid #D8CCB0;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:2px;color:${GOLD};margin-bottom:8px;font-family:Arial,sans-serif;">Their note</div>
      <div style="font-size:14px;line-height:1.65;white-space:pre-wrap;color:${INK};">${(message || '').replace(/</g, '&lt;')}</div>
    </div>` : ''}
    <p style="font-size:13px;line-height:1.6;color:#5A4E40;margin-top:22px;">The buyer has already received a welcome package with your contact card, scheduler link, and next-step options. Follow up within one business day.</p>`;
  try {
    const { data, error } = await client.emails.send({
      from: FROM,
      to,
      replyTo: email,
      subject: subj,
      html: shellHtml(inner),
    });
    if (error) return { ok: false, error: String(error) };
    return { ok: true, id: data?.id };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}
