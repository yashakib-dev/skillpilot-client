import React from "react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-slate-900/70 py-24">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 p-10 text-center shadow-[0_20px_60px_rgba(15,23,42,0.4)] md:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />

          <div className="relative z-10">
            <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-100 md:text-5xl">
              Ready to take control of your <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">professional future?</span>
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400">
              Join thousands of professionals using SkillPilot to navigate their career changes, learn new skills efficiently, and land their dream roles.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard" className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-10 py-4 text-lg font-semibold text-white shadow-[0_4px_20px_rgba(99,102,241,0.4)] transition hover:-translate-y-0.5 sm:w-auto">
                Get Started for Free
              </Link>
              <Link href="/explore" className="w-full rounded-full border border-slate-700 bg-slate-950/70 px-10 py-4 text-lg font-semibold text-slate-200 transition hover:border-indigo-400 hover:bg-indigo-500/10 hover:text-white sm:w-auto">
                View Example Roadmaps
              </Link>
            </div>

            <p className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              No credit card required to start
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
