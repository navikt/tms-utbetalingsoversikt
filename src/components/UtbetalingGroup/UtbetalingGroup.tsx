import { Heading } from "@navikt/ds-react";
import UtbetalingLinkPanel, { UtbetalingType } from "../utbetalingLinkPanel/UtbetalingLinkPanel";
import style from "./UtbetalingGroup.module.css";
import { getMonth } from "../../utils/date";
import { formaterTallUtenDesimaler } from "../../utils/utbetalingDetalje";

export interface UtbetalingGroupProps {
  år: number;
  måned: number;
  utbetalinger: UtbetalingType[];
}


const UtbetalingGroup = ({ måned, år, utbetalinger }: UtbetalingGroupProps) => {
  const månedText: string = getMonth(måned, true);
  const sumYtelser = utbetalinger.reduce((sum, utbetaling) => sum + utbetaling.beløp,0);

  return (
    <div className={style.utbetalingPeriod}>
      <Heading className={style.utbetalingTitle} level="2" size="xsmall">
        <span>{`${månedText} ${år}`}</span>
        <span>{formaterTallUtenDesimaler(sumYtelser) + " kr"}</span>
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
                nesteUtbetaling={false}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UtbetalingGroup;
