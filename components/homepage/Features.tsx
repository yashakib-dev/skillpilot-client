import React from "react";

const features = [
  {
    title: "AI Career Roadmaps",
    description: "Generate customized, step-by-step learning paths tailored to your current skills, goals, and timeline.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    color: "from-indigo-500 to-blue-500"
  },
  {
    title: "Smart Skill Matching",
    description: "Discover the exact technical and soft skills required for your target role, with continuous market updates.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Progress Tracking",
    description: "Visualize your journey with interactive timelines. Mark milestones and watch your career goals become reality.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "AI Mentor Chat",
    description: "Stuck on a concept? Need interview advice? Your personal AI career mentor is available 24/7.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    color: "from-orange-500 to-amber-500"
  }
];

export default function Features() {
  return (
    <section className="relative bg-slate-900/70 py-24 sm:py-28" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-5 inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
            Core Platform
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">Everything you need to advance</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            SkillPilot combines advanced AI with proven career development frameworks to provide a complete toolkit for your professional growth.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.4)] transition-transform duration-300 hover:-translate-y-1 hover:border-indigo-400/40"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>

                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-100 transition-colors group-hover:text-indigo-400">
                {feature.title}
              </h3>
              <p className="flex-grow leading-relaxed text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
