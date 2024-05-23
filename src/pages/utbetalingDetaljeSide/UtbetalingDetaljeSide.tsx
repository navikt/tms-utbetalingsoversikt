import {Alert, BodyLong, Heading, Loader} from "@navikt/ds-react";
import { useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";
import Breadcrumbs from "~components/breadcrumbs/Breadcrumbs";
import ErrorPanel from "~components/errorPanel/ErrorPanel";
import { logEvent } from "~utils/amplitude";
import { enkelUtbetalingAPIUrl } from "~utils/urls";
import { fetcher } from "../../api/api";
import PrintButton from "../../components/prinButton/PrintButton";
import { formatToDetailedDate } from "../../utils/date";
import PrintPageHeading from "../printPageHeading/PrintPageHeading";
import style from "./UtbetalingDetaljeSide.module.css";
import SummaryPanel from "./summaryPanel/SummaryPanel";
import UtbetalingCalculations from "./utbetalingCalculations/UtbetalingCalculations";
import UtbetalingDescription from "./utbetalingDescription/UtbetalingDescription";

const UtbetalingDetaljeSide = () => {
  const { utbetalingsId } = useParams();
  const { data, isLoading, error } = useSWRImmutable(
    { path: enkelUtbetalingAPIUrl(utbetalingsId ? utbetalingsId : "") },
    fetcher,
    {
      shouldRetryOnError: false,
      onError: () => logEvent("fikk-feilmelding-detaljeside"),
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
  const nettoUtbetalt = data.nettoUtbetalt;
  const showFeriePenferAlert = data?.melding && data.melding.toLowerCase().includes("sykepenger") && data.melding.toLowerCase().includes("arbeidstaker feriepenger")

    return (
    <>
      <Breadcrumbs showUtbetalinger={true} />
      <PrintPageHeading />
      <Heading className={style.pageTitle} level="1" size="xlarge">
        {pageTittel}
      </Heading>
      {showFeriePenferAlert && <Alert className={style.feriepengerInfomelding} variant="info">
        <BodyLong weight="semibold" >
          Har du fått en uventet utbetaling av sykepenger fra NAV?
        </BodyLong>
        {'NAV utbetaler nå feriepenger som ble opptjent på foreldrepenger, sykepenger, pleiepenger, opplæringspenger og svangerskapspenger i 2023. Utbetalingen er merket "Sykepenger, arbeidstaker feriepenger", uavhengig av pengestøtte. Selve utbetalingen er riktig, selv om teksten kan være misvisende.'}
      </Alert>}
      <SummaryPanel erUtbetalt={data.erUtbetalt} utbetalingsDato={ytelseDato} nettoUtbetalt={nettoUtbetalt} ytelse={pageTittel} />
      <div className={style.detailsContainer}>
        {<UtbetalingCalculations data={data} />}
        {data?.melding && <UtbetalingDescription heading={"Melding"} bodyText={data.melding} />}
        <UtbetalingDescription
          heading={"Periode"}
          bodyText={`${formatToDetailedDate(data.ytelsePeriode.fom)} - ${formatToDetailedDate(
            data.ytelsePeriode.tom
          )} til konto ${data.kontonummer}`}
        />
        <PrintButton />
      </div>
    </>
  );
};

export default UtbetalingDetaljeSide;
