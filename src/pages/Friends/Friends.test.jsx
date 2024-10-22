import { describe, expect, it, vi } from "vitest";
import { Friends } from "./Friends";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen, within } from "@testing-library/react";

const mockRoute = [
  {
    path: "/",
    element: <Friends />,
    loader: async () => mockData,
  },
];

const mockUser = { id: 5 };

const mockData = [
  {
    id: 10,
    username: "Bubbles",
    status: "accepted",
    pfp: "",
    board_id: 1,
  },
  {
    id: 20,
    username: "Blossom",
    status: "pending_1_2",
    pfp: "http://townville.jpg/",
    board_id: null,
  },
  {
    id: 30,
    username: "Buttercup",
    status: "pending_2_1",
    pfp: "",
    board_id: null,
  },
];

vi.mock(import("react-router-dom"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: () => [mockUser, () => {}],
  };
});

describe("Friend page", () => {
  it("Should render an image and name for each element", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const friends = await screen.findAllByTestId("friend");
    const images = await screen.findAllByRole("presentation");
    expect(friends.length).toBe(3);
    expect(images.length).toBe(3);

    expect(images[1].src).toBe("http://townville.jpg/");

    expect(within(friends[0]).getByText("Bubbles")).toBeInTheDocument();
    expect(within(friends[1]).getByText("Blossom")).toBeInTheDocument();
    expect(within(friends[2]).getByText("Buttercup")).toBeInTheDocument();
  });

  it("Displays pending on unanswered requests sent by user", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const friends = await screen.findAllByTestId("friend");
    expect(within(friends[1]).getByText("Pending")).toBeInTheDocument();
  });

  it("Displays accept and deny buttons on requests the user has received", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const friends = await screen.findAllByTestId("friend");
    expect(
      within(friends[2]).getByRole("button", { name: "Accept" })
    ).toBeInTheDocument();
    expect(
      within(friends[2]).getByRole("button", { name: "Deny" })
    ).toBeInTheDocument();
  });

  it("Displays link to DM and remove button for confirmed friends", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const friends = await screen.findAllByTestId("friend");
    expect(
      within(friends[0]).getByRole("link", { name: "Direct Message Bubbles" })
    ).toBeInTheDocument();
    expect(
      within(friends[0]).getByRole("button", { name: "Remove" })
    ).toBeInTheDocument();
  });
});
