import { UtbetalingType } from "../components/utbetalingLinkPanel/UtbetalingLinkPanel";


export type YtelserListFilter = { [key: string]: boolean };
const getUniqueytelser = (ytelser: UtbetalingType[]): YtelserListFilter =>
  ytelser.reduce((filteredList: YtelserListFilter, ytelse: UtbetalingType) => {
    return {
      [ytelse.ytelse]: false,
      ...filteredList,
    };
  }, {});

export default getUniqueytelser;
