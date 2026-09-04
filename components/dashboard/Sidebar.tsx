"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient, useSession } from "@/app/lib/auth-client";

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function ListIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );
}

function SidebarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M9 3v18" />
    </svg>
  );
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function MentorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

const navItems = [
  { icon: HomeIcon, label: "Overview", href: "/dashboard" },
  { icon: MentorIcon, label: "Mentor", href: "/mentor" },
  { icon: ListIcon, label: "My Careers", href: "/my-careers" },
  { icon: PlusIcon, label: "Add Career Plan", href: "/add-career" },
];

export default function Sidebar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/auth/login");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  if (isPending) {
    return (
      <aside className="hidden lg:flex w-64 shrink-0 bg-slate-950 border-r border-slate-800 min-h-screen flex-col p-5">
        <div className="h-8 w-32 rounded-lg bg-slate-800 animate-pulse mb-8" />
        <div className="space-y-3 flex-1">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-10 rounded-xl bg-slate-800/60 animate-pulse" />
          ))}
        </div>
      </aside>
    );
  }

  if (!session) return null;

  const user = session.user;

  async function handleLogout() {
    await authClient.signOut();
    router.replace("/");
  }

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
              isActive
                ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 font-semibold"
                : "text-slate-400 hover:bg-slate-800/40 hover:text-white"
            }`}
          >
            <item.icon className={`h-5 w-5 transition-colors ${isActive ? "text-indigo-400" : "text-slate-500"}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const userCard = (
    <div className="border-t border-slate-800/80 pt-4 mt-4">
      <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-800/40 mb-3">
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-indigo-500/20 flex items-center justify-center text-sm font-bold text-indigo-300">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name || "User avatar"}
              width={36}
              height={36}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : (
            user?.name?.charAt(0).toUpperCase() || "U"
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white truncate">{user?.name || "User"}</p>
          <p className="text-xs text-slate-500 truncate">{user?.email}</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
      >
        <LogoutIcon className="h-5 w-5" />
        Sign Out
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-slate-950 border-r border-slate-800/80 sticky top-[72px] h-[calc(100vh-72px)] flex-col">
        <div className="px-5 py-6 border-b border-slate-800/80">
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-[0_4px_16px_rgba(99,102,241,0.4)] transition-all duration-300 group-hover:scale-105">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-100">
              Skill<span className="text-indigo-400">Pilot</span>
            </span>
          </Link>
        </div>

        <div className="flex-1 px-3 py-5">
          <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Menu</p>
          {navContent}
        </div>

        <div className="px-3 py-4">
          {userCard}
        </div>
      </aside>

      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="lg:hidden fixed top-20 right-4 z-40 min-w-10 w-10 h-10 p-0 flex items-center justify-center rounded-xl bg-slate-950/90 border border-slate-800 text-slate-300 backdrop-blur-md transition-all shadow-lg shadow-black/40 hover:text-white hover:border-slate-700"
      >
        <SidebarIcon className="w-5 h-5" />
      </button>

      {/* Mobile drawer backdrop */}
      {drawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile drawer panel */}
      <div
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-72 bg-slate-950 border-r border-slate-800/80 flex flex-col transform transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-800/80">
          <Link href="/" className="flex items-center gap-3 no-underline group" onClick={() => setDrawerOpen(false)}>
             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-[0_4px_16px_rgba(99,102,241,0.4)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-100">
              Skill<span className="text-indigo-400">Pilot</span>
            </span>
          </Link>
          <button
            onClick={() => setDrawerOpen(false)}
            className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 px-3 py-5">
          <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Menu</p>
          {navContent}
        </div>

        <div className="px-3 py-4">
          {userCard}
        </div>
      </div>
    </>
  );
}
