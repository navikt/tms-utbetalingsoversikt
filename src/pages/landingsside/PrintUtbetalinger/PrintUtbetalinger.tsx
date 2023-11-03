import { useStore } from "@nanostores/react";
import { Detail } from "@navikt/ds-react";
import dayjs from "dayjs";
import { UtbetalingGroupType, UtbetalingType, UtbetalingerResponse } from "src/types/types";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import UtbetaltPeriode from "~components/utbetaltPeriode/UtbetaltPeriode";
import { periodeFilterAtom } from "~store/filter";
import { identNavnUrl, utbetalingerAPIUrl } from "~utils/urls";
import { formaterTallUtenDesimaler } from "~utils/utbetalingDetalje";
import { fetcher } from "../../../api/api";
import styles from "./PrintUtbetalinger.module.css";
import logo from "./nav-logo.png";

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
  const { data: bruker } = useSWRImmutable(
    {
      path: identNavnUrl,
    },
    fetcher
  );

  const utbetalingerGroups = utbetalinger?.tidligere;
  const fomTomDato = `${periodFom} - ${periodTom}`;

  return (
    <div id={styles.container}>
      <img src={logo} width="90" alt="Logo" />
      <Detail className={styles.pageTitle}>UTBETALINGSOVERSIKT</Detail>
      <Detail className={styles.name}>{bruker?.navn}</Detail>
      <Detail className={styles.fnr}>{bruker?.ident}</Detail>
      <Detail className={styles.utskriftsdato}>{`Utskriftsdato: ${dayjs().format("DD.MM.YYYY")}`}</Detail>
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
    </div>
  );
};

export default PrintUtbetalinger;
