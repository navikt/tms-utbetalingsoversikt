import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import style from "./UtbetaltPeriode.module.css";
import { formaterTallUtenDesimaler } from "../../utils/utbetalingDetalje";

export type Ytelse = { ytelse: string; beløp: number };

interface PropsType {
  data: {
    harUtbetalinger: boolean;
    brutto: number;
    netto: number;
    trekk: number;
    ytelser: Ytelse[];
  };
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
        {ytelser.map((o, index) => (
          <li key={index} className={style.periodeYtelseElement}>
            <BodyShort>{o.ytelse}</BodyShort>
            <BodyShort>{`${formaterTallUtenDesimaler(o.beløp)} kr`}</BodyShort>
          </li>
        ))}
        <li className={style.periodeBrutto}>
            <BodyShort>Brutto</BodyShort>
            <BodyShort>{`${formaterTallUtenDesimaler(
              bruttoUtbetalt
            )} kr`}</BodyShort>
        </li>
        <li className={style.periodeTrekk}>
          <BodyShort>Trekk</BodyShort>
          <BodyShort>{`${formaterTallUtenDesimaler(trekk)} kr`}</BodyShort>
        </li>
        <li className={style.periodeNetto}>
          <BodyShort>Netto utbetalt</BodyShort>
          <BodyShort>{`${formaterTallUtenDesimaler(
            nettoUtbetalt
          )} kr`}</BodyShort>
        </li>
      </ul>
    </div>
  );
};

export default UtbetaltPeriode;
