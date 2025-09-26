import stringSimilarity from "string-similarity";
import { TOPIC_TAGS, HARD_KEYWORDS } from "./keywords";

export function parseGdeltDate(value) {
  if (!value) return new Date().toISOString();
  const match = /^\d{14}$/.test(value) ? value : null;
  if (!match) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
    return new Date().toISOString();
  }
  const year = value.slice(0, 4);
  const month = value.slice(4, 6);
  const day = value.slice(6, 8);
  const hour = value.slice(8, 10);
  const minute = value.slice(10, 12);
  const second = value.slice(12, 14);
  const iso = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
  return new Date(iso).toISOString();
}

export function hashId(title, url) {
  const str = `${title}::${url}`;
  let hash = 0n;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5n) - hash + BigInt(str.charCodeAt(i));
    hash &= 0xffffffffffffffffn;
  }
  return hash.toString(16);
}

export function extractDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch (err) {
    return "";
  }
}

export function buildTags(title) {
  const lower = title.toLowerCase();
  return Object.entries(TOPIC_TAGS)
    .filter(([, keywords]) => keywords.some((kw) => lower.includes(kw.toLowerCase())))
    .map(([tag]) => tag);
}

export function getCredibility(source) {
  const highSources = [
    "reuters.com",
    "apnews.com",
    "nikkei.com",
    "asia.nikkei.com",
    "gov.cn",
    "mnd.gov.tw",
    "mod.gov.cn",
    "asean.org",
    "un.org"
  ];
  const mediumSources = [
    "scmp.com",
    "straitstimes.com",
    "japantimes.co.jp",
    "kyodonews.net",
    "channelnewsasia.com"
  ];
  const normalized = source.toLowerCase();
  if (highSources.some((s) => normalized.includes(s))) return "high";
  if (mediumSources.some((s) => normalized.includes(s))) return "medium";
  return "unknown";
}

export function toneLabel(tone) {
  if (typeof tone !== "number") return "neutral";
  if (tone > 2) return "positive";
  if (tone < -2) return "negative";
  return "neutral";
}

export function isHardHit(title) {
  const lower = title.toLowerCase();
  return HARD_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

export function dedupeItems(items) {
  const seen = new Map();
  const results = [];
  items.forEach((item) => {
    const domain = extractDomain(item.url || "");
    const key = `${item.title}-${domain}`.toLowerCase();
    if (!seen.has(key)) {
      seen.set(key, item);
      results.push(item);
      return;
    }
    const existing = seen.get(key);
    const similarity = stringSimilarity.compareTwoStrings(item.title, existing.title);
    if (similarity > 0.92) {
      const best = existing.publishedAt > item.publishedAt ? existing : item;
      seen.set(key, best);
      const index = results.indexOf(existing);
      if (index !== -1) results[index] = best;
    } else {
      const withDomainKey = `${domain}-${item.title}`;
      if (!seen.has(withDomainKey)) {
        seen.set(withDomainKey, item);
        results.push(item);
      }
    }
  });
  return results;
}
export function applyFilters(items, query) {
  const { q, language, refreshToken } = query;
  let filtered = [...items];
  if (q) {
    const needle = q.toLowerCase();
    filtered = filtered.filter(
      (item) => item.title.toLowerCase().includes(needle) || (item.summary && item.summary.toLowerCase().includes(needle))
    );
  }
  if (language === "en") {
    filtered = filtered.filter((item) => (item.language || "").startsWith("en"));
  } else if (language === "non-en") {
    filtered = filtered.filter((item) => item.language && !item.language.startsWith("en"));
  }
  return filtered;
}
