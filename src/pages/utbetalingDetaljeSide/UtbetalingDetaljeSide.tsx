import { useParams } from "react-router-dom";
import { enkelUtbetalingAPIUrl } from "../../utils/urls";
import style from "./UtbetalingDetaljeSide.module.css";
import useSWRImmutable from "swr/immutable";
import { BodyLong, BodyShort, Heading, Loader } from "@navikt/ds-react";
import { fetcher } from "../../api/api";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import { formatToDetailedDate } from "../../utils/date";
import { formaterTallUtenDesimaler } from "../../utils/utbetalingDetalje";
import DetaljeElement from "../../components/utbetalingDetaljeElement/UtbetalingDetaljeElement";

type UnderYtelse = {
  beskrivelse: string;
  sats: number;
  antall: number;
  beløp: number;
};

type Trekk = {
  trekk_type: string;
  trekk_belop: number;
};

const UtbetalingDetaljeSide = () => {
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

  const pageTittel = data.ytelse;
  const ytelseDato = data.ytelseDato;
  const brutto = data.bruttoUtbetalt;
  const nettoUtbetalt = data.nettoUtbetalt;
  const trekk = data.trekk;
  const harTrekk = trekk.length > 0;

  return (
    <>
      <Breadcrumbs showUtbetalinger={true} />
      <Heading className={style.pageTitle} level="1" size="xlarge">
        {pageTittel}
      </Heading>
      <div className={style.beløpOgDatoContainer}>
        <div>
          <BodyShort
            className={style.utbetaltDato}
          >{`Utbetalt ${formatToDetailedDate(ytelseDato)}`}</BodyShort>
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
          {data.underytelse.map((ytelse: UnderYtelse) => (
            <DetaljeElement label={ytelse.beskrivelse} beløp={ytelse.beløp} />
          ))}
          {harTrekk && (
            <DetaljeElement
              isSum={true}
              label={"Brutto utbetalt"}
              beløp={brutto}
              className="bruttoElement"
            />
          )}
          {harTrekk &&
            trekk.map((trekk: Trekk) => (
              <DetaljeElement
                label={trekk.trekk_type}
                beløp={trekk.trekk_belop}
              />
            ))}
          {
            <DetaljeElement
              isSum={true}
              label="Netto utbetalt"
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
