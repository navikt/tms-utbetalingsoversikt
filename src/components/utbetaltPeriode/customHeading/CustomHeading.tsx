import { Detail, Heading } from "@navikt/ds-react";
type props = {
  isPrint?: boolean;
};

const CustomHeading = ({ isPrint }: props) => {
  if (isPrint) return <Detail weight="semibold"> Periode </Detail>;
  return (
    <Heading className={`navds-body-short`} level="2" size="small">
      Utbetalt i perioden
    </Heading>
  );
};

export default CustomHeading;
