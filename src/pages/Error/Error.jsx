import styles from "./Error.module.css";
import { Link } from "react-router-dom";

export function Error() {
  return (
    <div className={styles.errWrapper}>
      <div className={styles.errContent}>
        <h1 className={styles.errTitle}>An error has occured</h1>
        <p>
          Press the Back button or click here to{" "}
          <Link className={styles.link} to={"/dashboard"}>
            Return to the dashboard
          </Link>
        </p>
      </div>
    </div>
  );
}
