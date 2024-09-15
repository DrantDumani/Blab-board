import { useFetcher } from "react-router-dom";
import PropTypes from "prop-types";

export function AuthForm({ children, btnText }) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="POST">
      {children}
      <button>{btnText}</button>
    </fetcher.Form>
  );
}

AuthForm.propTypes = {
  children: PropTypes.node,
  btnText: PropTypes.string,
};
