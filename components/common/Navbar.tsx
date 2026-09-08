"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, authClient } from "@/app/lib/auth-client";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
          router.refresh();
        }
      }
    });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-[#073127]/10 bg-[#EBEDE8]/90 shadow-[0_4px_24px_rgba(7,49,39,0.06)] backdrop-blur-xl" : "border-b border-transparent bg-[#EBEDE8]/70 backdrop-blur-md"}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <nav className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 no-underline">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#004838] shadow-[0_4px_14px_rgba(0,72,56,0.3)] transition-all duration-300 group-hover:scale-105">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E2FB6C"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-[#073127]">
              Skill<span className="text-[#004838]">Pilot</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${pathname === link.href ? "bg-[#004838]/10 text-[#073127] font-semibold border border-[#004838]/20" : "text-[#333F3C] hover:bg-[#004838]/5 hover:text-[#073127]"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="h-10 w-24 animate-pulse rounded-full bg-[#073127]/10" />
            ) : session ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#004838] font-bold uppercase text-[#E2FB6C]">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User avatar"}
                        width={36}
                        height={36}
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      session.user?.name?.charAt(0) || "U"
                    )}
                  </div>
                  <span className="text-sm font-medium text-[#073127]">{session.user?.name}</span>
                </div>
                <button onClick={handleSignOut} className="inline-flex items-center rounded-full border border-[#073127]/20 bg-white/70 px-4 py-2.5 text-sm font-semibold text-[#073127] transition hover:border-red-500 hover:bg-red-50 hover:text-red-600">
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="inline-flex items-center rounded-full border border-[#073127]/20 bg-white/80 px-4 py-2.5 text-sm font-semibold text-[#073127] transition hover:border-[#004838] hover:bg-[#004838]/10">
                  Sign In
                </Link>
                <Link href="/auth/register" className="inline-flex items-center gap-2 rounded-full bg-[#004838] px-5 py-2.5 text-sm font-bold text-[#E2FB6C] shadow-[0_4px_16px_rgba(0,72,56,0.3)] transition hover:-translate-y-0.5 hover:bg-[#073127] hover:shadow-[0_6px_20px_rgba(0,72,56,0.4)]">
                  Get Started
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            className={`md:hidden flex flex-col gap-1.5 rounded-lg border p-2 transition-all duration-200 ${menuOpen ? "border-[#004838]/30 bg-[#004838]/10" : "border-transparent bg-transparent"}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className={`block h-0.5 w-[22px] origin-center bg-[#073127] transition-all duration-300 ${menuOpen ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`block h-0.5 w-[22px] bg-[#073127] transition-all duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`block h-0.5 w-[22px] origin-center bg-[#073127] transition-all duration-300 ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`overflow-hidden transition-all duration-300 md:hidden ${menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col gap-1 border-t border-[#073127]/10 pb-4 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${pathname === link.href ? "bg-[#004838]/10 text-[#073127] font-semibold" : "text-[#333F3C] hover:bg-[#004838]/5 hover:text-[#073127]"}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-[#073127]/10 pt-3">
              {isPending ? (
                <div className="h-10 w-full animate-pulse rounded-full bg-[#073127]/10" />
              ) : session ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#004838] font-bold uppercase text-[#E2FB6C]">
                      {session.user?.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || "User avatar"}
                          width={40}
                          height={40}
                          unoptimized
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        session.user?.name?.charAt(0) || "U"
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#073127]">{session.user?.name}</span>
                      <span className="text-xs text-[#333F3C]/80">{session.user?.email}</span>
                    </div>
                  </div>
                  <button onClick={handleSignOut} className="inline-flex w-full items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-500/20">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="inline-flex items-center justify-center rounded-full border border-[#073127]/20 bg-white/80 px-4 py-2.5 text-sm font-semibold text-[#073127] transition hover:bg-[#004838]/10">
                    Sign In
                  </Link>
                  <Link href="/auth/register" className="inline-flex items-center justify-center rounded-full bg-[#004838] px-4 py-2.5 text-sm font-bold text-[#E2FB6C] shadow-[0_4px_16px_rgba(0,72,56,0.3)] transition hover:-translate-y-0.5">
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
