import { injectDecoratorClientSide } from "@navikt/nav-dekoratoren-moduler/csr";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Authentication from "~components/authentication/Authentication.tsx";
import "./index.css";

if (process.env.NODE_ENV === "development") {
  const newLocal = "./mocks/browser";
  const msw = await import(newLocal);
  await msw.worker.start({ onUnhandledRequest: "bypass" });
  msw.worker.printHandlers();

  await injectDecoratorClientSide({
    env: "dev",
    urlLookupTable: false,
  });
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Authentication>
      <App />
    </Authentication>
  </React.StrictMode>
);
