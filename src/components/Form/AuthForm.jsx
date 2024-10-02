import { useFetcher } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./AuthForm.module.css";

export function AuthForm({ children, btnText, intent, name }) {
  const fetcher = useFetcher();
  const err = fetcher.data;
  return (
    <fetcher.Form name={name} className={styles.authForm} method="POST">
      {children}
      <button className={styles.submitAuth} name="intent" value={intent}>
        {btnText}
      </button>
      {err && <p className={styles.serverErr}>{err}</p>}
    </fetcher.Form>
  );
}

AuthForm.propTypes = {
  children: PropTypes.node,
  btnText: PropTypes.string,
  intent: PropTypes.string,
  name: PropTypes.string,
};
