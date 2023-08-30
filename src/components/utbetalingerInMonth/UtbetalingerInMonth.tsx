import { Heading } from "@navikt/ds-react";
import UtbetalingLinkPanel from "../utbetalingLinkPanel/UtbetalingLinkPanel";
import style from "./UtbetalingerInMonth.module.css";
import { summerUtbetaling, summerYtelser } from "../../utils/summering";
import { HovedYtelse } from "../../types/utbetalingTypes";
import { getMonth } from "../../../utils/date";


export interface props {
  monthIndex: string;
  year: string;
  utbetalinger: HovedYtelse[];
}

const UtbetalingerInMonth = ({ monthIndex, year, utbetalinger }: props) => {
  const monthText: string = getMonth(parseInt(monthIndex), true);
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
            <li className={style.utbetalingListElement} key={o.id}>
              <UtbetalingLinkPanel
                ytelse={o.ytelse}
                dato={o.ytelse_dato}
                beløp={summerYtelser(o.underytelser, o.trekk)}
                id={o.id}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UtbetalingerInMonth;
