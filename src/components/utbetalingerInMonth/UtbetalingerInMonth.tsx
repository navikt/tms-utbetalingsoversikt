import { Heading } from "@navikt/ds-react";
import UtbetalingLinkPanel from "../utbetalingLinkPanel/UtbetalingLinkPanel";
import style from "./UtbetalingerInMonth.module.css";

export interface props {
  month: string;
  year: string;
  utbetaltIPeriode: number;
  utbetalinger: Utbetaling[];
}

const UtbetalingInMonth = ({
  month,
  year,
  utbetaltIPeriode,
  utbetalinger,
}: props) => {
  return (
    <div className={style.utbetalingPeriod}>
      <Heading className={style.utbetalingTitle} level="2" size="xsmall">
        <span>{`${month} ${year}`}</span>
        <span>{utbetaltIPeriode + " kr"}</span>
      </Heading>
      <ul className={style.utbetalingPeriodList}>
        {utbetalinger.map((o) => {
          return (
            <li className={style.utbetalingListElement}>
              <UtbetalingLinkPanel
                ytelse={o.ytelse}
                dato={o.ytelse_dato}
                beløp={o.beløp_utbetalt}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UtbetalingInMonth;