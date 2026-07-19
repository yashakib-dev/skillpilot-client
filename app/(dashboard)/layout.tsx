import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";

export const metadata = {
  title: "Dashboard - SkillPilot",
  description: "Manage your career plans and resources.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-200 pt-[72px]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {/* We add a max width wrapper for the main content */}
        <div className="mx-auto max-w-6xl p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
