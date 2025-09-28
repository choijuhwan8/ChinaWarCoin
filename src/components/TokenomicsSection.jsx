import React from "react";

const TokenomicsSection = ({ allocations }) => (
  <section id="tokenomics" className="space-y-6">
    <div className="section-title sm:mx-auto sm:max-w-2xl">
      <span>Tokenomics</span>
      <h2>Every coin fuels the campaign</h2>
    </div>
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {allocations.map((item) => (
        <div key={item.title} className="glass-card token-card space-y-3 p-6 text-left">
          <h3>
            {item.title}
            <span className="text-base font-semibold text-[#f9f5ff] opacity-80">{item.percent}</span>
          </h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default TokenomicsSection;
