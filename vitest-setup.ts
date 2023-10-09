import "vitest-axe/extend-expect";
import matchers from "@testing-library/jest-dom/matchers";
import * as axeMatchers from "vitest-axe/matchers";
import { afterAll, afterEach, beforeAll, expect, vi } from "vitest";
import { server } from "./src/mocks/server.js";
import { cleanup, render } from "@testing-library/react";
import "whatwg-fetch";
expect.extend(matchers);
expect.extend(axeMatchers);

// @ts-expect-error mock for å fikse jsdom-feil i testene
HTMLCanvasElement.prototype.getContext = vi.fn();

beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});

const customRender = (ui: any, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  });

// override render export
export { customRender as render };
