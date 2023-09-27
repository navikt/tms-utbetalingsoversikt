import { Alert, Link } from "@navikt/ds-react";
import { legacyUrl } from "~utils/urls";
import styles from "./InfoAlertLegacyApp.module.css";

const InfoAlertLegacyApp = () => (
  <Alert variant="info" className={styles.infoAlert}>
    Dette er en ny visning av utbetalinger. Du kan fortsette å bruke
    <Link href={legacyUrl}>den gamle utbetalingsoversikten</Link> en stund til,
    men etterhvert vil den slutte å fungere.
  </Alert>
);

export default InfoAlertLegacyApp;
