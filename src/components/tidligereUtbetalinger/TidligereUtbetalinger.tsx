import { useStore } from "@nanostores/react";
import { BodyShort } from "@navikt/ds-react";
import { ytelserFilterAtom } from "../../store/filter";
import { HovedYtelse } from "../../types/utbetalingTypes";
import filterUtbetalinger from "../../utils/filterUtbetaling";
import { groupUtbetalingInMonths } from "../../utils/groupUtbetalingYearAndMonth";
import UtbetalingerInMonth from "../utbetalingerInMonth/UtbetalingerInMonth";
import style from "./TidligereUtbetalinger.module.css";

interface Props {
  tidligereUtbetalinger: HovedYtelse[];
  periode: string;
}

const TidligereUtbetalinger = ({ tidligereUtbetalinger, periode }: Props) => {
  const selectedYtelser = useStore(ytelserFilterAtom);
  const utbetalinger = groupUtbetalingInMonths(
    filterUtbetalinger(tidligereUtbetalinger, selectedYtelser)
  );

  return (
    <div className={style.tidligereUtbetalinger}>
      <BodyShort className={style.utbetalingerPeriodLabel}>{periode}</BodyShort>
      <ul className={style.utbetalingerList}>
        {Object.keys(utbetalinger).map((year) =>
          Object.keys(utbetalinger[year]).map((month) => (
            <li className={style.utbetalingerOneMonth} key={`${month}${year}`}>
              <UtbetalingerInMonth
                monthIndex={month}
                year={year}
                utbetalinger={utbetalinger[year][month]}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TidligereUtbetalinger;
