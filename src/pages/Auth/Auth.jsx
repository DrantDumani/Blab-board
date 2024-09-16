import { SignUpForm } from "../../components/SignUpForm/SignUpForm";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export function Auth() {
  const [formToggle, setFormToggle] = useState("signup");

  const onToggleForm = () =>
    setFormToggle((t) => (t === "signup" ? "login" : "signup"));

  const token = localStorage.getItem("token");

  return (
    <>
      {!token ? (
        <div>
          {formToggle === "signup" ? <SignUpForm /> : <LoginForm />}
          {formToggle === "signup" ? (
            <p>
              Already have an account? Click here to{" "}
              <button onClick={onToggleForm}>Login</button>
            </p>
          ) : (
            <p>
              Click here to <button onClick={onToggleForm}>Sign Up</button>
            </p>
          )}
        </div>
      ) : (
        <Navigate to={"/dashboard"} />
      )}
    </>
  );
}
