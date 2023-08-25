import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import { HovedYtelse } from "../../types/utbetalingTypes";
import style from "./UtbetaltPeriode.module.css";
import {
  summerBruttoUtbetaling,
  summerBruttoYtelser,
  summerTrekkTotalt,
  summerUtbetaling,
  summerYtelser,
} from "../../utils/summering";
import { formaterTallUtenDesimaler } from "../../utils/utbetalingDetalje";

interface UtbetaltPeriodeProps {
  utbetalinger: HovedYtelse[];
  periode: string;
}
interface SumPerYtelse {
  [key: string]: number;
}

const createSumPerYtelse = (
  utbetalinger: HovedYtelse[],
  brutto = false
): SumPerYtelse => {
  const sumPerYtelse: SumPerYtelse = {};

  utbetalinger.forEach((utbetaling) => {
    if (!(utbetaling.ytelse in sumPerYtelse)) {
      sumPerYtelse[utbetaling.ytelse] = 0;
    }

    if (brutto) {
      sumPerYtelse[utbetaling.ytelse] += summerBruttoYtelser(
        utbetaling.underytelser
      );
    } else {
      sumPerYtelse[utbetaling.ytelse] += summerYtelser(
        utbetaling.underytelser,
        utbetaling.trekk
      );
    }
  });

  return sumPerYtelse;
};

const UtbetaltPeriode = ({ utbetalinger, periode }: UtbetaltPeriodeProps) => {
  const bruttoUtbetalt = summerBruttoUtbetaling(utbetalinger);
  const nettoUtbetalt = summerUtbetaling(utbetalinger);
  const sumPerYtelse = createSumPerYtelse(utbetalinger, true);
  const trekk = summerTrekkTotalt(utbetalinger);

  return (
    <div className={style.utbetalPeriodeContainer}>
      <BodyLong>Utbetalt i perioden</BodyLong>
      <Heading className={style.utbetaltIPeriodenHeading} size="xsmall" level="3">{periode}</Heading>
      <ul className={style.periodeYtelseList}>
        {Object.keys(sumPerYtelse).map((ytelse) => (
          <li className={style.periodeYtelseElement}>
            <BodyShort>{ytelse}</BodyShort>
            <BodyShort>{`${formaterTallUtenDesimaler(
              sumPerYtelse[ytelse]
            )} kr`}</BodyShort>
          </li>
        ))}
      </ul>
      <div className={style.periodeBrutto}>
        <BodyShort>Brutto</BodyShort>
        <BodyShort>{`${formaterTallUtenDesimaler(bruttoUtbetalt)} kr`}</BodyShort>
      </div>
      <div className={style.periodeTrekk}>
        <BodyShort>Trekk</BodyShort>
        <BodyShort>{`${formaterTallUtenDesimaler(trekk)} kr`}</BodyShort>
      </div>
      <div className={style.periodeNetto}>
        <BodyShort>Netto utbetalt</BodyShort>
        <BodyShort>{`${formaterTallUtenDesimaler(nettoUtbetalt)} kr`}</BodyShort>
      </div>
    </div>
  );
};

export default UtbetaltPeriode;
