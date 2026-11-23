// Server-only blog loader. Reads MDX files from /content/blog/ at module load
// time and exposes the same API the rest of the site previously consumed via
// lib/data.js (BLOG_POSTS, findPost). All consumers (sitemap, blog index,
// homepage, related-content) remain unchanged.
//
// Each MDX file has YAML frontmatter (slug, title, excerpt, description,
// date, author, cover, keyword, related[]) and a body that can contain
// markdown plus custom JSX components (<TLDR>, <FAQBlock>, <CTA>).
//
// This module is server-only — do NOT import from any 'use client'
// component. All current consumers are server components.

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function loadAllSync() {
  let entries;
  try {
    entries = fs.readdirSync(BLOG_DIR);
  } catch (e) {
    // Folder missing during local cold-start — fail gracefully.
    return [];
  }
  const posts = entries
    .filter(f => f.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title || '',
        excerpt: data.excerpt || '',
        description: data.description || '',
        date: data.date || '',
        author: data.author || 'Golf Homes Editorial',
        cover: data.cover || '',
        keyword: data.keyword || '',
        related: Array.isArray(data.related) ? data.related : [],
        faqs: Array.isArray(data.faqs) ? data.faqs : [],
        tldr: Array.isArray(data.tldr) ? data.tldr : [],
        // raw mdx body — consumed only by the [slug] page renderer
        content
      };
    });
  // newest first
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

// Cache the load once per server boot. Next.js dev mode re-evaluates the
// module on file change, so updates to MDX files refresh automatically.
const _POSTS = loadAllSync();

export const BLOG_POSTS = _POSTS;
export function findPost(slug) {
  return _POSTS.find(p => p.slug === slug) || null;
}
export function getAllPosts() {
  return _POSTS;
}
export function getPostContent(slug) {
  const p = findPost(slug);
  return p ? p.content : '';
}

/**
 * Find blog posts that mention a specific community by name, slug, or
 * common alias. Returns up to `limit` posts ordered by recency. Used by
 * the community-detail page to build an editorial "Related reading"
 * cross-link section — boosts topical authority and internal link density.
 *
 * Match heuristic: case-insensitive substring match against title,
 * excerpt, description, and body content.
 */
export function getPostsMentioningCommunity(communityName, limit = 3, excludeSlugs = []) {
  if (!communityName) return [];
  const needle = communityName.toLowerCase();
  return _POSTS
    .filter(p => !excludeSlugs.includes(p.slug))
    .filter(p => {
      const haystack = `${p.title} ${p.excerpt} ${p.description} ${p.content}`.toLowerCase();
      return haystack.includes(needle);
    })
    .slice(0, limit);
}
