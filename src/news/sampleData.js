export const SAMPLE_NEWS = [
  {
    id: "sample-pla-drill",
    title: "PLA conducts joint air-sea drills near Taiwan Strait",
    url: "https://example.com/sample/pla-drill",
    source: "Sample Intelligence",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    summary: "Chinese PLA aircraft and vessels carried out a coordinated exercise around the Taiwan Strait, prompting warnings from Taipei.",
    tone: -3.2,
    tags: ["military", "maritime"],
    credibility: "medium",
    language: "en"
  },
  {
    id: "sample-aukus",
    title: "AUKUS ministers explore expansion of Indo-Pacific technology sharing",
    url: "https://example.com/sample/aukus",
    source: "Sample Intelligence",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    summary: "Officials from Australia, the UK, and the US signaled interest in inviting new partners to joint maritime technology projects.",
    tone: 0,
    tags: ["diplomacy", "trade"],
    credibility: "medium",
    language: "en"
  },
  {
    id: "sample-sanctions",
    title: "Philippines weighs new sanctions over South China Sea collisions",
    url: "https://example.com/sample/sanctions",
    source: "Sample Intelligence",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    summary: "Manila is consulting QUAD partners on coordinated sanctions should future incidents escalate around disputed reefs.",
    tone: -1.1,
    tags: ["sanctions", "maritime"],
    credibility: "medium",
    language: "en"
  }
];
