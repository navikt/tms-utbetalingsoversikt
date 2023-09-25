import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Landingsside from "./pages/landingsside/Landingsside";
import UtbetalingDetaljeSide from "./pages/utbetalingDetaljeSide/UtbetalingDetaljeSide";
import { initializeAmplitude } from "~utils/amplitude";
import { Alert, Link } from "@navikt/ds-react";
import { legacyUrl } from "~utils/urls";

function App() {
  const BASE_PATH = "/tms-utbetalingsoversikt";
  initializeAmplitude();

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.pageContainer}>
        <Alert variant="info" className={styles.infoAlert}>
          Dette er den nye visningen av utbetalinger.{" "}
          <Link href={legacyUrl}>Gå til den gamle utbetalingsoversikten</Link> dersom du opplever
          feil, eller hvis det er innhold som mangler
        </Alert>
        <Router>
          <Routes>
            <Route path={BASE_PATH} element={<Landingsside />} />
            <Route
              path={BASE_PATH + "/utbetaling/:utbetalingsId"}
              element={<UtbetalingDetaljeSide />}
            />
          </Routes>
        </Router>
      </section>
    </div>
  );
}

export default App;
