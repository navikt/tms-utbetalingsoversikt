import { useStore } from "@nanostores/react";
import useSWR from "swr";
import { fetcher } from "../../api/api";
import { periodeFilterAtom, selctedPeriode, setYtelseFilter } from "../../store/filter";
import getUniqueYtelser from "../../utils/getUniqueYtelser";
import { groupUtbetalingInMonths } from "../../utils/groupUtbetalingYearAndMonth";
import { utbetalingerAPIUrl } from "../../utils/urls";
import ContentLoader from "../contentLoader/ContentLoader";
import YtelserFilter from "../filter/ytelseFilter/YtelserFilter";
import KommendeUtbetalinger from "../kommendeUtbetalinger/KommendeUtbetalinger";
import TidligereUtbetalinger from "../tidligereUtbetalinger/TidligereUtbetalinger";
import UtbetaltPeriode from "../utbetaltPeriode/UtbetaltPeriode";
import dayjs from "dayjs";

const Utbetalinger = () => {
  const utbetalingerPeriod = useStore(selctedPeriode);
  const selectedPeriodFilter = useStore(periodeFilterAtom);
  const utbetalingerPeriodDato = `${dayjs(selectedPeriodFilter.fom).format("DD.MM.YYYY")}-${dayjs(selectedPeriodFilter.tom).format("DD.MM.YYYY")}`

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
            periode={utbetalingerPeriod === "Egendefinert" ? utbetalingerPeriodDato : utbetalingerPeriod}
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
