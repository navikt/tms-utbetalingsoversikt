import { useStore } from "@nanostores/react";
import { Heading } from "@navikt/ds-react";
import dayjs from "dayjs";
import useSWR from "swr";
import { fetcher } from "../../api/api";
import {
  periodeFilterAtom,
  selctedPeriodeAtom,
  setYtelseFilter,
} from "../../store/filter";
import getUniqueYtelser from "../../utils/getUniqueYtelser";
import { utbetalingerAPIUrl } from "../../utils/urls";
import ContentLoader from "../contentLoader/ContentLoader";
import YtelserFilter from "../filter/ytelseFilter/YtelserFilter";
import KommendeUtbetalinger from "../kommendeUtbetalinger/KommendeUtbetalinger";
import NoUtbetalinger from "../noUtbetalinger/NoUtbetalinger";
import TidligereUtbetalinger from "../tidligereUtbetalinger/TidligereUtbetalinger";
import UtbetaltPeriode from "../utbetaltPeriode/UtbetaltPeriode";
import style from "./Ubtetalinger.module.css";

const Utbetalinger = () => {
  const utbetalingerPeriod = useStore(selctedPeriodeAtom);
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
  const showKommendeUtbetalinger = utbetalinger?.neste.length > 0;

  const hasTidligereUtbetalinger = utbetalinger?.tidligere.length > 0;

  hasTidligereUtbetalinger &&
    setYtelseFilter(
      getUniqueYtelser(utbetalinger.utbetalingerIPeriode.ytelser)
    );

  return (
    <>
      {hasTidligereUtbetalinger && <YtelserFilter />}
      {showKommendeUtbetalinger && (
        <KommendeUtbetalinger utbetalinger={utbetalinger.neste} />
      )}
      {
        <>
          <Heading
            level="2"
            size="small"
            className={`navds-body-short ${style.tidligerPeriodeHeading}`}
          >
            {utbetalingerPeriod === "Egendefinert"
              ? utbetalingerPeriodDato
              : utbetalingerPeriod}
          </Heading>
          {hasTidligereUtbetalinger ? (
            <>
              {" "}
              <TidligereUtbetalinger
                utbetalingGroups={utbetalinger.tidligere}
              />
              <UtbetaltPeriode
                data={utbetalinger.utbetalingerIPeriode}
                periode={utbetalingerPeriodDato}
              />
            </>
          ) : (
            <NoUtbetalinger />
          )}
        </>
      }
    </>
  );
};

export default Utbetalinger;
