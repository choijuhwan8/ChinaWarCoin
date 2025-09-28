import React from "react";

const RoadmapSection = ({ milestones }) => (
  <section id="roadmap" className="space-y-6">
    <div className="section-title sm:mx-auto sm:max-w-2xl">
      <span>Roadmap</span>
      <h2>Strategic operations for the next 12 months</h2>
    </div>
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {milestones.map((phase) => (
        <div key={phase.phase} className="glass-card roadmap-card space-y-3 p-6 text-left">
          <h3>
            {phase.phase}: {phase.title}
          </h3>
          <ul>
            {phase.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default RoadmapSection;
