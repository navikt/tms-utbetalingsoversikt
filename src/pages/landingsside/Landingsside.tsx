import style from "./Landingsside.module.css";
import { Heading } from "@navikt/ds-react";
import text from "../../language/text.ts";
import useSWR from "swr";
import { fetcher } from "../../api/api.ts";
import { utbetalingerAPIUrl } from "../../utils/urls.ts";
import { groupUtbetalingInMonths } from "../../utils/groupUtbetalingYearAndMonth.ts";
import Filter from "../../components/filter/Filter.tsx";
import KommendeUtbetalinger from "../../components/kommendeUtbetalinger/KommendeUtbetalinger.tsx";
import TidligereUtbetalinger from "../../components/tidligereUtbetalinger/TidligereUtbetalinger.tsx";
import RelatertInnhold from "../../components/relatertInnhold/RelatertInnhold.tsx";
import UtbetaltPeriode from "../../components/utbetaltPeriode/UtbetaltPeriode.tsx";
import ContentLoader from "../../components/contentLoader/ContentLoader.tsx";

function Landingsside() {
  const utbetalingerPeriod = "Siste tre måneder";
  console.log("landet")

  const { data: utbetalinger, isLoading } = useSWR(
    { path: utbetalingerAPIUrl("?&fom=20230525&tom=20230825") },
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );

  if (isLoading) {
    return <ContentLoader />;
  }

  const tidligereUtbetalinger = groupUtbetalingInMonths(
    utbetalinger.utbetalteUtbetalinger
  );

  const kommendeUtbetalinger =
    utbetalinger?.kommendeUtbetalinger; /* TODO Endre til å vise kun for 30 dager frem i tid*/
  const showKommendeUtbetalinger = kommendeUtbetalinger.length > 0;

  return (
    <>
      <Heading className={style.pageTitle} level="1" size="large">
        {text.sideTittel["nb"]}
      </Heading>
      <div className={style.pageBody}>
        <div className={style.utbetalingerAndFilter}>
          <Filter />
          {showKommendeUtbetalinger && (
            <KommendeUtbetalinger utbetalinger={kommendeUtbetalinger} />
          )}
          <TidligereUtbetalinger
            tidligereUtbetalinger={tidligereUtbetalinger}
            periode={utbetalingerPeriod}
          />
        </div>
        <UtbetaltPeriode
          utbetalinger={utbetalinger.utbetalteUtbetalinger}
          periode={utbetalingerPeriod}
        />
        <RelatertInnhold />
      </div>
    </>
  );
}

export default Landingsside;
