import { describe, expect, it } from "vitest";
import { rankItems } from "../rank";

const now = new Date();

const items = [
  {
    id: "1",
    title: "Missile test in South China Sea",
    url: "https://example.com/1",
    source: "reuters.com",
    publishedAt: new Date(now.getTime() - 60 * 60 * 1000).toISOString(),
    credibility: "high",
    tone: -3,
    tags: ["military"]
  },
  {
    id: "2",
    title: "Diplomatic talks continue",
    url: "https://example.com/2",
    source: "randomblog.com",
    publishedAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
    credibility: "unknown",
    tone: 1,
    tags: ["diplomacy"]
  }
];

describe("rankItems", () => {
  it("prioritises hard-hitting recent items with high credibility", () => {
    const [first] = rankItems(items);
    expect(first.id).toBe("1");
  });
});
