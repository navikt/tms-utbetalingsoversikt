import { BodyLong, Heading, Link } from "@navikt/ds-react";
import style from "./NoUtbetalinger.module.css";
import { omUtbetalinger } from "../../utils/urls";

const NoUtbetalinger = () => {
  return (
    <div className={style.container}>
      <Heading level="3" size="xsmall">
        Du har ingen utbetalinger for denne perioden
      </Heading>
      <BodyLong>
        Prøv å endre periode eller se <Link href={omUtbetalinger}>mer om utbetalinger</Link>
      </BodyLong>
    </div>
  );
};

export default NoUtbetalinger;
