import React from "react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#EBEDE8] py-24">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#004838]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[32px] border border-[#004838]/30 bg-[#073127] p-10 text-center shadow-[0_20px_60px_rgba(7,49,39,0.2)] md:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-[#004838]/40 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Ready to take control of your <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-[#E2FB6C] to-white bg-clip-text text-transparent">professional future?</span>
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-[#EBEDE8]/80 leading-relaxed">
              Join thousands of professionals using SkillPilot to navigate their career changes, learn new skills efficiently, and land their dream roles.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard" className="w-full rounded-full bg-[#E2FB6C] px-10 py-4 text-lg font-extrabold text-[#073127] shadow-[0_6px_20px_rgba(226,251,108,0.3)] transition hover:-translate-y-0.5 hover:bg-white sm:w-auto">
                Get Started for Free
              </Link>
              <Link href="/explore" className="w-full rounded-full border border-white/20 bg-[#004838] px-10 py-4 text-lg font-bold text-white transition hover:bg-white/10 sm:w-auto">
                View Example Roadmaps
              </Link>
            </div>

            <p className="mt-8 flex items-center justify-center gap-2 text-sm text-[#EBEDE8]/70 font-medium">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#E2FB6C]">
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
