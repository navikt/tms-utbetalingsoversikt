import { Heading } from "@navikt/ds-react";
import UtbetalingLinkPanel, {
  UtbetalingType,
} from "../utbetalingLinkPanel/UtbetalingLinkPanel";
import style from "./KommendeUtbetalinger.module.css";

interface Props {
  utbetalinger: UtbetalingType[];
}

const KommendeUtbetalinger = ({ utbetalinger }: Props) => {
  return (
    <div className={style.container}>
      <Heading level="2" size="small" className={"navds-body-short  " + style.heading}>
        Neste utbetaling
      </Heading>{" "}
      <ul className={style.kommendeUtbetlaingList}>
        {utbetalinger.map((u: UtbetalingType) => (
          <li key={u.id} className={style.kommendeUtbetlaingElement}>
            <UtbetalingLinkPanel
              ytelse={u.ytelse}
              beløp={u.beløp}
              dato={u.dato}
              nesteUtbetaling={true}
              id={u.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KommendeUtbetalinger;
