import { Board } from "./Board";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const mockRoute = [
  {
    path: "/",
    element: <Board />,
  },
];

const mockUserData = {
  username: "foo",
  id: 1,
  email: "bar@baz.com",
  pfp: "image.png",
};

const mockData = {
  id: 1,
  name: "test",
  imgurl: "boardImg.png",
  img_id: "50",
  posts: [
    {
      id: 1,
      author_id: 1,
    },
  ],
};

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useOutletContext: () => ({
    data: mockUserData,
  }),
}));

describe("Board page", () => {
  it("", () => {});
});
