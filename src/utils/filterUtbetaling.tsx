import { SelectedYtelser } from "../store/filter";
import { UtbetalingGroups } from "../types/alleUtbetalinger";

const filterUtbetalinger = (
  utbetalinger: UtbetalingGroups,
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
