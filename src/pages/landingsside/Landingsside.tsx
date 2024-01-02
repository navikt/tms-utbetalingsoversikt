import { Heading } from "@navikt/ds-react";
import Breadcrumbs from "~components/breadcrumbs/Breadcrumbs.tsx";
import PeriodeFilter from "~components/filter/periodeFilter/PeriodeFilter.tsx";
import ShowFilterButton from "~components/filter/showFilterButton/ShowFilterButton.tsx";
import RelatertInnhold from "~components/relatertInnhold/RelatertInnhold.tsx";
import Utbetalinger from "~components/utbetalinger/Utbetalinger.tsx";
import style from "./Landingsside.module.css";
import PrintUtbetalinger from "./printUtbetalinger/PrintUtbetalinger";

function Landingsside() {
  return (
    <>
      <div id={style.printHide}>
        <Breadcrumbs showUtbetalinger={false} />
        <Heading className={style.pageTitle} level="1" size="xlarge">
          Utbetalinger
        </Heading>
        <div className={style.pageBody}>
          <ShowFilterButton />
          <PeriodeFilter />
          <Utbetalinger />
          <RelatertInnhold />
        </div>
      </div>
      <PrintUtbetalinger />
    </>
  );
}

export default Landingsside;
