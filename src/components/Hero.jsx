import React from "react";

const Hero = ({ flagSrc, heroGif }) => (
  <header
    id="top"
    className="grid gap-6 text-center sm:grid-cols-[1fr_minmax(0,640px)_1fr] sm:gap-8"
  >
    <div className="inline-flex items-center justify-center gap-2 rounded-full bg-[rgba(79,70,229,0.15)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.6px] text-[#a5b4fc] sm:col-start-2 sm:col-end-3 sm:justify-self-center">
      {flagSrc && (
        <img
          className="h-auto w-8 rounded-sm shadow-badge"
          src={flagSrc}
          alt="China flag"
          width={32}
          height={22}
        />
      )}
      <span>Keyboard Commando Corps</span>
    </div>
    <div className="flex flex-wrap items-center justify-center gap-5 sm:col-start-2 sm:col-end-3">
      {heroGif && (
        <img
          className="block w-[clamp(140px,_24vw,_200px)] object-cover "
          src={heroGif}
          alt="Animated China flag"
        />
      )}
      <h1 className="m-0 text-[clamp(48px,_8vw,_72px)] font-extrabold text-[#f9fafc]">
        ChinaWarCoin
      </h1>
    </div>
    <p className="mx-auto max-w-2xl text-lg leading-7 text-[#d1d5f9] sm:col-start-2 sm:col-end-3">
      The community-coordinated memecoin uniting global brigades under iconic
      China-war memes, powered by transparent tokenomics, unstoppable hype, and
      relentless expansion.{" "}
    </p>
    <div className="flex flex-wrap justify-center gap-4 sm:col-start-2 sm:col-end-3">
      <a
        className="rounded-full bg-gradient-to-tr from-primary to-secondary px-7 py-3 font-semibold tracking-[0.5px] text-white shadow-cta transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-cta-hover"
        href="#how-to-buy"
      >
        Buy on DEX
      </a>
      <a
        className="rounded-full border border-[rgba(148,163,255,0.35)] bg-[rgba(79,70,229,0.1)] px-7 py-3 font-semibold tracking-[0.5px] text-[#c7d2fe] transition duration-200 ease-out hover:-translate-y-0.5 hover:border-[rgba(129,140,248,0.65)]"
        href="#roadmap"
      >
        View Roadmap
      </a>
    </div>
  </header>
);

export default Hero;
