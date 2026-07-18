import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 pt-16 pb-8 text-sm text-slate-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2 no-underline">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-100">
                Skill<span className="text-indigo-400">Pilot</span>
              </span>
            </Link>
            <p className="mb-6 max-w-sm leading-relaxed text-slate-400">
              AI-powered career planning that turns ambition into actionable steps. Build your future with intelligent learning roadmaps and personalized mentorship.
            </p>
           
          </div>

          {/* Links Cols */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-200">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="/explore" className="transition-colors hover:text-indigo-400">Explore Careers</Link></li>
              <li><Link href="/add-career" className="transition-colors hover:text-indigo-400">AI Generator</Link></li>
              <li><Link href="/dashboard" className="transition-colors hover:text-indigo-400">Dashboard</Link></li>
              <li><Link href="/auth/login" className="transition-colors hover:text-indigo-400">Sign In</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-200">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="transition-colors hover:text-indigo-400">About Us</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-indigo-400">Contact</Link></li>
              <li><Link href="/explore" className="transition-colors hover:text-indigo-400">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-200">Social Links</h4>
            <div className="flex gap-4">
         
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-slate-400 transition-colors hover:border-indigo-500 hover:text-white" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-slate-400 transition-colors hover:border-indigo-500 hover:text-white" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-slate-400 transition-colors hover:border-indigo-500 hover:text-white" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
           

        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} SkillPilot. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built with</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-red-500">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>using Next.js 16</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
