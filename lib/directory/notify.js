// Outbound email for directory submissions (Resend): the confirmation code
// and the notice to Brandi Jo. Both fail soft.
import { Resend } from 'resend';
import { SITE } from '@/lib/data';
import { categoryBySlug, cityBySlug, GUIDE_BASE } from './index';
import { reviewToken } from './review-token';

export async function sendEmailCode({ to, name, code }) {
  if (!process.env.RESEND_API_KEY) return { skipped: true, reason: 'no RESEND_API_KEY' };
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM || 'Scottsdale Golf Lifestyle <onboarding@resend.dev>';
  const html = `<div style="font-family:Georgia,serif;color:#062840;max-width:520px">
    <h2 style="font-weight:normal">Confirm ${escapeHtml(name)}</h2>
    <p>Enter this code on the Scottsdale Golf Lifestyle Guide to confirm your free listing:</p>
    <p style="font-size:32px;letter-spacing:6px;color:#BA9273"><strong>${code}</strong></p>
    <p style="font-size:13px;color:#7a6c55">The code is good for 30 minutes.</p></div>`;
  try {
    await resend.emails.send({ from, to, subject: `Your listing code: ${code}`, html });
    return { sent: true };
  } catch (e) {
    console.error('directory code email failed', e.message);
    return { sent: false };
  }
}

// New submission notice to Brandi Jo (OWNER_EMAIL). GoHighLevel dropped for now (Nov 21, 2026).
export async function sendReviewNotice(biz) {
  if (!process.env.RESEND_API_KEY || !process.env.OWNER_EMAIL) return { skipped: true };
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM || 'Scottsdale Golf Lifestyle <onboarding@resend.dev>';
  const cat = categoryBySlug[biz.categories[0]];
  const city = cityBySlug[biz.city];
  const rows = Object.entries(biz.checks || {}).filter(([, c]) => c)
    .map(([k, c]) => `<li>${k}: ${c.pass === true ? 'passed' : escapeHtml(c.reason || 'not passed')}</li>`).join('');
  const verdict = biz.status === 'live' ? 'is live' : 'needs your review';
  const html = `<div style="font-family:Georgia,serif;color:#062840;max-width:560px">
    <h2 style="font-weight:normal">${escapeHtml(biz.name)} ${verdict}</h2>
    <p>${escapeHtml(cat?.title || '')} in ${escapeHtml(city?.name || '')}<br>
    ${escapeHtml(biz.website || '')} &middot; ${escapeHtml(biz.phone || '')} &middot; ${escapeHtml(biz.email || '')}<br>
    ${biz.license?.number ? 'License: ' + escapeHtml(biz.license.number) + '<br>' : ''}
    Submitted by ${escapeHtml(biz.submitter?.name || '')}</p>
    <ul>${rows}</ul>
    <p><a href="${SITE.url}${GUIDE_BASE}/${biz.slug}">${SITE.url}${GUIDE_BASE}/${biz.slug}</a></p>
    ${biz.status === 'review' && biz._id ? reviewLinks(String(biz._id)) : ''}</div>`;
  try {
    await resend.emails.send({ from, to: process.env.OWNER_EMAIL, subject: `Guide listing ${verdict}: ${biz.name}`, html });
    return { sent: true };
  } catch (e) {
    console.error('directory review notice failed', e.message);
    return { sent: false };
  }
}

function reviewLinks(id) {
  const link = (action) => {
    const t = reviewToken(id, action);
    return t ? `${SITE.url}/api/directory/review?id=${id}&action=${action}&token=${t}` : null;
  };
  const a = link('approve'), r = link('reject');
  if (!a) return '<p>Set DIRECTORY_REVIEW_SECRET to get Approve and Reject links.</p>';
  return `<p><a href="${a}" style="background:#062840;color:#fff;padding:10px 18px;border-radius:20px;text-decoration:none">Approve</a>
    &nbsp; <a href="${r}" style="color:#BA9273">Reject</a></p>`;
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
