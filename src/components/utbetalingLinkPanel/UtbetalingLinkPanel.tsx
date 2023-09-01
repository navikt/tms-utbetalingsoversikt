import style from "./UtbetalingLinkPanel.module.css";
import { BodyLong, BodyShort } from "@navikt/ds-react";
import { formatToReadableDate } from "../../../utils/date.js";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { baseUrl } from "../../utils/urls.js";

export type UtbetalingType = {
  id: string;
  beløp: number;
  dato: string;
  ytelse: string;
}

type UtbetalingProps = UtbetalingType & {nesteUtbetaling: boolean}

const UtbetalingLinkPanel = ({
  ytelse,
  beløp,
  dato,
  id,
  nesteUtbetaling,
}: UtbetalingProps) => {
  return (
    <a
      id={nesteUtbetaling ? style.nesteUtbetalingLink : style.utbetalingLink}
      className={"navds-panel navds-link-panel"}
      href={`${baseUrl}/utbetaling/${id}`}
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
        <BodyShort className={style.betalingDato}>{`${beløp} kr`}</BodyShort>
        <ChevronRightIcon
          id="chevronRight"
          className="navds-link-panel__chevron"
        />
      </div>
    </a>
  );
};

export default UtbetalingLinkPanel;
