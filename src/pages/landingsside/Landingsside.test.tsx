import { render, screen } from "@testing-library/react";
import { SWRConfig } from "swr";
import { expect, test } from "vitest";
import { axe } from "vitest-axe";
import Landingsside from "./Landingsside";

test("Test av innhold i Landingsside", async () => {
  const { container } = render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <Landingsside />
    </SWRConfig>
  );

  expect(await axe(container)).toHaveNoViolations();

  expect(
    await screen.findByRole("heading", {
      name: "Utbetalinger",
      level: 1,
    })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole("heading", { name: "Neste utbetaling", level: 2 })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole("heading", { name: "Siste 3 måneder", level: 2 })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole("heading", { name: "Utbetalt i perioden", level: 2 })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole("heading", { name: "Relatert innhold", level: 2 })
  ).toBeInTheDocument();

  expect(
    await screen.findByText("Velg periode")
  ).toBeInTheDocument();

  expect(
    await screen.findByText("Velg pengestøtte")
  ).toBeInTheDocument();
});
