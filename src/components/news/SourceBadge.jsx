import React from "react";

const credibilityStyles = {
  high: "bg-green-500/10 text-green-300 border-green-400/50",
  medium: "bg-amber-500/10 text-amber-200 border-amber-400/40",
  unknown: "bg-slate-500/10 text-slate-200 border-slate-400/30"
};

export default function SourceBadge({ source, credibility = "unknown" }) {
  const classes = credibilityStyles[credibility] || credibilityStyles.unknown;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${classes}`}>
      {credibility === "high" && <span aria-hidden="true">★</span>}
      {source}
    </span>
  );
}
