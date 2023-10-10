import matchers from "@testing-library/jest-dom/matchers";
import { cleanup, render } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, expect, vi } from "vitest";
import "vitest-axe/extend-expect";
import * as axeMatchers from "vitest-axe/matchers";
import "whatwg-fetch";
import { server } from "./src/mocks/server.js";
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";

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

const customRender = ( children: React.ReactNode ) =>
  render(
    <BrowserRouter>
      <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
    </BrowserRouter>
  );
// override render export
export { customRender as render };
