import { Heading } from "@navikt/ds-react";
import UtbetalingLinkPanel from "../utbetalingLinkPanel/UtbetalingLinkPanel";
import style from "./UtbetalingerInMonth.module.css";
import { summerUtbetaling, summerYtelser } from "../../utils/summering";

const months = [
  "Januar",
  "Februar",
  "Mars",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export interface props {
  monthIndex: string;
  year: string;
  utbetalinger: Utbetaling[];
}

const UtbetalingerInMonth = ({ monthIndex, year, utbetalinger }: props) => {
  console.log(utbetalinger);
  const monthText: string = months[monthIndex];
  const sumYtelser = summerUtbetaling(utbetalinger);

  return (
    <div className={style.utbetalingPeriod}>
      <Heading className={style.utbetalingTitle} level="2" size="xsmall">
        <span>{`${monthText} ${year}`}</span>
        <span>{sumYtelser + " kr"}</span>
      </Heading>
      <ul className={style.utbetalingPeriodList}>
        {utbetalinger.map((o) => {
          return (
            <li className={style.utbetalingListElement}>
              <UtbetalingLinkPanel
                ytelse={o.ytelse}
                dato={o.ytelse_dato}
                beløp={summerYtelser(o.underytelser, o.trekk)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UtbetalingerInMonth;
