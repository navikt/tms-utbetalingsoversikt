import { useStore } from "@nanostores/react";
import useSWR from "swr";
import { fetcher } from "../../api/api";
import { periodeFilterAtom, setYtelseFilter } from "../../store/filter";
import getUniqueYtelser from "../../utils/getUniqueYtelser";
import { groupUtbetalingInMonths } from "../../utils/groupUtbetalingYearAndMonth";
import { utbetalingerAPIUrl } from "../../utils/urls";
import ContentLoader from "../contentLoader/ContentLoader";
import YtelserFilter from "../filter/ytelseFilter/YtelserFilter";
import KommendeUtbetalinger from "../kommendeUtbetalinger/KommendeUtbetalinger";
import TidligereUtbetalinger from "../tidligereUtbetalinger/TidligereUtbetalinger";
import UtbetaltPeriode from "../utbetaltPeriode/UtbetaltPeriode";

const Utbetalinger = () => {
  const utbetalingerPeriod = "Siste tre måneder";
  const selectedPeriodFilter = useStore(periodeFilterAtom);
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

  if (isLoading) {
    return <ContentLoader />;
  }

  const showKommendeUtbetalinger = utbetalinger?.kommendeUtbetalinger.length > 0;

  const hasTidligereUtbetalinger =
    utbetalinger?.utbetalteUtbetalinger.length > 0;

  hasTidligereUtbetalinger &&
    setYtelseFilter(getUniqueYtelser(utbetalinger.utbetalteUtbetalinger));

  return (
    <>
      <YtelserFilter />
      {showKommendeUtbetalinger && (
        <KommendeUtbetalinger utbetalinger={utbetalinger.kommendeUtbetalinger} />
      )}
      {hasTidligereUtbetalinger && (
        <>
          <TidligereUtbetalinger
            tidligereUtbetalinger={groupUtbetalingInMonths(
              utbetalinger.utbetalteUtbetalinger
            )}
            periode={utbetalingerPeriod}
          />
          <UtbetaltPeriode
            utbetalinger={utbetalinger.utbetalteUtbetalinger}
            periode={utbetalingerPeriod}
          />
        </>
      )}
    </>
  );
};

export default Utbetalinger;
