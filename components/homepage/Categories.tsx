import React from "react";
import Link from "next/link";

const categories = [
  {
    title: "Software Engineering",
    count: "450+ paths",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    color: "from-blue-500 to-indigo-500"
  },
  {
    title: "Data Science & AI",
    count: "320+ paths",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Design & UX/UI",
    count: "280+ paths",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2z" />
        <path d="M12 22v-6.5" />
        <path d="M22 8.5l-10 7-10-7" />
        <path d="M2 15.5l10-7 10 7" />
      </svg>
    ),
    color: "from-pink-500 to-rose-500"
  },
  {
    title: "Product Management",
    count: "190+ paths",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    color: "from-orange-500 to-amber-500"
  },
  {
    title: "Cybersecurity",
    count: "210+ paths",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Digital Marketing",
    count: "240+ paths",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    color: "from-cyan-500 to-blue-500"
  }
];

export default function Categories() {
  return (
    <section className="bg-slate-950 py-24 sm:py-28" id="categories">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-5 inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
              Explore
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">Discover Career Paths</h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-400">
              Browse popular industries and find the perfect role that matches your skills and interests.
            </p>
          </div>
          <Link href="/explore" className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-slate-700 bg-transparent px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-indigo-400 hover:bg-indigo-500/10 hover:text-white">
            View All Careers
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <Link
              href={`/explore?category=${encodeURIComponent(cat.title)}`}
              key={idx}
              className="group flex items-center gap-5 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40"
            >
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                {cat.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 transition-colors group-hover:text-indigo-300">
                  {cat.title}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{cat.count}</p>
              </div>
              <div className="ml-auto -translate-x-2 text-indigo-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
