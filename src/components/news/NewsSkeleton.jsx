import React from "react";

export default function NewsSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="glass-card h-48 animate-pulse space-y-4 p-6">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-white/10" />
            <div className="h-3 w-20 rounded bg-white/10" />
            <div className="h-3 w-10 rounded bg-white/5" />
          </div>
          <div className="h-4 w-full rounded bg-white/15" />
          <div className="h-4 w-3/4 rounded bg-white/10" />
          <div className="flex gap-2 pt-2">
            <div className="h-5 w-16 rounded-full bg-white/10" />
            <div className="h-5 w-12 rounded-full bg-white/10" />
            <div className="h-5 w-14 rounded-full bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
