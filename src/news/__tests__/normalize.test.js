import { describe, expect, it } from "vitest";
import { normalizeItems } from "../normalize";

const sample = [
  {
    title: "PLA conducts drills near Taiwan Strait",
    url: "https://example.com/a",
    source: "Example",
    publishedAt: "2024-05-01T00:00:00Z"
  },
  {
    title: "PLA conducts drills near Taiwan Strait",
    url: "https://example.com/a",
    source: "Example",
    publishedAt: "2024-05-01T01:00:00Z"
  },
  {
    title: "AUKUS partners announce new maritime drill",
    url: "https://example.com/b",
    source: "Example",
    publishedAt: "2024-05-02T00:00:00Z"
  }
];

describe("normalizeItems", () => {
  it("deduplicates near-identical headlines", () => {
    const result = normalizeItems(sample);
    const uniqueIds = new Set(result.map((item) => item.id));
    expect(result.length).toBe(2);
    expect(uniqueIds.size).toBe(2);
  });

  it("assigns tags and credibility", () => {
    const [first] = normalizeItems(sample);
    expect(first.tags.length).toBeGreaterThan(0);
    expect(["high", "medium", "unknown"]).toContain(first.credibility);
  });
});
