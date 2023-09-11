import { Link } from "react-router-dom";
import { minSideUrl } from "../../utils/urls";
import style from "./Breadcrumbs.module.css";
import { logEvent } from "../../utils/amplitude";

const Breadcrumbs = ({ showUtbetalinger }: { showUtbetalinger: boolean }) => (
  <div className={style.container}>
    <a className={`${style.minSideLink} ${style.link}`} href={minSideUrl} onClick={() => logEvent("breadcrum", "min-side")}>
      Min side
    </a>
    {showUtbetalinger && (
      <div className={style.linkWrapper}>
        <Link className={style.link} onClick={() => logEvent("breadcrum", "utbetalinger")} to="/tms-utbetalingsoversikt">
          Utbetalinger
        </Link>
      </div>
    )}
  </div>
);
export default Breadcrumbs;
