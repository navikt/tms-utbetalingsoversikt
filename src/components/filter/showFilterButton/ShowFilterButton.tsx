import { useStore } from "@nanostores/react";
import { showFilterAtom, toggleShowFilter } from "../../../store/filter";
import { FilterIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import style from "./ShowFilterButton.module.css"

const ShowFilterButton = () => {
  const selected = useStore(showFilterAtom)
  const handleClick = () => {
    toggleShowFilter()
  }

  return (
    <Button
      className={`${style.showFilterButton} ${selected && style.buttonSelected}`}
      size="small"
      variant="primary"
      icon={<FilterIcon aria-hidden />}
      onClick={handleClick}
    >
      Vis filter
    </Button>
  );
};

export default ShowFilterButton