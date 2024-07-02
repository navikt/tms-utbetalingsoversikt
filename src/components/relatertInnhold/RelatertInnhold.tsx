import { Heading } from "@navikt/ds-react";
import style from "./Relatertinnhold.module.css";
import {
  satserUrl,
  utbetalingsdatoerUrl,
  endreKontonummerUrl,
  endreSkattekortUrl,
  årsoppgaverUrl,
  sosialhjelpUrl,
} from "~utils/urls";
import { logEvent } from "~utils/amplitude";

const relatertInnholdLinks = [
  {
    title: "Utbetalingsdatoer",
    href: utbetalingsdatoerUrl,
  },
  {
    title: "Sosialhjelp",
    href: sosialhjelpUrl,
  },
  {
    title: "Satser",
    href: satserUrl,
  },
  {
    title: "Endre kontonummer",
    href: endreKontonummerUrl,
  },
  {
    title: "Se årsoppgavene mine",
    href: årsoppgaverUrl,
  },
  {
    title: "Endre skattekort",
    href: endreSkattekortUrl,
  },
];

const RelatertInnhold = () => {
  return (
    <div className={style.container}>
      <Heading className={style.hrefeading} level="2" size="xsmall">
        Relatert innhold
      </Heading>
      <ul className={style.linkList}>
        {relatertInnholdLinks.map((linkObject) => (
          <li key={linkObject.title}>
            <a
              className={style.link}
              onClick={() =>
                logEvent("relatert-innhold-link", linkObject.title)
              }
              href={linkObject.href}
            >
              {linkObject.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatertInnhold;
