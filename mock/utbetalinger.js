/*eslint no-undef: "off"*/
export default [
  {
    url: "/api/utbetaling",
    method: "get",
    response: () => ({
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
    url: "/api/utbetalinger/alle",
    method: "get",
    response: () => {
      return {
        neste: [
          {
            id: "e33f402fa",
            beløp: 724.0,
            dato: "2024-08-15",
            ytelse: "Grunn- og hjelpestønad",
          },
          {
            id: "130fdv",
            beløp: 724.0,
            dato: "2024-08-15",
            ytelse: "Grunn- og hjelpestønad",
          },
        ],
        tidligere: [
          {
            år: 2023,
            måned: 9,
            utbetalinger: [
              {
                id: "wefw2",
                beløp: 5240,
                dato: "2023-09-01",
                ytelse: "Barnetrygd",
              },
            ],
          },
          {
            år: 2023,
            måned: 8,
            utbetalinger: [
              {
                id: "q3w3",
                beløp: 1448,
                dato: "2023-08-15",
                ytelse: "Grunn- og hjelpestønad",
              },
              {
                id: "wefwef2",
                beløp: 6152,
                dato: "2023-08-08",
                ytelse: "Barnetrygd",
              },
              {
                id: "124wef",
                beløp: 1448,
                dato: "2023-08-08",
                ytelse: "Grunn- og hjelpestønad",
              },
            ],
          },
          {
            år: 2023,
            måned: 5,
            utbetalinger: [
              {
                id: "we124",
                beløp: 5612,
                dato: "2023-05-31",
                ytelse: "Barnetrygd",
              },
              {
                id: "wefw",
                beløp: 14276,
                dato: "2023-05-23",
                ytelse: "Arbeidsavklaringspenger",
              },
              {
                id: "vswe3",
                beløp: 1410,
                dato: "2023-05-15",
                ytelse: "Grunn- og hjelpestønad",
              },
              {
                id: "qewdq",
                beløp: 236,
                dato: "2023-05-08",
                ytelse: "Skattetrekk",
              },
              {
                id: "1532",
                beløp: 7216,
                dato: "2023-05-08",
                ytelse: "Arbeidsavklaringspenger",
              },
              {
                id: "1234",
                beløp: 7138,
                dato: "2023-05-08",
                ytelse: "Arbeidsavklaringspenger",
              },
            ],
          },
          {
            år: 2023,
            måned: 4,
            utbetalinger: [
              {
                id: "4dgcvc-QWDQW",
                beløp: 5612,
                dato: "2023-04-28",
                ytelse: "Barnetrygd",
              },
              {
                id: "0b3c4-QDRQ",
                beløp: 1410,
                dato: "2023-04-27",
                ytelse: "Grunn- og hjelpestønad",
              },
              {
                id: "4cRR0f-fwfqa",
                beløp: 14276,
                dato: "2023-04-25",
                ytelse: "Arbeidsavklaringspenger",
              },
              {
                id: "4c0vfwe-1231",
                beløp: 1410,
                dato: "2023-04-19",
                ytelse: "Grunn- og hjelpestønad",
              },
              {
                id: "4wedwe-5",
                beløp: 6332,
                dato: "2023-04-12",
                ytelse: "Arbeidsavklaringspenger",
              },
              {
                id: "4cqwdqwdq01-45",
                beløp: 7138,
                dato: "2023-04-12",
                ytelse: "Arbeidsavklaringspenger",
              },
            ],
          },
          {
            år: 2023,
            måned: 3,
            utbetalinger: [
              {
                id: "43e75c9f11",
                beløp: 5612,
                dato: "2023-03-31",
                ytelse: "Barnetrygd",
              },
              {
                id: "c53c1fa78e",
                beløp: 14432,
                dato: "2023-03-27",
                ytelse: "Arbeidsavklaringspenger",
              },
              {
                id: "1679e2c45db",
                beløp: 2898,
                dato: "2023-03-14",
                ytelse: "Arbeidsavklaringspenger",
              },
              {
                id: "8dae144",
                beløp: 11664,
                dato: "2023-03-14",
                ytelse: "Arbeidsavklaringspenger",
              },
            ],
          },
          {
            år: 2023,
            måned: 1,
            utbetalinger: [
              {
                id: "14ae16c0e7cee",
                beløp: 5460,
                dato: "2023-01-31",
                ytelse: "Barnetrygd",
              },
            ],
          },
        ],
        utbetalingerIPeriode: {
          harUtbetalinger: true,
          brutto: 179238,
          netto: 179238,
          trekk: 0,
          ytelser: [
            {
              ytelse: "Barnetrygd",
              beløp: 44760,
            },
            {
              ytelse: "Arbeidsavklaringspenger",
              beløp: 125706,
            },
            {
              ytelse: "Grunn- og hjelpestønad",
              beløp: 8536,
            },
            {
              ytelse: "Skattetrekk",
              beløp: 236,
            },
          ],
        },
      };
    },
  },
  {
    url: "/api/login/status",
    method: "get",
    response: () => {
      return {
        authenticated: true,
        level: 4,
        levelOfAssurance: null,
      };
    },
  },
];
