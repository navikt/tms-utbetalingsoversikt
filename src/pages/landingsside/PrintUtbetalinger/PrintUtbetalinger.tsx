import { useStore } from "@nanostores/react";
import { Detail } from "@navikt/ds-react";
import dayjs from "dayjs";
import { UtbetalingGroupType, UtbetalingType, UtbetalingerResponse } from "src/types/types";
import useSWR from "swr";
import UtbetaltPeriode from "~components/utbetaltPeriode/UtbetaltPeriode";
import { periodeFilterAtom } from "~store/filter";
import { utbetalingerAPIUrl } from "~utils/urls";
import { formaterTallUtenDesimaler } from "~utils/utbetalingDetalje";
import { fetcher } from "../../../api/api";
import styles from "./PrintUtbetalinger.module.css";
import PrintPageHeading from "../../printPageHeading/PrintPageHeading";

const PrintUtbetalinger = () => {
  const selectedPeriodFilter = useStore(periodeFilterAtom);
  const periodFom = dayjs(selectedPeriodFilter.fom).format("DD.MM.YYYY");
  const periodTom = dayjs(selectedPeriodFilter.tom).format("DD.MM.YYYY");
  const { data: utbetalinger } = useSWR<UtbetalingerResponse>(
    {
      path: utbetalingerAPIUrl(`?fom=${selectedPeriodFilter.fom}&tom=${selectedPeriodFilter.tom}`),
    },
    fetcher
  );

  const utbetalingerGroups = utbetalinger?.tidligere;
  const fomTomDato = `${periodFom} - ${periodTom}`;

  return (
    <>
      <PrintPageHeading />
      <Detail weight="semibold" className={styles.periodeText}>
        Periode
      </Detail>
      <Detail weight="semibold" className={styles.periodeDate}>
        {fomTomDato}
      </Detail>
      {utbetalinger && (
        <>
          <ul className={styles.utbetalingListe}>
            {utbetalingerGroups?.map((group: UtbetalingGroupType) => {
              return group.utbetalinger.map((u: UtbetalingType, index) => (
                <li key={index} className={styles.utbetalingElement}>
                  <Detail weight="semibold" className={styles.utbetalingElementHeading}>
                    <span className={styles.ytelse}>{u.ytelse}</span>
                    <span className={styles.beløp}>{formaterTallUtenDesimaler(u.beløp) + " kr"}</span>
                  </Detail>
                  <Detail className={styles.utbetalingElementDato}>{`Utbetalt ${dayjs(u.dato).format(
                    "DD.MM.YYYY"
                  )}`}</Detail>
                </li>
              ));
            })}
          </ul>
          <UtbetaltPeriode isPrint data={utbetalinger?.utbetalingerIPeriode} periode={fomTomDato} />
        </>
      )}
    </>
  );
};

export default PrintUtbetalinger;
