import { BodyLong, Button, Chips, DatePicker, Label, useRangeDatepicker } from "@navikt/ds-react";
import dayjs from "dayjs";
import { useState } from "react";
import { setPeriodeFilter } from "../../../store/filter";
import {
  GetDatePeriodType,
  formatDateToDayjs,
  getDateCurrentlyThisYear,
  getDateLastYear,
  getDateThreemonthsBack,
} from "../../../utils";
import style from "./PeriodeFilter.module.css";

type PeriodeOptionsType = {
  label: string;
  dateFunction: GetDatePeriodType;
};

const periodeOptions: PeriodeOptionsType[] = [
  { label: "Siste 3 måneder", dateFunction: getDateThreemonthsBack },
  { label: "Hittil i år", dateFunction: getDateCurrentlyThisYear },
  { label: "I fjor", dateFunction: getDateLastYear },
  { label: "Egendefinert", dateFunction: getDateLastYear }, //TODO change getDateLastYear with formatDateToDayjs, Fix typescript errors
];

const PeriodeFilter = () => {
  const [periode, setPeriode] = useState("Siste 3 måneder");

  const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
    fromDate: dayjs().subtract(3, "years").toDate(),
    toDate: dayjs().toDate(),
    onRangeChange: (date) => setPeriodeFilter(formatDateToDayjs(date?.from, date?.to)),
  });

  const handlePeriodeClick = (selectedOption: string, periodeTomFom: GetDatePeriodType) => {
    setPeriode(selectedOption);
    if (selectedOption !== "Egendefinert") {
      setPeriodeFilter(periodeTomFom());
    }
  };

  return (
    <div className={style.periodeFilterContainer}>
      <Label as={"p"} className={style.periodeFilterLabel}>Velg periode</Label>
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
          <DatePicker className={style.datePicker} {...datepickerProps}>
            <div className={style.datePicketInputs}>
              <DatePicker.Input {...fromInputProps} size="small" label="Fra" />
              <DatePicker.Input {...toInputProps} size="small" label="Til" />
            </div>
            <Button id={style.oppdaterButton} size="small">
            Oppdater
          </Button>
          </DatePicker>
        </>
      )}
    </div>
  );
};

export default PeriodeFilter;
