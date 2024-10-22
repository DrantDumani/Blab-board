import PropTypes from "prop-types";
import styles from "./ModalWrapper.module.css";

export function ModalWrapper({ toggleModalOff, children }) {
  return (
    <div className={styles.modalWrapper}>
      <button
        aria-label="Close"
        onClick={toggleModalOff}
        className={styles.modalBtn}
      >
        X
      </button>
      {children}
    </div>
  );
}

ModalWrapper.propTypes = {
  toggleModalOff: PropTypes.func,
  children: PropTypes.any,
};
