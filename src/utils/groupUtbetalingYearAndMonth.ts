import dayjs from "dayjs";
import { HovedYtelse } from "../types/utbetalingTypes";

interface GroupedUtbetaling {
    [key: string]: {
        [key: string]: HovedYtelse[];
    };
}

export const groupUtbetalingInMonths = (utbetalinger: HovedYtelse[]): GroupedUtbetaling => {
  const groupedUtbetaling: GroupedUtbetaling = {};

  utbetalinger.forEach((hovedytelse: HovedYtelse) => {
      const year = dayjs(hovedytelse.ytelse_dato).year().toString();
      const month = dayjs(hovedytelse.ytelse_dato).month().toString();

      if (!(year in groupedUtbetaling)) {
        groupedUtbetaling[year] = {};
      }

      if (!(month in groupedUtbetaling[year])) {
        groupedUtbetaling[year][month] = [];
      }
      groupedUtbetaling[year][month].push(hovedytelse);
  });
  return groupedUtbetaling;
};
