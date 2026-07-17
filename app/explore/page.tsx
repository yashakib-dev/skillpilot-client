"use client";

import { useEffect, useMemo, useState } from "react";
import CareerGrid from "@/components/homepage/CareerGrid";
import type { Career, DifficultyLevel } from "@/types/career";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const CATEGORIES = [
  "All",
  "Software Engineering",
  "Data Science & AI",
  "Design & UX/UI",
  "Product Management",
  "Cybersecurity",
  "Digital Marketing",
];

const DIFFICULTIES: ("All" | DifficultyLevel)[] = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "title-asc", label: "Title: A → Z" },
  { value: "title-desc", label: "Title: Z → A" },
  { value: "salary-asc", label: "Salary: Low → High" },
  { value: "salary-desc", label: "Salary: High → Low" },
];

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
    coverImage: String(item.coverImage ?? "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=220&fit=crop&auto=format&q=80"),
    icon: typeof item.icon === "string" ? item.icon : undefined,
  };
}

export default function ExplorePage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState<"All" | DifficultyLevel>("All");
  const [sortBy, setSortBy] = useState("default");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadCareers() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/api/careers`, {
          cache: "no-store",
          mode: "cors",
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

        const payload = await response.json();
        const nextCareers = Array.isArray(payload) ? payload.map(normalizeCareer) : [];

        if (isActive) {
          setCareers(nextCareers);
        }
      } catch {
        if (isActive) {
          setCareers([]);
          setError("Unable to load careers right now.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadCareers();

    return () => {
      isActive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    let result = [...careers];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (career) =>
          career.title.toLowerCase().includes(q) ||
          career.description.toLowerCase().includes(q) ||
          career.skills.some((skill) => skill.toLowerCase().includes(q))
      );
    }

    if (activeCategory !== "All") {
      result = result.filter((career) => career.category === activeCategory);
    }

    if (activeDifficulty !== "All") {
      result = result.filter((career) => career.difficulty === activeDifficulty);
    }

    const parseSalary = (value: string) => parseInt(value.replace(/\D/g, ""), 10);
    if (sortBy === "title-asc") result.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortBy === "title-desc") result.sort((a, b) => b.title.localeCompare(a.title));
    else if (sortBy === "salary-asc") result.sort((a, b) => parseSalary(a.avgSalary) - parseSalary(b.avgSalary));
    else if (sortBy === "salary-desc") result.sort((a, b) => parseSalary(b.avgSalary) - parseSalary(a.avgSalary));

    return result;
  }, [careers, search, activeCategory, activeDifficulty, sortBy]);

  const activeFiltersCount = [
    activeCategory !== "All",
    activeDifficulty !== "All",
    search.trim() !== "",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setActiveDifficulty("All");
    setSortBy("default");
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <section className="relative overflow-hidden pb-14 pt-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Explore
          </span>
          <h1 className="mb-4 text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-100 md:text-5xl">
            Browse Career Paths
          </h1>
          <p className="max-w-2xl text-lg text-slate-400">
            Discover curated learning roadmaps across{" "}
            <span className="font-semibold text-slate-100">{careers.length}+</span> career paths. Filter by industry, experience level, or search for a specific role.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-24">
        <div className="sticky top-[72px] z-30 -mx-6 mb-8 border-b border-white/10 bg-slate-900/90 px-6 py-4 backdrop-blur-md">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                id="career-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search careers, skills..."
                className="h-10 w-full rounded-lg border border-white/10 bg-slate-800/80 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
                aria-label="Search career paths"
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="h-10 min-w-[160px] cursor-pointer rounded-lg border border-white/10 bg-slate-800/80 px-3 text-sm text-slate-300 outline-none transition-all duration-200 focus:border-indigo-500"
                aria-label="Filter by Category"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category === "All" ? "All Categories" : category}
                  </option>
                ))}
              </select>

              <select
                value={activeDifficulty}
                onChange={(e) => setActiveDifficulty(e.target.value as "All" | DifficultyLevel)}
                className="h-10 min-w-[140px] cursor-pointer rounded-lg border border-white/10 bg-slate-800/80 px-3 text-sm text-slate-300 outline-none transition-all duration-200 focus:border-indigo-500"
                aria-label="Filter by Difficulty"
              >
                {DIFFICULTIES.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === "All" ? "All Difficulties" : difficulty}
                  </option>
                ))}
              </select>

              <select
                id="career-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 min-w-[150px] cursor-pointer rounded-lg border border-white/10 bg-slate-800/80 px-3 text-sm text-slate-300 outline-none transition-all duration-200 focus:border-indigo-500"
                aria-label="Sort career paths"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-red-500/30 bg-red-500/10 px-4 text-sm font-medium text-red-400 transition-all duration-200 hover:bg-red-500/20"
                  aria-label="Clear all filters"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  Clear ({activeFiltersCount})
                </button>
              )}
            </div>
          </div>
        </div>

        <div>
          {error ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-8 text-center text-sm text-red-300">
              {error}
            </div>
          ) : (
            <CareerGrid careers={filtered} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
}
