import { useParams } from "react-router-dom";
import { enkelUtbetalingAPIUrl } from "../../utils/urls";
import style from "./UtbetalingDetaljeSide.module.css";
import useSWRImmutable from "swr/immutable";
import { BodyShort, Heading, Loader } from "@navikt/ds-react";
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
  const sumUtbetalt = data.nettoUtbetalt;
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
            {`${formaterTallUtenDesimaler(sumUtbetalt)} kr`}
          </Heading>
        </div>
      </div>
      <div className={style.detaljeListeContainer}>
        <BodyShort weight="semibold" className={style.detaljerLabel}>
          Detaljer
        </BodyShort>
        <ul>
          {data.underytelse.map((ytelse) => (
            <DetaljeElement label={ytelse.beskrivelse} beløp={ytelse.beløp} />
          ))}
          {harTrekk && (
            <DetaljeElement
              isSum={true}
              label={"Brutto utbetalt"}
              beløp={brutto}
            />
          )}
          {harTrekk &&
            trekk.map((trekk) => (
              <DetaljeElement
                label={trekk.trekk_type}
                beløp={trekk.trekk_belop}
              />
            ))}
          {
            <DetaljeElement
              isSum={true}
              label="Netto utbetalt"
              beløp={brutto}
            />
          }
          {data?.melding && (
            <li className={style.meldingElement}>
              <BodyShort weight="semibold" className={style.meldingLabel}>
                Melding
              </BodyShort>
              <BodyShort>{data.melding}</BodyShort>
            </li>
          )}
          {
            <li>
              <BodyShort weight="semibold" className={style.periodeLabel}>
                Periode
              </BodyShort>
              <BodyShort className={style.periodeDato}>
                {`${formatToDetailedDate(
                  data.ytelsePeriode.fom
                )} - ${formatToDetailedDate(
                  data.ytelsePeriode.tom
                )} til konto ${data.kontonummer}`}
              </BodyShort>
            </li>
          }
        </ul>
      </div>
    </>
  );
};

export default UtbetalingDetaljeSide;
