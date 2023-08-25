import { BodyShort } from "@navikt/ds-react";
import style from "./TidligereUtbetalinger.module.css";
import UtbetalingerInMonth from "../utbetalingerInMonth/UtbetalingerInMonth";
import { GroupedUtbetaling } from "../../utils/groupUtbetalingYearAndMonth";

interface Props {
  tidligereUtbetalinger: GroupedUtbetaling;
  periode: string;
}

const TidligereUtbetalinger = ({ tidligereUtbetalinger, periode }: Props) => (
  <div className={style.tidligereUtbetalinger}>
    <BodyShort className={style.utbetalingerPeriodLabel}>
      {periode}
    </BodyShort>
    <ul className={style.utbetalingerList}>
      {Object.keys(tidligereUtbetalinger).map((year) =>
        Object.keys(tidligereUtbetalinger[year]).map((month) => (
          <li className={style.utbetalingerOneMonth} key={`${month}${year}`}>
            <UtbetalingerInMonth
              monthIndex={month}
              year={year}
              utbetalinger={tidligereUtbetalinger[year][month]}
            />
          </li>
        ))
      )}
    </ul>
  </div>
);

export default TidligereUtbetalinger;
