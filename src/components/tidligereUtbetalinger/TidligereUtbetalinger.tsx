import { useStore } from "@nanostores/react";
import { Heading } from "@navikt/ds-react";
import { ytelserFilterAtom } from "../../store/filter";
import filterUtbetalinger from "../../utils/filterUtbetaling";
import UtbetalingGroup, {
  UtbetalingGroupProps,
} from "../UtbetalingGroup/UtbetalingGroup";
import style from "./TidligereUtbetalinger.module.css";

interface Props {
  utbetalingGroups: UtbetalingGroupProps[];
  periode: string;
}

const TidligereUtbetalinger = ({ utbetalingGroups, periode }: Props) => {
  const selectedYtelser = useStore(ytelserFilterAtom);
  const selectedUtbetalinger = filterUtbetalinger(
    utbetalingGroups,
    selectedYtelser
  );

  return (
    <div className={style.tidligereUtbetalinger}>
      <Heading level="2" size="small" className={"navds-body-short "+style.utbetalingerPeriodLabel}>{periode}</Heading>
      <ul className={style.utbetalingerList}>
        {selectedUtbetalinger.map((utbetalingGroup: UtbetalingGroupProps) => (
          <li
            className={style.utbetalingerOneMonth}
            key={`${utbetalingGroup.måned}${utbetalingGroup.år}`}
          >
            <UtbetalingGroup
              måned={utbetalingGroup.måned-1}
              år={utbetalingGroup.år}
              utbetalinger={utbetalingGroup.utbetalinger}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TidligereUtbetalinger;
