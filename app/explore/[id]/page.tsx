import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import type { Career, DifficultyLevel } from "@/types/career";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const difficultyConfig: Record<DifficultyLevel, { color: string; dot: string }> = {
  Beginner: { color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", dot: "bg-emerald-400" },
  Intermediate: { color: "bg-blue-500/15 text-blue-400 border-blue-500/30", dot: "bg-blue-400" },
  Advanced: { color: "bg-amber-500/15 text-amber-400 border-amber-500/30", dot: "bg-amber-400" },
  Expert: { color: "bg-rose-500/15 text-rose-400 border-rose-500/30", dot: "bg-rose-400" },
};

function normalizeCareer(item: Partial<Career> & Record<string, unknown>): Career {
  const difficulty = item.difficulty as DifficultyLevel | undefined;
  const safeDifficulty = difficulty && ["Beginner", "Intermediate", "Advanced", "Expert"].includes(difficulty)
    ? difficulty
    : "Beginner";

  return {
    id: String(item.id ?? ""),
    title: String(item.title ?? "Untitled career"),
    description: String(item.description ?? "A career path with flexible learning options."),
    difficulty: safeDifficulty,
    category: String(item.category ?? "General"),
    skills: Array.isArray(item.skills) ? item.skills.map((skill) => String(skill)) : [],
    avgSalary: String(item.avgSalary ?? "$0/yr"),
    timeToLearn: String(item.timeToLearn ?? "Flexible"),
    coverImage: String(item.coverImage ?? "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&h=800&fit=crop&auto=format&q=80"),
    icon: typeof item.icon === "string" ? item.icon : undefined,
  };
}

async function getCareersFromApi(): Promise<Career[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/careers`, { cache: "no-store" });
    if (!response.ok) return [];

    const payload = await response.json();
    return Array.isArray(payload) ? payload.map(normalizeCareer) : [];
  } catch {
    return [];
  }
}

async function getCareerById(id: string): Promise<Career | null> {
  const careers = await getCareersFromApi();
  return careers.find((career) => career.id === id) ?? null;
}

function getSkillProficiency(skill: string, index: number, difficulty: DifficultyLevel) {
  const skillWeight = index + 1;
  const baseLevel = difficulty === "Expert" || difficulty === "Advanced" ? "Practical" : "Foundational";

  if (skillWeight <= 2) return `${baseLevel} knowledge`;
  if (skillWeight <= 4) return "Applied practice";
  return "Advanced fluency";
}

function getLearningPhases(difficulty: DifficultyLevel) {
  const base = [
    { title: "Foundation", description: "Learn the core concepts and toolchain" },
    { title: "Hands-on Practice", description: "Build small projects and solve real problems" },
    { title: "Portfolio Building", description: "Create polished work to showcase your growth" },
  ];

  if (difficulty === "Advanced" || difficulty === "Expert") {
    base.push({ title: "Specialization", description: "Go deeper into production-ready systems and scaling" });
  }

  return base;
}

function getProjectSuggestions(career: Career) {
  const baseIdeas = [
    `Build a polished portfolio project around ${career.title.toLowerCase()}`,
    `Create a mini product using ${career.skills.slice(0, 2).join(" and ")}`,
    `Contribute to an open-source project in the ${career.category.toLowerCase()} space`,
  ];

  return [
    ...baseIdeas,
    `Document and ship a case study that demonstrates your ${career.skills[0] ?? "core"} workflow`,
  ];
}

function getResources(career: Career) {
  const category = career.category.toLowerCase();

  if (category.includes("design")) {
    return [
      { title: "UX Design Foundations", type: "Course" },
      { title: "Refactoring UI", type: "Book" },
      { title: "Figma Docs", type: "Docs" },
    ];
  }

  if (category.includes("data") || category.includes("ai")) {
    return [
      { title: "Machine Learning Specialization", type: "Course" },
      { title: "Hands-On Machine Learning", type: "Book" },
      { title: "Scikit-learn Docs", type: "Docs" },
    ];
  }

  if (category.includes("cyber")) {
    return [
      { title: "Security Engineering Essentials", type: "Course" },
      { title: "The Web Application Hacker's Handbook", type: "Book" },
      { title: "OWASP Cheat Sheets", type: "Docs" },
    ];
  }

  return [
    { title: `${career.title} learning roadmap`, type: "Course" },
    { title: `Practical ${career.title}`, type: "Book" },
    { title: `${career.title} documentation`, type: "Docs" },
  ];
}

function getRelatedCareers(currentCareer: Career, careers: Career[]) {
  return careers.filter((career) => career.id !== currentCareer.id).slice(0, 4);
}

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const career = await getCareerById(id);

  if (!career) {
    return { title: "Career not found | SkillPilot" };
  }

  return {
    title: `${career.title} | SkillPilot`,
    description: career.description,
  };
}

export default async function CareerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const career = await getCareerById(id);

  if (!career) notFound();

  const careers = await getCareersFromApi();
  const diff = difficultyConfig[career.difficulty];
  const skillProfile = career.skills.map((skill, index) => ({
    skill,
    proficiency: getSkillProficiency(skill, index, career.difficulty),
  }));
  const learningPhases = getLearningPhases(career.difficulty);
  const projects = getProjectSuggestions(career);
  const resources = getResources(career);
  const relatedCareers = getRelatedCareers(career, careers);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <header className="mt-20 overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/80 shadow-[0_20px_60px_rgba(15,23,42,0.4)]">
            <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
              <div className="max-w-3xl">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-sm font-semibold text-indigo-300">
                    {career.category}
                  </span>
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold ${diff.color}`}>
                    <span className={`h-2 w-2 rounded-full ${diff.dot}`} />
                    {career.difficulty}
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/15 text-3xl sm:h-16 sm:w-16">
                    {career.icon ?? "💼"}
                  </div>
                  <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                      {career.title}
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                      {career.description}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                      <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1.5">
                        {career.timeToLearn}
                      </span>
                      <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1.5">
                        {career.avgSalary}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col gap-4 lg:w-[320px] lg:shrink-0">
                <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-slate-950/70">
                  <img
                    src={career.coverImage}
                    alt={career.title}
                    className="h-52 w-full object-cover sm:h-56 lg:h-64"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
                </div>

                <Link
                  href="/explore"
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                  Start Roadmap
                </Link>
              </div>
            </div>
          </header>

          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[#111827] p-6 sm:p-8">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-4 leading-relaxed text-slate-400">{career.description}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                  <p className="text-sm font-semibold text-indigo-300">Duration</p>
                  <p className="mt-1 text-slate-400">{career.timeToLearn}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                  <p className="text-sm font-semibold text-indigo-300">Expected Pay</p>
                  <p className="mt-1 text-slate-400">{career.avgSalary}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                  <p className="text-sm font-semibold text-indigo-300">Focus Area</p>
                  <p className="mt-1 text-slate-400">{career.category}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                  <p className="text-sm font-semibold text-indigo-300">Best For</p>
                  <p className="mt-1 text-slate-400">Builders who enjoy practical problem solving</p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-slate-900/80 p-6 sm:p-8">
              <h2 className="text-xl font-semibold">Required Skills</h2>
              <div className="mt-5 space-y-3">
                {skillProfile.map(({ skill, proficiency }) => (
                  <div key={skill} className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium">{skill}</span>
                      <span className="text-sm text-indigo-300">{proficiency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[#111827] p-6 sm:p-8">
            <h2 className="text-xl font-semibold">Learning Path</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {learningPhases.map((phase, index) => (
                <div key={phase.title} className="rounded-2xl border border-white/10 bg-slate-950/80 p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/15 text-sm font-semibold text-indigo-300">
                    0{index + 1}
                  </div>
                  <h3 className="font-semibold">{phase.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{phase.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[24px] border border-white/10 bg-slate-900/80 p-6 sm:p-8">
              <h2 className="text-xl font-semibold">Projects</h2>
              <div className="mt-5 space-y-3">
                {projects.map((project) => (
                  <div key={project} className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-slate-400">
                    {project}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-slate-900/80 p-6 sm:p-8">
              <h2 className="text-xl font-semibold">Resources</h2>
              <div className="mt-5 space-y-3">
                {resources.map((resource) => (
                  <div key={resource.title} className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium">{resource.title}</span>
                      <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-300">
                        {resource.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[24px] border border-white/10 bg-slate-900/80 p-6 sm:p-8">
            <h2 className="text-xl font-semibold">Related Careers</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {relatedCareers.map((relatedCareer) => (
                <Link
                  key={relatedCareer.id}
                  href={`/careers/${relatedCareer.id}`}
                  className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 transition hover:border-indigo-400/40 hover:bg-slate-900"
                >
                  <p className="text-sm font-semibold text-indigo-300">{relatedCareer.category}</p>
                  <h3 className="mt-2 font-semibold">{relatedCareer.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{relatedCareer.timeToLearn}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[24px] border border-indigo-400/20 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 p-6 text-center sm:p-8">
            <h2 className="text-2xl font-semibold">Ready to turn this path into a roadmap?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              Build a personalized learning plan and track your progress from day one.
            </p>
            <Link
              href="/explore"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Start Roadmap
            </Link>
          </section>
        </div>
      </section>
    </main>
  );
}
