"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

interface CareerPlan {
  _id: string;
  title: string;
  shortDescription: string;
  priorityMonths: number;
  imageUrl?: string;
  status: string;
  progress: number;
  createdAt: string;
}

function DeleteModal({
  title,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#073127]/40 backdrop-blur-xs"
        onClick={onCancel}
      />
      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-[#073127]/10 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#073127]">Delete Career Plan</h3>
            <p className="text-sm text-[#333F3C]">This action cannot be undone.</p>
          </div>
        </div>

        <p className="mb-6 rounded-xl bg-[#EBEDE8] px-4 py-3 text-sm text-[#333F3C]">
          Are you sure you want to delete{" "}
          <span className="font-bold text-[#073127]">&quot;{title}&quot;</span>?
          All associated data will be permanently removed.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 rounded-xl border border-[#073127]/20 bg-white px-4 py-2.5 text-sm font-semibold text-[#073127] transition-colors hover:bg-[#EBEDE8] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:opacity-70"
          >
            {isDeleting ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Deleting...
              </>
            ) : "Delete Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MyCareersPage() {
  const [careers, setCareers] = useState<CareerPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; title: string } | null>(null);

  const fetchCareers = async () => {
    try {
      const res = await fetch("/api/careers");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setCareers(data);
    } catch (error) {
      toast.error("Failed to load career plans");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!confirmDelete) return;
    setDeletingId(confirmDelete.id);
    try {
      const res = await fetch(`/api/careers/${confirmDelete.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Career plan deleted");
      setCareers((prev) => prev.filter((c) => c._id !== confirmDelete.id));
      setConfirmDelete(null);
    } catch (error) {
      toast.error("Failed to delete career plan");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 rounded bg-[#EBEDE8] animate-pulse" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-white animate-pulse border border-[#073127]/10" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Delete Modal */}
      {confirmDelete && (
        <DeleteModal
          title={confirmDelete.title}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setConfirmDelete(null)}
          isDeleting={!!deletingId}
        />
      )}

      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#073127]">My Career Plans</h1>
            <p className="mt-2 text-[#333F3C]">Manage and track progress on your career roadmaps.</p>
          </div>
          <Link
            href="/add-career"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#004838] px-6 py-2.5 font-bold text-[#E2FB6C] shadow-sm transition-all hover:bg-[#073127]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            New Plan
          </Link>
        </div>

        {careers.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#073127]/20 bg-white p-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#004838]/10 text-[#004838]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#073127]">No Career Plans Yet</h3>
            <p className="mt-2 mb-6 max-w-md text-sm text-[#333F3C]">
              You haven&apos;t created any career roadmaps. Start your journey by creating a new plan and generating an AI-guided roadmap.
            </p>
            <Link
              href="/add-career"
              className="rounded-full bg-[#004838] px-6 py-2.5 font-bold text-[#E2FB6C] transition-colors hover:bg-[#073127]"
            >
              Create Your First Plan
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {careers.map((career) => (
              <div key={career._id} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#073127]/10 bg-white shadow-[0_8px_30px_rgba(7,49,39,0.05)] transition-all hover:border-[#004838]/30">
                <div className="p-6 pb-0">
                  <div className="mb-4 flex items-center justify-between">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
                      career.status === "Completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-[#004838]/10 text-[#073127] border border-[#004838]/20"
                    }`}>
                      {career.status}
                    </span>
                    <div className="text-xs font-medium text-[#333F3C]/70">
                      {new Date(career.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-[#073127] line-clamp-1">{career.title}</h3>
                  <p className="mb-4 text-sm text-[#333F3C] line-clamp-2">{career.shortDescription}</p>

                  <div className="mb-6">
                    <div className="mb-2 flex items-center justify-between text-xs font-bold">
                      <span className="text-[#333F3C]">Progress</span>
                      <span className="text-[#004838]">{career.progress}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#EBEDE8]">
                      <div
                        className="h-full rounded-full bg-[#004838] transition-all duration-500"
                        style={{ width: `${career.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#073127]/10 bg-[#EBEDE8]/40 p-4">
                  <Link
                    href={`/my-careers/${career._id}`}
                    className="text-sm font-bold text-[#004838] hover:text-[#073127] transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => setConfirmDelete({ id: career._id, title: career.title })}
                    disabled={deletingId === career._id}
                    className="rounded-lg p-2 text-[#333F3C] transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    aria-label="Delete"
                  >
                    {deletingId === career._id ? (
                      <svg className="h-4 w-4 animate-spin text-red-600" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
