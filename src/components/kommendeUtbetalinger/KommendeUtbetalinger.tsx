import { HovedYtelse } from "../../types/utbetalingTypes";
import { BodyShort } from "@navikt/ds-react";
import UtbetalingLinkPanel from "../utbetalingLinkPanel/UtbetalingLinkPanel";
import { summerYtelser } from "../../utils/summering";
import style from "./KommendeUtbetalinger.module.css";

interface Props {
  utbetalinger: HovedYtelse[];
}

const KommendeUtbetalinger = ({ utbetalinger }: Props) => {
  return (
    <div className={style.nesteUtbetaling}>
      <BodyShort className={style.kommendeUtbetalingerLabel}>
        Neste utbetaling
      </BodyShort>{" "}
      {utbetalinger.map((utbetaling: HovedYtelse) => (
        <UtbetalingLinkPanel
          ytelse={utbetaling.ytelse}
          beløp={summerYtelser(utbetaling.underytelser, utbetaling.trekk)}
          dato={utbetaling.ytelse_dato}
          nesteUtbetaling={true}
          id={utbetaling.id}
        />
      ))}
    </div>
  );
};

export default KommendeUtbetalinger;
