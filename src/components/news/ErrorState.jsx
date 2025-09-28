import React from "react";

export default function ErrorState({ onRetry }) {
  return (
    <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-10 text-center text-rose-100">
      <h3 className="text-xl font-semibold">Something went wrong.</h3>
      <p className="mt-3 text-sm text-rose-200">We couldn\'t load the latest headlines. Please try again.</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 rounded-full border border-rose-400/60 px-6 py-2 text-sm font-semibold text-rose-100 transition hover:border-rose-200"
        >
          Retry
        </button>
      )}
    </div>
  );
}
