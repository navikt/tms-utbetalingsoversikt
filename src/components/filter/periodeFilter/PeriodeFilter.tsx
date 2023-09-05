import { BodyShort, Chips } from "@navikt/ds-react";
import { useState } from "react";
import { setPeriodeFilter, setSelectedPeriode } from "../../../store/filter";
import {
  GetDatePeriodType,
  getDateCurrentlyThisYear,
  getDateLastYear,
  getDateThreemonthsBack,
} from "../../../utils";
import style from "./PeriodeFilter.module.css";
import EgendefinertPeriode from "./egendefinertPeriode/EgendefinertPeriode";

type PeriodeOptionsType = {
  label: string;
  dateFunction?: GetDatePeriodType;
};

const periodeOptions: PeriodeOptionsType[] = [
  { label: "Siste 3 måneder", dateFunction: getDateThreemonthsBack },
  { label: "Hittil i år", dateFunction: getDateCurrentlyThisYear },
  { label: "I fjor", dateFunction: getDateLastYear },
  { label: "Egendefinert" }, 
];

const PeriodeFilter = () => {
  const [selected, setSelected] = useState("Siste 3 måneder");

  const handlePeriodeClick = (
    selectedOption: string,
    periodeTomFom?: GetDatePeriodType
  ) => {
    setSelected(selectedOption);
    if (selectedOption !== "Egendefinert") {
      setSelectedPeriode(selectedOption);
      periodeTomFom && setPeriodeFilter(periodeTomFom());
    }
  };

  return (
    <div className={style.periodeFilterContainer}>
      <BodyShort weight="semibold" className={style.periodeFilterLabel}>
        Velg periode
      </BodyShort>
      <Chips>
        {periodeOptions.map((p) => (
          <Chips.Toggle
            checkmark={false}
            onClick={() => handlePeriodeClick(p.label, p?.dateFunction)}
            key={p.label}
            selected={p.label === selected}
          >
            {p.label}
          </Chips.Toggle>
        ))}
      </Chips>
      {selected === "Egendefinert" && <EgendefinertPeriode />}
    </div>
  );
};

export default PeriodeFilter;
