import style from "./UtbetalingSide.module.css";
import useSWRImmutable from "swr";
import { fetcher } from "../../../api/api";
import { enkelUtbetalingAPIUrl } from "../../../utils/urls";
import { BodyShort, Heading, Label, Loader } from "@navikt/ds-react";
import { formatToDetailedDate } from "../../../../utils/date";
import { summerBruttoYtelser, summerTrekk } from "../../../utils/summering";
import {
  formaterTallUtenDesimaler,
  satsBeskrivelse,
  visSatsForUtbetaling,
} from "../../../utils/utbetalingDetalje";

const UtbetalingSide = () => {
  const { data, isLoading, mutate } = useSWRImmutable(
    { path: enkelUtbetalingAPIUrl("1234") },
    fetcher
  );
  if (isLoading) {
    return <Loader size="3xlarge" title="Henter data..." />;
  }

  const underytelser = data.underytelser;
  const brutto: number = summerBruttoYtelser(underytelser);
  const summertTrekk: number = summerTrekk(data.trekk);
  const utbetalt: number = summertTrekk + brutto;
  const summeringTekst: string = underytelser ? "Netto utbetalt" : "Sum";
  const visSats: boolean = visSatsForUtbetaling(data.ytelse);

  const pageTittel = data.ytelse;
  const utbetaltDato = data.ytelse_dato;
  return (
    <div className={style.utbetalingSideContainer}>
      <Heading className={style.pageTitle} level="1" size="large">
        {pageTittel}
      </Heading>
      <div className={style.beløpOgDatoWrapper}>
        <div className={style.beløpOgDatoContainer}>
          <BodyShort
            className={style.utbetaltDato}
          >{`Utbetalt ${formatToDetailedDate(utbetaltDato)}`}</BodyShort>
          <Heading
            className={style.belopUtbetaltHeader}
            level="2"
            size="xlarge"
          >
            {`${formaterTallUtenDesimaler(utbetalt)} kr`}
          </Heading>
        </div>
      </div>
      <div className={style.utbetalingsdetaljer}>
        <Label as="p">Detaljer</Label>
        <ul className={style.detaljeListe}>
          {underytelser.map((ytelse, index) => {
            const satsText =
              visSats && ytelse.sats && ytelse.antall
                ? satsBeskrivelse(ytelse)
                : "";
            return (
              <li key={index} className={style.detaljeElement}>
                <BodyShort>{`${ytelse.beskrivelse} `}</BodyShort>
                <BodyShort>{`${formaterTallUtenDesimaler(
                  ytelse.belop
                )} kr`}</BodyShort>
              </li>
            );
          })}
          {underytelser.length && data.trekk.length && (
            <li className={`${style.detaljeElement} ${style.burttoUtbetalt}`}>
              <Label as="p">Brutto</Label>
              <BodyShort>{`${formaterTallUtenDesimaler(brutto)} kr`}</BodyShort>
            </li>
          )}
          {data.trekk.map((trekk, index) => (
            <li key={index} className={`${style.detaljeElement} ${style.trekkElement}`}>
              <BodyShort>{trekk.trekk_type}</BodyShort>
              <BodyShort>{`${trekk.trekk_belop} kr`}</BodyShort>
            </li>
          ))}
          <li className={`${style.detaljeElement} ${style.nettoUtbetalt}`}>
            <Label as="p">{summeringTekst}</Label>
            <BodyShort>{`${formaterTallUtenDesimaler(utbetalt)} kr`}</BodyShort>
          </li>
          {data.melding && (
            <li className={style.meldingElement}>
              <Label as="p">Melding</Label>
              <BodyShort>{data.melding}</BodyShort>
            </li>
          )}
          <li className={style.periodeElement}>
            <Label as="p" className={style.periodLabel}>
              Period
            </Label>
            <BodyShort className={style.ytelsePeriode}>
              {`${formatToDetailedDate(
                data.ytelse_periode.fom
              )} - ${formatToDetailedDate(data.ytelse_periode.tom)} til konto ${
                data.kontonummer
              }`}
            </BodyShort>
          </li>
        </ul>
      </div>
      {/*
      <div className={style.utbetalingDetails}>
        <BodyShort>Detaljer</BodyShort>
        <div className={style.underYtelse}>
          <BodyShort>Ordinær og utvidet</BodyShort>
          <BodyShort>3 352 kr</BodyShort>
        </div>
        <div className={style.nettoUtbetalt}>
          <BodyShort>Netto utbetalt</BodyShort>
          <BodyShort>3 352 kr</BodyShort>
        </div>
        <div className={style.periodContainer}>
          <p className={style.periodLabel}>Period</p>
          <BodyShort className={style.ytelsePeriode}>
            {`${formatToDetailedDate(
              data.ytelse_periode.fom
            )} - ${formatToDetailedDate(data.ytelse_periode.tom)} til konto ${data.kontonummer}`}
          </BodyShort>
        </div>
            </div>*/}
    </div>
  );
};

export default UtbetalingSide;
