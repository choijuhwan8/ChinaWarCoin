import { DEFAULT_GDELT_QUERY } from "./keywords";
import { parseGdeltDate, hashId, extractDomain, buildTags, getCredibility } from "./utils";
import { fetchWithRetry, schedule } from "./fetchHelpers";
import { API_BASE_URL } from "./config";

const API_BASE = API_BASE_URL || "";

function coerceTone(value) {
  if (value === null || value === undefined || value === "") return undefined;
  const num = Number.parseFloat(value);
  return Number.isNaN(num) ? undefined : Number(num.toFixed(2));
}

export async function fetchGdelt({ query = DEFAULT_GDELT_QUERY, sinceDays = 7 }) {
  const endpoint = `${API_BASE}/api/news/gdelt?query=${encodeURIComponent(query)}&sinceDays=${sinceDays}`;

  try {
    const response = await schedule(() =>
      fetchWithRetry(endpoint, {
        headers: {
          Accept: "application/json"
        }
      })
    );

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const payload = await response.json();
    const rows = payload?.articles || [];

    return rows
      .map((row) => {
        const title = row.title || row.searchexcerpt || "";
        const link = row.url || row.weburl;
        if (!title || !link) return null;
        const domain = row.domain || extractDomain(link);
        const publishedAt = row.publishdate ? parseGdeltDate(row.publishdate) : new Date().toISOString();
        const summary = row.searchexcerpt || row.snippet || row.excerpt || undefined;
        const language = row.language || row.lang || row.sourcelang || "unknown";
        const tags = buildTags(title);
        const tone = coerceTone(row.tone);

        return {
          id: hashId(title, link),
          title,
          url: link,
          source: domain,
          publishedAt,
          summary,
          tone,
          tags,
          credibility: getCredibility(domain),
          language: language.toLowerCase()
        };
      })
      .filter(Boolean);
  } catch (error) {
    console.warn("Failed to fetch GDELT data", error);
    return [];
  }
}
