import { BodyShort } from "@navikt/ds-react";
import UtbetalingLinkPanel from "../utbetalingLinkPanel/UtbetalingLinkPanel";
import style from "./KommendeUtbetalinger.module.css";
import { Utbetaling } from "../../types/alleUtbetalinger";

interface Props {
  utbetalinger: Utbetaling[];
}

const KommendeUtbetalinger = ({ utbetalinger }: Props) => {
  return (
    <div className={style.nesteUtbetaling}>
      <BodyShort className={style.kommendeUtbetalingerLabel}>
        Neste utbetaling
      </BodyShort>{" "}
      {utbetalinger.map((u: Utbetaling) => (
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
