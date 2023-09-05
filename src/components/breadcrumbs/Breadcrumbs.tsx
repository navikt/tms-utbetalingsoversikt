import { Link } from "react-router-dom";
import { minSideUrl } from "../../utils/urls";
import style from "./Breadcrumbs.module.css";

const Breadcrumbs = ({ showUtbetalinger }: { showUtbetalinger: boolean }) => (
  <div className={style.container}>
    <a className={`${style.minSideLink} ${style.link}`} href={minSideUrl}>
      Min side
    </a>
    {showUtbetalinger && (
      <div className={style.linkWrapper}>
        <Link className={style.link} to="/tms-utbetalingsoversikt">
          Utbetalinger
        </Link>
      </div>
    )}
  </div>
);
export default Breadcrumbs;
