import { describe, expect, it, vi } from "vitest";
import { Settings } from "./Settings";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// === TESTS ===//
// Should render user img, name, about, and edit button
// Should toggle edit form on and off
// That's it!

const mockRoute = [
  {
    path: "/",
    element: <Settings />,
  },
];

const user = {
  username: "foo",
  pfp: "http://fakeimg.png/",
  pfp_id: "acbd",
  about: "Lorem Ipsum",
};

vi.mock(import("react-router-dom"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: () => [user, () => {}],
  };
});

describe("Settings page", () => {
  it("Renders user image, name, about section, and edit button", () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    expect(screen.getByRole("heading", { name: "foo" })).toBeInTheDocument();
    const userImg = screen.getByRole("presentation");
    expect(userImg.src).toBe(user.pfp);
    expect(screen.getByText(user.about)).toBeInTheDocument();
  });

  it("Toggles edit form on and off", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const editBtn = screen.getByRole("button", { name: "Edit" });
    const user = userEvent.setup();

    await user.click(editBtn);
    expect(screen.getByLabelText("Profile Pic:")).toBeInTheDocument();
    expect(screen.getByLabelText("About Me:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();

    const cancelBtn = screen.getByRole("button", { name: "Cancel" });
    await user.click(cancelBtn);

    expect(screen.queryByRole("button", { name: "Cancel" })).toBeNull();
    expect(screen.queryByLabelText("Profile Pic:")).toBeNull();
    expect(screen.queryByLabelText("About Me:")).toBeNull();
    expect(screen.queryByRole("button", { name: "Save" })).toBeNull();
  });
});
