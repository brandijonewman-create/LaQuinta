// Custom MDX components rendered inside blog MDX bodies. Keep this set
// minimal — every component added here gets imported into every MDX render.
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function TLDR({ items = [] }) {
  return (
    <div className="my-8 rounded-xl border border-amber-200 bg-amber-50/60 p-6">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-800 mb-3">
        <Sparkles className="h-3 w-3" /> TL;DR
      </div>
      <ul className="space-y-2 text-[#062840]/85 text-[15px]">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2"><span className="text-amber-700">•</span><span>{it}</span></li>
        ))}
      </ul>
    </div>
  );
}

export function FAQBlock({ items = [] }) {
  return (
    <div className="my-10 border-t border-[#062840]/10 pt-8">
      <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-4">FAQ</div>
      <div className="space-y-5">
        {items.map((qa, i) => (
          <div key={i}>
            <div className="font-semibold text-[#062840] mb-1">{qa.q}</div>
            <div className="text-[#062840]/80 text-[15px]">{qa.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CTA({ text, href, label }) {
  return (
    <div className="my-8 rounded-xl bg-[#062840] text-amber-50 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="text-amber-50/90">{text}</div>
      <Link href={href} className="inline-flex items-center gap-2 bg-amber-300 text-[#062840] px-5 py-2.5 rounded-full font-semibold whitespace-nowrap hover:bg-amber-200 transition">
        {label} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

// The full overrides object passed to <MDXRemote components={...} />.
// Standard markdown tags (h2/h3/p/ul/ol/li/a/etc.) get sensible defaults
// matched to the rest of the editorial palette.
export const mdxComponents = {
  TLDR,
  FAQBlock,
  CTA,
  h2: (props) => <h2 className="font-serif text-3xl md:text-4xl text-[#062840] mt-12 mb-4 tracking-tight" {...props} />,
  h3: (props) => <h3 className="font-serif text-2xl text-[#062840] mt-10 mb-3 tracking-tight" {...props} />,
  p:  (props) => <p className="mt-5 text-[#062840]/85 leading-relaxed" {...props} />,
  ul: (props) => <ul className="mt-4 mb-5 space-y-2 list-disc list-outside ml-6 text-[#062840]/85" {...props} />,
  ol: (props) => <ol className="mt-4 mb-5 space-y-2 list-decimal list-outside ml-6 text-[#062840]/85" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  a:  ({ href = '#', ...rest }) => <Link href={href} className="text-[#BA9273] hover:underline" {...rest} />,
  code: (props) => <code className="bg-emerald-50/70 text-emerald-900 rounded px-1.5 py-0.5 text-[0.92em]" {...props} />,
  pre:  (props) => <pre className="bg-emerald-900/5 border border-[#062840]/10 rounded-lg p-4 my-6 overflow-x-auto text-sm" {...props} />
};
