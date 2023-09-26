import { useStore } from "@nanostores/react";
import { ytelserFilterAtom } from "~store/filter";
import filterUtbetalinger from "~utils/filterUtbetaling";
import UtbetalingGroup, {
  UtbetalingGroupProps,
} from "../utbetalingGroup/UtbetalingGroup";
import style from "./TidligereUtbetalinger.module.css";

interface Props {
  utbetalingGroups: UtbetalingGroupProps[];
}

const TidligereUtbetalinger = ({ utbetalingGroups }: Props) => {
  const selectedYtelser = useStore(ytelserFilterAtom);
  const selectedUtbetalinger = filterUtbetalinger(
    utbetalingGroups,
    selectedYtelser
  );

  return (
    <ul className={style.utbetalingerList}>
      {selectedUtbetalinger.map((utbetalingGroup: UtbetalingGroupProps) => (
        <li
          className={style.utbetalingerOneMonth}
          key={`${utbetalingGroup.måned}${utbetalingGroup.år}`}
        >
          <UtbetalingGroup
            måned={utbetalingGroup.måned - 1}
            år={utbetalingGroup.år}
            utbetalinger={utbetalingGroup.utbetalinger}
          />
        </li>
      ))}
    </ul>
  );
};

export default TidligereUtbetalinger;
