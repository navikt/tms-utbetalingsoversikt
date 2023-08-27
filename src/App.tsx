import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Landingsside from "./pages/landingsside/Landingsside";
import styles from "./App.module.css";
import { useBreadcrumbs } from "./hooks/useBreadcrums";
import UtbetalingSide from "./pages/utbetalingSide/UtbetalingSide";

function App() {
  useBreadcrumbs();
  return (
    <div className={styles.pageWrapper}>
      <section className={styles.pageContainer}>
        <Router>
          <Routes>
            <Route path={"/"} element={<Landingsside />} />
            <Route path={"/utbetaling/:utbetalingsId"} element={<UtbetalingSide />} />

          </Routes>
        </Router>
      </section>
    </div>
  );
}

export default App;
