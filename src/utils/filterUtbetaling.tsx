import { SelectedYtelser } from "../store/filter";
import { HovedYtelse } from "../types/utbetalingTypes";

const filterUtbetalinger = (
  utbetalinger: HovedYtelse[],
  selectedYtelser: SelectedYtelser
) => {
  const showAll = Object.values(selectedYtelser).every(
    (value) => value === false
  );
  if (showAll) return utbetalinger;

  return utbetalinger.filter((u) => selectedYtelser[u.ytelse]);
};

export default filterUtbetalinger;