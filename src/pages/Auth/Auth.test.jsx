import { Auth } from "./Auth";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest";

vi.mock("../../components/LoginForm/LoginForm", () => ({
  LoginForm: () => <h1>Login Form</h1>,
}));
vi.mock("../../components/SignUpForm/SignUpForm", () => ({
  SignUpForm: () => <h1>Sign Up Form</h1>,
}));

describe("Auth page", () => {
  it("Should display sign up form", () => {
    render(<Auth />);

    expect(
      screen.getByRole("heading", { name: /Sign Up Form/ })
    ).toBeInTheDocument();
  });

  it("Should toggle forms when button is pressed", async () => {
    render(<Auth />);

    const user = userEvent.setup();
    const toggleBtn = screen.queryByRole("button", { name: "Login" });
    await user.click(toggleBtn);

    expect(
      screen.getByRole("heading", { name: /Login Form/ })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Sign Up Form/ })
    ).not.toBeInTheDocument();

    const toggleBackBtn = screen.getByRole("button", { name: "Sign Up" });

    await user.click(toggleBackBtn);

    expect(
      screen.queryByRole("heading", { name: /Login Form/ })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Sign Up Form/ })
    ).toBeInTheDocument();
  });
});
