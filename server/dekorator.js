/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { injectDecoratorServerSide } = require('@navikt/nav-dekoratoren-moduler/ssr');

const decoratorEnv = process.env.NAIS_CLUSTER_NAME === "prod-gcp" ? "prod" : "dev";

const getHtmlWithDecorator = (filePath) =>
  injectDecoratorServerSide({
    env: decoratorEnv,
    level: 'Level4',
  });

module.exports = getHtmlWithDecorator;