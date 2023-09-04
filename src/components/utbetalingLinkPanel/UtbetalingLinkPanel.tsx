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
};

type UtbetalingProps = UtbetalingType & { nesteUtbetaling: boolean };

const UtbetalingLinkPanel = ({
  ytelse,
  beløp,
  dato,
  id,
  nesteUtbetaling,
}: UtbetalingProps) => {
  const linkClassName = `${
    nesteUtbetaling ? style.nesteUtbetalingLink : style.tidligereUtbetalingLink
  }`;

  return (
    <a
      className={"navds-panel navds-link-panel "+linkClassName}
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
          aria-hidden="true"
          className="navds-link-panel__chevron chevronRight"
        />
      </div>
    </a>
  );
};

export default UtbetalingLinkPanel;
