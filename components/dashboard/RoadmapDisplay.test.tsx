import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RoadmapDisplay, { type RoadmapData } from "./RoadmapDisplay";

const roadmap: RoadmapData = {
  careerPath: "Frontend Developer",
  overallDuration: "12 months",
  difficulty: "Hard",
  phases: [
    {
      id: "foundations",
      title: "Web Foundations",
      duration: "3 months",
      skills: ["HTML", "CSS"],
      milestones: [
        { id: "html", title: "Build a semantic page", completed: true },
        { id: "css", title: "Create a responsive layout" },
      ],
    },
    {
      id: "frameworks",
      title: "Modern Frameworks",
      duration: "4 months",
      skills: ["React"],
      milestones: [{ id: "react", title: "Ship a React project" }],
    },
  ],
  keySkills: [{ name: "React", proficiency: "Intermediate", estimatedHours: 80 }],
  projects: [{ id: "portfolio", title: "Portfolio site", phase: "Phase 1", description: "Build a personal portfolio." }],
  resources: [{ id: "docs", title: "React documentation", type: "Docs", duration: "2 hours" }],
};

describe("RoadmapDisplay", () => {
  it("renders roadmap content and toggles phase details", () => {
    render(<RoadmapDisplay data={roadmap} />);

    expect(screen.getByRole("heading", { name: "Frontend Developer Roadmap" })).toBeTruthy();
    expect(screen.getByText("Hard")).toBeTruthy();
    expect(screen.getByText("HTML")).toBeTruthy();
    expect(screen.getByText("Build a semantic page")).toBeTruthy();
    expect(screen.getByText("React documentation")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /Modern Frameworks/ }));
    expect(screen.getAllByText("React").length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("button", { name: /Web Foundations/ }));
    expect(screen.queryByText("Build a semantic page")).toBeNull();
  });

  it("renders nothing when roadmap data is missing", () => {
    const { container } = render(<RoadmapDisplay data={null as unknown as RoadmapData} />);

    expect(container.firstChild).toBeNull();
  });
});