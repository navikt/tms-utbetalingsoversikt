import style from "./Landingsside.module.css";
import { BodyShort, Heading, Link } from "@navikt/ds-react";
import UtbetalingInMonth from "../../utbetalingerInMonth/UtbetalingerInMonth.tsx";
import UtbetalingLinkPanel from "../../utbetalingLinkPanel/UtbetalingLinkPanel.tsx";
import Filter from "../../filter/Filter.tsx";
import text from "../../../language/text.ts";
import useSWR from "swr";
import { fetcher } from "../../../api/api.ts";
import { utbetalingerAPIUrl } from "../../../utils/urls.ts";
import { groupUtbetalingInMonths } from "../../../utils/groupUtbetalingYearAndMonth.ts";
import UtbetalingerInMonth from "../../utbetalingerInMonth/UtbetalingerInMonth.tsx";
import { summerYtelser } from "../../../utils/summering.ts";
const relatertInnholdLinks = [
  {
    title: "satser",
    href: "http://localhost:3000/satser",
  },
  {
    title: "utbetalingsdatoer",
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

function Landingsside() {
  const utbetalingerPeriod = "Siste tre måneder";
  
  const {
    data: utbetalinger,
    isLoading,
    mutate,
  } = useSWR({ path: utbetalingerAPIUrl }, fetcher, {
    shouldRetryOnError: false,
  });

  if (isLoading) {
    return "isLoading";
  }

  const pastUtbetalinger = groupUtbetalingInMonths(
    utbetalinger.utbetalteUtbetalinger
  );

  const nesteUtbetaling = utbetalinger?.kommendeUtbetalinger[0];

  

  return (
    <div>
      <Heading className={style.pageTitle} level="1" size="large">
        {text.sideTittel["nb"]}
      </Heading>
      <div className={style.pageBody}>
        <div className={style.utbetalingerAndFilter}>
          <Filter />
          {nesteUtbetaling && (
            <div className={style.nesteUtbetaling}>
              <BodyShort>Neste utbetaling</BodyShort>{" "}
              <UtbetalingLinkPanel
                ytelse={nesteUtbetaling.ytelse}
                beløp={summerYtelser(nesteUtbetaling.underytelser, nesteUtbetaling.trekk)}
                dato={nesteUtbetaling.ytelse_dato}
                nesteUtbetaling={true}
              />{" "}
            </div>
          )}
          <div className={style.tidligereUtbetalinger}>
            <BodyShort className={style.utbetalingerPeriod}>
              {utbetalingerPeriod}
            </BodyShort>
            {Object.keys(pastUtbetalinger).map((year) =>
              Object.keys(pastUtbetalinger[year]).map((month) => (
                <ul className={style.utbetalingerList}>
                  <li className={style.utbetalingerOneMonth}>
                    <UtbetalingerInMonth
                      monthIndex={month}
                      year={year}
                      utbetalinger={pastUtbetalinger[year][month]}
                    />
                  </li>
                </ul>
              ))
            )}
          </div>
        </div>
        <div className={style.relatertInnholdContainer}>
          <Heading
            className={style.relatertInnholdHeader}
            level="2"
            size="xsmall"
          >
            Relart Innhold
          </Heading>
          <ul className={style.relatertInnholdLinkList}>
            {relatertInnholdLinks.map((linkObject) => (
              <li>
                <a className={style.relatertInnholdLink} href={linkObject.href}>
                  {linkObject.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Landingsside;
