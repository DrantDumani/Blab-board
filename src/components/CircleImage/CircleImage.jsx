import styles from "./CircleImage.module.css";
import PropTypes from "prop-types";

export function CircleImage({ src, dimensions, isOnline = false }) {
  const notFoundImg =
    (import.meta.env.MODE !== "production"
      ? "http://localhost:3000/"
      : "INSERT_PROD_URL_HERE") + "images/notFound.png";

  return (
    <img
      className={`${styles.circleImage} ${isOnline ? styles.isOnline : ""}`}
      src={src || notFoundImg}
      height={dimensions}
      width={dimensions}
      alt=""
    />
  );
}

CircleImage.propTypes = {
  src: PropTypes.string,
  dimensions: PropTypes.number,
  isOnline: PropTypes.bool,
};
