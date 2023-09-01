import { Heading } from "@navikt/ds-react";
import UtbetalingLinkPanel from "../utbetalingLinkPanel/UtbetalingLinkPanel";
import style from "./UtbetalingerInMonth.module.css";
import { getMonth } from "../../../utils/date";
import { UtbetalingGroup } from "../../types/alleUtbetalinger";

const UtbetalingerInMonth = ({ måned, år, utbetalinger }: UtbetalingGroup) => {
  const månedText: string = getMonth(måned, true);
  const sumYtelser = utbetalinger.reduce((sum, utbetaling) => sum + utbetaling.beløp,0);

  return (
    <div className={style.utbetalingPeriod}>
      <Heading className={style.utbetalingTitle} level="2" size="xsmall">
        <span>{`${månedText} ${år}`}</span>
        <span>{sumYtelser + " kr"}</span>
      </Heading>
      <ul className={style.utbetalingPeriodList}>
        {utbetalinger.map((o) => {
          return (
            <li className={style.utbetalingListElement} key={o.id}>
              <UtbetalingLinkPanel
                ytelse={o.ytelse}
                dato={o.dato}
                beløp={o.beløp}
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
