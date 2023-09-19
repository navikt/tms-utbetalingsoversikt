import { rest } from "msw";
import {
  authenticationUrl,
  utbetalingerAPIUrl,
  enkelUtbetalingAPIUrl,
} from "../utils/urls";
import autentication from "./mockData/autentication.json" assert { type: "json" };
import alleUtbetalinger from "./mockData/alleUtbetalinger.json";
import utbetalingDetalje from "./mockData/utbetalingDetalje.json";

const handleGet = (url, response) =>
  rest.get(url, (_, res, ctx) => res(ctx.json(response)));

export const handlers = [
  handleGet(authenticationUrl, autentication),
  handleGet(utbetalingerAPIUrl(""), alleUtbetalinger),
  handleGet(enkelUtbetalingAPIUrl("e33f402fa"), utbetalingDetalje),
];
