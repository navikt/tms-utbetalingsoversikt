import style from "./App.module.css";
import { BodyLong, BodyShort, Heading, LinkPanel, Link } from "@navikt/ds-react";
import text from "./language/text.jsx";

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

export type Utbetaling = {
  ytelse: string;
  ytelse_dato: string;
};

export interface UtbetalingerProps {
  month: string;
  year: string;
  utbetalinger: Utbetaling[];
}

const UtbetalingPeriod = ({
  month,
  year,
  utbetalinger,
}: UtbetalingerProps) => {
  return (
    <div className={style.utbetalingPeriod}>
      <Heading level="2" size="large">
        {`${month} ${year}`}
      </Heading>
      <ul>
        {utbetalinger.map((o) => {
          return (
            <li>
              <a className={style.utbetalingLink} href="http://localhost:3000/utbetaling">
                {<BodyShort>{o.ytelse_dato}</BodyShort>}
                {<BodyLong>{o.ytelse}</BodyLong>}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

function App() {
  const utbetalinger = [
    {
      ytelse: "Arbeidsavklaringspenger",
      ytelse_dato: "2021-06-09T22:46:01.204+02:00",
    },
    {
      ytelse: "Dagpenger",
      ytelse_dato: "2021-06-09T22:46:01.204+02:00",
    },
  ];

  return (
    <div>
      <Heading className={style.pageTitle} level="1" size="large">
        {text.sideTittel["nb"]}
      </Heading>
      <div className={style.pageBody}>
        <UtbetalingPeriod month="Januar" year="2021" utbetalinger={utbetalinger}/>
          
        {/* TODO: fikse design etter skisse, trekke til egen komponent? */}
        <div className={style.relatertInnholdContainer}>
          <ul>
            {relatertInnholdLinks.map((linkObject) => (
              <li>
                <Link href={linkObject.href}>{linkObject.titleId}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
