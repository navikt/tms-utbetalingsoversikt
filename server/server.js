/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const path = require("path");
const getHtmlWithDecorator = require("./dekorator");
const basePath = "/utbetalingsoversikt";
const buildPath = path.resolve(__dirname, "../dist");
const server = express();
const expressStaticGzip = require("express-static-gzip");

server.disable("x-powered-by");

server.use(
  basePath,
  expressStaticGzip(buildPath, {
    enableBrotli: true,
    orderPreference: ["br"],
    index: false
  })
);

server.get(`${basePath}/internal/isAlive`, async (req, res) => {
  res.sendStatus(200);
});

server.get(`${basePath}/internal/isReady`, async (req, res) => {
  res.sendStatus(200);
});

// Match everything except internal og static
server.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) =>
  getHtmlWithDecorator(`${buildPath}/index.html`)
    .then((html) => {
      console.error(new Error("Error melding"))
      res.send(html);
    })
    .catch((e) => {
      console.error(e)
      res.status(500).send(e);
    })
);

const port = 8080;
server.listen(port, () => console.info(`Listening on port ${port}`));