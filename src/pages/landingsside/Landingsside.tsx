import { Heading } from "@navikt/ds-react";
import Breadcrumbs from "~components/breadcrumbs/Breadcrumbs.tsx";
import PeriodeFilter from "~components/filter/periodeFilter/PeriodeFilter.tsx";
import ShowFilterButton from "~components/filter/showFilterButton/ShowFilterButton.tsx";
import InfoAlertLegacyApp from "~components/infoAlertLegacyApp/InfoAlertLegacyApp";
import RelatertInnhold from "~components/relatertInnhold/RelatertInnhold.tsx";
import Utbetalinger from "~components/utbetalinger/Utbetalinger.tsx";
import style from "./Landingsside.module.css";
import PrintUtbetalinger from "./PrintUtbetalinger/PrintUtbetalinger";

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
          <InfoAlertLegacyApp />
          <RelatertInnhold />
        </div>
      </div>
      <PrintUtbetalinger />
    </>
  );
}

export default Landingsside;
