import { screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { axe } from "vitest-axe";
import UtbetalingDetaljeSide from "./UtbetalingDetaljeSide";
import { render } from "~vitest-setup";
import { handleGet } from "~mocks/handlers";
import { server } from "~mocks/server";
import { enkelUtbetalingAPIUrl } from "~utils/urls";

test("Viser innhold på detaljeside", async () => {
  const { container } = render(<UtbetalingDetaljeSide />);

  expect(await axe(container)).toHaveNoViolations();

  expect(
    await screen.findByRole("heading", {
      name: "Arbeidsavklaringspenger",
      level: 1,
    })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole("heading", {
      name: "Detaljer",
      level: 2,
    })
  ).toBeInTheDocument();

  expect(await screen.findByText(/Brutto/)).toBeInTheDocument();

  expect(await screen.findByText(/Netto utbetalt/)).toBeInTheDocument();

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

test("Vise ingen brutto-felt for betaling uten trekk", async () => {
  render(<UtbetalingDetaljeSide />);
  server.use(
    handleGet(enkelUtbetalingAPIUrl(""), {
      kontonummer: "xxxx6543",
      ytelse: "Arbeidsavklaringspenger",
      erUtbetalt: true,
      ytelsePeriode: {
        fom: "2023-08-21",
        tom: "2023-08-31",
      },
      ytelseDato: "2023-09-07",
      underytelse: [
        {
          beskrivelse: "AAP",
          sats: 2052,
          antall: 4,
          beløp: 8208,
          satstype: "***",
        },
      ],
      trekk: [],
      melding: "",
      bruttoUtbetalt: 8208,
      nettoUtbetalt: 8208,
    })
  );
  expect(await screen.findByText(/Netto utbetalt/)).toBeInTheDocument();

  expect(screen.queryByText(/Brutto/)).toBeNull();
});

test("Vise netto-label som Sum for utbetaling med bare trekk", async () => {
  render(<UtbetalingDetaljeSide />);
  server.use(
    handleGet(enkelUtbetalingAPIUrl(""), {
      kontonummer: "xxxx6543",
      ytelse: "Arbeidsavklaringspenger",
      erUtbetalt: true,
      ytelsePeriode: {
        fom: "2023-08-21",
        tom: "2023-08-31",
      },
      ytelseDato: "2023-09-07",
      underytelse: [],
      trekk: [
        {
          type: "Skattetrekk",
          beløp: 8208,
        },
      ],
      melding: "",
      bruttoUtbetalt: 8208,
      nettoUtbetalt: 8208,
    })
  );
  expect(await screen.findByText(/Sum/)).toBeInTheDocument();
});
