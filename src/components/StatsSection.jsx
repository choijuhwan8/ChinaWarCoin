import React from "react";

const StatsSection = ({ stats }) => (
  <section id="stats" className="space-y-6">
    <div className="section-title sm:mx-auto sm:max-w-2xl">
      <span>Mission Stats</span>
      <h2>Built for durability and rapid scaling</h2>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="glass-card p-6 text-left">
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default StatsSection;
