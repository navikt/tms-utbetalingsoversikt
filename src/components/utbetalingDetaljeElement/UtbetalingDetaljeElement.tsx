import { BodyShort } from "@navikt/ds-react";
import style from "./utbetalingDetaljeElement.module.css";
import { formaterTallUtenDesimaler } from "../../utils/utbetalingDetalje";

interface DetaljeElementProps {
  label: string;
  beløp: number;
  isSum?: boolean;
}
const DetaljeElement = ({ label, beløp, isSum }: DetaljeElementProps) => {
  const containerClassName = `${style.container} ${
    isSum ? style.sumContainer : ""
  }`;

  return (
    <li className={containerClassName}>
      <BodyShort weight={isSum ? "semibold" : "regular"}>{label}</BodyShort>
      <BodyShort
        weight={isSum ? "semibold" : "regular"}
      >{`${formaterTallUtenDesimaler(beløp)} kr`}</BodyShort>
    </li>
  );
};

export default DetaljeElement;
