import { act, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Statistics from "./Statistics";

let observerCallbacks: IntersectionObserverCallback[];
let animationFrames: FrameRequestCallback[];

beforeEach(() => {
  animationFrames = [];
  observerCallbacks = [];
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        observerCallbacks.push(callback);
      }

      observe() {}
      disconnect() {}
      unobserve() {}
      takeRecords() {
        return [];
      }
    },
  );
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    animationFrames.push(callback);
    return animationFrames.length;
  });
});

describe("Statistics", () => {
  it("starts counters when the statistics section becomes visible", async () => {
    render(<Statistics />);

    expect(screen.getByText("Active Users")).toBeTruthy();
    expect(screen.getAllByText("0K+").length).toBe(2);

    act(() => {
      observerCallbacks.forEach((callback) =>
        callback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver),
      );
    });
    await waitFor(() => expect(animationFrames.length).toBe(4));
    act(() => {
      const initialFrames = animationFrames.splice(0);
      initialFrames.forEach((frame) => frame(1));
      const finalFrames = animationFrames.splice(0);
      finalFrames.forEach((frame) => frame(2001));
    });

    expect(screen.getByText((_, element) => element?.textContent === "50K+")).toBeTruthy();
  });
});