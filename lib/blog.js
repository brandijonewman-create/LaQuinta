// MDX loader. Reads /content/blog and /content/guides.
// YAML frontmatter required: title, date, excerpt, cover, category, faq[], tldr[].
// Body is MDX (no inline JSX arrays — keep arrays in frontmatter).

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

function ensureDir(p) {
  try { fs.mkdirSync(p, { recursive: true }); } catch {}
}

function listDir(subdir) {
  const dir = path.join(CONTENT_ROOT, subdir);
  ensureDir(dir);
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
}

function readOne(subdir, slug) {
  const full = path.join(CONTENT_ROOT, subdir, `${slug}.mdx`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, 'utf8');
  const { data, content } = matter(raw);
  return { slug, frontmatter: data, content };
}

export function getAllPosts() {
  return listDir('blog')
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const post = readOne('blog', slug);
      return post;
    })
    .filter(Boolean)
    .filter((p) => !p.frontmatter.draft)
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
}

export function getPost(slug) {
  return readOne('blog', slug);
}

export function getAllGuides() {
  return listDir('guides')
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      return readOne('guides', slug);
    })
    .filter(Boolean)
    .filter((p) => !p.frontmatter.draft)
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
}

export function getGuide(slug) {
  return readOne('guides', slug);
}

export function getPostSlugs() {
  return listDir('blog').map((f) => f.replace(/\.mdx$/, ''));
}

export function getGuideSlugs() {
  return listDir('guides').map((f) => f.replace(/\.mdx$/, ''));
}
