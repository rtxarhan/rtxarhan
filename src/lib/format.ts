// Shortens big numbers for display: 2500000 -> "2.5M", 50000 -> "50K"
export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return Math.round(value).toLocaleString("en-US");
}
