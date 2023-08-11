const isProduction = window.location.href.includes("www.nav.no");
const isDevelopment = window.location.href.includes("www.intern.dev.nav.no");

export const getEnvironment = () => {
  if (isProduction) {
    return "production";
  }

  if (isDevelopment) {
    return "development";
  }

  return "local";
};

const BASE_URL = {
  local: "http://localhost:3000",
  development: "https://www.intern.dev.nav.no",
  production: "https://www.nav.no",
};

const UtbetalingsoversiktAPIUrl = {
  local: "http://localhost:3000/api",
  development: "https://www.intern.dev.nav.no/tms-utbetalingsoversikt-api",
  production: "https://www.nav.no/tms-utbetalingsoversikt-api",
};

export const utbetalingerAPIUrl = `${
  UtbetalingsoversiktAPIUrl[getEnvironment()]
}/utbetalinger`;

export const enkelUtbetalingAPIUrl = (id: string) =>
  `${UtbetalingsoversiktAPIUrl[getEnvironment()]}/utbetaling`;
