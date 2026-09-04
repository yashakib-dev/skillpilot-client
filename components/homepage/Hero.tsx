import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen mt-10 items-center justify-center overflow-hidden bg-slate-950 pt-24">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px]" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-violet-500/15 blur-[120px]" style={{ animationDuration: '5s' }} />
        <div className="absolute left-1/2 top-1/2 h-full max-h-4xl w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-950/80 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 text-center lg:px-8">
        {/* Animated badge */}
        <div
          className="mb-5 inline-flex translate-y-0 items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300 opacity-100 transition-all duration-500"
          style={{ transitionDelay: '100ms' }}
        >
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Next-Gen Career Planning
        </div>

        {/* Main headline */}
        <h1
          className="mb-6 max-w-4xl translate-y-0 text-5xl font-extrabold tracking-tight text-slate-100 opacity-100 transition-all duration-500 md:text-7xl"
          style={{ transitionDelay: '200ms', lineHeight: 1.1 }}
        >
          Navigate Your Career With <br className="hidden md:block" />
          <span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">AI-Powered Precision</span>
        </h1>

        {/* Subheadline */}
        <p
          className="mb-10 max-w-2xl translate-y-0 text-lg text-slate-400 opacity-100 transition-all duration-500 md:text-xl"
          style={{ transitionDelay: '300ms' }}
        >
          Stop guessing your next move. Get personalized learning roadmaps, smart skill recommendations, and an AI mentor to guide you to your dream role.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex translate-y-0 flex-col items-center gap-4 opacity-100 transition-all duration-500 sm:flex-row"
          style={{ transitionDelay: '400ms' }}
        >
          <Link href="/add-career" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-indigo-500 to-violet-500 px-8 py-4 text-lg font-semibold text-white shadow-[0_4px_20px_rgba(99,102,241,0.4)] transition hover:-translate-y-0.5 sm:w-auto">
            Build My Roadmap
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/explore" className="inline-flex w-full items-center justify-center rounded-full border border-slate-700 bg-white/5 px-8 py-4 text-lg font-semibold text-slate-200 transition hover:border-indigo-400 hover:bg-white/10 sm:w-auto">
            Explore Careers
          </Link>
        </div>

        {/* Floating UI Elements Mockup */}
        <div
          className="relative mx-auto mt-20 w-full max-w-5xl translate-y-0 opacity-100 transition-all duration-500"
          style={{ transitionDelay: '600ms' }}
        >
          <div className="absolute inset-0 bottom-0 z-10 h-full w-full bg-linear-to-t from-slate-950 via-transparent to-transparent" />
          <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/80 p-2 shadow-2xl backdrop-blur-xl md:p-4 md:rounded-2xl">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="flex items-center gap-2 mb-4 px-4 pt-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>

            {/* Mock Dashboard Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-4">
              <div className="md:col-span-2 space-y-4">
                <div className="h-10 bg-white/5 rounded-lg w-1/3 animate-pulse" />
                <div className="h-32 bg-white/5 rounded-xl animate-pulse delay-75" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-white/5 rounded-xl animate-pulse delay-100" />
                  <div className="h-24 bg-white/5 rounded-xl animate-pulse delay-150" />
                </div>
              </div>
              <div className="space-y-4 hidden md:block">
                <div className="h-64 bg-white/5 rounded-xl animate-pulse delay-200" />
                <div className="h-16 bg-white/5 rounded-xl animate-pulse delay-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
