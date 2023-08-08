import { HovedYtelse, Trekk, UnderYtelse } from "../types/utbetalingTypes";

function sum(numbers: number[]): number {
    return numbers.reduce(
        (a, b) => a + b,
        0
    );
}

export function summerBruttoUtbetaling(utbetaling: HovedYtelse[]): number {
  return sum(utbetaling.map(ytelse => summerBruttoYtelser(ytelse.underytelser)));
}

export function summerTrekk(trekk: Trekk[]): number {
  return sum(trekk.map(trekkbelop => trekkbelop.trekk_belop));
}

export function summerYtelser(ytelse: UnderYtelse[], trekk: Trekk[]): number {
    return summerTrekk(trekk) + summerBruttoYtelser(ytelse);
}

export function summerBruttoYtelser(ytelse: UnderYtelse[]): number {
    return sum(ytelse.map(underytelse => underytelse.belop));
}

export function summerTrekkTotalt(utbetalinger: HovedYtelse[]) {
    return sum(utbetalinger.map(utbetaling => summerTrekk(utbetaling.trekk)));
}

export function summerUtbetaling(utbetaling: HovedYtelse[]): number {
  return sum(utbetaling.map(ytelse => summerYtelser(ytelse.underytelser, ytelse.trekk)));
}
