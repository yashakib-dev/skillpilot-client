import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
  test: {
    environment: "jsdom",
    include: ["**/*.test.ts", "**/*.test.tsx"],
    coverage: {
      provider: "v8",
      include: ["components/**/*.{ts,tsx}"],
      reporter: ["text", "html"],
      thresholds: {
        lines: 50,
        functions: 50,
        statements: 50,
      },
    },
  },
});