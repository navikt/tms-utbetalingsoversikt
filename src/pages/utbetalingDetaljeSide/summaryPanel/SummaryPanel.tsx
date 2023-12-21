import { BodyShort, Heading } from "@navikt/ds-react";
import { formatToDetailedDate } from "../../../utils/date";
import { formaterTallUtenDesimaler } from "../../../utils/utbetalingDetalje";
import style from "./SummaryPanel.module.css";

type props = {
  erUtbetalt: boolean;
  utbetalingsDato: string;
  nettoUtbetalt: number;
};

const SummaryPanel = ({ erUtbetalt, utbetalingsDato, nettoUtbetalt }: props) => {
  const isUtbetaltText = erUtbetalt ? "Utbetalt" : "Forventet overføring til bank";

  return (
    <div className={`${style.beløpOgDatoWrapper} ${!erUtbetalt && style.kommendeUtbetalingWrapper}`}>
      <div className={style.beløpOgDatoContainer}>
        <BodyShort className={style.utbetaltDato}>{`${isUtbetaltText} ${formatToDetailedDate(
          utbetalingsDato
        )}`}</BodyShort>
        <Heading className={style.belopUtbetaltHeader} level="2" size="xlarge">
          {`${formaterTallUtenDesimaler(nettoUtbetalt)} kr`}
        </Heading>
      </div>
    </div>
  );
};

export default SummaryPanel;
