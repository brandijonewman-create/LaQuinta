// Signed one-click Approve / Reject links for Brandi Jo's review emails.
import crypto from 'crypto';

const secret = () => process.env.DIRECTORY_REVIEW_SECRET || process.env.LEADS_ACCESS_KEY || '';

export function reviewToken(id, action) {
  if (!secret()) return null;
  return crypto.createHmac('sha256', secret()).update(`${id}:${action}`).digest('hex');
}

export function validReviewToken(id, action, token) {
  const want = reviewToken(id, action);
  return !!want && !!token && want.length === token.length && crypto.timingSafeEqual(Buffer.from(want), Buffer.from(token));
}
