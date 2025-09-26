import { buildTags, getCredibility, dedupeItems, extractDomain, hashId } from "./utils";

export function normalizeItem(raw) {
  const title = raw.title || "";
  const url = raw.url || "";
  if (!title || !url) return null;
  const publishedAt = raw.publishedAt ? new Date(raw.publishedAt).toISOString() : new Date().toISOString();
  const sourceDomain = raw.source || extractDomain(url);
  const tags = raw.tags && raw.tags.length ? raw.tags : buildTags(title);
  const credibility = raw.credibility || getCredibility(sourceDomain || "");
  const id = raw.id || hashId(title, url);
  const language = (raw.language || raw.lang || raw.sourcelang || "unknown").toLowerCase();
  return {
    id,
    title,
    url,
    source: sourceDomain,
    publishedAt,
    summary: raw.summary,
    tone: raw.tone,
    tags,
    credibility,
    language
  };
}

export function normalizeItems(items) {
  const normalized = items
    .map((item) => normalizeItem(item))
    .filter(Boolean);
  return dedupeItems(normalized);
}
