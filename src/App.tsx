import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Landingsside from "./components/pages/landingsside/Landingsside";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.pageContainer}>
      <section className={styles.contentContainer}>
        <Router>
          <Routes>
            <Route path={"/"} element={<Landingsside />} />
          </Routes>
        </Router>
      </section>
    </div>
  );
}

export default App;
