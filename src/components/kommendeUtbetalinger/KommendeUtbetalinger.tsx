import { BodyShort } from "@navikt/ds-react";
import UtbetalingLinkPanel, { UtbetalingType } from "../utbetalingLinkPanel/UtbetalingLinkPanel";
import style from "./KommendeUtbetalinger.module.css";

interface Props {
  utbetalinger: UtbetalingType[];
}

const KommendeUtbetalinger = ({ utbetalinger }: Props) => {
  return (
    <div className={style.nesteUtbetaling}>
      <BodyShort className={style.kommendeUtbetalingerLabel}>
        Neste utbetaling
      </BodyShort>{" "}
      {utbetalinger.map((u: UtbetalingType) => (
        <UtbetalingLinkPanel
          ytelse={u.ytelse}
          beløp={u.beløp}
          dato={u.dato}
          nesteUtbetaling={true}
          id={u.id}
        />
      ))}
    </div>
  );
};

export default KommendeUtbetalinger;
