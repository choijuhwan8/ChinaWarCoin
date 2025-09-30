import React, { useState } from "react";
import NewsFilters from "./NewsFilters.jsx";
import NewsFeed from "./NewsFeed.jsx";

const INITIAL_QUERY = {
  page: 1,
  pageSize: 20,
  q: "",
  language: "all",
  refreshToken: Date.now()
};

export default function NewsSection() {
  const [query, setQuery] = useState(INITIAL_QUERY);

  return (
    <section id="news" className="space-y-8">
      <div className="section-title sm:mx-auto sm:max-w-2xl">
        <span>Intel Briefings</span>
        <h2>Geopolitics and security headlines</h2>
        <p className="mt-3 text-sm text-white/60">
          News engine coming soon — live feeds activate once the backend is deployed.
        </p>
      </div>
      <NewsFilters query={query} onChange={setQuery} />
      <NewsFeed query={query} onQueryChange={setQuery} />
    </section>
  );
}
