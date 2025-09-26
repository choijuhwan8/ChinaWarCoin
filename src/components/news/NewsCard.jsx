import React from "react";
import SourceBadge from "./SourceBadge.jsx";
import ToneBadge from "./ToneBadge.jsx";
import TagChip from "./TagChip.jsx";
import { extractDomain } from "../../news/utils";

function Favicon({ url }) {
  if (!url) return null;
  const domain = extractDomain(url);
  const faviconUrl = domain ? `https://www.google.com/s2/favicons?sz=64&domain=${domain}` : null;
  if (!faviconUrl) return null;
  return <img src={faviconUrl} alt="" className="h-5 w-5 rounded" loading="lazy" />;
}

export default function NewsCard({ item }) {
  return (
    <article className="glass-card flex h-full flex-col gap-4 p-6">
      <div className="flex items-start justify-between gap-3">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex-1 space-y-2"
        >
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Favicon url={item.url} />
            <span>{extractDomain(item.url)}</span>
          </div>
          <time dateTime={item.publishedAt} className="block text-xs text-white/50">
            {new Date(item.publishedAt).toLocaleString()}
          </time>
          <h3 className="text-lg font-semibold leading-snug text-white transition-colors duration-150 group-hover:text-secondary">
            {item.title}
          </h3>
          {item.summary && (
            <p className="text-sm text-white/60 line-clamp-3">{item.summary}</p>
          )}
        </a>
        <ToneBadge tone={item.tone} />
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-2">
        <SourceBadge source={item.source} credibility={item.credibility} />
        {item.tags.map((tag) => (
          <TagChip key={tag} label={tag} />
        ))}
      </div>
    </article>
  );
}
