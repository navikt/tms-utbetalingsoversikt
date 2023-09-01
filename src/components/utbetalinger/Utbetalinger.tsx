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
        `?fom=${selectedPeriodFilter.fom}&tom=${selectedPeriodFilter.tom}`
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
  const showKommendeUtbetalinger =
  utbetalinger?.neste.length > 0;

  const hasTidligereUtbetalinger =
  utbetalinger?.tidligere.length > 0;

  hasTidligereUtbetalinger &&
    setYtelseFilter(getUniqueYtelser(utbetalinger.utbetalingerIPeriode.ytelser));

  return (
    <>
      <YtelserFilter />
      {showKommendeUtbetalinger && (
        <KommendeUtbetalinger
          utbetalinger={utbetalinger.neste}
        />
      )}
      {hasTidligereUtbetalinger && (
        <>
          <TidligereUtbetalinger
            utbetalingGroups={utbetalinger.tidligere}
            periode={
              utbetalingerPeriod === "Egendefinert"
                ? utbetalingerPeriodDato
                : utbetalingerPeriod
            }
          />
          <UtbetaltPeriode
            data={utbetalinger.utbetalingerIPeriode}
            periode={utbetalingerPeriodDato}
          />
        </>
      )}
    </>
  );
};

export default Utbetalinger;
