// Shared market-figure disclaimer (network compliance, Fix Round A item 4).
// Rendered directly under any block that prints a dollar figure or range.
export default function MarketDisclaimer({ light = false, className = '' }) {
  return (
    <p className={`text-xs leading-relaxed mt-4 ${light ? 'text-emerald-50/60' : 'text-[#062840]/55'} ${className}`}>
      Figures are illustrative ranges compiled from public sources and change with the market.
      Verify current pricing, dues and fees with a licensed Arizona real estate professional or
      directly with the club.
    </p>
  );
}
