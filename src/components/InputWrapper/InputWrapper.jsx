import { forwardRef, useId } from "react";
import PropTypes from "prop-types";

export const InputWrapper = forwardRef(function InputWrapper(
  {
    name,
    label,
    type = "text",
    placeholder = "",
    maxLength = "",
    onBlur = () => {},
    onChange = () => {},
  },
  ref
) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        required
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
};
