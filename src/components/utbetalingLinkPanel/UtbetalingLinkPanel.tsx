import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort } from "@navikt/ds-react";
import { logEvent } from "~utils/amplitude";
import { formatToReadableDate } from "~utils/date";
import { formaterTallUtenDesimaler } from "~utils/utbetalingDetalje";
import style from "./UtbetalingLinkPanel.module.css";
import { Link } from "react-router-dom";
import { UtbetalingType } from "src/types/types";

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
    <Link
      className={"navds-panel navds-link-panel " + linkClassName}
      to={`/utbetalingsoversikt/utbetaling/${id}`}
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
    </Link>
  );
};

export default UtbetalingLinkPanel;
