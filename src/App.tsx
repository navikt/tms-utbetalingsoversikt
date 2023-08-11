import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Landingsside from "./components/pages/landingsside/Landingsside";
import styles from "./App.module.css";
import { useBreadcrumbs } from "./hooks/useBreadcrums";
import UtbetalingSide from "./components/pages/utbetalingSide/UtbetalingSide";

function App() {
  useBreadcrumbs();
  return (
    <div className={styles.pageWrapper}>
      <section className={styles.pageContainer}>
        <Router>
          <Routes>
            <Route path={"/utbetaling"} element={<UtbetalingSide />} />
            <Route path={"/"} element={<Landingsside />} />
          </Routes>
        </Router>
      </section>
    </div>
  );
}

export default App;
