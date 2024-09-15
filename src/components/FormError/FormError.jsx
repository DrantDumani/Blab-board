import PropTypes from "prop-types";

export function FormError({ text }) {
  return <p>{text}</p>;
}

FormError.propTypes = {
  text: PropTypes.string,
};
