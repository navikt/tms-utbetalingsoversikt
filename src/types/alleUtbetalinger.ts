export interface Utbetaling {
  id: string;
  beløp: number;
  dato: string;
  ytelse: string;
}

export interface UtbetalingGroup {
  år: number;
  måned: number;
  utbetalinger: Utbetaling[];
}
export type UtbetalingGroups = UtbetalingGroup[];

export type Ytelse = { ytelse: string; beløp: number };

export interface UtbetaltInPeriod {
  harUtbetalinger: boolean;
  brutto: number;
  netto: number;
  trekk: number;
  ytelser: Ytelse[];
}

export interface AlleUtbetalingerResponse {
  neste: UtbetalingGroups;
  tidligere: UtbetalingGroups;
  utbetalingerIPeriode: UtbetaltInPeriod;
}
