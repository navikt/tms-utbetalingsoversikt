import { useState } from "react";
import { useStore } from "@nanostores/react";
import dayjs from "dayjs";
import { Heading, Chips, Button } from "@navikt/ds-react";
import { DatePicker, useRangeDatepicker } from "@navikt/ds-react";
import { ytelserFilterAtom, toggleYtelseFilter } from "../../store/filter";
import { setPeriodeFilter } from "../../store/filter";
import { getDateThreemonthsBack, getDateCurrentlyThisYear, GetDatePeriodType } from "../../utils";
import { getDateLastYear, formatDateToDayjs } from "../../utils";
import style from "./Filter.module.css";

type PeriodeOptionsType = {
  label: string;
  dateFunction: GetDatePeriodType;
};
const periodeOptions: PeriodeOptionsType[] = [
  { label: "Siste 3 måneder", dateFunction: getDateThreemonthsBack },
  { label: "Hittil i år", dateFunction: getDateCurrentlyThisYear },
  { label: "I fjor", dateFunction: getDateLastYear },
  { label: "Egendefinert", dateFunction: getDateLastYear} //TODO change getDateLastYear with formatDateToDayjs, Fix typescript errors 
];
const Filter = () => {
  const [periode, setPeriode] = useState("Siste 3 måneder");
  const ytelser = useStore(ytelserFilterAtom);

  const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
    fromDate: dayjs().subtract(3, "years").toDate(),
    toDate: dayjs().toDate(),
    onRangeChange: (date) =>
      setPeriodeFilter(formatDateToDayjs(date?.from, date?.to)),
  });

  const handlePeriodeClick = (
    selectedOption: string,
    periodeTomFom: GetDatePeriodType
  ) => {
    setPeriode(selectedOption);
    if (selectedOption !== "Egendefinert") {
      setPeriodeFilter(periodeTomFom());
    }
  };

  return (
    <div className={style.filterContainer}>
      <Heading className={style.filterLabel} size="xsmall" level="3">
        Velg periode
      </Heading>
      <Chips>
        {periodeOptions.map((p) => (
          <Chips.Toggle
            checkmark={false}
            onClick={() => handlePeriodeClick(p.label, p.dateFunction)}
            key={p.label}
            selected={p.label === periode}
          >
            {p.label}
          </Chips.Toggle>
        ))}
      </Chips>
      {periode === "Egendefinert" && (
        <>
          <DatePicker {...datepickerProps}>
            <div className={style.datePicketInputs}>
              <DatePicker.Input {...fromInputProps} size="small" label="Fra" />
              <DatePicker.Input {...toInputProps} size="small" label="Til" />
            </div>
          </DatePicker>
          <Button id={style.oppdaterButton} size="small">
            Oppdater
          </Button>
        </>
      )}
      <div className={style.pengestøtteChips}>
        <Heading className={style.filterLabel} size="xsmall" level="3">
          Velg pengestøtte
        </Heading>
        <Chips>
          {Object.keys(ytelser).map((p) => (
            <Chips.Toggle
              onClick={() => toggleYtelseFilter(p)}
              key={p}
              selected={ytelser[p] === true}
            >
              {p}
            </Chips.Toggle>
          ))}
        </Chips>
      </div>
    </div>
  );
};

export default Filter;
