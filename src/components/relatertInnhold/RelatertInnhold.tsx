import { Heading } from "@navikt/ds-react";
import style from "./Relatertinnhold.module.css";
import {
  satserUrl,
  utbetalingsdatoerUrl,
  endreKontonummerUrl,
  endreSkattekortUrl,
  dagpengerUrl,
  årsoppgaverUrl,
  sosialhjelpUrl,
} from "../../utils/urls";

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
    title: "Forskudd på dagpenger",
    href: dagpengerUrl,
  },
  {
    title: "Se årsoppgavene mine",
    href: årsoppgaverUrl,
  }
  ,
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
            <a className={style.link} href={linkObject.href}>
              {linkObject.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatertInnhold;
