import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#EBEDE8] text-[#333F3C]">
      <section className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl overflow-hidden rounded-[32px] border border-[#073127]/10 bg-white shadow-[0_20px_50px_rgba(7,49,39,0.08)]">
          <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
            <div className="flex flex-col justify-center">
              <span className="mb-4 inline-flex w-fit items-center rounded-full border border-[#004838]/20 bg-[#004838]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#073127]">
                404 Error
              </span>
              <h1 className="text-5xl font-extrabold tracking-tight text-[#073127] sm:text-6xl">
                Page not found
              </h1>
              <p className="mt-4 text-lg leading-8 text-[#333F3C]">
                The page you are looking for may have moved, been removed, or never existed.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full bg-[#004838] px-6 py-3 text-sm font-bold text-[#E2FB6C] shadow-sm transition hover:bg-[#073127]"
                >
                  Go home
                </Link>
                <Link
                  href="/explore"
                  className="inline-flex items-center justify-center rounded-full border border-[#073127]/20 bg-white px-6 py-3 text-sm font-semibold text-[#073127] transition hover:bg-[#EBEDE8]"
                >
                  Explore careers
                </Link>
              </div>
            </div>

            <div className="rounded-[24px] border border-[#073127]/10 bg-[#EBEDE8]/60 p-6 sm:p-8">
              <div className="flex h-full flex-col justify-center">
                <div className="text-7xl font-extrabold text-[#004838] sm:text-8xl">404</div>
                <p className="mt-4 text-sm leading-7 text-[#333F3C]">
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
