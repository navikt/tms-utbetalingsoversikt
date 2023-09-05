import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Landingsside from "./pages/landingsside/Landingsside";
import UtbetalingSide from "./pages/utbetalingSide/UtbetalingSide";

function App() {
  const BASE_PATH = "/tms-utbetalingsoversikt";


  return (
    <div className={styles.pageWrapper}>
      <section className={styles.pageContainer}>
        <Router>
          <Routes>
            <Route path={BASE_PATH} element={<Landingsside />} />
            <Route
              path={BASE_PATH + "/utbetaling/:utbetalingsId"}
              element={<UtbetalingSide />}
            />
          </Routes>
        </Router>
      </section>
    </div>
  );
}

export default App;
