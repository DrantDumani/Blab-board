import { InputWrapper } from "../InputWrapper/InputWrapper";
import { AuthForm } from "../Form/AuthForm";
import { FormError } from "../FormError/FormError";
import { useRef, useState } from "react";
import styles from "./SignUpForm.module.css";

export function SignUpForm() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPwRef = useRef(null);

  const [showUserErr, setShowUserErr] = useState(false);
  const [showEmailErr, setShowEmailErr] = useState(false);
  const [showPwErr, setShowPwErr] = useState(false);
  const [showConfirmPwErr, setShowConfirmPwErr] = useState(false);

  const validateName = () => {
    const nameValidity = usernameRef.current.validity;
    setShowUserErr(nameValidity.tooLong || nameValidity.valueMissing);
  };

  const validateEmail = () => {
    const emailValidity = emailRef.current.validity;
    setShowEmailErr(emailValidity.valueMissing || emailValidity.typeMismatch);
  };

  const validatePassword = () => {
    const pwValidity = passwordRef.current.validity;
    setShowPwErr(pwValidity.valueMissing);
  };

  const validateConfirmPw = () => {
    setShowConfirmPwErr(
      passwordRef.current.value !== confirmPwRef.current.value ||
        passwordRef.current.validity.valueMissing
    );
  };

  const removeErrOnValidation = (showErr, toggleFn) => {
    if (showErr) {
      toggleFn();
    }
  };

  return (
    <AuthForm name={"sign-up"} btnText={"Sign Up"} intent={"signUp"}>
      <div className={styles.errInputWrapper}>
        <InputWrapper
          ref={usernameRef}
          name={"username"}
          label="Username:"
          placeholder="Please enter a username"
          maxLength={20}
          onBlur={validateName}
          onChange={() => removeErrOnValidation(showUserErr, validateName)}
        />
        {showUserErr && (
          <FormError text="Username must be between 1 and 20 characters" />
        )}
      </div>
      <div className={styles.errInputWrapper}>
        <InputWrapper
          ref={emailRef}
          name={"email"}
          label="Email:"
          placeholder="Please enter an email"
          type="email"
          onBlur={validateEmail}
          onChange={() => removeErrOnValidation(showEmailErr, validateEmail)}
        />
        {showEmailErr && <FormError text="Please enter a valid email" />}
      </div>
      <div className={styles.errInputWrapper}>
        <InputWrapper
          ref={passwordRef}
          name={"pw"}
          label="Password:"
          placeholder="Enter a password"
          type="password"
          onBlur={() => {
            validatePassword();
            validateConfirmPw();
          }}
          onChange={() => {
            removeErrOnValidation(showPwErr, validatePassword);
            removeErrOnValidation(showConfirmPwErr, validateConfirmPw);
          }}
        />
        {showPwErr && <FormError text="Please enter a password" />}
      </div>
      <div className={styles.errInputWrapper}>
        <InputWrapper
          ref={confirmPwRef}
          name={"confirmPw"}
          label="Confirm Password:"
          placeholder="Passwords must match"
          type="password"
          onBlur={validateConfirmPw}
          onChange={() =>
            removeErrOnValidation(showConfirmPwErr, validateConfirmPw)
          }
        />
        {showConfirmPwErr && <FormError text="Passwords do not match" />}
      </div>
    </AuthForm>
  );
}
