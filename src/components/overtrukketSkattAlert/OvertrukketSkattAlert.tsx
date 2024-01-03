import { Alert, Heading } from "@navikt/ds-react";
import style from "./OvertrukketSkattAlert.module.css";

type props = {
  isOnDetaljeSide?: boolean;
};

const OvertrukketSkattAlert = ({ isOnDetaljeSide }: props) => {
  const className = isOnDetaljeSide ? style.containerDetaljeSide : style.container;
  return (
    <Alert className={className} variant="info">
      <Heading spacing size="small" level="2">
        For mye trukket skatt på utbetaling av AAP og dagpenger
      </Heading>
      NAV har trukket for mye skatt på utbetaling av AAP og dagpenger som ble utbetalt 2.januar. Vi har oversikt over
      hvem dette gjelder, så du trenger derfor ikke ta kontakt med oss. Feilen er rettet. NAV forventer å utbetale for
      mye trukket skatt i løpet av fredag 5. januar. Når pengene er inne på konto, avhenger av hvilken bank du har.
    </Alert>
  );
};

export default OvertrukketSkattAlert;
