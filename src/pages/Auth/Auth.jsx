import { SignUpForm } from "../../components/SignUpForm/SignUpForm";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "./Auth.module.css";

export function Auth() {
  const [formToggle, setFormToggle] = useState("signup");

  const onToggleForm = () =>
    setFormToggle((t) => (t === "signup" ? "login" : "signup"));

  const token = localStorage.getItem("token");

  return (
    <>
      {!token ? (
        <div className={styles.authWrapper}>
          <h1>Blab Board</h1>
          {formToggle === "signup" ? <SignUpForm /> : <LoginForm />}
          {formToggle === "signup" ? (
            <p className={styles.toggleText}>
              Already have an account? Click here to{" "}
              <button className={styles.btnLink} onClick={onToggleForm}>
                Login
              </button>
            </p>
          ) : (
            <p className={styles.toggleText}>
              Click here to{" "}
              <button className={styles.btnLink} onClick={onToggleForm}>
                Sign Up
              </button>
            </p>
          )}
        </div>
      ) : (
        <Navigate to={"/dashboard"} />
      )}
    </>
  );
}
