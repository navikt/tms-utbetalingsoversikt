import { useStore } from "@nanostores/react";
import { BodyShort } from "@navikt/ds-react";
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
      <BodyShort className={style.utbetalingerPeriodLabel}>{periode}</BodyShort>
      <ul className={style.utbetalingerList}>
        {selectedUtbetalinger.map((utbetalingGroup: UtbetalingGroupProps) => (
          <li
            className={style.utbetalingerOneMonth}
            key={`${utbetalingGroup.måned}${utbetalingGroup.år}`}
          >
            <UtbetalingGroup
              måned={utbetalingGroup.måned}
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
