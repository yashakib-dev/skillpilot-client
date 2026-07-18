import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 shadow-[0_20px_60px_rgba(15,23,42,0.4)]">
          <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
            <div className="flex flex-col justify-center">
              <span className="mb-4 inline-flex w-fit items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
                404 Error
              </span>
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Page not found
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                The page you are looking for may have moved, been removed, or never existed.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                  Go home
                </Link>
                <Link
                  href="/explore"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-indigo-400/40 hover:text-white"
                >
                  Explore careers
                </Link>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-6 sm:p-8">
              <div className="flex h-full flex-col justify-center">
                <div className="text-7xl font-semibold text-indigo-400 sm:text-8xl">404</div>
                <p className="mt-4 text-sm leading-7 text-slate-400">
                  It looks like you took a wrong turn. Use the links above to get back to the main experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
