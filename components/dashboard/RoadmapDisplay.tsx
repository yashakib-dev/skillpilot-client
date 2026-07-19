"use client";

import React, { useState } from "react";

export interface RoadmapMilestone {
  id: string;
  title: string;
  completed?: boolean;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  duration: string;
  skills: string[];
  milestones: RoadmapMilestone[];
}

export interface RoadmapKeySkill {
  name: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert" | string;
  estimatedHours: number | string;
}

export interface RoadmapProject {
  id: string;
  title: string;
  phase: string;
  description: string;
}

export interface RoadmapResource {
  id: string;
  title: string;
  type: "Course" | "Book" | "Docs" | "Article" | "Video" | string;
  duration: string;
}

export interface RoadmapData {
  careerPath: string;
  overallDuration: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert" | string;
  phases: RoadmapPhase[];
  keySkills: RoadmapKeySkill[];
  projects: RoadmapProject[];
  resources: RoadmapResource[];
}

const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  let colorClass = "bg-slate-500/10 text-slate-400 border-slate-500/20";
  const d = difficulty.toLowerCase();
  
  if (d === "easy" || d === "beginner") colorClass = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  if (d === "medium" || d === "intermediate") colorClass = "bg-amber-500/10 text-amber-400 border-amber-500/20";
  if (d === "hard" || d === "expert" || d === "advanced") colorClass = "bg-rose-500/10 text-rose-400 border-rose-500/20";

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${colorClass}`}>
      {difficulty}
    </span>
  );
};

const PhaseAccordion = ({ phase, index }: { phase: RoadmapPhase; index: number }) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div className="mb-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 transition-colors hover:border-slate-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-5 text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-sm font-bold text-indigo-400">
            {index + 1}
          </div>
          <div>
            <h3 className="font-semibold text-white">{phase.title}</h3>
            <p className="text-sm text-slate-400">{phase.duration}</p>
          </div>
        </div>
        <div className="text-slate-500 transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-slate-800 p-5 pt-4 animate-in slide-in-from-top-2 duration-200">
          <div className="mb-5">
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Focus Skills</h4>
            <div className="flex flex-wrap gap-2">
              {phase.skills.map((skill, i) => (
                <span key={i} className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Milestones</h4>
            <ul className="space-y-3">
              {phase.milestones.map((milestone) => (
                <li key={milestone.id} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-slate-700 bg-slate-800 text-transparent">
                    {milestone.completed && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-slate-300">{milestone.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default function RoadmapDisplay({ data }: { data: RoadmapData }) {
  if (!data) return null;

  return (
    <div className="w-full space-y-10 rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-8">
      
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            {data.careerPath} Roadmap
          </h2>
          <div className="mt-3 flex items-center gap-4 text-sm font-medium text-slate-400">
            <div className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {data.overallDuration}
            </div>
            <div className="h-1 w-1 rounded-full bg-slate-700" />
            <DifficultyBadge difficulty={data.difficulty} />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-10 lg:grid-cols-3">
        
        {/* Left Column: Phases */}
        <div className="lg:col-span-2">
          <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Learning Phases
          </h3>
          <div className="space-y-4">
            {data.phases.map((phase, index) => (
              <PhaseAccordion key={phase.id} phase={phase} index={index} />
            ))}
          </div>
        </div>

        {/* Right Column: Key Skills */}
        <div>
          <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Key Skills Target
          </h3>
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-800 bg-slate-900/80 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Skill</th>
                  <th className="px-4 py-3">Level</th>
                  <th className="px-4 py-3 text-right">Hrs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {data.keySkills.map((skill, i) => (
                  <tr key={i} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-medium text-slate-300">{skill.name}</td>
                    <td className="px-4 py-3 text-slate-400">{skill.proficiency}</td>
                    <td className="px-4 py-3 text-right text-slate-400">{skill.estimatedHours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div>
        <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          Recommended Projects
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.projects.map((project) => (
            <div key={project.id} className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition-all hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10">
              <span className="mb-3 inline-block rounded-md bg-indigo-500/10 px-2 py-1 text-xs font-semibold text-indigo-400">
                {project.phase}
              </span>
              <h4 className="mb-2 font-bold text-white">{project.title}</h4>
              <p className="text-sm leading-relaxed text-slate-400">{project.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div>
        <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
          Learning Resources
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.resources.map((resource) => (
            <div key={resource.id} className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition-colors hover:border-slate-700 hover:bg-slate-800/40">
              <div>
                <h4 className="mb-1 font-bold text-white line-clamp-2">{resource.title}</h4>
                <p className="mb-4 text-xs text-slate-500">{resource.type}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {resource.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
