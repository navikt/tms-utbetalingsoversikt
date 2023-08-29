import { Chips, Label } from "@navikt/ds-react";
import { toggleYtelseFilter, ytelserFilterAtom } from "../../../store/filter";
import { useStore } from "@nanostores/react";
import style from "./YtelserFilter.module.css"

const YtelserFilter = () => {
  const ytelser = useStore(ytelserFilterAtom);
  return (
    <div className={style.pengestøtteChips}>
      <Label as={"p"} className={style.ytelseFilterLabel} >
        Velg pengestøtte
      </Label>
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
  );
};

export default YtelserFilter;
