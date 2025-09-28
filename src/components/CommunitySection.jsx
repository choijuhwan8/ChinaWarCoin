import React from "react";

const CommunitySection = ({ links }) => (
  <section id="community" className="space-y-6">
    <div className="section-title sm:mx-auto sm:max-w-2xl">
      <span>Community</span>
      <h2>Your invite to the ChinaWarCoin alliance</h2>
    </div>
    <div className="glass-card grid gap-4 p-6 text-center sm:p-8">
      <p className="text-base leading-7 text-[#d7dcff]">
        Get briefed in real time, brainstorm meme warfare, and vote on upcoming deployments with thousands of supporters. Every new recruit makes the movement stronger.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            className="rounded-full border border-[rgba(148,163,255,0.35)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.5px] text-[#cbd5ff] transition duration-200 ease-out hover:border-[rgba(129,140,248,0.65)] hover:text-white"
            href={link.href}
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default CommunitySection;
