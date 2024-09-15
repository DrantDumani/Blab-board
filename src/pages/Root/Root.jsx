import { Navigate } from "react-router-dom";

export function Root() {
  const token = localStorage.getItem("token");

  return token ? (
    <Navigate to={"/dashboard"} replace={true} />
  ) : (
    <Navigate to="/auth" replace={true} />
  );
}
