import type { Career, DifficultyLevel } from "@/types/career";
import Image from "next/image";
import Link from "next/link";

const difficultyConfig: Record<
  DifficultyLevel,
  { color: string; dot: string }
> = {
  Beginner:     { color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", dot: "bg-emerald-400" },
  Intermediate: { color: "bg-blue-500/15 text-blue-400 border-blue-500/30",         dot: "bg-blue-400" },
  Advanced:     { color: "bg-amber-500/15 text-amber-400 border-amber-500/30",       dot: "bg-amber-400" },
  Expert:       { color: "bg-rose-500/15 text-rose-400 border-rose-500/30",          dot: "bg-rose-400" },
};

interface CareerCardProps {
  career: Career;
}

export function CareerCard({ career }: CareerCardProps) {
  const diff = difficultyConfig[career.difficulty];

  return (
    <div
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-indigo-400/15 bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-[0_12px_40px_rgba(99,102,241,0.2)]"
      aria-label={`Career card for ${career.title}`}
    >
      <div className="relative h-40 w-full shrink-0 overflow-hidden">
        <Image
          src={career.coverImage}
          alt={`${career.title} career path`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent" />
        <span
          className={`absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-sm ${diff.color}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
          {career.difficulty}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <span className="mb-2 truncate text-[11px] font-bold uppercase tracking-widest text-indigo-400">
          {career.category}
        </span>

        <h3 className="mb-2 text-base font-bold leading-snug text-slate-100 transition-colors duration-200 line-clamp-2 group-hover:text-indigo-300">
          {career.title}
        </h3>

        <p className="flex-1 text-sm leading-relaxed text-slate-400 line-clamp-2">
          {career.description}
        </p>

        <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 text-xs text-slate-500">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-indigo-400 shrink-0"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {career.timeToLearn}
            </span>

            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-emerald-400 shrink-0"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              {career.avgSalary}
            </span>
          </div>

          <Link
            href={`/careers/${career.id}`}
            className="inline-flex items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-sm font-semibold text-indigo-300 transition-colors duration-200 hover:bg-indigo-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
            aria-label={`View details for ${career.title}`}
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CareerCardSkeleton() {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-900/80 animate-pulse">
      {/* Image placeholder */}
      <div className="h-40 w-full shrink-0 bg-white/10" />

      {/* Body placeholder */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category */}
        <div className="h-3 w-24 rounded bg-[rgba(255,255,255,0.06)] mb-3" />
        {/* Title */}
        <div className="h-5 w-3/4 rounded-lg bg-[rgba(255,255,255,0.07)] mb-1.5" />
        <div className="h-5 w-1/2 rounded-lg bg-[rgba(255,255,255,0.07)] mb-4" />
        {/* Description lines */}
        <div className="space-y-2 flex-1">
          <div className="h-3.5 w-full rounded bg-[rgba(255,255,255,0.05)]" />
          <div className="h-3.5 w-4/5 rounded bg-[rgba(255,255,255,0.05)]" />
        </div>
        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
          <div className="h-3.5 w-20 rounded bg-[rgba(255,255,255,0.06)]" />
          <div className="h-3.5 w-16 rounded bg-[rgba(255,255,255,0.06)]" />
        </div>
      </div>
    </div>
  );
}
