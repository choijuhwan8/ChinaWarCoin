import React from "react";

export default function TagChip({ label, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors duration-150 ${
        active
          ? "border-secondary bg-secondary/20 text-secondary"
          : "border-white/20 bg-transparent text-white/70 hover:border-secondary hover:text-secondary"
      }`}
    >
      {label}
    </button>
  );
}
