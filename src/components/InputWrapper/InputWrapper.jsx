import { forwardRef, useId } from "react";
import PropTypes from "prop-types";
import styles from "./InputWrapper.module.css";

export const InputWrapper = forwardRef(function InputWrapper(
  {
    name,
    label,
    type = "text",
    placeholder = "",
    maxLength = "",
    onBlur = () => {},
    onChange = () => {},
    isRequired = true,
  },
  ref
) {
  const id = useId();
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.formLabel} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.formInput}
        ref={ref}
        id={id}
        name={name}
        type={type}
        required={isRequired}
        placeholder={placeholder}
        maxLength={maxLength}
        onBlur={onBlur}
        onChange={onChange}
      />
    </div>
  );
});

InputWrapper.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
};
