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
  development: "https://www.intern.dev.nav.no/tms-utbetalingsoversikt",
  production: "https://www.nav.no/tms-utbetalingsoversikt",
};

const UTBETALINGSOVERSIKT_API_URL = {
  local: "http://localhost:3000/api",
  development: "https://www.intern.dev.nav.no/tms-utbetalingsoversikt-api",
  production: "https://person.nav.no/tms-utbetalingsoversikt-api",
};

const SATSERURL = {
  local: "http://localhost:3000/satser",
  development:
    "https://www.intern.dev.nav.no/no/nav-og-samfunn/kontakt-nav/oversikt-over-satser",
  production:
    "https://www.nav.no/no/nav-og-samfunn/kontakt-nav/oversikt-over-satser",
};

const UTBETALINGSDATOER_URL = {
  local: "http://localhost:3000/utbetalignsdatoer",
  development:
    "https://www.intern.dev.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Utbetalinger/Utbetalinger/Utbetalingsdatoer%2C+feriepenger+og+skattetrekk",
  production:
    "https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Utbetalinger/Utbetalinger/Utbetalingsdatoer%2C+feriepenger+og+skattetrekk",
};

const ENDRE_KONTONUMMER_URL = {
  local: "http://localhost:3000/kontonummer",
  development: "https://www.intern.dev.nav.no/kontonummer",
  production: "https://www.nav.no/kontonummer",
};

const ENDRE_SKATTEKORT_URL = {
  local: "http://localhost:300/skattekort",
  development:
    "https://www.intern.dev.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Utbetalinger/skattetrekk-p%C3%A5-ytelser-fra-nav",
  production:
    "https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Utbetalinger/skattetrekk-p%C3%A5-ytelser-fra-nav",
};

const SOSIALHJELP_URL = {
  local: "https://www.nav.no/sosialhjelp/innsyn/utbetaling",
  development:
    "https://www.intern.dev.nav.no/sosialhjelp/innsyn/utbetaling",
  production:
    "https://www.nav.no/sosialhjelp/innsyn/utbetaling",
};

const DAGPENGER_URL = {
  local: "https://www.nav.no/dagpenger/forskudd/oversikt",
  development:
    "https://www.intern.dev.nav.no/dagpenger/forskudd/oversikt",
  production:
    "https://www.nav.no/dagpenger/forskudd/oversikt",
};

const ÅRSOPPGAVER_URL = {
  local: "https://www.nav.no/dokumentarkiv/tema/STO",
  development:
    "https://intern.dev.nav.no/dokumentarkiv/tema/STO",
  production:
    "https://www.nav.no/dokumentarkiv/tema/STO",
};

export const utbetalingerAPIUrl = (period:string) => `${
  UTBETALINGSOVERSIKT_API_URL[getEnvironment()]
}/utbetalinger${period}`;


export const enkelUtbetalingAPIUrl = (id: string) =>
  `${UTBETALINGSOVERSIKT_API_URL[getEnvironment()]}/utbetaling?ytelseId=${id}`;

export const baseUrl = `${BASE_URL[getEnvironment()]}`;
export const loginUrl = `${
  UTBETALINGSOVERSIKT_API_URL[getEnvironment()]
}/login`;
export const authenticationUrl = `${loginUrl}/status`;

export const satserUrl = SATSERURL[getEnvironment()];
export const utbetalingsdatoerUrl = UTBETALINGSDATOER_URL[getEnvironment()];
export const endreKontonummerUrl = ENDRE_KONTONUMMER_URL[getEnvironment()];
export const endreSkattekortUrl = ENDRE_SKATTEKORT_URL[getEnvironment()];
export const sosialhjelpUrl = SOSIALHJELP_URL[getEnvironment()];
export const dagpengerUrl = DAGPENGER_URL[getEnvironment()];
export const årsoppgaverUrl = ÅRSOPPGAVER_URL[getEnvironment()];
