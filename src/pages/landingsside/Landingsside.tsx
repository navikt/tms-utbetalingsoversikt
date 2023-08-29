import { Heading } from "@navikt/ds-react";
import RelatertInnhold from "../../components/relatertInnhold/RelatertInnhold.tsx";
import text from "../../language/text.ts";
import style from "./Landingsside.module.css";
import PeriodeFilter from "../../components/filter/periodeFilter/PeriodeFilter.tsx";
import Utbetalinger from "../../components/utbetalinger/Utbetalinger.tsx";

function Landingsside() {
  return (
    <>
      <Heading className={style.pageTitle} level="1" size="large">
        {text.sideTittel["nb"]}
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
