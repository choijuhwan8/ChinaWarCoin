import React from "react";

export default function EmptyState({ title = "No headlines match your filters.", description = "Try removing some filters or broadening your search." }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-white/70">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm">{description}</p>
    </div>
  );
}
