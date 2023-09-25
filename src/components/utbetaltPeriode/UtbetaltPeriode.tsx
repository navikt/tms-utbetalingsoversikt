import { BodyShort, Heading } from "@navikt/ds-react";
import { formaterTallUtenDesimaler } from "~utils/utbetalingDetalje";
import style from "./UtbetaltPeriode.module.css";

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
    <div className={style.container}>
      <Heading className="navds-body-short " level="2" size="small">
        Utbetalt i perioden
      </Heading>
      <BodyShort weight="semibold" className={style.periodeDate}>
        {periode}
      </BodyShort>
      <ul className={style.list}>
        {ytelser.map((o, index) => (
          <li
            key={index}
            className={`${style.ytelseElementsstyle} ${style.listElement}`}
          >
            <BodyShort>{o.ytelse}</BodyShort>
            <BodyShort>{`${formaterTallUtenDesimaler(o.beløp)} kr`}</BodyShort>
          </li>
        ))}
        <li className={`${style.bruttoElement} ${style.listElement}`}>
          <BodyShort>Brutto</BodyShort>
          <BodyShort>{`${formaterTallUtenDesimaler(
            bruttoUtbetalt
          )} kr`}</BodyShort>
        </li>
        <li className={`${style.trekkElement} ${style.listElement}`}>
          <BodyShort>Trekk</BodyShort>
          <BodyShort>{`${formaterTallUtenDesimaler(trekk)} kr`}</BodyShort>
        </li>
        <li className={`${style.nettoElement} ${style.listElement}`}>
          <BodyShort weight="semibold">Netto utbetalt</BodyShort>
          <BodyShort weight="semibold">{`${formaterTallUtenDesimaler(
            nettoUtbetalt
          )} kr`}</BodyShort>
        </li>
      </ul>
    </div>
  );
};

export default UtbetaltPeriode;
