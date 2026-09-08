import React from "react";
import Link from "next/link";

export default function AIFeatures() {
  return (
    <section className="relative overflow-hidden bg-[#EBEDE8] py-24 sm:py-28" id="ai-features">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-5 inline-flex items-center rounded-full border border-[#004838]/20 bg-[#004838]/10 px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#073127]">
            Powered By Gemini
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#073127] sm:text-4xl">Your AI Career Advantage</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#333F3C]">
            Experience the next generation of career planning with our deeply integrated AI features.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* AI Feature 1: Roadmap Generator */}
          <div className="group overflow-hidden rounded-3xl border border-[#073127]/10 bg-white shadow-[0_8px_30px_rgba(7,49,39,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#004838]/30 hover:shadow-[0_12px_40px_rgba(7,49,39,0.1)]">
            <div className="relative flex h-48 flex-col justify-end border-b border-[#073127]/10 bg-[#EBEDE8]/60 p-6">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#004838]/10 to-[#E2FB6C]/20 opacity-70" />
              <div className="absolute inset-x-6 bottom-0 top-6 flex flex-col overflow-hidden rounded-t-xl border border-[#004838]/20 border-b-0 bg-white shadow-md">
                <div className="flex h-8 items-center gap-2 border-b border-[#073127]/10 bg-[#073127] px-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#E2FB6C]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#004838]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#333F3C]" />
                  <div className="ml-2 font-mono text-[10px] text-[#EBEDE8]/70">roadmap-generator.tsx</div>
                </div>
                <div className="flex flex-col gap-3 p-4 bg-[#EBEDE8]/30">
                  <div className="h-2 w-3/4 rounded-full bg-[#004838]/30" />
                  <div className="h-2 w-1/2 rounded-full bg-[#333F3C]/20" />
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <div className="h-16 rounded border border-[#073127]/10 bg-white" />
                    <div className="h-16 rounded border border-[#004838]/30 bg-[#E2FB6C]/30 shadow-xs" />
                    <div className="h-16 rounded border border-[#073127]/10 bg-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 bg-white p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#004838] text-[#E2FB6C] border border-[#E2FB6C]/30 shadow-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-[#073127]">Intelligent Roadmap Generator</h3>
              <p className="mb-6 leading-relaxed text-[#333F3C]">
                Input your career goals, current experience level, available study time, and preferences. Our Gemini-powered AI instantly generates a comprehensive, phased learning roadmap with actionable milestones, tailored specifically to you.
              </p>
              <ul className="mb-8 space-y-3">
                {['Customized learning phases', 'Specific skill breakdown', 'Time-bound milestones'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#073127]">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#004838]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/add-career" className="flex items-center gap-2 font-bold text-[#004838] transition-colors group-hover:text-[#073127]">
                Try the Generator
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* AI Feature 2: Career Mentor */}
          <div className="group overflow-hidden rounded-3xl border border-[#073127]/10 bg-white shadow-[0_8px_30px_rgba(7,49,39,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#004838]/30 hover:shadow-[0_12px_40px_rgba(7,49,39,0.1)]">
            <div className="relative flex h-48 flex-col justify-end border-b border-[#073127]/10 bg-[#EBEDE8]/60 p-6">
              <div className="absolute inset-0 bg-gradient-to-tl from-[#004838]/15 to-[#E2FB6C]/20 opacity-70" />
              <div className="absolute inset-x-6 bottom-0 top-6 flex flex-col overflow-hidden rounded-t-xl border border-[#004838]/20 border-b-0 bg-white shadow-md">
                <div className="flex h-8 items-center justify-between border-b border-[#073127]/10 bg-[#073127] px-3">
                  <div className="font-mono text-[10px] text-[#EBEDE8]/70">AI Mentor Chat</div>
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-[#E2FB6C]" />
                    <div className="h-2 w-2 rounded-full bg-[#004838]" />
                  </div>
                </div>
                <div className="flex flex-col gap-4 p-4 bg-[#EBEDE8]/30">
                  <div className="flex justify-end">
                    <div className="h-6 w-2/3 rounded-xl rounded-tr-sm border border-[#073127]/10 bg-white" />
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-6 w-6 flex-shrink-0 rounded-full bg-[#004838]" />
                    <div className="h-12 w-3/4 rounded-xl rounded-tl-sm border border-[#004838]/20 bg-[#E2FB6C]/30" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 bg-white p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#004838] text-[#E2FB6C] border border-[#E2FB6C]/30 shadow-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-[#073127]">24/7 Context-Aware Mentor</h3>
              <p className="mb-6 leading-relaxed text-[#333F3C]">
                Your dedicated AI assistant understands your saved career plans, current skills, and ultimate goals. Get contextual advice on next steps, interview prep, or project ideas whenever you need it.
              </p>
              <ul className="mb-8 space-y-3">
                {['Remembers your career context', 'Interactive interview preparation', 'Curated project recommendations'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#073127]">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#004838]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/mentor" className="flex items-center gap-2 font-bold text-[#004838] transition-colors group-hover:text-[#073127]">
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
