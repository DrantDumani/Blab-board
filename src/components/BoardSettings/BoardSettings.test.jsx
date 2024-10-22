import { describe, expect, it } from "vitest";
import { BoardSettings } from "./BoardSettings";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

const mockBoard = {
  name: "foo",
  created_at: 3000000000,
  imgurl: "http://test.boardimg.png/",
  img_id: "abc",
  id: 1,
};

describe("Board Settings", () => {
  it("Renders board info and board image", () => {
    const mockRoute = [
      {
        path: "/",
        element: <BoardSettings boardData={mockBoard} userIsCreator={false} />,
      },
    ];
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const boardImg = screen.getByRole("presentation");
    expect(boardImg.src).toBe("http://test.boardimg.png/");
    expect(screen.getByRole("heading", { name: "foo" })).toBeInTheDocument();
    expect(
      screen.getByText(/Created: \d{2}\/\d{2}\/\d{4}/)
    ).toBeInTheDocument();
  });

  it("Only renders leave button if user is not creator", () => {
    const mockRoute = [
      {
        path: "/",
        element: <BoardSettings boardData={mockBoard} userIsCreator={false} />,
      },
    ];
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole("button", { name: "Leave Board" })
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Edit Board " })).toBeNull();
    expect(screen.queryByRole("button", { name: "Delete Board" })).toBeNull();
  });

  it("Renders Edit and Destroy buttons instead of Leave", () => {
    const mockRoute = [
      {
        path: "/",
        element: <BoardSettings boardData={mockBoard} userIsCreator={true} />,
      },
    ];
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    expect(screen.queryByRole("button", { name: "Leave Board" })).toBeNull();
    expect(
      screen.getByRole("button", { name: "Edit Board" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Delete Board" })
    ).toBeInTheDocument();
  });

  it("Pressing the edit button toggles the Board Form", async () => {
    const mockRoute = [
      {
        path: "/",
        element: <BoardSettings boardData={mockBoard} userIsCreator={true} />,
      },
    ];
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const editBtn = screen.getByRole("button", { name: "Edit Board" });

    await user.click(editBtn);
    const input = screen.getByLabelText("Board Name:");
    expect(input.value).toBe("foo");
  });
});
