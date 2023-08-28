import { HovedYtelse } from "../types/utbetalingTypes";

export type YtelserListFilter = { [key: string]: boolean };
const getUniqueytelser = (utbetalinger: HovedYtelse[]): YtelserListFilter =>
  utbetalinger.reduce(
    (ytelserList: YtelserListFilter, currentYtelser: HovedYtelse) => {
      return {
      [currentYtelser.ytelse]: false,
      ...ytelserList,
    }},
    {}
  );

export default getUniqueytelser;
