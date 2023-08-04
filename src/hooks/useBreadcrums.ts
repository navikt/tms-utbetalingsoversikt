import { useEffect } from "react";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";

type Breadcrumb = {
  url: string;
  title: string;
  handleInApp?: boolean;
};

export const useBreadcrumbs = () => {
  useEffect(() => {
    const baseBreadcrumbs: Breadcrumb[] = [
      {
        url: "https://www.nav.no/min-side",
        title: "Min side",
        handleInApp: false,
      },
      {
        url: "https://www.nav.no/dine-utbetalinger",
        title: "Dine utbetalinger",
        handleInApp: false,
      },   

    ];

    setBreadcrumbs(baseBreadcrumbs);
  }, []);
};