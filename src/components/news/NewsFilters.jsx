import React from "react";

export default function NewsFilters({ query, onChange }) {
  const handleSearch = (event) => {
    onChange({ ...query, q: event.target.value, page: 1 });
  };

  const handleRefresh = () => {
    const next = {
      ...(query.pageSize ? { pageSize: query.pageSize } : {}),
      page: 1,
      since: query.since,
      q: query.q || "",
      language: query.language || "all",
      refreshToken: Date.now()
    };
    onChange(next);
  };

  const language = query.language || "all";

  const handleLanguageChange = (value) => {
    onChange({ ...query, language: value, page: 1 });
  };

  return (
    <div className="glass-card grid gap-6 p-6">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <h3 className="text-xl font-semibold text-white">ChinaWar Newsroom</h3>
          <p className="text-sm text-white/60">Aggregated strategic headlines from trusted sources.</p>
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          className="justify-self-start rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70 transition hover:border-secondary hover:text-secondary sm:justify-self-end"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-white/70">
          Search
          <input
            type="search"
            value={query.q || ""}
            onChange={handleSearch}
            placeholder="Search headlines"
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:border-secondary focus:outline-none"
          />
        </label>

        <div className="flex flex-col gap-2 text-sm text-white/70">
          Timeframe
          <p className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/60">
            Showing the latest global coverage automatically.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        Language
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleLanguageChange("all")}
            className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide transition ${
              language === "all"
                ? "border border-secondary bg-secondary/20 text-secondary"
                : "border border-white/15 bg-white/5 text-white/70 hover:border-secondary hover:text-secondary"
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => handleLanguageChange("en")}
            className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide transition ${
              language === "en"
                ? "border border-secondary bg-secondary/20 text-secondary"
                : "border border-white/15 bg-white/5 text-white/70 hover:border-secondary hover:text-secondary"
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => handleLanguageChange("non-en")}
            className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide transition ${
              language === "non-en"
                ? "border border-secondary bg-secondary/20 text-secondary"
                : "border border-white/15 bg-white/5 text-white/70 hover:border-secondary hover:text-secondary"
            }`}
          >
            Non-English
          </button>
        </div>
      </div>
    </div>
  );
}
