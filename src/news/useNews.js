import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNews } from "./api";

export function useNews(query) {
  const normalized = useMemo(() => ({
    page: 1,
    pageSize: 20,
    since: "7d",
    ...query
  }), [query]);

  return useQuery({
    queryKey: ["news", normalized],
    queryFn: () => getNews(normalized),
    staleTime: 10 * 60 * 1000,
    keepPreviousData: true
  });
}
