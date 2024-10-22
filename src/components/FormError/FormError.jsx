import PropTypes from "prop-types";
import styles from "./FormError.module.css";

export function FormError({ text }) {
  return <p className={styles.formErr}>{text}</p>;
}

FormError.propTypes = {
  text: PropTypes.string,
};
