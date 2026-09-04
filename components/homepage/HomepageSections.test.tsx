import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AIFeatures from "./AIFeatures";
import Categories from "./Categories";
import CTA from "./CTA";
import FAQ from "./FAQ";
import Features from "./Features";
import HowItWorks from "./HowItWorks";

describe("homepage sections", () => {
  it("shows the core platform features and career planning steps", () => {
    render(
      <>
        <Features />
        <HowItWorks />
      </>,
    );

    expect(screen.getByRole("heading", { name: "Everything you need to advance" })).toBeTruthy();
    expect(screen.getByText("AI Career Roadmaps")).toBeTruthy();
    expect(screen.getByText("AI Mentor Chat")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "How SkillPilot Works" })).toBeTruthy();
    expect(screen.getByText("Define Your Goal")).toBeTruthy();
    expect(screen.getByText("Get AI Mentorship")).toBeTruthy();
  });

  it("shows category links with encoded destinations", () => {
    render(<Categories />);

    expect(screen.getByRole("heading", { name: "Discover Career Paths" })).toBeTruthy();
    expect(screen.getByText("Software Engineering")).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /Software Engineering/ }).getAttribute("href"),
    ).toBe("/explore?category=Software%20Engineering");
    expect(screen.getByRole("link", { name: "View All Careers" }).getAttribute("href")).toBe(
      "/explore",
    );
  });

  it("shows both AI feature entry points", () => {
    render(<AIFeatures />);

    expect(screen.getByRole("heading", { name: "Your AI Career Advantage" })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Try the Generator/ }).getAttribute("href")).toBe(
      "/add-career",
    );
    expect(screen.getByRole("link", { name: /Meet Your Mentor/ }).getAttribute("href")).toBe(
      "/mentor",
    );
  });

  it("toggles FAQ answers when questions are selected", () => {
    render(<FAQ />);

    const firstQuestion = screen.getByRole("button", {
      name: "How does the AI generate my learning roadmap?",
    });
    const secondQuestion = screen.getByRole("button", {
      name: "Is SkillPilot completely free to use?",
    });

    expect(firstQuestion.getAttribute("aria-expanded")).toBe("true");
    expect(secondQuestion.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(secondQuestion);
    expect(firstQuestion.getAttribute("aria-expanded")).toBe("false");
    expect(secondQuestion.getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(secondQuestion);
    expect(secondQuestion.getAttribute("aria-expanded")).toBe("false");
  });

  it("provides dashboard and roadmap calls to action", () => {
    render(<CTA />);

    expect(screen.getByRole("heading", { name: /Ready to take control/ })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Get Started for Free" }).getAttribute("href")).toBe(
      "/dashboard",
    );
    expect(screen.getByRole("link", { name: "View Example Roadmaps" }).getAttribute("href")).toBe(
      "/explore",
    );
  });
});