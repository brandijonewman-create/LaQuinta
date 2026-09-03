// Resend wrapper. Fails soft when RESEND_API_KEY is unset.
// All templates use inline styles only (Gmail-compatible).
//
// Note: while the La Quinta Exclusive Market Partner slot is OPEN, every
// contact-form inquiry routes to OWNER_EMAIL only. There is no live realtor
// partner to notify. When a partner is signed, restore the partner-card
// block and update `sendContactPartnerEmail` to include the partner recipient.

import { Resend } from 'resend';
import { owner, site } from './site-config';

const KEY = process.env.RESEND_API_KEY || '';
const FROM = process.env.RESEND_FROM || '';
const OWNER = process.env.OWNER_EMAIL || '';
const COLLAB = (process.env.COLLABORATOR_EMAILS || '')
  .split(',').map((s) => s.trim()).filter(Boolean);

const client = KEY ? new Resend(KEY) : null;

const SITE = site.name;
const NAVY = '#1F3A2E';
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
      ${SITE} is a lifestyle guide operated by ${owner.fullName}. Estimate only \u2014 verify with a licensed California real-estate professional before transacting.
    </div>
  </div></body></html>`;
}

export async function sendQuizLeadOwnerEmail({ name, email, phone, matchedCommunity, runnersUp, quizAnswers }) {
  if (!client || !FROM || !OWNER) return { skipped: true, reason: 'missing-config' };
  const to = [OWNER, ...COLLAB];
  const subject = `New lead: ${name} \u2014 ${matchedCommunity}`;
  const rows = Object.entries(quizAnswers || {})
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#7A6E60;text-transform:capitalize;font-family:Arial,sans-serif;font-size:12px;">${k}</td><td style="padding:4px 0;color:${INK};font-family:Arial,sans-serif;font-size:13px;">${v}</td></tr>`)
    .join('');
  const runnersHtml = (runnersUp || []).map((r) => `<li>${r}</li>`).join('');
  const inner = `
    <p style="font-size:14px;line-height:1.6;color:${INK};">A new lead just completed the community quiz on the site.</p>
    <table style="width:100%;margin-top:16px;font-family:Arial,sans-serif;font-size:13px;">
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;width:120px;">Name</td><td style="padding:6px 0;"><strong>${name}</strong></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;">Email</td><td style="padding:6px 0;"><a href="mailto:${email}" style="color:${NAVY};">${email}</a></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#7A6E60;">Phone</td><td style="padding:6px 0;">${phone || '\u2014'}</td></tr>
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
    <p style="font-size:14px;line-height:1.65;margin-top:24px;">A few notes: this site is a lifestyle guide to La Quinta&rsquo;s golf communities. The matched community is a starting point, not a recommendation to transact. No automated marketing emails.</p>
    <p style="font-size:14px;line-height:1.65;margin-top:18px;">\u2014 ${owner.fullName}</p>`;
  try {
    const { data, error } = await client.emails.send({ from: FROM, to: [email], subject, html: shellHtml(inner) });
    if (error) return { ok: false, error: String(error) };
    return { ok: true, id: data?.id };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}

// ---------------------------------------------------------------------------
// Contact-form emails.
//
// While the La Quinta Exclusive Market Partner slot is OPEN, both templates
// are owner-facing:
//   • sendContactWelcomeEmail — auto-reply to the visitor, no partner card.
//   • sendContactPartnerEmail — notification to OWNER_EMAIL (the "partner"
//     recipient is a no-op in the open-slot mode; function name kept for
//     API-route compatibility).
// ---------------------------------------------------------------------------

export async function sendContactWelcomeEmail({ name, email, subject, message, baseUrl }) {
  if (!client || !FROM) return { skipped: true, reason: 'missing-config' };
  const firstName = (name || '').split(' ')[0] || 'there';
  const siteUrl = baseUrl || site.url;
  const subj = `Thanks for your note \u2014 ${SITE}`;
  const trimmedMsg = (message || '').trim();
  const inner = `
    <p style="font-size:15px;line-height:1.65;">Hi ${firstName},</p>
    <p style="font-size:15px;line-height:1.65;">Thank you for reaching out about <strong>${subject}</strong>. We\u2019ll reply personally within one business day.</p>

    ${trimmedMsg ? `<div style="margin:18px 0;padding:14px 16px;background:${SAND};border-left:3px solid ${GOLD};font-size:13px;color:#5A4E40;font-style:italic;">"${trimmedMsg.slice(0, 600).replace(/</g, '&lt;')}"</div>` : ''}

    <div style="margin-top:26px;padding-top:18px;border-top:1px solid #D8CCB0;">
      <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${GOLD};font-family:Arial,sans-serif;">While You Wait</div>
      <h2 style="font-family:Georgia,serif;font-size:22px;color:${NAVY};margin:8px 0 12px;">Three ways to move faster</h2>
      <ol style="font-size:14px;line-height:1.75;padding-left:20px;color:${INK};">
        <li style="margin-bottom:10px;"><strong>Take the community-fit quiz.</strong> Five short questions and you\u2019ll see the three La Quinta clubs that best match your buyer profile. <a href="${siteUrl}/community-quiz" style="color:${NAVY};">Start the quiz \u2192</a></li>
        <li style="margin-bottom:10px;"><strong>Read the 2026 buyer\u2019s guide.</strong> The full La Quinta private-club buyer\u2019s reference \u2014 membership tiers, price bands, and the questions to ask before you commit. <a href="${siteUrl}/guides/2026-la-quinta-buyers-guide" style="color:${NAVY};">Get the guide \u2192</a></li>
        <li style="margin-bottom:10px;"><strong>Browse the seven private clubs.</strong> Full community-by-community profiles \u2014 architects, membership style, real-estate character. <a href="${siteUrl}/communities" style="color:${NAVY};">See the communities \u2192</a></li>
      </ol>
    </div>

    <p style="font-size:13px;line-height:1.65;color:#5A4E40;margin-top:22px;">You\u2019re not on a marketing list. This is a private, one-to-one editorial handoff. If you\u2019d rather not hear from us, simply reply STOP and we\u2019ll remove your details.</p>
    <p style="font-size:14px;line-height:1.65;margin-top:18px;">\u2014 ${owner.fullName}</p>`;
  try {
    const { data, error } = await client.emails.send({
      from: FROM,
      to: [email],
      replyTo: OWNER || FROM,
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
  // Notify OWNER_EMAIL only while the partner slot is open. Function name
  // preserved for compatibility with the /api/contact route.
  if (!client || !FROM) return { skipped: true, reason: 'missing-config' };
  const siteUrl = baseUrl || site.url;
  const pageUrl = page ? `${siteUrl}${page}` : null;

  const to = [
    ...(OWNER ? [OWNER] : []),
    ...COLLAB,
  ];
  if (to.length === 0) return { skipped: true, reason: 'no-recipients' };

  const subj = `New lead \u2014 ${subject} \u2014 ${name}`;
  const inner = `
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
    <p style="font-size:13px;line-height:1.6;color:#5A4E40;margin-top:22px;">The visitor has already received an auto-reply confirming receipt.</p>`;
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
