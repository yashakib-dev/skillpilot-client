"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "How does the AI generate my learning roadmap?",
    answer: "Our AI (powered by Gemini) analyzes your inputs—target career, current skills, available time, and learning preferences. It then cross-references this with current industry requirements to build a phased, step-by-step curriculum customized for you."
  },
  {
    question: "Is SkillPilot completely free to use?",
    answer: "Yes, the core features of SkillPilot including roadmap generation and basic AI mentorship are free. We believe everyone should have access to quality career planning tools."
  },
  {
    question: "Can I change my roadmap once it's generated?",
    answer: "Absolutely. Career goals evolve, and your roadmap can too. You can regenerate your path at any time or manually adjust the priority and timeline of specific skills."
  },
  {
    question: "How accurate is the AI Mentor's advice?",
    answer: "The AI Mentor is designed to provide high-quality, context-aware guidance based on standard industry practices. However, it is an AI tool and its advice should be used as a strong starting point and supplemented with your own research."
  },
  {
    question: "Do I need to create an account?",
    answer: "You can explore career paths and basic information without an account. However, to generate personalized roadmaps, save your progress, and use the AI Mentor, you will need to sign up (it takes less than a minute)."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="bg-[#EBEDE8] py-24 sm:py-28" id="faq">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-5 inline-flex items-center rounded-full border border-[#004838]/20 bg-[#004838]/10 px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#073127]">
            FAQ
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#073127] sm:text-4xl">Common Questions</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#333F3C]">
            Everything you need to know about how SkillPilot works and how it can help your career.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border border-[#073127]/10 bg-white transition-all shadow-[0_4px_20px_rgba(7,49,39,0.03)] ${openIdx === idx ? "border-[#004838]/40 shadow-[0_8px_25px_rgba(7,49,39,0.07)]" : ""}`}
            >
              <button
                className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
                onClick={() => toggleFaq(idx)}
                aria-label={faq.question}
                aria-expanded={openIdx === idx}
              >
                <span className="pr-4 font-bold text-[#073127]">
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 transition-transform duration-300 ${openIdx === idx ? "rotate-180 text-[#004838]" : "text-[#333F3C]"}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: openIdx === idx ? '200px' : '0',
                  opacity: openIdx === idx ? 1 : 0
                }}
              >
                <div className="mx-6 border-t border-[#073127]/10 px-6 pb-6 pt-3 leading-relaxed text-[#333F3C]">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
