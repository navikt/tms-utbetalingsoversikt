import { useStore } from "@nanostores/react";
import dayjs from "dayjs";
import useSWR from "swr";
import { fetcher } from "../../api/api";
import {
  periodeFilterAtom,
  selctedPeriode,
  setYtelseFilter,
} from "../../store/filter";
import getUniqueYtelser from "../../utils/getUniqueYtelser";
import { utbetalingerAPIUrl } from "../../utils/urls";
import ContentLoader from "../contentLoader/ContentLoader";
import YtelserFilter from "../filter/ytelseFilter/YtelserFilter";
import KommendeUtbetalinger from "../kommendeUtbetalinger/KommendeUtbetalinger";
import TidligereUtbetalinger from "../tidligereUtbetalinger/TidligereUtbetalinger";
import UtbetaltPeriode from "../utbetaltPeriode/UtbetaltPeriode";

const Utbetalinger = () => {
  const utbetalingerPeriod = useStore(selctedPeriode);
  const selectedPeriodFilter = useStore(periodeFilterAtom);
  const utbetalingerPeriodDato = `${dayjs(selectedPeriodFilter.fom).format(
    "DD.MM.YYYY"
  )}-${dayjs(selectedPeriodFilter.tom).format("DD.MM.YYYY")}`;

  const { data: utbetalinger, isLoading } = useSWR(
    {
      path: utbetalingerAPIUrl(
        `?&fom=${selectedPeriodFilter.fom}&tom=${selectedPeriodFilter.tom}`
      ),
    },
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );

  const { data: nyUtbetaling } = useSWR(
    {
      path: `https://person.nav.no/tms-utbetalingsoversikt-api/utbetalinger/alle?fom=${selectedPeriodFilter.fom}&tom=${selectedPeriodFilter.tom}`,
    },
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );

  if(nyUtbetaling){
    console.log(nyUtbetaling)
  }


  if (isLoading) {
    return <ContentLoader />;
  }
  const showKommendeUtbetalinger =
    utbetalinger?.kommendeUtbetalinger.length > 0;

  const hasTidligereUtbetalinger =
    utbetalinger?.utbetalteUtbetalinger.length > 0;

  hasTidligereUtbetalinger &&
    setYtelseFilter(getUniqueYtelser(utbetalinger.utbetalteUtbetalinger));

  return (
    <>
      <YtelserFilter />
      {showKommendeUtbetalinger && (
        <KommendeUtbetalinger
          utbetalinger={utbetalinger.kommendeUtbetalinger}
        />
      )}
      {hasTidligereUtbetalinger && (
        <>
          <TidligereUtbetalinger
            tidligereUtbetalinger={utbetalinger.utbetalteUtbetalinger}
            periode={
              utbetalingerPeriod === "Egendefinert"
                ? utbetalingerPeriodDato
                : utbetalingerPeriod
            }
          />
          <UtbetaltPeriode
            utbetalinger={utbetalinger.utbetalteUtbetalinger}
            periode={utbetalingerPeriodDato}
          />
        </>
      )}
    </>
  );
};

export default Utbetalinger;
