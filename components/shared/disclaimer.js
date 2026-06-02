import { MARKET_DISCLAIMER } from '@/lib/site-config';
import { Info } from 'lucide-react';

export default function Disclaimer({ children, variant = 'card' }) {
  const message = children || MARKET_DISCLAIMER;
  if (variant === 'inline') {
    return (
      <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/55 italic">{message}</p>
    );
  }
  return (
    <div className="flex items-start gap-3 border border-border bg-sand-50 p-5">
      <Info size={16} className="text-terracotta mt-0.5 flex-shrink-0" />
      <p className="text-xs leading-relaxed text-foreground/75">{message}</p>
    </div>
  );
}
