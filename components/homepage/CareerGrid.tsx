"use client";

import { useState, useEffect } from "react";
import { CareerCard, CareerCardSkeleton } from "@/components/homepage/CareerCard";
import type { Career } from "@/types/career";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const delta = 2;
    const range: (number | "...")[] = [];
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);

    if (left > 1) {
      range.push(1);
      if (left > 2) range.push("...");
    }
    for (let i = left; i <= right; i++) range.push(i);
    if (right < totalPages) {
      if (right < totalPages - 1) range.push("...");
      range.push(totalPages);
    }
    return range;
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="flex items-center justify-center gap-1 mt-12 flex-wrap"
    >
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-[rgba(99,102,241,0.2)] bg-[#1e293b] text-[var(--text-secondary)] hover:bg-[rgba(99,102,241,0.1)] hover:text-[var(--text-primary)] hover:border-[rgba(99,102,241,0.4)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#1e293b] disabled:hover:border-[rgba(99,102,241,0.2)]"
        aria-label="Previous page"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Prev
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="select-none px-3 py-2 text-sm text-slate-500">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              aria-current={currentPage === page ? "page" : undefined}
              aria-label={`Page ${page}`}
              className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-200 ${currentPage === page
                  ? "bg-indigo-600 text-white shadow-[0_0_16px_rgba(99,102,241,0.4)]"
                  : "border border-indigo-400/20 bg-slate-800/80 text-slate-300 hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-slate-100"
                }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-[rgba(99,102,241,0.2)] bg-[#1e293b] text-[var(--text-secondary)] hover:bg-[rgba(99,102,241,0.1)] hover:text-[var(--text-primary)] hover:border-[rgba(99,102,241,0.4)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#1e293b] disabled:hover:border-[rgba(99,102,241,0.2)]"
        aria-label="Next page"
      >
        Next
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </nav>
  );
}

const PAGE_SIZE = 12;

interface CareerGridProps {
  careers: Career[];
  isLoading?: boolean;
}

export default function CareerGrid({ careers, isLoading = false }: CareerGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [careers]);

  const totalPages = Math.ceil(careers.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginated = careers.slice(start, start + PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const el = document.getElementById("career-grid-top");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <CareerCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!isLoading && careers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/10">
          <svg className="w-9 h-9 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-bold text-slate-100">No careers found</h3>
        <p className="max-w-xs text-sm text-slate-400">
          Try adjusting your search or filter to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Scroll anchor */}
      <div id="career-grid-top" className="-mt-4 mb-4" aria-hidden />

      {/* Page info */}
      <p className="mb-6 text-sm text-slate-500">
        Showing{" "}
        <span className="font-medium text-slate-300">
          {start + 1}–{Math.min(start + PAGE_SIZE, careers.length)}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-300">{careers.length}</span> career paths
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginated.map((career) => (
          <CareerCard key={career.id} career={career} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
