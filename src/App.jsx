import React from "react";
import Hero from "./components/Hero.jsx";
import StatsSection from "./components/StatsSection.jsx";
import TokenomicsSection from "./components/TokenomicsSection.jsx";
import RoadmapSection from "./components/RoadmapSection.jsx";
import CommunitySection from "./components/CommunitySection.jsx";
import HowToBuySection from "./components/HowToBuySection.jsx";
import FaqSection from "./components/FaqSection.jsx";
import NewsSection from "./components/news/NewsSection.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import { stats, tokenomics, roadmap, faqs, socialLinks } from "./data.js";
import chinaFlag from "./assets/china-flag.svg";
import heroFlagGif from "./assets/original-49ea5ac6b4e493eb3f2d25e2bdacaba6.gif";

const ChinaWarCoinApp = () => (
  <div className="min-h-screen bg-background px-5 pb-16 pt-8 text-[#f2f4ff] sm:pt-12">
    <div className="mx-auto flex max-w-[1160px] flex-col gap-24">
      <Hero flagSrc={chinaFlag} heroGif={heroFlagGif} />
      <StatsSection stats={stats} />
      <TokenomicsSection allocations={tokenomics} />
      <NewsSection />
      <RoadmapSection milestones={roadmap} />
      <CommunitySection links={socialLinks} />
      <HowToBuySection />
      <FaqSection items={faqs} />
      <SiteFooter />
    </div>
  </div>
);

export default ChinaWarCoinApp;
