import { UtbetalingGroupProps } from "~components/UtbetalingGroup/UtbetalingGroup";
import { SelectedYtelser } from "../store/filter";

const filterUtbetalinger = (
  utbetalinger: UtbetalingGroupProps[],
  selectedYtelser: SelectedYtelser
) => {
  const showAll = Object.values(selectedYtelser).every(
    (value) => value === false
  );
  if (showAll) return utbetalinger;

  return utbetalinger.filter((period) =>
    period.utbetalinger.find((utbetaling) => selectedYtelser[utbetaling.ytelse])
  );
};

export default filterUtbetalinger;
