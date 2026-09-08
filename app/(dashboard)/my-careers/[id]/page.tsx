"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import RoadmapDisplay from "@/components/dashboard/RoadmapDisplay";

function DeleteModal({
  onConfirm,
  onCancel,
  isDeleting,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#073127]/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-md rounded-2xl border border-[#073127]/10 bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#073127]">Delete Career Plan</h3>
            <p className="text-sm text-[#333F3C]/70">This action cannot be undone.</p>
          </div>
        </div>
        <p className="mb-6 rounded-xl bg-[#EBEDE8] px-4 py-3 text-sm text-[#333F3C]">
          All associated data will be permanently removed. Are you sure you want to proceed?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 rounded-xl border border-[#073127]/10 bg-[#EBEDE8] px-4 py-2.5 text-sm font-semibold text-[#073127] transition-colors hover:bg-slate-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-70"
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

interface CareerPlan {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  priorityMonths: number;
  imageUrl?: string;
  experience: string[];
  availableTime: number;
  technologies: string[];
  status: string;
  progress: number;
  roadmap: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function CareerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [career, setCareer] = useState<CareerPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSavingProgress, setIsSavingProgress] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const res = await fetch(`/api/careers/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            toast.error("Career plan not found.");
            router.replace("/my-careers");
            return;
          }
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setCareer(data);
        setProgress(data.progress ?? 0);
      } catch (error) {
        toast.error("Failed to load career details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchCareer();
  }, [id, router]);

  const handleProgressSave = async () => {
    if (!career) return;
    setIsSavingProgress(true);
    try {
      const newStatus = progress === 100 ? "Completed" : "In Progress";
      const res = await fetch(`/api/careers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progress, status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update");
      const updated = await res.json();
      setCareer(updated);
      toast.success("Progress updated!");
    } catch {
      toast.error("Failed to update progress.");
    } finally {
      setIsSavingProgress(false);
    }
  };

  const handleGenerateRoadmap = async () => {
    setIsGenerating(true);
    const toastId = toast.loading("Generating AI Roadmap... This might take a few seconds.");
    try {
      const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${SERVER_URL}/api/careers/${id}/generate`, {
        method: "POST",
      });
      
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to generate roadmap");
      }
      
      setCareer(data);
      toast.success("AI Roadmap generated successfully!", { id: toastId });
    } catch (error: any) {
      const msg = error?.message || "Failed to generate AI roadmap.";
      toast.error(msg, { id: toastId });
      console.error("Generate roadmap error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/careers/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Career plan deleted.");
      router.push("/my-careers");
    } catch {
      toast.error("Failed to delete career plan.");
      setIsDeleting(false);
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="h-8 w-64 rounded bg-[#EBEDE8] animate-pulse" />
        <div className="h-64 rounded-2xl bg-white animate-pulse border border-[#073127]/10" />
      </div>
    );
  }

  if (!career) return null;

  return (
    <>
      {showDeleteModal && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          isDeleting={isDeleting}
        />
      )}
    <div className="max-w-4xl space-y-8">
      {/* Back link */}
      <Link
        href="/my-careers"
        className="inline-flex items-center gap-2 text-sm text-[#333F3C]/70 hover:text-[#073127] transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to My Careers
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-3">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
              career.status === "Completed"
                ? "bg-[#004838]/10 text-[#004838] border border-[#004838]/20"
                : "bg-[#004838]/10 text-[#004838] border border-[#004838]/20"
            }`}>
              {career.status}
            </span>
            <span className="text-xs text-[#333F3C]/60">
              Created {new Date(career.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#073127]">{career.title}</h1>
          <p className="mt-2 text-[#333F3C]/80">{career.shortDescription}</p>
        </div>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="inline-flex items-center gap-2 self-start rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-500/20"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
          Delete Plan
        </button>
      </div>

      {/* Optional image */}
      {career.imageUrl && (
        <div className="overflow-hidden rounded-2xl border border-[#073127]/10 bg-white shadow-sm">
          <Image
            src={career.imageUrl}
            alt={career.title}
            width={1200}
            height={384}
            unoptimized
            className="h-48 w-full object-cover"
          />
        </div>
      )}

      {/* Progress tracker */}
      <div className="rounded-2xl border border-[#073127]/10 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-[#073127]">Progress Tracker</h2>
        <div className="mb-3 flex items-center justify-between text-sm font-medium">
          <span className="text-[#333F3C]/70">Current Progress</span>
          <span className="text-2xl font-bold text-[#004838]">{progress}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="mb-4 w-full accent-[#004838]"
        />
        <div className="mb-4 h-3 w-full overflow-hidden rounded-full bg-[#EBEDE8]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#004838] to-[#073127] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <button
          onClick={handleProgressSave}
          disabled={isSavingProgress || progress === career.progress}
          className="rounded-full bg-[#004838] px-6 py-2 text-sm font-semibold text-[#E2FB6C] shadow transition-all hover:bg-[#073127] disabled:opacity-50"
        >
          {isSavingProgress ? "Saving..." : "Save Progress"}
        </button>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Stats */}
        <div className="rounded-2xl border border-[#073127]/10 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-[#073127]">Plan Details</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-[#333F3C]/70">Target Duration</dt>
              <dd className="font-semibold text-[#073127]">{career.priorityMonths ? `${career.priorityMonths} months` : "—"}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-[#333F3C]/70">Available Time</dt>
              <dd className="font-semibold text-[#073127]">{career.availableTime ? `${career.availableTime} hrs/week` : "—"}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-[#333F3C]/70">Last Updated</dt>
              <dd className="font-semibold text-[#073127]">{new Date(career.updatedAt).toLocaleDateString()}</dd>
            </div>
          </dl>
        </div>

        {/* Technologies & Experience */}
        <div className="rounded-2xl border border-[#073127]/10 bg-white p-6 shadow-sm space-y-5">
          {career.experience?.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-[#073127]">Experience Levels</h3>
              <div className="flex flex-wrap gap-2">
                {career.experience.map((e) => (
                  <span key={e} className="rounded-full bg-[#EBEDE8] px-3 py-1 text-xs font-medium text-[#073127] border border-[#073127]/10">{e}</span>
                ))}
              </div>
            </div>
          )}
          {career.technologies?.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-[#073127]">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {career.technologies.map((t) => (
                  <span key={t} className="rounded-full bg-[#004838]/10 px-3 py-1 text-xs font-medium text-[#004838] border border-[#004838]/20">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full description */}
      {career.fullDescription && (
        <div className="rounded-2xl border border-[#073127]/10 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-bold text-[#073127]">Description</h2>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#333F3C]/80">{career.fullDescription}</p>
        </div>
      )}

      {/* AI Roadmap container */}
      <div className="rounded-2xl border border-dashed border-[#004838]/30 bg-[#004838]/5 p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#004838]/10 text-[#004838]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#073127]">AI Roadmap</h2>
            <p className="text-xs text-[#333F3C]/70">Custom tailored learning path</p>
          </div>
        </div>
        {career.roadmap ? (
          (() => {
            let parsedRoadmap = null;
            try {
              parsedRoadmap = typeof career.roadmap === 'string' 
                ? JSON.parse(career.roadmap) 
                : career.roadmap;
            } catch (e) {
              // Not valid JSON, fallback to plain text
            }
            
            if (parsedRoadmap && typeof parsedRoadmap === 'object' && parsedRoadmap.careerPath) {
              return <RoadmapDisplay data={parsedRoadmap} />;
            }
            
            return (
              <div className="whitespace-pre-wrap rounded-xl bg-white p-4 text-sm text-[#333F3C] border border-[#073127]/10">
                {String(career.roadmap)}
              </div>
            );
          })()
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-[#333F3C]/70">
            <p className="text-sm">No roadmap generated yet.</p>
            <button
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-[#004838]/30 bg-[#004838] px-6 py-2 text-sm font-semibold text-[#E2FB6C] shadow transition-colors hover:bg-[#073127] disabled:opacity-50"
              onClick={handleGenerateRoadmap}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating...
                </>
              ) : (
                "Generate AI Roadmap"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
