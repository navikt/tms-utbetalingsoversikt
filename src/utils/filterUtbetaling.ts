import { UtbetalingGroupProps } from "~components/utbetalingGroup/UtbetalingGroup";
import { SelectedYtelser } from "~store/filter";

const filterUtbetalinger = (
  utbetalingGroups: UtbetalingGroupProps[],
  selectedYtelser: SelectedYtelser
) => {
  const showAll = Object.values(selectedYtelser).every(
    (value) => value === false
  );
  if (showAll) return utbetalingGroups;

  const filteredGroups = utbetalingGroups.reduce(
    (acc: UtbetalingGroupProps[], period: UtbetalingGroupProps) => {
      const filteredPeriod = period.utbetalinger.filter(
        (utbetaling) => selectedYtelser[utbetaling.ytelse]
      );
      if (filteredPeriod.length > 0) {
        return [...acc, { ...period, utbetalinger: filteredPeriod }];
      }
      return acc;
    },
    []
  );
  return filteredGroups;
};

export default filterUtbetalinger;
