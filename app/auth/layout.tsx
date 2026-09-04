import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Authentication | SkillPilot",
  description: "Sign in to your SkillPilot account or create a new one to start generating AI-powered career roadmaps.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[120px]" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-0 right-1/4 h-[600px] w-[600px] rounded-full bg-violet-500/15 blur-[140px]" style={{ animationDuration: '8s' }} />
      </div>

      <div className="relative z-10 w-full max-w-md p-6">
        <div className="mb-8 flex justify-center">
          <Link href="/" className="group flex items-center gap-2 no-underline">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg transition-transform group-hover:scale-105">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-100">
              Skill<span className="text-indigo-400">Pilot</span>
            </span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.4)] backdrop-blur-md">
          <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-indigo-500 to-violet-500" />
          {children}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
