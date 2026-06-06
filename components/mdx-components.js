// Shared MDX component overrides for blog + guides.
import Link from 'next/link';
import Placeholder from '@/components/mdx/placeholder';

export const mdxComponents = {
  // Custom block elements available inside MDX content
  Placeholder,
  h1: (props) => <h1 className="font-serif text-4xl text-palm mt-12 mb-4 leading-tight" {...props} />,
  h2: (props) => <h2 className="font-serif text-3xl text-palm mt-12 mb-4 leading-tight" {...props} />,
  h3: (props) => <h3 className="font-serif text-2xl text-palm mt-8 mb-3 leading-tight" {...props} />,
  p:  (props) => <p className="text-foreground/80 leading-[1.75] my-5" {...props} />,
  ul: (props) => <ul className="list-disc pl-6 my-5 space-y-2 text-foreground/80 leading-[1.7]" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 my-5 space-y-2 text-foreground/80 leading-[1.7]" {...props} />,
  li: (props) => <li className="pl-1" {...props} />,
  a:  ({ href = '#', ...props }) => (
    <Link href={href} className="text-terracotta hover:text-palm underline underline-offset-2 decoration-terracotta/40" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="border-l-2 border-gold pl-6 my-8 font-serif text-xl text-palm leading-[1.5] italic" {...props} />
  ),
  strong: (props) => <strong className="text-palm font-semibold" {...props} />,
  hr: () => <hr className="my-10 border-border" />,
  code: (props) => <code className="font-mono text-[0.92em] bg-sand-100 px-1.5 py-0.5 rounded-sm" {...props} />,
};
