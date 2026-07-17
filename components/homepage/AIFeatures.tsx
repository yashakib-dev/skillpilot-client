import React from "react";
import Link from "next/link";

export default function AIFeatures() {
  return (
    <section className="relative overflow-hidden bg-slate-900/70 py-24 sm:py-28" id="ai-features">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-5 inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
            Powered By Gemini
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">Your AI Career Advantage</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Experience the next generation of career planning with our deeply integrated AI features.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* AI Feature 1: Roadmap Generator */}
          <div className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-[0_20px_60px_rgba(15,23,42,0.4)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:border-indigo-400/40">
            <div className="relative flex h-48 flex-col justify-end border-b border-white/10 bg-slate-800/80 p-6">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/5 opacity-50" />
              <div className="absolute inset-x-6 bottom-0 top-6 flex flex-col overflow-hidden rounded-t-xl border border-indigo-400/20 border-b-0 bg-slate-900/90 shadow-lg">
                <div className="flex h-8 items-center gap-2 border-b border-white/10 bg-slate-950 px-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                  <div className="ml-2 font-mono text-[10px] text-slate-500">roadmap-generator.tsx</div>
                </div>
                <div className="flex flex-col gap-3 p-4">
                  <div className="h-2 w-3/4 rounded-full bg-indigo-500/30" />
                  <div className="h-2 w-1/2 rounded-full bg-slate-600/40" />
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <div className="h-16 rounded border border-white/10 bg-slate-800/80" />
                    <div className="h-16 rounded border border-indigo-500/30 bg-slate-800/80 shadow-[0_0_10px_rgba(99,102,241,0.2)]" />
                    <div className="h-16 rounded border border-white/10 bg-slate-800/80" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 bg-slate-900/80 p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-slate-100">Intelligent Roadmap Generator</h3>
              <p className="mb-6 leading-relaxed text-slate-400">
                Input your career goals, current experience level, available study time, and preferences. Our Gemini-powered AI instantly generates a comprehensive, phased learning roadmap with actionable milestones, tailored specifically to you.
              </p>
              <ul className="mb-8 space-y-3">
                {['Customized learning phases', 'Specific skill breakdown', 'Time-bound milestones'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-200">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/add-career" className="flex items-center gap-2 font-semibold text-indigo-400 transition-colors group-hover:text-indigo-300">
                Try the Generator
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* AI Feature 2: Career Mentor */}
          <div className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-[0_20px_60px_rgba(15,23,42,0.4)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:border-pink-400/40">
            <div className="relative flex h-48 flex-col justify-end border-b border-white/10 bg-slate-800/80 p-6">
              <div className="absolute inset-0 bg-gradient-to-tl from-pink-500/20 to-purple-500/5 opacity-50" />
              <div className="absolute inset-x-6 bottom-0 top-6 flex flex-col overflow-hidden rounded-t-xl border border-pink-400/20 border-b-0 bg-slate-900/90 shadow-lg">
                <div className="flex h-8 items-center justify-between border-b border-white/10 bg-slate-950 px-3">
                  <div className="font-mono text-[10px] text-slate-500">AI Mentor Chat</div>
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-pink-500/50" />
                    <div className="h-2 w-2 rounded-full bg-pink-500/50" />
                  </div>
                </div>
                <div className="flex flex-col gap-4 p-4">
                  <div className="flex justify-end">
                    <div className="h-6 w-2/3 rounded-xl rounded-tr-sm border border-white/10 bg-slate-800/80" />
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
                    <div className="h-12 w-3/4 rounded-xl rounded-tl-sm border border-pink-500/20 bg-pink-500/10" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 bg-slate-900/80 p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-slate-100">24/7 Context-Aware Mentor</h3>
              <p className="mb-6 leading-relaxed text-slate-400">
                Your dedicated AI assistant understands your saved career plans, current skills, and ultimate goals. Get contextual advice on next steps, interview prep, or project ideas whenever you need it.
              </p>
              <ul className="mb-8 space-y-3">
                {['Remembers your career context', 'Interactive interview preparation', 'Curated project recommendations'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-200">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/auth/register" className="flex items-center gap-2 font-semibold text-pink-400 transition-colors group-hover:text-pink-300">
                Meet Your Mentor
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
