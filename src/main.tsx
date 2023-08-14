import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "@navikt/ds-css";
import { injectDecoratorClientSide } from "@navikt/nav-dekoratoren-moduler/csr";
import Authentication from './components/authentication/Authentication.tsx';


if (true) {
  await injectDecoratorClientSide({
    env: "dev",
    urlLookupTable: false,
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Authentication>
      <App />
    </Authentication>
  </React.StrictMode>,
)
