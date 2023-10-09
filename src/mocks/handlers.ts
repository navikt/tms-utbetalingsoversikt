import { rest } from "msw";
import {
  authenticationUrl,
  utbetalingerAPIUrl,
  enkelUtbetalingAPIUrl,
} from "~utils/urls";
import autentication from "./mockData/autentication.json" assert { type: "json" };
import alleUtbetalinger from "./mockData/alleUtbetalinger.json";
import betaltUtbetalingDetalje from "./mockData/betaltUtbetalingDetalje.json";
import kommendetUtbetalingDetalje from "./mockData/kommendeUtbetalingDetaljer.json";

const handleGet = (url: string, response: object) =>
  rest.get(url, (_, res, ctx) => res(ctx.json(response)));

export const handlers = [
  handleGet(authenticationUrl, autentication),
  handleGet(utbetalingerAPIUrl(""), alleUtbetalinger),
  handleGet(enkelUtbetalingAPIUrl("ut-*"), betaltUtbetalingDetalje),
  handleGet(enkelUtbetalingAPIUrl("ko-*"), kommendetUtbetalingDetalje),
  handleGet("http://localhost:3000/api/utbetalinger/", betaltUtbetalingDetalje),
];
