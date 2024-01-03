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
        NAV har trukket for mye skatt på utbetaling av AAP og dagpenger 2. januar
      </Heading>
      Feilen blir rettet og NAV vil etterbetale for mye trukket skatt innen kort tid. Vi har oversikt over hvem dette
      gjelder, så du trenger derfor ikke ta kontakt med oss.
    </Alert>
  );
};

export default OvertrukketSkattAlert;
