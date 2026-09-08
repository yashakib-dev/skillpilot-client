import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen mt-10 items-center justify-center overflow-hidden bg-[#EBEDE8] pt-24 pb-16">
      {/* Ambient Background Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#E2FB6C]/25 blur-[120px]" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-[#004838]/15 blur-[120px]" style={{ animationDuration: '5s' }} />
        <div className="absolute left-1/2 top-1/2 h-full max-h-4xl w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EBEDE8]/60 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 text-center lg:px-8">
        {/* Animated badge */}
        <div
          className="mb-6 inline-flex translate-y-0 items-center rounded-full border border-[#004838]/20 bg-[#004838]/10 px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#073127] opacity-100 transition-all duration-500 shadow-xs"
          style={{ transitionDelay: '100ms' }}
        >
          <span className="relative flex h-2.5 w-2.5 mr-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#004838] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#004838]"></span>
          </span>
          Next-Gen Career Planning
        </div>

        {/* Main headline */}
        <h1
          className="mb-6 max-w-4xl translate-y-0 text-5xl font-extrabold tracking-tight text-[#073127] opacity-100 transition-all duration-500 md:text-7xl"
          style={{ transitionDelay: '200ms', lineHeight: 1.1 }}
        >
          Navigate Your Career With <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-[#004838] via-[#073127] to-[#004838] bg-clip-text text-transparent">AI-Powered Precision</span>
        </h1>

        {/* Subheadline */}
        <p
          className="mb-10 max-w-2xl translate-y-0 text-lg text-[#333F3C] opacity-100 transition-all duration-500 md:text-xl font-normal leading-relaxed"
          style={{ transitionDelay: '300ms' }}
        >
          Stop guessing your next move. Get personalized learning roadmaps, smart skill recommendations, and an AI mentor to guide you to your dream role.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex translate-y-0 flex-col items-center gap-4 opacity-100 transition-all duration-500 sm:flex-row"
          style={{ transitionDelay: '400ms' }}
        >
          <Link href="/add-career" className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#004838] px-8 py-4 text-lg font-bold text-[#E2FB6C] shadow-[0_8px_24px_rgba(0,72,56,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#073127] hover:shadow-[0_12px_28px_rgba(0,72,56,0.4)] sm:w-auto">
            Build My Roadmap
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/explore" className="inline-flex w-full items-center justify-center rounded-full border border-[#073127]/20 bg-white/90 px-8 py-4 text-lg font-semibold text-[#073127] shadow-xs transition hover:border-[#004838] hover:bg-white sm:w-auto">
            Explore Careers
          </Link>
        </div>

        {/* Floating UI Elements Mockup */}
        <div
          className="relative mx-auto mt-16 w-full max-w-5xl translate-y-0 opacity-100 transition-all duration-500"
          style={{ transitionDelay: '600ms' }}
        >
          <div className="absolute inset-0 bottom-0 z-10 h-full w-full bg-gradient-to-t from-[#EBEDE8] via-transparent to-transparent pointer-events-none" />
          <div className="group relative overflow-hidden rounded-xl border border-[#073127]/10 bg-white p-3 shadow-[0_20px_50px_rgba(7,49,39,0.09)] backdrop-blur-xl md:p-5 md:rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#004838]/5 to-[#E2FB6C]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="flex items-center gap-2 mb-4 px-4 pt-2">
              <div className="w-3 h-3 rounded-full bg-[#004838]" />
              <div className="w-3 h-3 rounded-full bg-[#E2FB6C] border border-[#073127]/20" />
              <div className="w-3 h-3 rounded-full bg-[#333F3C]" />
            </div>

            {/* Mock Dashboard Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-4">
              <div className="md:col-span-2 space-y-4">
                <div className="h-10 bg-[#EBEDE8] rounded-lg w-1/3 animate-pulse" />
                <div className="h-32 bg-[#EBEDE8] rounded-xl animate-pulse delay-75 border border-[#073127]/5" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-[#004838]/10 rounded-xl animate-pulse delay-100 border border-[#004838]/20" />
                  <div className="h-24 bg-[#E2FB6C]/30 rounded-xl animate-pulse delay-150 border border-[#073127]/10" />
                </div>
              </div>
              <div className="space-y-4 hidden md:block">
                <div className="h-64 bg-[#EBEDE8] rounded-xl animate-pulse delay-200" />
                <div className="h-16 bg-[#004838]/10 rounded-xl animate-pulse delay-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
