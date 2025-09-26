import { fetchGdelt } from "./fetchGdelt";
import { normalizeItems } from "./normalize";
import { rankItems } from "./rank";
import { applyFilters } from "./utils";
import { DEFAULT_GDELT_QUERY } from "./keywords";
import { LruCache, loadFromStorage, persistToStorage } from "./cache/lru";
import { SAMPLE_NEWS } from "./sampleData";

const STORAGE_KEY = "news-cache-v1";
const cache = new LruCache(20, 10 * 60 * 1000);

if (typeof window !== "undefined") {
  const stored = loadFromStorage(STORAGE_KEY);
  if (stored.size) {
    cache.map = stored;
  }
}

function getSinceDays(since = "7d") {
  switch (since) {
    case "24h":
      return 1;
    case "30d":
      return 30;
    case "7d":
    default:
      return 7;
  }
}

function serializeQuery(query) {
  const sortedEntries = Object.entries(query || {})
    .map(([key, value]) => [key, Array.isArray(value) ? [...value].sort() : value])
    .sort(([a], [b]) => a.localeCompare(b));
  return JSON.stringify(sortedEntries);
}

function paginate(items, page = 1, pageSize = 20) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return items.slice(start, end);
}

async function fetchAllSources(query) {
  const gdeltQuery = query.q ? `${DEFAULT_GDELT_QUERY} ${query.q}` : DEFAULT_GDELT_QUERY;
  const sinceDays = getSinceDays(query.since);
  try {
    const gdeltItems = await fetchGdelt({ query: gdeltQuery, sinceDays });
    return gdeltItems;
  } catch (error) {
    console.warn("fetchAllSources: GDELT fetch failed", error);
    return [];
  }
}

export async function getNews(query = {}) {
  const mergedQuery = {
    page: 1,
    pageSize: 20,
    since: "7d",
    ...query
  };
  const key = serializeQuery({ ...mergedQuery, page: 1 });
  const cached = cache.get(key);
  if (cached) {
    const filtered = applyFilters(cached.items, mergedQuery);
    const ranked = rankItems(filtered);
    const pageItems = paginate(ranked, mergedQuery.page, mergedQuery.pageSize);
    return {
      items: pageItems,
      total: ranked.length,
      cached: true
    };
  }

  const rawItems = await fetchAllSources(mergedQuery);
  const baseItems = rawItems.length ? rawItems : SAMPLE_NEWS;
  const normalized = normalizeItems(baseItems);
  const ranked = rankItems(normalized);
  cache.set(key, { items: ranked });
  if (typeof window !== "undefined") {
    persistToStorage(STORAGE_KEY, cache.map);
  }
  const filtered = applyFilters(ranked, mergedQuery);
  const pageItems = paginate(filtered, mergedQuery.page, mergedQuery.pageSize);
  return {
    items: pageItems,
    total: filtered.length,
    cached: false
  };
}
