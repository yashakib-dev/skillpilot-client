import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CareerCard, CareerCardSkeleton } from "./CareerCard";

const career = {
  id: "frontend-developer",
  title: "Frontend Developer",
  description: "Build accessible and engaging web experiences.",
  difficulty: "Beginner" as const,
  category: "Technology",
  skills: ["HTML", "CSS", "JavaScript"],
  avgSalary: "$85,000",
  timeToLearn: "6 months",
  coverImage: "/images/frontend-developer.jpg",
};

describe("CareerCard", () => {
  it("renders career details and links to the career page", () => {
    render(<CareerCard career={career} />);

    expect(screen.getByLabelText("Career card for Frontend Developer")).toBeTruthy();
    expect(screen.getByText("Technology")).toBeTruthy();
    expect(screen.getByText("Beginner")).toBeTruthy();
    expect(screen.getByText(career.description)).toBeTruthy();
    expect(screen.getByText(career.timeToLearn)).toBeTruthy();
    expect(screen.getByText(career.avgSalary)).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: "View details for Frontend Developer" })
        .getAttribute("href"),
    ).toBe("/careers/frontend-developer");
  });

  it("renders the loading skeleton", () => {
    const { container } = render(<CareerCardSkeleton />);

    expect(container.firstElementChild?.classList.contains("animate-pulse")).toBe(true);
  });
});