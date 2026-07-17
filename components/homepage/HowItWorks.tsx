import React from "react";

const steps = [
  {
    number: "01",
    title: "Define Your Goal",
    description: "Tell us your target career, current experience level, and how much time you can dedicate each week."
  },
  {
    number: "02",
    title: "AI Generates Path",
    description: "Our Gemini-powered engine creates a customized, phased learning roadmap specifically for you."
  },
  {
    number: "03",
    title: "Learn & Track",
    description: "Follow your tailored timeline, check off skills as you learn them, and monitor your overall progress."
  },
  {
    number: "04",
    title: "Get AI Mentorship",
    description: "Chat with your AI mentor anytime for personalized advice, project ideas, and interview preparation."
  }
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-28" id="how-it-works">
      <div className="absolute left-0 top-1/2 hidden h-[1px] w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent lg:block" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="mb-5 inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
              The Process
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">How SkillPilot Works</h2>
            <p className="mt-4 text-lg text-slate-400">
              From absolute beginner to job-ready professional in four simple steps. We take the complexity out of career planning.
            </p>
          </div>
        </div>

        <div className="relative grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Connector line for mobile/tablet */}
              {idx !== steps.length - 1 && (
                <div className="absolute left-[3rem] top-8 z-0 block h-[2px] w-[calc(100%-2rem)] bg-white/10 lg:hidden" />
              )}

              <div className="relative z-10 h-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40">
                <span className="pointer-events-none absolute -bottom-4 -right-4 select-none text-8xl font-black text-white/[0.03] transition-colors duration-500 group-hover:text-indigo-400/25">
                  {step.number}
                </span>

                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-slate-800/80 shadow-lg transition-all duration-300 group-hover:border-indigo-400/40 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                  <span className="text-xl font-bold text-indigo-300">{step.number}</span>
                </div>

                <h3 className="mb-4 text-xl font-bold text-slate-100">
                  {step.title}
                </h3>

                <p className="relative z-10 leading-relaxed text-slate-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
