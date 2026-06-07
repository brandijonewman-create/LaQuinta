// Resend wrapper. Fails soft when RESEND_API_KEY is unset.
// Both templates use inline styles only (Gmail-compatible).

import { Resend } from 'resend';

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
      ${SITE} works with California-licensed real estate partners. Estimate only — verify with a licensed California real-estate professional before transacting.
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
    <p style="font-size:14px;line-height:1.65;margin-top:24px;">A few honest notes: this site is the definitive guide, built in partnership with California-licensed realtors. The matched community is a starting point, not a recommendation to transact. A member of our team may reach out directly. There are no automated marketing emails.</p>
    <p style="font-size:14px;line-height:1.65;margin-top:18px;">— The team at ${owner.name}</p>`;
  try {
    const { data, error } = await client.emails.send({ from: FROM, to: [email], subject, html: shellHtml(inner) });
    if (error) return { ok: false, error: String(error) };
    return { ok: true, id: data?.id };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}
