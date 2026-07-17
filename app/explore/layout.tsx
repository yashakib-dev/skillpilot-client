import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Career Paths | SkillPilot",
  description:
    "Browse 24+ curated AI-powered career roadmaps across Software Engineering, Data Science, Design, and more. Filter by difficulty, category, or salary.",
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
