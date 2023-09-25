import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort } from "@navikt/ds-react";
import { logEvent } from "~utils/amplitude";
import { formatToReadableDate } from "~utils/date";
import { baseUrl } from "~utils/urls";
import { formaterTallUtenDesimaler } from "~utils/utbetalingDetalje";
import style from "./UtbetalingLinkPanel.module.css";

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
  const linkClassName = nesteUtbetaling
    ? style.nesteUtbetalingLink
    : style.tidligereUtbetalingLink;
  return (
    <a
      className={"navds-panel navds-link-panel " + linkClassName}
      href={`${baseUrl}/utbetaling/${id}`}
      onClick={() =>
        logEvent(
          "utbetaling-link-panel",
          nesteUtbetaling ? "kommende" : "tidligere"
        )
      }
    >
      <div className={style.betalingLeft}>
        {
          <BodyShort textColor="subtle" className={style.betalingDato}>
            {formatToReadableDate(dato)}
          </BodyShort>
        }
        {<BodyLong className={style.betalingYtelse}>{ytelse}</BodyLong>}
      </div>
      <div className={style.betalingRight}>
        <BodyShort
          weight="semibold"
          className={style.betalingDato}
        >{`${formaterTallUtenDesimaler(beløp)} kr`}</BodyShort>
        <ChevronRightIcon
          aria-hidden="true"
          className="navds-link-panel__chevron chevronRight"
        />
      </div>
    </a>
  );
};

export default UtbetalingLinkPanel;
