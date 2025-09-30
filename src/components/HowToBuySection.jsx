import React from "react";

const steps = [
  "Download a Solana wallet such as Phantom or Solflare (mobile or browser extension).",
  "Fund your wallet with SOL (buy from an exchange like Coinbase or Binance, then send to your wallet).",
  "Visit the official token page on Pump.fun: 👉 https://pump.fun/coin/FrL3D3dZDgsgyDjikjk5WhxXNmVVJCQeSCz77g57pump",
  "Connect your wallet and click Buy to swap SOL for CWC.",
  "Hold for the memes — or join the community to help it pump to the moon 🚀"
];

const HowToBuySection = () => (
  <section id="how-to-buy" className="space-y-6">
    <div className="section-title sm:mx-auto sm:max-w-2xl">
      <span>HOW TO BUY</span>
      <h2>Secure your ChinaWarCoin position in five steps</h2>
    </div>
    <div className="glass-card p-6 sm:p-8">
      <ol className="list-decimal space-y-3 break-all sm:break-normal pl-5 text-base leading-7 text-[#d7dcff]">
        {steps.map((step) => (
          <li key={step}><span className="break-all sm:break-normal">{step}</span></li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowToBuySection;
