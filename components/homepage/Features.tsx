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
    <section className="relative bg-[#EBEDE8] py-24 sm:py-28" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-5 inline-flex items-center rounded-full border border-[#004838]/20 bg-[#004838]/10 px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#073127]">
            Core Platform
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#073127] sm:text-4xl">Everything you need to advance</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#333F3C]">
            SkillPilot combines advanced AI with proven career development frameworks to provide a complete toolkit for your professional growth.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group flex h-full flex-col rounded-3xl border border-[#073127]/10 bg-white p-6 shadow-[0_8px_30px_rgba(7,49,39,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#004838]/30 hover:shadow-[0_12px_40px_rgba(7,49,39,0.1)]"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#004838] text-[#E2FB6C] shadow-sm border border-[#E2FB6C]/20 transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#073127] transition-colors group-hover:text-[#004838]">
                {feature.title}
              </h3>
              <p className="flex-grow leading-relaxed text-[#333F3C]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
