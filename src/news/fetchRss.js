import { KEYWORDS } from "./keywords";
import { schedule, fetchWithRetry } from "./fetchHelpers";
import { hashId, buildTags, getCredibility, extractDomain } from "./utils";
import sources from "./newsSources.js";
import { API_BASE_URL } from "./config";

const API_BASE = API_BASE_URL || "";
const FAILED_FEEDS = new Map();
const FAIL_TTL = 30 * 60 * 1000;

function keywordMatch(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

function parseRss(xmlString) {
  const parser = new DOMParser();
  return parser.parseFromString(xmlString, "text/xml");
}

function normalizeItem(item, sourceName) {
  const title = item.querySelector("title")?.textContent?.trim() || "";
  const link = item.querySelector("link")?.textContent?.trim() || "";
  if (!title || !link) return null;
  if (!keywordMatch(title)) return null;

  const dateText = item.querySelector("pubDate")?.textContent || item.querySelector("published")?.textContent;
  const summary = item.querySelector("description")?.textContent?.trim() || "";
  const publishedAt = dateText ? new Date(dateText).toISOString() : new Date().toISOString();
  const domain = extractDomain(link) || sourceName;
  const tags = buildTags(title);

  return {
    id: hashId(title, link),
    title,
    url: link,
    source: sourceName || domain,
    publishedAt,
    summary: summary || undefined,
    tone: undefined,
    tags,
    credibility: getCredibility(domain)
  };
}

function shouldSkipFeed(name) {
  const entry = FAILED_FEEDS.get(name);
  if (!entry) return false;
  if (Date.now() - entry < FAIL_TTL) return true;
  FAILED_FEEDS.delete(name);
  return false;
}

function markFeedFailure(name) {
  FAILED_FEEDS.set(name, Date.now());
}

async function fetchFeed(feed) {
  if (shouldSkipFeed(feed.name)) {
    return [];
  }

  const endpoint = `${API_BASE}/api/news/rss?url=${encodeURIComponent(feed.url)}`;

  try {
    const response = await schedule(() =>
      fetchWithRetry(endpoint, {
        headers: {
          Accept: "application/rss+xml, application/xml, text/xml"
        }
      })
    );

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const xml = await response.text();
    const doc = parseRss(xml);
    const items = [...doc.querySelectorAll("item, entry")]
      .map((node) => normalizeItem(node, feed.name))
      .filter(Boolean);

    if (items.length) {
      FAILED_FEEDS.delete(feed.name);
    }

    return items;
  } catch (error) {
    console.warn(`Failed to fetch RSS feed: ${feed.name}`, error);
    markFeedFailure(feed.name);
    return [];
  }
}

export async function fetchRssFeeds(feedList = sources) {
  const settled = await Promise.allSettled(feedList.map((feed) => fetchFeed(feed)));
  const aggregated = [];
  settled.forEach((result) => {
    if (result.status === "fulfilled") aggregated.push(...result.value);
  });
  return aggregated;
}
