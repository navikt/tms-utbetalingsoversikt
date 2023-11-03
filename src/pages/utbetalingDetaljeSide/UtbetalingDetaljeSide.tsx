import { useParams } from "react-router-dom";
import { enkelUtbetalingAPIUrl } from "~utils/urls";
import style from "./UtbetalingDetaljeSide.module.css";
import useSWRImmutable from "swr/immutable";
import { BodyLong, BodyShort, Heading, Loader } from "@navikt/ds-react";
import { fetcher } from "../../api/api";
import Breadcrumbs from "~components/breadcrumbs/Breadcrumbs";
import { formatToDetailedDate } from "../../utils/date";
import {
  formaterTallUtenDesimaler,
  isUtbetalingWithSats,
  satsDescription,
} from "~utils/utbetalingDetalje";
import DetaljeElement from "~components/utbetalingDetaljeElement/UtbetalingDetaljeElement";
import { UnderYtelseType } from "src/types/types";
import ErrorPanel from "~components/errorPanel/ErrorPanel";
import { logEvent } from "~utils/amplitude";

type Trekk = {
  type: string;
  beløp: number;
};

const UtbetalingDetaljeSide = () => {
  const { utbetalingsId } = useParams();
  const { data, isLoading, error } = useSWRImmutable(
    { path: enkelUtbetalingAPIUrl(utbetalingsId ? utbetalingsId : "") },
    fetcher,
    {
      shouldRetryOnError: false,
      onError: () => logEvent("fikk-feilmelding-detaljeside")
    }
  );

  if (isLoading) {
    return <Loader size="3xlarge" title="Henter data..." />;
  }

  if (error) {
    return <ErrorPanel isLandingsside={false} />;
  }

  const pageTittel = data.ytelse;
  const ytelseDato = data.ytelseDato;
  const brutto = data.bruttoUtbetalt;
  const nettoUtbetalt = data.nettoUtbetalt;
  const trekk = data.trekk;
  const hasTrekk = trekk.length > 0;
  const hasUnderytelser = data.underytelse.length > 0;
  const showSats = isUtbetalingWithSats(data.ytelse);
  const showBrutto = hasTrekk && hasUnderytelser;

  const sumUtbetaltLabel = hasUnderytelser ? "Netto utbetalt" : "Sum";
  const isUtbetaltText = data.erUtbetalt
    ? "Utbetalt"
    : "Forventet overføring til bank";

  return (
    <>
      <Breadcrumbs showUtbetalinger={true} />
      <Heading className={style.pageTitle} level="1" size="xlarge">
        {pageTittel}
      </Heading>
      <div
        className={`${style.beløpOgDatoWrapper} ${
          !data.erUtbetalt && style.kommendeUtbetalingWrapper
        }`}
      >
        <div className={style.beløpOgDatoContainer}>
          <BodyShort
            className={style.utbetaltDato}
          >{`${isUtbetaltText} ${formatToDetailedDate(ytelseDato)}`}</BodyShort>
          <Heading
            className={style.belopUtbetaltHeader}
            level="2"
            size="xlarge"
          >
            {`${formaterTallUtenDesimaler(nettoUtbetalt)} kr`}
          </Heading>
        </div>
      </div>
      <div className={style.detaljeListeContainer}>
        <Heading level="2" size="xsmall" className={style.detaljerHeading}>
          Detaljer
        </Heading>
        <ul>
          {hasUnderytelser &&
            data.underytelse.map((ytelse: UnderYtelseType) => {
              return (
                <DetaljeElement
                  key={ytelse.beskrivelse + ytelse.beløp}
                  label={`${ytelse.beskrivelse} ${
                    showSats && ytelse.sats && ytelse.antall
                      ? satsDescription(ytelse)
                      : ""
                  }`}
                  beløp={ytelse.beløp}
                />
              );
            })}
          {showBrutto && (
            <DetaljeElement
              isSum={true}
              label={"Brutto"}
              beløp={brutto}
              className="bruttoElement"
            />
          )}
          {hasTrekk &&
            trekk.map((trekk: Trekk) => (
              <DetaljeElement label={trekk.type} beløp={trekk.beløp} />
            ))}
          {
            <DetaljeElement
              isSum={true}
              label={sumUtbetaltLabel}
              beløp={nettoUtbetalt}
            />
          }
        </ul>
        {data?.melding && (
          <>
            <Heading level="2" size="xsmall" className={style.meldingHeading}>
              Melding
            </Heading>
            <BodyLong className={style.meldingTekst}>{data.melding}</BodyLong>
          </>
        )}

        <Heading level="2" size="xsmall" className={style.periodeHeading}>
          Periode
        </Heading>
        <BodyShort className={style.periodeDato}>
          {`${formatToDetailedDate(
            data.ytelsePeriode.fom
          )} - ${formatToDetailedDate(data.ytelsePeriode.tom)} til konto ${
            data.kontonummer
          }`}
        </BodyShort>
      </div>
    </>
  );
};

export default UtbetalingDetaljeSide;
