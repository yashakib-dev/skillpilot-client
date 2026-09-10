import type { Career, DifficultyLevel } from "@/types/career";
import Image from "next/image";
import Link from "next/link";

const difficultyConfig: Record<
  DifficultyLevel,
  { color: string; dot: string }
> = {
  Beginner: { color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", dot: "bg-emerald-400" },
  Intermediate: { color: "bg-blue-500/15 text-blue-400 border-blue-500/30", dot: "bg-blue-400" },
  Advanced: { color: "bg-amber-500/15 text-amber-400 border-amber-500/30", dot: "bg-amber-400" },
  Expert: { color: "bg-rose-500/15 text-rose-400 border-rose-500/30", dot: "bg-rose-400" },
};

interface CareerCardProps {
  career: Career;
}

export function CareerCard({ career }: CareerCardProps) {
  const diff = difficultyConfig[career.difficulty];

  return (
    <div
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-[#073127]/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#004838]/30 hover:shadow-[0_12px_40px_rgba(7,49,39,0.1)]"
      aria-label={`Career card for ${career.title}`}
    >
      <div className="relative h-40 w-full shrink-0 overflow-hidden bg-[#EBEDE8]">
        <Image
          src={career.coverImage}
          alt={`${career.title} career path`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-80" />
        <span
          className={`absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-sm ${diff.color}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
          {career.difficulty}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <span className="mb-2 truncate text-[11px] font-bold uppercase tracking-widest text-[#004838]">
          {career.category}
        </span>

        <h3 className="mb-2 text-base font-bold leading-snug text-[#073127] transition-colors duration-200 line-clamp-2 group-hover:text-[#004838]">
          {career.title}
        </h3>

        <p className="flex-1 text-sm leading-relaxed text-[#333F3C] line-clamp-2">
          {career.description}
        </p>

        <div className="mt-4 flex flex-col gap-3 border-t border-[#073127]/10 pt-4 text-xs text-[#333F3C]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <svg
                className="w-3.5 h-3.5 text-[#004838] shrink-0"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {career.timeToLearn}
            </span>

            <span className="flex items-center gap-1.5 font-medium">
              <svg
                className="w-3.5 h-3.5 text-[#004838] shrink-0"
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
            className="inline-flex items-center justify-center rounded-xl border border-[#004838]/20 bg-[#004838]/10 px-3 py-2 text-sm font-bold text-[#073127] transition-all duration-200 hover:bg-[#004838] hover:text-[#E2FB6C] focus:outline-none"
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
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-[#073127]/10 bg-white animate-pulse">
      {/* Image placeholder */}
      <div className="h-40 w-full shrink-0 bg-[#EBEDE8]" />

      {/* Body placeholder */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category */}
        <div className="h-3 w-24 rounded bg-[#EBEDE8] mb-3" />
        {/* Title */}
        <div className="h-5 w-3/4 rounded-lg bg-[#EBEDE8] mb-1.5" />
        <div className="h-5 w-1/2 rounded-lg bg-[#EBEDE8] mb-4" />
        {/* Description lines */}
        <div className="space-y-2 flex-1">
          <div className="h-3.5 w-full rounded bg-[#EBEDE8]" />
          <div className="h-3.5 w-4/5 rounded bg-[#EBEDE8]" />
        </div>
        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-[#073127]/10 flex items-center justify-between">
          <div className="h-3.5 w-20 rounded bg-[#EBEDE8]" />
          <div className="h-3.5 w-16 rounded bg-[#EBEDE8]" />
        </div>
      </div>
    </div>
  );
}
