import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CareerGrid from "./CareerGrid";
import type { Career } from "@/types/career";

function createCareers(count: number): Career[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `career-${index + 1}`,
    title: `Career ${index + 1}`,
    description: `Description for career ${index + 1}`,
    difficulty: "Beginner",
    category: "Technology",
    skills: ["Research"],
    avgSalary: "$80,000",
    timeToLearn: "6 months",
    coverImage: "/career.jpg",
  }));
}

describe("CareerGrid", () => {
  it("renders loading placeholders", () => {
    const { container } = render(<CareerGrid careers={[]} isLoading />);

    expect(container.querySelectorAll(".animate-pulse").length).toBe(12);
  });

  it("shows an empty state when no careers are available", () => {
    render(<CareerGrid careers={[]} />);

    expect(screen.getByRole("heading", { name: "No careers found" })).toBeTruthy();
  });

  it("paginates careers and scrolls back to the grid", () => {
    const scrollIntoView = vi.fn();
    vi.spyOn(document, "getElementById").mockReturnValue({ scrollIntoView } as unknown as HTMLElement);
    render(<CareerGrid careers={createCareers(13)} />);

    expect(screen.getByText("1–12")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));

    expect(screen.getByText("13–13")).toBeTruthy();
    expect(screen.getByText("Career 13")).toBeTruthy();
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
    expect(screen.getByRole("button", { name: "Next page" }).hasAttribute("disabled")).toBe(true);
  });
});