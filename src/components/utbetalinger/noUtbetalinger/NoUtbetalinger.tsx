import { BodyLong, Heading, Link } from "@navikt/ds-react";
import style from "./NoUtbetalinger.module.css";
import { omUtbetalinger } from "~utils/urls";
import { logEvent } from "~utils/amplitude";

const NoUtbetalinger = () => {
  return (
    <div className={style.container}>
      <Heading level="3" size="xsmall">
        Du har ingen utbetalinger for denne perioden
      </Heading>
      <BodyLong>
        Prøv å endre periode eller se{" "}
        <Link
          onClick={() => logEvent("mer-om-utbetalig-link")}
          href={omUtbetalinger}
        >
          mer om utbetalinger
        </Link>
      </BodyLong>
    </div>
  );
};

export default NoUtbetalinger;
