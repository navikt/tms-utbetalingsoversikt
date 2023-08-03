import { useState } from "react";
import { useStore } from "@nanostores/react";
import dayjs from "dayjs";
import { Heading, Chips } from "@navikt/ds-react";
import { DatePicker, useRangeDatepicker } from "@navikt/ds-react";
import { ytelserFilterAtom, toggleYtelseFilter } from "../../store/filter";
import { setPeriodeFilter } from "../../store/filter";
import { getDateThreemonthsBack, getDateCurrentlyThisYear } from "../../utils";
import { getDateLastYear, formatDateToDayjs } from "../../utils";
import style from "./Filter.module.css";

const periodeOptions = [
  ["Siste 3 måneder", getDateThreemonthsBack],
  ["Hittil i år", getDateCurrentlyThisYear],
  ["I fjor", getDateLastYear],
  ["Egendefinert", formatDateToDayjs],
];

const Filter = () => {
  const [periode, setPeriode] = useState("Siste 3 måneder");
  const ytelser = useStore(ytelserFilterAtom);

  const { datepickerProps, toInputProps, fromInputProps, selectedRange } =
    useRangeDatepicker({
      fromDate: dayjs().subtract(3, "years").toDate(),
      toDate: dayjs().toDate(),
      onRangeChange: (date) =>
        setPeriodeFilter(formatDateToDayjs(date?.from, date?.to)),
    });

  const handlePeriodeClick = (selectedOption, periodeTomFom) => {
    setPeriode(selectedOption);
    if (selectedOption !== "Egendefinert") {
      setPeriodeFilter(periodeTomFom());
    }
  };

  return (
    <div className={style.filterContainer}>
      <Heading size="xsmall" level="3">
        Velg periode
      </Heading>
      <Chips>
        {periodeOptions.map((p) => (
          <Chips.Toggle
            onClick={() => handlePeriodeClick(p[0], p[1])}
            key={p[0]}
            selected={p[0] === periode}
          >
            {p[0]}
          </Chips.Toggle>
        ))}
      </Chips>
      {periode === "Egendefinert" && (
        <DatePicker {...datepickerProps}>
          <div className={style.datePicketInputs}>
            <DatePicker.Input {...fromInputProps} size="small" label="Fra" />
            <DatePicker.Input {...toInputProps} size="small" label="Til" />
          </div>
        </DatePicker>
      )}
      <div className={style.pengestøtteChips}>
        <Heading size="xsmall" level="3">
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
