"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const TECH_OPTIONS = ["JavaScript", "Python", "React", "Node.js", "AWS", "Docker", "Go", "TypeScript"];
const EXP_OPTIONS = ["Beginner", "Intermediate", "Advanced", "Professional"];

export default function AddCareerPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    priorityMonths: 6,
    imageUrl: "",
    experience: [] as string[],
    availableTime: 10,
    technologies: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechToggle = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter((t) => t !== tech)
        : [...prev.technologies, tech],
    }));
  };

  const handleExpToggle = (exp: string) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.includes(exp)
        ? prev.experience.filter((e) => e !== exp)
        : [...prev.experience, exp],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.shortDescription) {
      toast.error("Please fill in the required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create career plan.");
      }

      toast.success("Career plan created successfully!");
      router.push("/my-careers");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAIGenerate = async () => {
    if (!formData.title || !formData.shortDescription) {
      toast.error("Please fill in the required fields first.");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Creating career plan and generating AI roadmap...");
    
    try {
      // First, create the career plan
      const createRes = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!createRes.ok) {
        throw new Error("Failed to create career plan.");
      }

      const createdCareer = await createRes.json();
      const careerId = createdCareer._id;

      // Then, generate the AI roadmap
      const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const genRes = await fetch(`${SERVER_URL}/api/careers/${careerId}/generate`, {
        method: "POST",
      });

      if (!genRes.ok) {
        const errData = await genRes.json().catch(() => ({}));
        throw new Error(errData?.error || "Failed to generate AI roadmap");
      }

      toast.success("Career plan & AI roadmap created successfully!", { id: toastId });
      router.push(`/my-careers/${careerId}`);
      router.refresh();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Something went wrong.";
      toast.error(msg, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Create Career Plan</h1>
        <p className="mt-2 text-slate-400">Map out your future career goals and generate an AI roadmap.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl backdrop-blur-sm sm:p-8">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Basic Details</h2>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Career Goal Title *</label>
            <input
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-slate-200 transition focus:border-indigo-500 focus:outline-none"
              placeholder="e.g. Full Stack Developer"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Short Description *</label>
            <input
              required
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-slate-200 transition focus:border-indigo-500 focus:outline-none"
              placeholder="A brief summary of your goal"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Full Description</label>
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              rows={4}
              className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-slate-200 transition focus:border-indigo-500 focus:outline-none"
              placeholder="Detailed explanation of what you want to achieve..."
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Optional Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-slate-200 transition focus:border-indigo-500 focus:outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="mt-8 space-y-6 border-t border-slate-800 pt-6">
          <h2 className="text-lg font-semibold text-white">Preferences & Experience</h2>
          
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Target Duration: <span className="text-indigo-400 font-bold">{formData.priorityMonths} Months</span>
            </label>
            <input
              type="range"
              name="priorityMonths"
              min="1"
              max="24"
              value={formData.priorityMonths}
              onChange={handleChange}
              className="w-full accent-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Available Time per Week: <span className="text-indigo-400 font-bold">{formData.availableTime} Hours</span>
            </label>
            <input
              type="range"
              name="availableTime"
              min="1"
              max="40"
              value={formData.availableTime}
              onChange={handleChange}
              className="w-full accent-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Current Experience Level (Select all that apply)</label>
            <div className="flex flex-wrap gap-2">
              {EXP_OPTIONS.map((exp) => (
                <button
                  key={exp}
                  type="button"
                  onClick={() => handleExpToggle(exp)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    formData.experience.includes(exp)
                      ? "bg-indigo-600 text-white border border-indigo-500"
                      : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700"
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Preferred Technologies</label>
            <div className="flex flex-wrap gap-2">
              {TECH_OPTIONS.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => handleTechToggle(tech)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    formData.technologies.includes(tech)
                      ? "bg-violet-600 text-white border border-violet-500"
                      : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-800 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-2.5 font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
          >
            {isSubmitting ? "Saving..." : "Save Career Plan"}
          </button>
          
          <button
            type="button"
            onClick={handleAIGenerate}
            className="flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-6 py-2.5 font-semibold text-indigo-400 transition-colors hover:bg-indigo-500/20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Generate AI Roadmap
          </button>

        </div>
      </form>
    </div>
  );
}
