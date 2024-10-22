import { SignUpForm } from "./SignUpForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const mockRoute = [
  {
    path: "/",
    element: <SignUpForm />,
  },
];

describe("Sign Up form", () => {
  it("Displays input fields for username, email, password, and pw confirmation", () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password:")).toBeInTheDocument();
  });

  it("Displays error message on invalid username input when users click away", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const userInput = screen.getByLabelText("Username:");
    const errText = "Username must be between 1 and 20 characters";
    const userErrMsg = screen.queryByText(errText);
    expect(userErrMsg).toBeNull();

    await user.click(userInput);
    await user.click(document.body);
    expect(screen.getByText(errText)).toBeInTheDocument();
  });

  it("Removes error message if user inputs correctly", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const userInput = screen.getByLabelText("Username:");
    await user.click(userInput);
    await user.click(document.body);
    await user.click(userInput);
    await user.keyboard("foo");

    expect(
      screen.queryByText("Username must be between 1 and 20 characters")
    ).not.toBeInTheDocument();
  });

  it("Displays error message on invalid email input when users click away", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const userInput = screen.getByLabelText("Email:");
    const errText = "Please enter a valid email";
    const emailErrMsg = screen.queryByText(errText);
    expect(emailErrMsg).toBeNull();

    await user.click(userInput);
    await user.keyboard("bar");
    await user.click(document.body);
    expect(screen.getByText(errText)).toBeInTheDocument();
  });

  it("Removes error message on valid input", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const userInput = screen.getByLabelText("Email:");
    await user.click(userInput);
    await user.click(document.body);
    await user.click(userInput);
    await user.keyboard("bar@baz.com");

    expect(
      screen.queryByText("Please enter a valid email")
    ).not.toBeInTheDocument();
  });

  it("Displays error message on invalid password input", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const userInput = screen.getByLabelText("Password:");
    const errText = "Please enter a password";
    const pwErrMsg = screen.queryByText(errText);
    expect(pwErrMsg).toBeNull();

    await user.click(userInput);
    await user.click(document.body);
    expect(screen.getByText(errText)).toBeInTheDocument();
  });

  it("Removes error on valid password input", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const userInput = screen.getByLabelText("Password:");
    await user.click(userInput);
    await user.click(document.body);
    await user.click(userInput);
    await user.keyboard("pw");

    expect(
      screen.queryByText("Please enter a password")
    ).not.toBeInTheDocument();
  });

  describe("Displays error on blur if passwords do not match", () => {
    it("Password field", async () => {
      const router = createMemoryRouter(mockRoute);
      render(<RouterProvider router={router} />);

      const user = userEvent.setup();
      const userInput = screen.getByLabelText("Password:");
      const errText = "Passwords do not match";
      const pwErrMsg = screen.queryByText(errText);
      expect(pwErrMsg).toBeNull();

      await user.click(userInput);
      await user.click(document.body);
      expect(screen.getByText(errText)).toBeInTheDocument();
    });

    it("Confirm Password field", async () => {
      const router = createMemoryRouter(mockRoute);
      render(<RouterProvider router={router} />);

      const user = userEvent.setup();
      const userInput = screen.getByLabelText("Confirm Password:");
      const errText = "Passwords do not match";
      const pwErrMsg = screen.queryByText(errText);
      expect(pwErrMsg).toBeNull();

      await user.click(userInput);
      await user.click(document.body);
      expect(screen.getByText(errText)).toBeInTheDocument();
    });
  });

  describe("Removes error on valid password matches", () => {
    it("Confirm Password field", async () => {
      const router = createMemoryRouter(mockRoute);
      render(<RouterProvider router={router} />);

      const user = userEvent.setup();
      const pwInput = screen.getByLabelText("Password:");
      const confirmInput = screen.getByLabelText("Confirm Password:");
      await user.click(pwInput);
      await user.click(document.body);
      await user.click(pwInput);
      await user.keyboard("pw");
      await user.click(confirmInput);
      await user.keyboard("pw");

      expect(
        screen.queryByText("Passwords do not match")
      ).not.toBeInTheDocument();
    });

    it("Password field", async () => {
      const router = createMemoryRouter(mockRoute);
      render(<RouterProvider router={router} />);

      const user = userEvent.setup();
      const pwInput = screen.getByLabelText("Password:");
      const confirmInput = screen.getByLabelText("Confirm Password:");
      await user.click(confirmInput);
      await user.click(document.body);
      await user.click(confirmInput);
      await user.keyboard("pw");
      await user.click(pwInput);
      await user.keyboard("pw");

      expect(
        screen.queryByText("Passwords do not match")
      ).not.toBeInTheDocument();
    });
  });
});
