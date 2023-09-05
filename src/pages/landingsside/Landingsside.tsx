import { Heading } from "@navikt/ds-react";
import RelatertInnhold from "../../components/relatertInnhold/RelatertInnhold.tsx";
import style from "./Landingsside.module.css";
import PeriodeFilter from "../../components/filter/periodeFilter/PeriodeFilter.tsx";
import Utbetalinger from "../../components/utbetalinger/Utbetalinger.tsx";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs.tsx";

function Landingsside() {
  return (
    <>
      <Breadcrumbs showUtbetalinger={false}/>
      <Heading className={style.pageTitle} level="1" size="xlarge">
        Utbetalinger
      </Heading>
      <div className={style.pageBody}>
        <PeriodeFilter />
        <Utbetalinger />
        <RelatertInnhold />
      </div>
    </>
  );
}

export default Landingsside;
