import { screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { axe } from "vitest-axe";
import UtbetalingDetaljeSide from "./UtbetalingDetaljeSide";
import { render } from "~vitest-setup";

test("Viser seksjoner på detaljeside", async () => {
  const { container } = render(<UtbetalingDetaljeSide />);

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
      name: "Detaljer",
      level: 2,
    })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole("heading", {
      name: "Melding",
      level: 2,
    })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole("heading", {
      name: "Periode",
      level: 2,
    })
  ).toBeInTheDocument();
});