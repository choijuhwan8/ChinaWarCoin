import React from "react";

const FaqSection = ({ items }) => (
  <section id="faq" className="space-y-6">
    <div className="section-title sm:mx-auto sm:max-w-2xl">
      <span>FAQ</span>
      <h2>Intel for new recruits</h2>
    </div>
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((item) => (
        <div key={item.question} className="glass-card faq-card space-y-3 p-6 text-left">
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FaqSection;
