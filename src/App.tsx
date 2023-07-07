import style from "./App.module.css";
import { BodyShort, Heading, Link } from "@navikt/ds-react";
import text from "./language/text.jsx";
import UtbetalingInMonth from "./components/utbetalingerInMonth/UtbetalingerInMonth.tsx";
import UtbetalingLinkPanel from "./components/utbetalingLinkPanel/UtbetalingLinkPanel.tsx";

const relatertInnholdLinks = [
  {
    titleId: "satser",
    href: "http://localhost:3000/satser",
  },
  {
    titleId: "utbetalingsdatoer",
    href: "http://localhost:3000/utbetalingsdatoer",
  },
  {
    title: "endreKontonummer",
    href: "http://localhost:3000/endreKontonummer",
  },
  {
    title: "endreSkattekort",
    href: "http://localhost:3000/endreSkattekort",
  },
];
const getAllUtbetalinger = [
  {
    month: "Mars",
    year: "2023",
    beløp_utbetalt: 2100,
    utbetalinger: [
      {
        ytelse: "Arbeidsavklaringspenger",
        ytelse_dato: "2021-03-10T22:46:01.204+02:00",
        beløp_utbetalt: 1200,
      },
      {
        ytelse: "Dagpenger",
        ytelse_dato: "2021-03-09T22:46:01.204+02:00",
        beløp_utbetalt: 900,
      },
    ],
  },
  {
    month: "Februar",
    year: "2023",
    beløp_utbetalt: 2100,
    utbetalinger: [
      {
        ytelse: "Arbeidsavklaringspenger",
        ytelse_dato: "2023-02-10T22:46:01.204+02:00",
        beløp_utbetalt: 1200,
      },
      {
        ytelse: "Dagpenger",
        ytelse_dato: "2023-02-09T22:46:01.204+02:00",
        beløp_utbetalt: 900,
      },
    ],
  },
];

const nesteUtbetaling = {
  ytelse: "Arbeidsavklaringspenger",
  ytelse_dato: "2023-02-10T22:46:01.204+02:00",
  beløp_utbetalt: 1200,
};

function App() {
  return (
    <div>
      <Heading className={style.pageTitle} level="1" size="large">
        {text.sideTittel["nb"]}
      </Heading>
      {nesteUtbetaling && (
        <div>
          <BodyShort>Neste utbetaling</BodyShort>{" "}
          <UtbetalingLinkPanel
            ytelse={nesteUtbetaling.ytelse}
            beløp={nesteUtbetaling.beløp_utbetalt}
            dato={nesteUtbetaling.ytelse_dato}
            nesteUtbetaling={true}
          />{" "}
        </div>
      )}
      <div className={style.pageBody}>
        <ul className={style.utbetalingerList}>
          {getAllUtbetalinger.map((o) => (
            <li className={style.utbetalingerOneMonth}>
              <UtbetalingInMonth
                month={o.month}
                year={o.year}
                utbetaltIPeriode={o.beløp_utbetalt}
                utbetalinger={o.utbetalinger}
              />
            </li>
          ))}
        </ul>
        {/* TODO: fikse design etter skisse, trekke til egen komponent? */}
        <ul>
          {relatertInnholdLinks.map((linkObject) => (
            <li>
              <Link href={linkObject.href}>{linkObject.titleId}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
