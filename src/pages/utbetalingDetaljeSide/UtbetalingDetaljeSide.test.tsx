import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import { expect, test } from "vitest";
import { axe } from "vitest-axe";
import UtbetalingDetaljeSide from "./UtbetalingDetaljeSide";

test("Test av innhold i UtbetalingDetaljeSide", async () => {
  const { container } = render(
    <BrowserRouter>
      <SWRConfig value={{ provider: () => new Map() }}>
        <UtbetalingDetaljeSide />
      </SWRConfig>
    </BrowserRouter>
  );

  expect(await axe(container)).toHaveNoViolations();

  expect(
    await screen.findByRole("heading", {
      name: "Arbeidsavklaringspenger",
      level: 1,
    })
  ).toBeInTheDocument();

  expect(await screen.findByText("Utbetalt 07.09.2023")).toBeInTheDocument();
  expect(
    await screen.findByRole("heading", {
      name: /4\s104 kr/,
      level: 2,
    })
  ).toBeInTheDocument();
});
