import { Alert, BodyLong, Heading, Link } from "@navikt/ds-react";
import { baseUrl } from "../../utils/urls";
import style from "./ErrorPanel.module.css"

const ErrorPanel = () => (
  <Alert variant="error" className={style.container}>
    <Heading level="2" size="xsmall">
      Vi har problemer med å hente inn dine utbetalinger.
    </Heading>
    <BodyLong>
      Vi beklager ulempene dette medfører. Du kan prøve å endre periode,{" "}
      <Link href={baseUrl}>laste inn siden på nytt</Link>, eller prøv igjen senere.
    </BodyLong>
  </Alert>
);
export default ErrorPanel;
