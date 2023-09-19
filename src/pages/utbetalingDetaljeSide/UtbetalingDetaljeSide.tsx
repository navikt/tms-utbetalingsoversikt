import { useParams } from "react-router-dom";
import { enkelUtbetalingAPIUrl } from "../../utils/urls";
import style from "./UtbetalingDetaljeSide.module.css";
import useSWRImmutable from "swr/immutable";
import { BodyShort, Heading, Loader } from "@navikt/ds-react";
import { fetcher } from "../../api/api";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import { formatToDetailedDate } from "../../utils/date";
import { formaterTallUtenDesimaler } from "../../utils/utbetalingDetalje";

interface DetaljeElementProps {
  label: "string";
  beløp: "number";
  isBold: boolean;
}
const DetaljeElement = ({
  label,
  beløp,
  isBold = false,
}: DetaljeElementProps) => (
  <li>
    <BodyShort weight={isBold ? "semibold" : "regular"}>{label}</BodyShort>
    <BodyShort weight={isBold ? "semibold" : "regular"}>{beløp}</BodyShort>
  </li>
);

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
  const harTrekk = data.length > 0;

  return (
    <>
      <Breadcrumbs showUtbetalinger={true} />
      <Heading className={style.pageTitle} level="1" size="xlarge">
        {pageTittel}
      </Heading>
      <div className={style.beløpOgDatoContainer}>
        <BodyShort
          className={style.utbetaltDato}
        >{`Utbetalt ${formatToDetailedDate(ytelseDato)}`}</BodyShort>
        <Heading className={style.belopUtbetaltHeader} level="2" size="xlarge">
          {`${formaterTallUtenDesimaler(sumUtbetalt)} kr`}
        </Heading>
      </div>
      <BodyShort weight="semibold" className={style.detaljerLabel}>
        Detaljer
      </BodyShort>
      <ul>
        <div>
          {data.underytelser.map((ytelse) => (
            <DetaljeElement label={ytelse.beskrivelse} belop={ytelse.beløp} />
          ))}
          {harTrekk && (
            <DetaljeElement label={"Brutto utbetalt"} belop={brutto} />
          )}
        </div>
        <div>
          {harTrekk &&
            data.trekk.map((trekk) => (
              <DetaljeElement
                label={trekk.trekk_type}
                belop={trekk.trekk_belop}
              />
            ))}
          {<DetaljeElement label={"Netto utbetalt"} belop={brutto} />}
        </div>
        {data?.melding && (
          <li>
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
              )} - ${formatToDetailedDate(data.ytelsePeriode.tom)} til konto ${
                data.kontonummer
              }`}
            </BodyShort>
          </li>
        }
      </ul>
    </>
  );
};
