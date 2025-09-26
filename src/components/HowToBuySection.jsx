import React from "react";

const steps = [
  "Download a Web3 wallet such as MetaMask or Coinbase Wallet.",
  "Fund your wallet with ETH and add the ChinaWarCoin contract address.",
  "Visit your preferred DEX (Uniswap, 1inch, etc.) and connect your wallet.",
  "Paste the contract address, select CWC, and confirm the swap.",
  "Hold for the long campaign or stake once staking missions unlock."
];

const HowToBuySection = () => (
  <section id="how-to-buy" className="space-y-6">
    <div className="section-title sm:mx-auto sm:max-w-2xl">
      <span>How to Buy</span>
      <h2>Secure your CWC position in five steps</h2>
    </div>
    <div className="glass-card p-6 sm:p-8">
      <ol className="list-decimal space-y-3 pl-5 text-base leading-7 text-[#d7dcff]">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowToBuySection;
