/*eslint no-undef: "off"*/
export default [
  {
    url: "/api/utbetaling",
    method: "get",
    response: () => (            {
      id: "2131123",
      ytelse: "Arbeidsavklaringspenger",
      status: "Utbetalt",
      ytelse_dato: "2023-04-09T22:46:01.204+02:00",
      forfall_dato: "2023-04-09T22:46:01.204+02:00",
      ytelse_periode: {
        fom: "2023-04-26T22:46:01.204+02:00",
        tom: "2023-05-26T22:46:01.204+02:00",
      },
      utbetalt_til: "Ola Nordmann  ",
      kontonummer: "xx34567",
      underytelser: [
        {
          beskrivelse: "Grunnsats",
          sats: 100.0,
          antall: 6.0,
          belop: 600.0,
        },
        {
          beskrivelse: "Testytelse",
          sats: 200.0,
          antall: 2.0,
          belop: 400.0,
        },
        {
          beskrivelse: "Tilleggspensjon",
          sats: 100.0,
          antall: 3.0,
          belop: 300.0,
        },
      ],
      trekk: [
        {
          trekk_type: "Skattetrekk",
          trekk_belop: -350.0,
        },
      ],
      er_utbetalt: true,
      rettighetshaver: {
        aktoerId: "12345",
        navn: "Ola Nordmann      ",
      },
      melding: "6 uker igjen av stønadsperioden",
    }),
  },
  {

    url: "/api/utbetalinger",
    method: "get",
    response: () => {
      return (
        {
          bruker: {
            aktoerId: "12345",
            navn: "Ola Nordmann",
          },
          kommendeUtbetalinger: [
            {
              id: "112341223",
              ytelse: "Arbeidsavklaringspenger",
              status: "Returnert NAV for videre behandling",
              ytelse_dato: "2023-04-30T22:46:01.203+02:00",
              forfall_dato: "2023-04-30T22:46:01.203+02:00",
              ytelse_periode: {
                fom: "2023-04-16T22:46:01.203+02:00",
                tom: "2023-07-16T22:46:01.203+02:00",
              },
              utbetalt_til: "Ola Nordmann  ",
              kontonummer: "xx34567",
              underytelser: [
                {
                  beskrivelse: "Grunnsats",
                  sats: 100.0,
                  antall: 9.0,
                  belop: 5900.0,
                },
                {
                  beskrivelse: "Testytelse",
                  sats: 200.0,
                  antall: 2.0,
                  belop: 400.0,
                },
                {
                  beskrivelse: "Tilleggspensjon",
                  sats: 100.0,
                  antall: 3.0,
                  belop: 300.0,
                },
              ],
              trekk: [
                {
                  trekk_type: "Skattetrekk",
                  trekk_belop: -350.0,
                },
              ],
              er_utbetalt: false,
              rettighetshaver: {
                aktoerId: "12345",
                navn: "Ola Nordmann      ",
              },
              melding: "1 uker igjen av stønadsperioden",
            },
          ],
          utbetalteUtbetalinger: [
            {
              id: "2131123",
              ytelse: "Arbeidsavklaringspenger",
              status: "Utbetalt",
              ytelse_dato: "2023-04-09T22:46:01.204+02:00",
              forfall_dato: "2023-04-09T22:46:01.204+02:00",
              ytelse_periode: {
                fom: "2023-04-26T22:46:01.204+02:00",
                tom: "2023-05-26T22:46:01.204+02:00",
              },
              utbetalt_til: "Ola Nordmann  ",
              kontonummer: "xx34567",
              underytelser: [
                {
                  beskrivelse: "Grunnsats",
                  sats: 100.0,
                  antall: 6.0,
                  belop: 600.0,
                },
                {
                  beskrivelse: "Testytelse",
                  sats: 200.0,
                  antall: 2.0,
                  belop: 400.0,
                },
                {
                  beskrivelse: "Tilleggspensjon",
                  sats: 100.0,
                  antall: 3.0,
                  belop: 300.0,
                },
              ],
              trekk: [
                {
                  trekk_type: "Skattetrekk",
                  trekk_belop: -350.0,
                },
              ],
              er_utbetalt: true,
              rettighetshaver: {
                aktoerId: "12345",
                navn: "Ola Nordmann      ",
              },
              melding: "6 uker igjen av stønadsperioden",
            },
            {
              id: "091231234",
              ytelse: "Dagpenger",
              status: "Utbetalt",
              ytelse_dato: "2023-05-12T22:46:01.204+02:00",
              forfall_dato: "2023-05-12T22:46:01.204+02:00",
              ytelse_periode: {
                fom: "2023-04-26T22:46:01.204+02:00",
                tom: "2023-05-26T22:46:01.204+02:00",
              },
              utbetalt_til: "Ola Nordmann  ",
              kontonummer: "xx34567",
              underytelser: [
                {
                  beskrivelse: "Grunnsats",
                  sats: 1100.0,
                  antall: 7.0,
                  belop: 5700.0,
                },
                {
                  beskrivelse: "Testytelse",
                  sats: 200.0,
                  antall: 2.0,
                  belop: 400.0,
                },
                {
                  beskrivelse: "Tilleggspensjon",
                  sats: 100.0,
                  antall: 3.0,
                  belop: 300.0,
                },
              ],
              trekk: [
                {
                  trekk_type: "Skattetrekk",
                  trekk_belop: -350.0,
                },
              ],
              er_utbetalt: true,
              rettighetshaver: {
                aktoerId: "12345",
                navn: "Ola Nordmann      ",
              },
              melding: "32 uker igjen av stønadsperioden",
            },
            {
              id: "121231235",

              ytelse: "Dagpenger",
              status: "Utbetalt",
              ytelse_dato: "2023-04-12T22:46:01.204+02:00",
              forfall_dato: "2023-04-12T22:46:01.204+02:00",
              ytelse_periode: {
                fom: "2023-03-26T22:46:01.204+01:00",
                tom: "2023-04-26T22:46:01.204+02:00",
              },
              utbetalt_til: "Ola Nordmann  ",
              kontonummer: "xx34567",
              underytelser: [
                {
                  beskrivelse: "Grunnsats",
                  sats: 100.0,
                  antall: 6.0,
                  belop: 600.0,
                },
                {
                  beskrivelse: "Testytelse",
                  sats: 200.0,
                  antall: 2.0,
                  belop: 400.0,
                },
                {
                  beskrivelse: "Tilleggspensjon",
                  sats: 100.0,
                  antall: 3.0,
                  belop: 300.0,
                },
              ],
              trekk: [
                {
                  trekk_type: "Skattetrekk",
                  trekk_belop: -350.0,
                },
              ],
              er_utbetalt: true,
              rettighetshaver: {
                aktoerId: "12345",
                navn: "Ola Nordmann      ",
              },
              melding: "60 uker igjen av stønadsperioden",
            },
            {
              id: "12312450",
              ytelse: "Dagpenger",
              status: "Utbetalt",
              ytelse_dato: "2023-04-12T22:46:01.204+02:00",
              forfall_dato: "2023-04-12T22:46:01.204+02:00",
              ytelse_periode: {
                fom: "2023-03-26T22:46:01.204+01:00",
                tom: "2023-04-26T22:46:01.204+02:00",
              },
              utbetalt_til: "Ola Nordmann  ",
              kontonummer: "xx34567",
              underytelser: [
                {
                  beskrivelse: "Grunnsats",
                  sats: 100.0,
                  antall: 6.0,
                  belop: 600.0,
                },
                {
                  beskrivelse: "Testytelse",
                  sats: 200.0,
                  antall: 2.0,
                  belop: 400.0,
                },
                {
                  beskrivelse: "Tilleggspensjon",
                  sats: 100.0,
                  antall: 3.0,
                  belop: 300.0,
                },
              ],
              trekk: [
                {
                  trekk_type: "Skattetrekk",
                  trekk_belop: -350.0,
                },
              ],
              er_utbetalt: true,
              rettighetshaver: {
                aktoerId: "12345",
                navn: "Ola Nordmann      ",
              },
              melding: "60 uker igjen av stønadsperioden",
            },
            {
              id: "1212829123",
              ytelse: "Dagpenger",
              status: "Utbetalt",
              ytelse_dato: "2023-04-12T22:46:01.204+02:00",
              forfall_dato: "2023-04-12T22:46:01.204+02:00",
              ytelse_periode: {
                fom: "2023-03-26T22:46:01.204+01:00",
                tom: "2023-04-26T22:46:01.204+02:00",
              },
              utbetalt_til: "Ola Nordmann  ",
              kontonummer: "xx34567",
              underytelser: [
                {
                  beskrivelse: "Grunnsats",
                  sats: 100.0,
                  antall: 6.0,
                  belop: 600.0,
                },
                {
                  beskrivelse: "Testytelse",
                  sats: 200.0,
                  antall: 2.0,
                  belop: 400.0,
                },
                {
                  beskrivelse: "Tilleggspensjon",
                  sats: 100.0,
                  antall: 3.0,
                  belop: 300.0,
                },
              ],
              trekk: [
                {
                  trekk_type: "Skattetrekk",
                  trekk_belop: -350.0,
                },
              ],
              er_utbetalt: true,
              rettighetshaver: {
                aktoerId: "12345",
                navn: "Ola Nordmann      ",
              },
              melding: "60 uker igjen av stønadsperioden",
            },
          ],
        },
      );
    },
  },
];
