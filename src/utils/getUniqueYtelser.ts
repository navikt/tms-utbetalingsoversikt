import { UtbetalingType } from "src/types/types";

export type YtelserListFilter = { [key: string]: boolean };
const getUniqueytelser = (ytelser: UtbetalingType[]): YtelserListFilter =>
  ytelser.reduce((filteredList: YtelserListFilter, ytelse: UtbetalingType) => {
    return {
      [ytelse.ytelse]: false,
      ...filteredList,
    };
  }, {});

export default getUniqueytelser;
