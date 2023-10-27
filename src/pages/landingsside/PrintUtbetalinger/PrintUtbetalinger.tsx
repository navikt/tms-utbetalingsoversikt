import { useStore } from "@nanostores/react";
import { BodyShort, Heading } from "@navikt/ds-react";
import dayjs from "dayjs";
import useSWR from "swr";
import { periodeFilterAtom } from "~store/filter";
import { utbetalingerAPIUrl } from "~utils/urls";
import { formaterTallUtenDesimaler } from "~utils/utbetalingDetalje";
import { fetcher } from "../../../api/api";
import styles from "./PrintUtbetalinger.module.css";
import logo from "./nav-logo.png";
import { UtbetalingGroupType, UtbetalingType } from "src/types/types";

//TODO legge inn navn og fnr
const PrintUtbetalinger = () => {
  const selectedPeriodFilter = useStore(periodeFilterAtom);
  const periodFom = dayjs(selectedPeriodFilter.fom).format("DD.MM.YYYY");
  const periodTom = dayjs(selectedPeriodFilter.tom).format("DD.MM.YYYY");
  const { data: utbetalinger } = useSWR(
    {
      path: utbetalingerAPIUrl(`?fom=${selectedPeriodFilter.fom}&tom=${selectedPeriodFilter.tom}`),
    },
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );

  const utbetalingerGroups = utbetalinger?.tidligere;

  return (
    <div id={styles.container}>
      <img src={logo} alt="Logo" />
      <BodyShort className={styles.pageTitle}>UTBETALINGSOVERSIKT</BodyShort>
      <BodyShort className={styles.name}>NAVN</BodyShort>
      <BodyShort className={styles.fnr}>FNR</BodyShort>
      <BodyShort className={styles.date}>{`Utskrift fra ${dayjs().format("DD.MM.YYYY")}`}</BodyShort>
      <BodyShort className={styles.utbetaltIperiode}>Utbetalt i periode</BodyShort>{" "}
      <Heading className={styles.periodeDate} level="1" size="small">{`${periodFom} - ${periodTom}`}</Heading>
      {utbetalingerGroups?.map((g: UtbetalingGroupType) => {
        return g.utbetalinger.map((u: UtbetalingType) => (
          <div className={styles.utbetaling}>
            <Heading level="2" size="small" className={styles.utbetalingHeading}>
              <span className={styles.ytelse}>{u.ytelse}</span>
              <span className={styles.beløp}>{formaterTallUtenDesimaler(u.beløp) + " kr"}</span>
            </Heading>
            <BodyShort className={styles.utbetalingDato}>{`Utbetalt ${dayjs(u.dato).format("DD.MM.YYYY")}`}</BodyShort>
          </div>
        ));
      })}
    </div>
  );
};

export default PrintUtbetalinger;
