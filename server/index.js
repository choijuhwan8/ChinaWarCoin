import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 4000;
const REQUEST_TIMEOUT = Number(process.env.REQUEST_TIMEOUT_MS || 8000);
const CACHE_TTL = Number(process.env.CACHE_TTL_MS || 5 * 60 * 1000);
const USER_AGENT = process.env.FETCH_USER_AGENT ||
  "ChinaWarCoinNewsBot/1.0 (+https://chinawarcoin.example)";

const app = express();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(",").map((val) => val.trim()).filter(Boolean);
app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : "*"
  })
);

const cache = new Map();

function setCache(key, payload) {
  cache.set(key, {
    payload,
    expiresAt: Date.now() + CACHE_TTL
  });
}

function getCache(key) {
  const entry = cache.get(key);
  if (!entry) return undefined;
  if (entry.expiresAt < Date.now()) {
    cache.delete(key);
    return undefined;
  }
  return entry.payload;
}

async function fetchWithTimeout(resource, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
      headers: {
        "User-Agent": USER_AGENT,
        ...(options.headers || {})
      }
    });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

app.get("/api/news/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/news/rss", async (req, res) => {
  const targetUrl = req.query.url;
  if (typeof targetUrl !== "string" || !/^https?:\/\//i.test(targetUrl)) {
    res.status(400).json({ error: "Missing or invalid url parameter" });
    return;
  }

  const cacheKey = `rss:${targetUrl}`;
  const cached = getCache(cacheKey);
  if (cached) {
    res.set("Content-Type", cached.contentType || "application/rss+xml; charset=utf-8");
    res.send(cached.body);
    return;
  }

  try {
    const upstream = await fetchWithTimeout(targetUrl, {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml"
      }
    });

    if (!upstream.ok) {
      res.status(upstream.status).json({ error: `Upstream error ${upstream.status}` });
      return;
    }

    const body = await upstream.text();
    const contentType = upstream.headers.get("content-type") || "application/rss+xml; charset=utf-8";

    setCache(cacheKey, { body, contentType });

    res.set("Content-Type", contentType);
    res.send(body);
  } catch (error) {
    const status = error.name === "AbortError" ? 504 : 502;
    res.status(status).json({ error: "Failed to fetch RSS feed", details: error.message });
  }
});

app.get("/api/news/gdelt", async (req, res) => {
  const query = req.query.query;
  const sinceDaysRaw = req.query.sinceDays;
  if (typeof query !== "string" || !query.trim()) {
    res.status(400).json({ error: "Missing query parameter" });
    return;
  }
  const sinceDays = Number.parseInt(sinceDaysRaw, 10);
  const safeSinceDays = Number.isFinite(sinceDays) && sinceDays > 0 ? Math.min(sinceDays, 30) : 7;

  const start = new Date(Date.now() - safeSinceDays * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 19)
    .replace(/[-:]/g, "")
    .replace("T", "");

  const params = new URLSearchParams({
    query,
    mode: "artlist",
    maxrecords: "100",
    format: "json",
    TIMESPAN: `${safeSinceDays}d`
  });

  const gdeltUrl = `https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`;
  const cacheKey = `gdelt-doc:${gdeltUrl}`;
  const cached = getCache(cacheKey);
  if (cached) {
    res.set("Content-Type", "application/json");
    res.send(cached.body);
    return;
  }

  try {
    const upstream = await fetchWithTimeout(gdeltUrl, {
      headers: {
        Accept: "application/json"
      }
    });

    if (!upstream.ok) {
      res.status(upstream.status).json({ error: `Upstream error ${upstream.status}` });
      return;
    }

    const body = await upstream.text();
    setCache(cacheKey, { body, contentType: "application/json" });

    res.set("Content-Type", "application/json");
    res.send(body);
  } catch (error) {
    const status = error.name === "AbortError" ? 504 : 502;
    res.status(status).json({ error: "Failed to fetch GDELT data", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`News proxy server listening on port ${PORT}`);
});
