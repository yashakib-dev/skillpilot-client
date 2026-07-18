import Link from "next/link";

const highlights = [
  {
    title: "Guided learning",
    description: "Turn career exploration into a structured path with practical milestones and recommendations.",
  },
  {
    title: "Real-world focus",
    description: "Learn what modern teams expect, from core skills to industry-specific tools and salary expectations.",
  },
  {
    title: "Personalized growth",
    description: "Discover careers that fit your interests, experience level, and long-term ambitions.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 shadow-[0_20px_60px_rgba(15,23,42,0.4)]">
          <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
            <div className="max-w-2xl">
              <span className="mb-5 inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
                About SkillPilot
              </span>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Build a career roadmap with clarity and confidence.
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-400">
                SkillPilot helps people explore modern careers, understand what each role demands, and take the next steps with confidence. We make career discovery practical, inspiring, and easy to navigate.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/explore"
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                  Explore careers
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-indigo-400/40 hover:text-white"
                >
                  Contact us
                </Link>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white">Why people use SkillPilot</h2>
              <div className="mt-6 space-y-4">
                {highlights.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <h3 className="font-semibold text-slate-100">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[24px] border border-white/10 bg-slate-900/80 p-6">
            <h3 className="text-lg font-semibold text-white">Mission</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Make career growth more transparent by pairing clear pathways with practical insights.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-slate-900/80 p-6">
            <h3 className="text-lg font-semibold text-white">Approach</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Blend curated career content, learning guidance, and modern examples into a simple experience.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-slate-900/80 p-6">
            <h3 className="text-lg font-semibold text-white">Impact</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Help learners move from curiosity to action with a better sense of direction and priorities.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
