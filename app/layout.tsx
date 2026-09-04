import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillPilot - AI-Powered Career Roadmaps",
  description:
    "Navigate your career with AI-generated personalized learning roadmaps, smart skill recommendations, and a dedicated career mentor. Build the future you want with SkillPilot.",
  keywords: ["career planning", "AI roadmap", "skill development", "career mentor", "learning path"],
  openGraph: {
    title: "SkillPilot - AI-Powered Career Roadmaps",
    description: "Navigate your career with AI-generated personalized learning roadmaps.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
