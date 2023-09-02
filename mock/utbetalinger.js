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
            id: "4c7f-648e37e7a1f402fa",
            beløp: 724.0,
            dato: "2024-08-15",
            ytelse: "Grunn- og hjelpestønad",
          },
          {
            id: "4c7f-648e37e7a1f402fa",
            beløp: 724.0,
            dato: "2024-08-15",
            ytelse: "Grunn- og hjelpestønad",
          },
        ],
        tidligere: [
          {
            år: 2023,
            måned: 8,
            utbetalinger: [
              {
                id: "4c7f-648e37e7a1f402fa",
                beløp: 724.0,
                dato: "2023-08-15",
                ytelse: "Grunn- og hjelpestønad",
              },
              {
                id: "4c79-ce279c7ae43428c8",
                beløp: 724.0,
                dato: "2023-08-08",
                ytelse: "Grunn- og hjelpestønad",
              },
            ],
          },
          {
            år: 2023,
            måned: 6,
            utbetalinger: [
              {
                id: "4c3c-a86f06fc661b402d",
                beløp: 705.0,
                dato: "2023-06-19",
                ytelse: "Grunn- og hjelpestønad",
              },
            ],
          },
        ],
        utbetalingerIPeriode: {
          harUtbetalinger: true,
          brutto: 2153,
          netto: 2153,
          trekk: "0",
          ytelser: [{ ytelse: "Grunn- og hjelpestønad", beløp: 2153 }],
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
