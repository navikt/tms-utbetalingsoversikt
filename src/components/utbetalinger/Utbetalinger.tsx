import { useStore } from "@nanostores/react";
import {Alert, BodyLong, Heading} from "@navikt/ds-react";
import dayjs from "dayjs";
import { UtbetalingerResponse } from "src/types/types";
import useSWR from "swr";
import { periodeFilterAtom, selctedPeriodeAtom, setYtelseFilter } from "~store/filter";
import { logEvent } from "~utils/amplitude";
import getUniqueYtelser from "~utils/getUniqueYtelser";
import { utbetalingerAPIUrl } from "~utils/urls";
import { fetcher } from "../../api/api";
import ContentLoader from "../contentLoader/ContentLoader";
import ErrorPanel from "../errorPanel/ErrorPanel";
import YtelserFilter from "../filter/ytelseFilter/YtelserFilter";
import KommendeUtbetalinger from "../kommendeUtbetalinger/KommendeUtbetalinger";
import PrintButton from "../prinButton/PrintButton";
import UtbetaltPeriode from "../utbetaltPeriode/UtbetaltPeriode";
import style from "./Ubtetalinger.module.css";
import NoUtbetalinger from "./noUtbetalinger/NoUtbetalinger";
import TidligereUtbetalinger from "./tidligereUtbetalinger/TidligereUtbetalinger";

const Utbetalinger = () => {
  const utbetalingerPeriod = useStore(selctedPeriodeAtom);
  const selectedPeriodFilter = useStore(periodeFilterAtom);
  const utbetalingerPeriodDato = `${dayjs(selectedPeriodFilter.fom).format("DD.MM.YYYY")}-${dayjs(
    selectedPeriodFilter.tom
  ).format("DD.MM.YYYY")}`;

  const {
    data: utbetalinger,
    isLoading,
    error,
  } = useSWR<UtbetalingerResponse>(
    {
      path: utbetalingerAPIUrl(`?fom=${selectedPeriodFilter.fom}&tom=${selectedPeriodFilter.tom}`),
    },
    fetcher,
    {
      shouldRetryOnError: false,
      onError: () => logEvent("fikk-feilmelding-forside"),
    }
  );

  if (isLoading) {
    return <ContentLoader />;
  }
  const showKommendeUtbetalinger = utbetalinger && utbetalinger?.neste.length > 0;

  const hasTidligereUtbetalinger = utbetalinger && utbetalinger?.tidligere.length > 0;

  hasTidligereUtbetalinger && setYtelseFilter(getUniqueYtelser(utbetalinger.utbetalingerIPeriode.ytelser));

  return (
    <>
      {hasTidligereUtbetalinger &&  <YtelserFilter />}
        {<Alert className={style.infoMelding} variant="info">
            <BodyLong spacing>Brukere som har levert meldekort på lørdag og søndag vil denne gang få utbetaling tirsdag 4. juni.
                Vi har hatt en feil som nå er rettet. Vi beklager ulempen dette medfører.
            </BodyLong>
            <BodyLong>
                Etterbetaling av trygdeoppgjøret for AAP og dagpenger er utbetalt. De fleste vil ha pengene på konto 3.
                eller 4. juni. På etterbetalingen trekkes det skatt etter prosentdelen av skattekortet.
            </BodyLong>
        </Alert>}
      {showKommendeUtbetalinger && <KommendeUtbetalinger utbetalinger={utbetalinger.neste} />}
      {
        <>
          <Heading level="2" size="small" className={`navds-body-short ${style.tidligereUtbetalingerHeading}`}>
            {utbetalingerPeriod === "Egendefinert" ? utbetalingerPeriodDato : utbetalingerPeriod}
          </Heading>
          {hasTidligereUtbetalinger ? (
            <>
              {" "}
              <TidligereUtbetalinger utbetalingGroups={utbetalinger.tidligere} />
              <UtbetaltPeriode data={utbetalinger.utbetalingerIPeriode} periode={utbetalingerPeriodDato} />
              <PrintButton />
            </>
          ) : (
            <NoUtbetalinger />
          )}
          {error ? <ErrorPanel isLandingsside /> : null}
        </>
      }
    </>
  );
};

export default Utbetalinger;
