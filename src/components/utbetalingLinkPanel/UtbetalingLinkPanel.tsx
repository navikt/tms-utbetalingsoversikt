import style from "./UtbetalingLinkPanel.module.css";
import { BodyLong, BodyShort } from "@navikt/ds-react";
import { formatToReadableDate } from "../../../utils/date.js";
import { ChevronRightIcon } from "@navikt/aksel-icons";

type UtbetalingLinkPanelProps = {
  ytelse: string;
  beløp: number;
  dato: string;
  nesteUtbetaling:boolean;
};

const UtbetalingLinkPanel = ({
  ytelse,
  beløp,
  dato,
  nesteUtbetaling,
}: UtbetalingLinkPanelProps) => {
  return (
    <a
      id={nesteUtbetaling ? style.nesteUtbetalingLink  : style.utbetalingLink}
      className={"navds-panel navds-link-panel"}
      href="http://localhost:3000/utbetaling"
    >
      <div className={style.betalingLeft}>
        {
          <BodyShort className={style.betalingDato}>
            {formatToReadableDate(dato)}
          </BodyShort>
        }
        {<BodyLong className={style.betalingYtelse}>{ytelse}</BodyLong>}
      </div>
      <div className={style.betalingRight}>
        <BodyShort className={style.betalingDato}>{beløp}</BodyShort>
        <ChevronRightIcon
          id="chevronRight"
          className="navds-link-panel__chevron"
        />
      </div>
    </a>
  );
};

export default UtbetalingLinkPanel;
