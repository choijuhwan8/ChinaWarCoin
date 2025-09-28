import React from "react";
import Hero from "./components/Hero.jsx";
import HowToBuySection from "./components/HowToBuySection.jsx";
// import StatsSection from "./components/StatsSection.jsx";
// import FaqSection from "./components/FaqSection.jsx";
import NewsSection from "./components/news/NewsSection.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
// import { stats, faqs } from "./data.js";
import heroFlagGif from "./assets/original-49ea5ac6b4e493eb3f2d25e2bdacaba6.gif";
import heroLogo from "./assets/Gemini_Generated_Image_jwoxfxjwoxfxjwox.png";

const ChinaWarCoinApp = () => (
  <div className="min-h-screen bg-background px-5 pb-16 pt-8 text-[#f2f4ff] sm:pt-12">
    <div className="mx-auto flex max-w-[1160px] flex-col gap-24">
      <Hero heroGif={heroFlagGif} logoSrc={heroLogo} />
      {/* <StatsSection stats={stats} /> */}
      <NewsSection />
      <HowToBuySection />
      {/* <FaqSection items={faqs} /> */}
      <SiteFooter />
    </div>
  </div>
);

export default ChinaWarCoinApp;
