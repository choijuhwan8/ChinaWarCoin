# ChinaWarCoin

A web application designed to promote ChinaWarCoin and monitor China’s geopolitical conflict developments.

## Prerequisites

- Node.js 18+ (ships with global `fetch`, required by the backend proxy)

## Installation

```bash
npm install
```

## Local development

The news section now relies on a lightweight Express backend that proxies RSS feeds and the GDELT DOC API. Start it alongside Vite:

```bash
# Terminal 1 – backend
npm run start:backend

# Terminal 2 – frontend
npm run dev
```

Or start both together with:

```bash
npm run dev:full
```

By default the backend listens on `http://localhost:4000`. Point the frontend at it via `.env`:

```
cp .env.example .env
# adjust VITE_NEWS_API_BASE if you run the proxy elsewhere
```

## Backend proxy

The Express server lives in `server/index.js` and exposes:

- `GET /api/news/rss?url=<rss url>` – fetches and caches RSS content server-side
- `GET /api/news/gdelt?query=<query>&sinceDays=<days>` – fetches JSON from the GDELT DOC API (article list mode)

Simple in-memory caching keeps upstream calls from being hammered; tune via `CACHE_TTL_MS` or `REQUEST_TIMEOUT_MS` environment variables if needed.

## Production notes

For deployment host the Express proxy (or equivalent) behind your frontend and set `VITE_NEWS_API_BASE` to its public URL. The frontend will automatically fall back to bundled sample headlines if the proxy is unreachable.

## Testing

```bash
npm test
```
