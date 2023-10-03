import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { initializeAmplitude } from "~utils/amplitude";
import styles from "./App.module.css";
import Landingsside from "./pages/landingsside/Landingsside";
import UtbetalingDetaljeSide from "./pages/utbetalingDetaljeSide/UtbetalingDetaljeSide";

function App() {
  const BASE_PATH = "/utbetalingsoversikt";
  initializeAmplitude();

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.pageContainer}>
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
