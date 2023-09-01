import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import style from "./UtbetaltPeriode.module.css";
import { formaterTallUtenDesimaler } from "../../utils/utbetalingDetalje";
import { UtbetaltInPeriod } from "../../types/alleUtbetalinger";

interface PropsType {
  data: UtbetaltInPeriod;
  periode: string;
}

const UtbetaltPeriode = ({ data, periode }: PropsType) => {
  const ytelser = data.ytelser;
  const bruttoUtbetalt = data.brutto;
  const nettoUtbetalt = data.netto;
  const trekk = data.trekk;

  return (
    <div className={style.utbetalPeriodeContainer}>
      <BodyLong>Utbetalt i perioden</BodyLong>
      <Heading
        className={style.utbetaltIPeriodenHeading}
        size="xsmall"
        level="3"
      >
        {periode}
      </Heading>
      <ul className={style.periodeYtelseList}>
        {ytelser.map((o) => (
          <li className={style.periodeYtelseElement}>
            <BodyShort>{o.ytelse}</BodyShort>
            <BodyShort>{`${formaterTallUtenDesimaler(o.beløp)} kr`}</BodyShort>
          </li>
        ))}
      </ul>
      <div className={style.periodeBrutto}>
        <BodyShort>Brutto</BodyShort>
        <BodyShort>{`${formaterTallUtenDesimaler(
          bruttoUtbetalt
        )} kr`}</BodyShort>
      </div>
      <div className={style.periodeTrekk}>
        <BodyShort>Trekk</BodyShort>
        <BodyShort>{`${formaterTallUtenDesimaler(trekk)} kr`}</BodyShort>
      </div>
      <div className={style.periodeNetto}>
        <BodyShort>Netto utbetalt</BodyShort>
        <BodyShort>{`${formaterTallUtenDesimaler(
          nettoUtbetalt
        )} kr`}</BodyShort>
      </div>
    </div>
  );
};

export default UtbetaltPeriode;
