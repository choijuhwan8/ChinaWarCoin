import React from "react";

const Hero = ({ heroGif, logoSrc }) => (
  <header
    id="top"
    className="grid gap-6 text-center sm:grid-cols-[1fr_minmax(0,640px)_1fr] sm:gap-8"
  >
    <div className="flex flex-wrap items-center justify-center gap-6 sm:col-start-2 sm:col-end-3">
      {(heroGif || logoSrc) && (
        <div className="flex items-center justify-center gap-4">
          {heroGif && (
            <img
              className="block w-[clamp(120px,_18vw,_180px)] object-cover"
              src={heroGif}
              alt="Animated China flag"
            />
          )}
          {logoSrc && (
            <img
              className="block w-[clamp(120px,_18vw,_180px)] object-contain drop-shadow-lg"
              src={logoSrc}
              alt="ChinaWarCoin dragon emblem"
            />
          )}
        </div>
      )}
      <h1 className="m-0 text-[clamp(48px,_8vw,_72px)] font-extrabold text-[#f9fafc]">
        ChinaWarCoin
      </h1>
    </div>
    <p className="mx-auto max-w-2xl text-lg leading-7 text-[#d1d5f9] sm:col-start-2 sm:col-end-3">
      The community-coordinated memecoin uniting global brigades under iconic
      China-war memes, powered by unstoppable hype and relentless expansion.
    </p>
    <div className="inline-flex items-center justify-center gap-2 sm:col-start-2 sm:col-end-3 sm:justify-self-center">
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="solanaGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#14f195" />
            <stop offset="50%" stopColor="#6d4bff" />
            <stop offset="100%" stopColor="#9945ff" />
          </linearGradient>
        </defs>
        <rect x="3" y="5" width="18" height="3" rx="1.2" fill="url(#solanaGradient)" />
        <rect x="3" y="10.5" width="18" height="3" rx="1.2" fill="url(#solanaGradient)" />
        <rect x="3" y="16" width="18" height="3" rx="1.2" fill="url(#solanaGradient)" />
      </svg>
      <span className="text-sm font-semibold uppercase tracking-[0.5px] text-[#c7d2fe]">
        Built on Solana
      </span>
    </div>
    <div className="flex flex-wrap justify-center gap-4 sm:col-start-2 sm:col-end-3">
      <a
        className="rounded-full bg-gradient-to-tr from-primary to-secondary px-7 py-3 font-semibold tracking-[0.5px] text-white shadow-cta transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-cta-hover"
        href="https://pump.fun/coin/FrL3D3dZDgsgyDjikjk5WhxXNmVVJCQeSCz77g57pump"
        target="_blank"
        rel="noopener noreferrer"
      >
        Buy on DEX
      </a>
      <a
        className="rounded-full border border-[rgba(148,163,255,0.35)] bg-[rgba(79,70,229,0.1)] px-7 py-3 font-semibold tracking-[0.5px] text-[#c7d2fe] transition duration-200 ease-out hover:-translate-y-0.5 hover:border-[rgba(129,140,248,0.65)]"
        href="https://x.com/chinesewarcoin?s=21&t=k7PJBt8BQCpZN-9DYgPmyg"
        target="_blank"
        rel="noopener noreferrer"
      >
        Join the Community
      </a>
    </div>
  </header>
);

export default Hero;
