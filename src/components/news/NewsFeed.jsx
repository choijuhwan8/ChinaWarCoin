import React, { useEffect, useState } from "react";
import { useNews } from "../../news/useNews";
import NewsCard from "./NewsCard.jsx";
import NewsSkeleton from "./NewsSkeleton.jsx";
import EmptyState from "./EmptyState.jsx";
import ErrorState from "./ErrorState.jsx";

export default function NewsFeed({ query, onQueryChange }) {
  const { data, isLoading, isError, isFetching, refetch } = useNews(query);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!data) return;
    setItems((prev) => {
      if (query.page <= 1) return data.items;
      const merged = new Map();
      [...prev, ...data.items].forEach((item) => merged.set(item.id, item));
      return Array.from(merged.values());
    });
  }, [data, query.page]);

  useEffect(() => {
    if (query.page === 1) setItems([]);
  }, [query.q, query.language, query.refreshToken]);

  if (isLoading && !items.length) {
    return <NewsSkeleton count={query.pageSize || 6} />;
  }

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  if (!items.length) {
    return <EmptyState />;
  }

  const canLoadMore = data && items.length < data.total;

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
      {canLoadMore && (
        <div className="flex justify-center">
          <button
            type="button"
            disabled={isFetching}
            onClick={() => onQueryChange({ ...query, page: (query.page || 1) + 1 })}
            className="rounded-full border border-secondary bg-secondary/10 px-6 py-2 text-sm font-semibold text-secondary transition hover:bg-secondary/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isFetching ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
