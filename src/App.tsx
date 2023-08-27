import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Landingsside from "./pages/landingsside/Landingsside";
import styles from "./App.module.css";
import { useBreadcrumbs } from "./hooks/useBreadcrums";
import UtbetalingSide from "./pages/utbetalingSide/UtbetalingSide";

function App() {
  const BASE_PATH = "/tms-utbetalingsoversikt"
  useBreadcrumbs();
  return (
    <div className={styles.pageWrapper}>
      <section className={styles.pageContainer}>
        <Router>
          <Routes>
            <Route path={BASE_PATH} element={<Landingsside />} />
            <Route path={BASE_PATH+"/utbetaling/:utbetalingsId"} element={<UtbetalingSide />} />
          </Routes>
        </Router>
      </section>
    </div>
  );
}

export default App;
