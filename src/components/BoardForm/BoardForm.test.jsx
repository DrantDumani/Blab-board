import { BoardForm } from "./BoardForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const mockRoute = [
  {
    path: "/",
    element: <BoardForm />,
  },
];

describe("Board form", () => {
  it("Prevents users from typing more than 20 characters", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const boardName = screen.getByLabelText("Board Name:");
    const str = "x".repeat(25);
    await user.click(boardName);
    await user.keyboard(str);

    expect(boardName.value.length).toBeLessThanOrEqual(20);
  });

  it("displays error if file is too large", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const boardImg = screen.getByLabelText("Board Image:");

    const mockLargeImg = new File(
      [new Blob(["1".repeat(1024 * 1024 + 1)], { type: "image/png" })],
      "mockImg.png"
    );

    await user.upload(boardImg, mockLargeImg);
    expect(screen.getByText("Image size must be 1mb or less"));
  });

  it("Disables form submission when file size is too large", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const boardImg = screen.getByLabelText("Board Image:");

    const mockLargeImg = new File(
      [new Blob(["1".repeat(1024 * 1024 + 1)], { type: "image/png" })],
      "mockImg.png"
    );

    const submitBtn = screen.getByRole("button", { name: "Save Board" });
    expect(submitBtn).not.toBeDisabled();
    await user.upload(boardImg, mockLargeImg);
    expect(submitBtn).toBeDisabled();
  });
});
