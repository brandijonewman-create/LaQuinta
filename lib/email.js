// Resend transactional-email wrapper.
//
// Two functions:
//   sendQuizLeadOwnerEmail({...})         — to OWNER_EMAIL + COLLABORATOR_EMAILS
//   sendQuizLeadConfirmationEmail({...})  — to the lead's own email
//
// Both use the same RESEND_FROM sender and inline-style HTML (no <style> tags,
// for Gmail compatibility). Fail soft: if RESEND_API_KEY is unset, the
// function returns { skipped: true } so lead capture still succeeds.
//
// The owner's address is never rendered to the public anywhere on the site.

import { Resend } from 'resend';

function getClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function collaboratorList() {
  const raw = process.env.COLLABORATOR_EMAILS || '';
  return raw.split(',').map(s => s.trim()).filter(Boolean);
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const NAVY  = '#062840';
const GOLD  = '#BA9273';
const CREAM = '#fbf8f2';
const BORDER = '#e5d9c4';

function shellHtml(innerHtml, { previewText = '' } = {}) {
  const preview = previewText ? `<div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">${esc(previewText)}</div>` : '';
  return `<!doctype html><html><body style="margin:0;padding:0;background:${CREAM};font-family:Georgia,'Times New Roman',serif;color:${NAVY};">${preview}<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${CREAM};padding:24px 12px;"><tr><td align="center"><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border:1px solid ${BORDER};border-radius:10px;overflow:hidden;"><tr><td style="background:${NAVY};padding:20px 28px;color:#fde68a;font-family:Georgia,serif;font-size:18px;letter-spacing:0.04em;"><span style="display:inline-block;width:26px;height:26px;line-height:26px;text-align:center;background:${GOLD};color:${NAVY};font-weight:bold;border-radius:50%;margin-right:10px;vertical-align:middle;">S</span>Scottsdale Golf Lifestyle</td></tr><tr><td style="padding:28px;">${innerHtml}</td></tr><tr><td style="padding:14px 28px;border-top:1px solid ${BORDER};font-family:Arial,sans-serif;font-size:11px;color:#7a6c55;line-height:1.6;">Scottsdale Golf Lifestyle is owned and operated by 7671 Enterprises LLC. It is not a brokerage and does not list homes for sale. Estimates are not appraisals.</td></tr></table></td></tr></table></body></html>`;
}

/**
 * Notify the owner + collaborators that a new quiz lead arrived.
 */
export async function sendQuizLeadOwnerEmail({
  name,
  email,
  phone,
  matchedCommunity,
  runnersUp = [],
  quizAnswers = {},
  score = null
} = {}) {
  const resend = getClient();
  if (!resend) return { skipped: true, reason: 'no RESEND_API_KEY' };

  const to = [process.env.OWNER_EMAIL, ...collaboratorList()].filter(Boolean);
  if (!to.length) return { skipped: true, reason: 'no recipient configured' };

  const from = process.env.RESEND_FROM;
  if (!from) return { skipped: true, reason: 'no RESEND_FROM' };

  const runnersHtml = runnersUp.length
    ? `<div style="font-size:13px;color:#5b6b7a;">Runners-up: ${runnersUp.map(r => esc(r)).join(' · ')}</div>`
    : '';

  const answerRows = Object.entries(quizAnswers).map(([k, v]) =>
    `<tr><td style="padding:6px 0;font-family:Arial,sans-serif;font-size:13px;color:#5b6b7a;text-transform:capitalize;width:120px;">${esc(k)}</td><td style="padding:6px 0;font-family:Arial,sans-serif;font-size:13px;color:${NAVY};">${esc(v)}</td></tr>`
  ).join('');

  const inner = `<div style="font-size:11px;text-transform:uppercase;letter-spacing:0.18em;color:${GOLD};margin-bottom:6px;">New quiz lead</div><h1 style="font-family:Georgia,serif;font-size:24px;color:${NAVY};margin:0 0 18px 0;line-height:1.25;">${esc(name || 'Unnamed lead')} — matched to ${esc(matchedCommunity || 'n/a')}</h1><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:18px;"><tr><td style="padding:6px 0;font-family:Arial,sans-serif;font-size:13px;color:#5b6b7a;width:80px;">Email</td><td style="padding:6px 0;font-family:Arial,sans-serif;font-size:13px;color:${NAVY};"><a href="mailto:${esc(email)}" style="color:${NAVY};text-decoration:underline;">${esc(email)}</a></td></tr><tr><td style="padding:6px 0;font-family:Arial,sans-serif;font-size:13px;color:#5b6b7a;">Phone</td><td style="padding:6px 0;font-family:Arial,sans-serif;font-size:13px;color:${NAVY};">${esc(phone || '—')}</td></tr>${score != null ? `<tr><td style="padding:6px 0;font-family:Arial,sans-serif;font-size:13px;color:#5b6b7a;">Score</td><td style="padding:6px 0;font-family:Arial,sans-serif;font-size:13px;color:${NAVY};">${esc(score)}/13</td></tr>` : ''}</table>${runnersHtml}<div style="margin-top:18px;padding-top:14px;border-top:1px solid ${BORDER};"><div style="font-family:Arial,sans-serif;font-size:12px;color:#7a6c55;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:8px;">Quiz answers</div><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${answerRows}</table></div>`;

  try {
    const r = await resend.emails.send({
      from,
      to,
      subject: `New quiz lead — ${name || 'Unnamed'} — ${matchedCommunity || 'n/a'}`,
      html: shellHtml(inner, { previewText: `${name} · ${email} · ${matchedCommunity}` }),
      reply_to: email || undefined
    });
    return { ok: true, id: r?.data?.id || null };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}

/**
 * Send the lead a confirmation email with their match + download link.
 */
export async function sendQuizLeadConfirmationEmail({
  name,
  email,
  matchedCommunity,
  downloadUrl,
  baseUrl
} = {}) {
  const resend = getClient();
  if (!resend) return { skipped: true, reason: 'no RESEND_API_KEY' };
  if (!email) return { skipped: true, reason: 'no recipient email' };

  const from = process.env.RESEND_FROM;
  if (!from) return { skipped: true, reason: 'no RESEND_FROM' };

  const fullUrl = downloadUrl && baseUrl ? `${baseUrl.replace(/\/$/, '')}${downloadUrl}` : (downloadUrl || '#');
  const firstName = (name || '').split(' ')[0] || 'there';

  const inner = `<div style="font-size:11px;text-transform:uppercase;letter-spacing:0.18em;color:${GOLD};margin-bottom:6px;">Your match</div><h1 style="font-family:Georgia,serif;font-size:26px;color:${NAVY};margin:0 0 14px 0;line-height:1.25;">Hi ${esc(firstName)} — your match is ${esc(matchedCommunity || 'ready')}.</h1><p style="font-family:Georgia,serif;font-size:15px;color:#1f2e3a;line-height:1.65;margin:0 0 18px 0;">Thanks for taking the quiz. The community guide for <strong>${esc(matchedCommunity || 'your match')}</strong> should have downloaded automatically. If it didn’t, use the link below.</p><p style="margin:0 0 24px 0;"><a href="${esc(fullUrl)}" style="display:inline-block;background:${NAVY};color:#fde68a;font-family:Georgia,serif;font-size:15px;text-decoration:none;padding:12px 22px;border-radius:999px;">Download the guide</a></p><p style="font-family:Georgia,serif;font-size:14px;color:#5b6b7a;line-height:1.65;margin:0 0 12px 0;">A few notes on what to do next:</p><ul style="font-family:Georgia,serif;font-size:14px;color:#1f2e3a;line-height:1.65;padding-left:20px;margin:0 0 18px 0;"><li>Read the guide — it covers the course, the club model, the real-estate footprint, and who the community honestly fits.</li><li>Pair it with the runner-up communities the quiz also surfaced; the right Scottsdale community is usually the second or third option for half of buyers.</li><li>When you’re ready, the membership office at each club is the right next stop for current fee structures — we never publish numbers we can’t verify directly.</li></ul><p style="font-family:Georgia,serif;font-size:13px;color:#7a6c55;line-height:1.65;margin:20px 0 0 0;border-top:1px solid ${BORDER};padding-top:14px;">Scottsdale Golf Lifestyle <br/>Owned and operated by 7671 Enterprises LLC</p>`;

  try {
    const r = await resend.emails.send({
      from,
      to: email,
      subject: `Your Scottsdale match: ${matchedCommunity || 'your guide is ready'}`,
      html: shellHtml(inner, { previewText: `Your community guide for ${matchedCommunity || 'Scottsdale'} is attached.` })
    });
    return { ok: true, id: r?.data?.id || null };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}

/**
 * Notify the owner that a new collaborator application has been submitted.
 * No confirmation email is sent to the applicant — the in-app success state
 * acknowledges the submission.
 */
export async function sendCollaboratorApplicationOwnerEmail(app = {}) {
  const resend = getClient();
  if (!resend) return { skipped: true, reason: 'no RESEND_API_KEY' };

  const to = [process.env.OWNER_EMAIL].filter(Boolean);
  if (!to.length) return { skipped: true, reason: 'no OWNER_EMAIL' };

  const from = process.env.RESEND_FROM;
  if (!from) return { skipped: true, reason: 'no RESEND_FROM' };

  const row = (label, value) => value
    ? `<tr><td style="padding:6px 0;font-family:Arial,sans-serif;font-size:13px;color:#5b6b7a;width:170px;vertical-align:top;">${esc(label)}</td><td style="padding:6px 0;font-family:Arial,sans-serif;font-size:13px;color:${NAVY};">${esc(value)}</td></tr>`
    : '';

  const rows = [
    row('Brokerage / firm',     app.brokerage),
    row('AZ license #',         app.license),
    row('Email',                app.email),
    row('Phone',                app.phone),
    row('Website',              app.website),
    row('LinkedIn',             app.linkedin),
    row('Years in market',      app.yearsExperience),
    row('Primary specialty',    app.specialty),
    row('Communities closed',   app.communities),
    row('Source path',          app.sourcePath),
  ].filter(Boolean).join('');

  const pitchHtml = app.pitch
    ? `<div style="margin-top:18px;padding-top:14px;border-top:1px solid ${BORDER};"><div style="font-family:Arial,sans-serif;font-size:12px;color:#7a6c55;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:8px;">Why they want the partnership</div><p style="font-family:Georgia,serif;font-size:14px;color:${NAVY};line-height:1.6;margin:0;white-space:pre-wrap;">${esc(app.pitch)}</p></div>`
    : '';

  const inner = `<div style="font-size:11px;text-transform:uppercase;letter-spacing:0.18em;color:${GOLD};margin-bottom:6px;">New collaborator application</div><h1 style="font-family:Georgia,serif;font-size:24px;color:${NAVY};margin:0 0 18px 0;line-height:1.25;">${esc(app.name || 'Unnamed applicant')}</h1><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${rows}</table>${pitchHtml}`;

  try {
    const r = await resend.emails.send({
      from,
      to,
      subject: `New collaborator application — ${app.name || 'Unnamed'}${app.brokerage ? ' · ' + app.brokerage : ''}`,
      html: shellHtml(inner, { previewText: `${app.name} · ${app.brokerage || ''} · ${app.email}` }),
      reply_to: app.email || undefined
    });
    return { ok: true, id: r?.data?.id || null };
  } catch (e) {
    return { ok: false, error: e?.message || String(e) };
  }
}

