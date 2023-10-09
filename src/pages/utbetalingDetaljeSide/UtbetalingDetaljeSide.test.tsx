import { render } from "@testing-library/react";
import { SWRConfig } from "swr";
import { expect, test } from "vitest";
import { axe } from "vitest-axe";
import UtbetalingDetaljeSide from "./UtbetalingDetaljeSide";



test("Test av innhold i UtbetalingDetaljeSide", async () => {
  const { container } = render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <UtbetalingDetaljeSide />
    </SWRConfig>
  );

  expect(await axe(container)).toHaveNoViolations();
});
