import { schedule, fetchWithRetry } from "./fetchHelpers";

const WIKI_BASE = "https://en.wikipedia.org/api/rest_v1/page/summary/";
const CACHE_KEY = "news-wiki-summary";
const wikiCache = new Map();

function encodeTitle(title) {
  return encodeURIComponent(title.replace(/\s+/g, " ").trim());
}

export async function getWikiSummary(title) {
  if (!title) return null;
  if (wikiCache.has(title)) return wikiCache.get(title);
  const url = `${WIKI_BASE}${encodeTitle(title)}`;
  try {
    const response = await schedule(() =>
      fetchWithRetry(url, {
        headers: {
          Accept: "application/json"
        }
      })
    );
    const data = await response.json();
    const summary = data.extract || data.description || null;
    wikiCache.set(title, summary);
    return summary;
  } catch (error) {
    wikiCache.set(title, null);
    return null;
  }
}

export function primeWikiCache(serialized) {
  if (!serialized) return;
  try {
    const parsed = JSON.parse(serialized);
    Object.entries(parsed).forEach(([key, value]) => wikiCache.set(key, value));
  } catch (err) {
    // ignore
  }
}

export function serializeWikiCache() {
  return JSON.stringify(Object.fromEntries(wikiCache.entries()));
}
