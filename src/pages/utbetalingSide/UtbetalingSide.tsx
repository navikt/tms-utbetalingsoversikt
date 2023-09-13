import style from "./UtbetalingSide.module.css";
import useSWRImmutable from "swr";
import { fetcher } from "../../api/api";
import { enkelUtbetalingAPIUrl } from "../../utils/urls";
import { BodyShort, Heading, Label, Loader } from "@navikt/ds-react";
import { formatToDetailedDate } from "../../utils/date";
import { summerBruttoYtelser, summerTrekk } from "../../utils/summering";
import { formaterTallUtenDesimaler } from "../../utils/utbetalingDetalje";
import { useParams } from "react-router-dom";
import { Trekk, UnderYtelse } from "../../types/utbetalingTypes";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";

interface props {
  className: string;
  strongLabel: boolean;
  label: string;
  data: string;
  key?: string;
}

const UtbetalingDetail = ({ className, strongLabel, label, data }: props) => {
  const LabelField = strongLabel ? (
    <Label as="p" className={"label-" + className}>
      {label}
    </Label>
  ) : (
    <BodyShort className={""}>{label}</BodyShort>
  );

  return (
    <li className={className}>
      {LabelField}
      <BodyShort className={""}>{data}</BodyShort>
    </li>
  );
};

const UtbetalingSide = () => {
  const { utbetalingsId } = useParams();

  const { data, isLoading, error } = useSWRImmutable(
    { path: enkelUtbetalingAPIUrl(utbetalingsId ? utbetalingsId : "") },
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );
  if (isLoading) {
    return <Loader size="3xlarge" title="Henter data..." />;
  }
  if (error) {
    return "Feil side";
  }

  const underytelser = data.underytelser;
  const brutto: number = summerBruttoYtelser(underytelser);
  const summertTrekk: number = summerTrekk(data.trekk);
  const sumUtbetalt: number = summertTrekk + brutto;
  const summeringTekst: string = underytelser ? "Netto utbetalt" : "Sum";
  //const visSats: boolean = visSatsForUtbetaling(data.ytelse); TODO legge inn å vise sats for DAG og AAP

  const hasUnderytelser = underytelser.length > 0;
  const hasTrekk = data.trekk.length > 0;

  const pageTittel = data.ytelse;
  const utbetaltDato = data.ytelse_dato;
  return (
    <>
      <Breadcrumbs showUtbetalinger={true}/>
      <div className={style.pageWrapper}>
        <div className={style.utbetalingSideContainer}>
          <Heading className={style.pageTitle} level="1" size="xlarge">
            {pageTittel}
          </Heading>
          <div className={style.beløpOgDatoWrapper}>
            <BodyShort
              className={style.utbetaltDato}
            >{`Utbetalt ${formatToDetailedDate(utbetaltDato)}`}</BodyShort>
            <Heading
              className={style.belopUtbetaltHeader}
              level="2"
              size="xlarge"
            >
              {`${formaterTallUtenDesimaler(sumUtbetalt)} kr`}
            </Heading>
          </div>
          <div className={style.utbetalingsdetaljer}>
            <Label as="p">Detaljer</Label>
            <ul className={style.detaljeListe}>
              {underytelser.map((ytelse: UnderYtelse) => {
                /*
            const satsText =
              visSats && ytelse.sats && ytelse.antall
                ? satsBeskrivelse(ytelse)
                : "";
            */
                return (
                  <UtbetalingDetail
                    className={style.detaljeElement}
                    label={ytelse.beskrivelse}
                    data={`${formaterTallUtenDesimaler(ytelse.belop)} kr`}
                    strongLabel={false}
                  />
                );
              })}
              {hasTrekk && hasUnderytelser && (
                <UtbetalingDetail
                  className={style.detaljeElement}
                  label={"Brutto"}
                  data={`${formaterTallUtenDesimaler(brutto)} kr`}
                  strongLabel={true}
                />
              )}
              {hasTrekk &&
                data.trekk.map((trekk: Trekk) => (
                  <UtbetalingDetail
                    className={`${style.detaljeElement} ${style.trekkElement}`}
                    label={trekk.trekk_type}
                    data={`${formaterTallUtenDesimaler(trekk.trekk_belop)} kr`}
                    strongLabel={false}
                  />
                ))}
              <UtbetalingDetail
                className={`${style.nettoUtbetalt}`}
                label={summeringTekst}
                data={`${formaterTallUtenDesimaler(sumUtbetalt)} kr`}
                strongLabel={true}
              />
              {data.melding && (
                <li className={style.meldingElement}>
                  <Label as="p">Melding</Label>
                  <BodyShort>{data.melding}</BodyShort>
                </li>
              )}
              <li className={style.periodeElement}>
                <Label as="p" className={style.periodLabel}>
                  Periode
                </Label>
                <BodyShort className={style.ytelsePeriode}>
                  {`${formatToDetailedDate(
                    data.ytelse_periode.fom
                  )} - ${formatToDetailedDate(
                    data.ytelse_periode.tom
                  )} til konto ${data.kontonummer}`}
                </BodyShort>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UtbetalingSide;
