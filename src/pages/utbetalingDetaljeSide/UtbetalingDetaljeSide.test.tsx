import { render, screen } from "@testing-library/react";
import { SWRConfig } from "swr";
import UtbetalingDetaljeSide from "./UtbetalingDetaljeSide";
import { axe } from "vitest-axe";
import { expect, test, vi } from "vitest";



test("Test av innhold i UtbetalingDetaljeSide", async () => {
  const { container } = render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <UtbetalingDetaljeSide />
    </SWRConfig>
  );

  expect(await axe(container)).toHaveNoViolations();
});
