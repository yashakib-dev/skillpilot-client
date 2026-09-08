"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/app/lib/auth-client";
import toast from "react-hot-toast";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface CareerPlan {
  _id: string;
  status: string;
}

export default function DashboardOverviewPage() {
  const { data: session } = useSession();
  const [careers, setCareers] = useState<CareerPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch("/api/careers");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCareers(data);
      } catch (error) {
        toast("Please login to access dashboard.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const totalPlans = careers.length;
  const completedPlans = careers.filter((c) => c.status === "Completed").length;
  const inProgressPlans = careers.filter((c) => c.status === "In Progress").length;

  const statusChartData = [
    { name: "Completed", value: completedPlans, color: "#22c55e" },
    { name: "In Progress", value: inProgressPlans, color: "#3b82f6" },
    {
      name: "Not Started",
      value: totalPlans - completedPlans - inProgressPlans,
      color: "#8b5cf6",
    },
  ].filter((item) => item.value > 0);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 rounded bg-[#EBEDE8] animate-pulse" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-2xl bg-white animate-pulse border border-[#073127]/10" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#073127]">
          Welcome back, {session?.user?.name?.split(" ")[0] || "User"}! 👋
        </h1>
        <p className="mt-2 text-[#333F3C]">Here{"'"}s a quick overview of your career journey.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Total Plans Card */}
        <div className="rounded-2xl border border-[#073127]/10 bg-white p-6 shadow-[0_8px_30px_rgba(7,49,39,0.05)] transition-all hover:border-[#004838]/30">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#004838] text-[#E2FB6C] shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-[#333F3C]">Total Plans</p>
              <p className="text-3xl font-extrabold text-[#073127]">{totalPlans}</p>
            </div>
          </div>
        </div>

        {/* In Progress Card */}
        <div className="rounded-2xl border border-[#073127]/10 bg-white p-6 shadow-[0_8px_30px_rgba(7,49,39,0.05)] transition-all hover:border-[#004838]/30">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#004838]/10 text-[#004838]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-[#333F3C]">In Progress</p>
              <p className="text-3xl font-extrabold text-[#073127]">{inProgressPlans}</p>
            </div>
          </div>
        </div>

        {/* Completed Card */}
        <div className="rounded-2xl border border-[#073127]/10 bg-white p-6 shadow-[0_8px_30px_rgba(7,49,39,0.05)] transition-all hover:border-[#004838]/30">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-[#333F3C]">Completed</p>
              <p className="text-3xl font-extrabold text-[#073127]">{completedPlans}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Distribution Chart */}
      {statusChartData.length > 0 && (
        <div className="rounded-2xl border border-[#073127]/10 bg-white p-6 shadow-[0_8px_30px_rgba(7,49,39,0.05)]">
          <h2 className="mb-6 text-xl font-bold text-[#073127]">Career Plan Status</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Pie Chart */}
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #D5DAD2",
                      borderRadius: "12px",
                      color: "#073127",
                    }}
                  />
                  <Legend
                    formatter={(value) => (
                      <span className="text-[#333F3C] font-semibold">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statusChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D5DAD2" />
                  <XAxis dataKey="name" stroke="#333F3C" tick={{ fill: "#333F3C" }} />
                  <YAxis stroke="#333F3C" tick={{ fill: "#333F3C" }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #D5DAD2",
                      borderRadius: "12px",
                      color: "#073127",
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {statusChartData.map((entry, index) => (
                      <Cell key={`bar-cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="rounded-2xl border border-[#073127]/10 bg-white p-6 shadow-[0_8px_30px_rgba(7,49,39,0.05)]">
        <h2 className="mb-4 text-xl font-bold text-[#073127]">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/add-career"
            className="inline-flex items-center gap-2 rounded-full bg-[#004838] px-6 py-3 font-bold text-[#E2FB6C] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#073127]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Create New Plan
          </Link>
          <Link
            href="/my-careers"
            className="inline-flex items-center gap-2 rounded-full border border-[#073127]/20 bg-white px-6 py-3 font-semibold text-[#073127] transition-all hover:-translate-y-0.5 hover:bg-[#EBEDE8]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            View My Careers
          </Link>
        </div>
      </div>
    </div>
  );
}
