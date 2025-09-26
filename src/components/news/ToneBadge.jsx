import React from "react";
import { toneLabel } from "../../news/utils";

const toneStyles = {
  positive: "bg-emerald-500/10 text-emerald-300 border-emerald-400/40",
  neutral: "bg-slate-500/10 text-slate-200 border-slate-400/30",
  negative: "bg-rose-500/10 text-rose-300 border-rose-400/40"
};

export default function ToneBadge({ tone }) {
  const label = toneLabel(tone);
  if (typeof tone !== "number") return null;
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${toneStyles[label]}`}>
      {label}
    </span>
  );
}
