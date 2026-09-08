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
    <main className="min-h-screen bg-[#EBEDE8] text-[#333F3C]">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="overflow-hidden rounded-[32px] border border-[#073127]/10 bg-white shadow-[0_20px_50px_rgba(7,49,39,0.08)]">
          <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
            <div className="max-w-2xl">
              <span className="mb-5 inline-flex items-center rounded-full border border-[#004838]/20 bg-[#004838]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#073127]">
                About SkillPilot
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#073127] sm:text-4xl lg:text-5xl">
                Build a career roadmap with clarity and confidence.
              </h1>
              <p className="mt-5 text-lg leading-8 text-[#333F3C]">
                SkillPilot helps people explore modern careers, understand what each role demands, and take the next steps with confidence. We make career discovery practical, inspiring, and easy to navigate.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/explore"
                  className="inline-flex items-center justify-center rounded-full bg-[#004838] px-6 py-3 text-sm font-bold text-[#E2FB6C] shadow-sm transition hover:bg-[#073127]"
                >
                  Explore careers
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-[#073127]/20 bg-white px-6 py-3 text-sm font-semibold text-[#073127] transition hover:bg-[#EBEDE8]"
                >
                  Contact us
                </Link>
              </div>
            </div>

            <div className="rounded-[24px] border border-[#073127]/10 bg-[#EBEDE8]/60 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#073127]">Why people use SkillPilot</h2>
              <div className="mt-6 space-y-4">
                {highlights.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-[#073127]/10 bg-white p-4">
                    <h3 className="font-bold text-[#073127]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#333F3C]">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[24px] border border-[#073127]/10 bg-white p-6 shadow-xs">
            <h3 className="text-lg font-bold text-[#073127]">Mission</h3>
            <p className="mt-3 text-sm leading-7 text-[#333F3C]">
              Make career growth more transparent by pairing clear pathways with practical insights.
            </p>
          </div>
          <div className="rounded-[24px] border border-[#073127]/10 bg-white p-6 shadow-xs">
            <h3 className="text-lg font-bold text-[#073127]">Approach</h3>
            <p className="mt-3 text-sm leading-7 text-[#333F3C]">
              Blend curated career content, learning guidance, and modern examples into a simple experience.
            </p>
          </div>
          <div className="rounded-[24px] border border-[#073127]/10 bg-white p-6 shadow-xs">
            <h3 className="text-lg font-bold text-[#073127]">Impact</h3>
            <p className="mt-3 text-sm leading-7 text-[#333F3C]">
              Help learners move from curiosity to action with a better sense of direction and priorities.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
