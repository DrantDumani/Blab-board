import { describe, expect, it } from "vitest";
import { FriendModal } from "./FriendModal";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

describe("Friend Modal", () => {
  it("User modal should display name, image, and about", () => {
    const mockMember = {
      username: "Utonium",
      id: 1,
      pfp: "http://ppg_dad.jpg/",
      about: "I made the Powerpuff girls",
      friends: [],
      friend_id: [],
    };

    const mockRoute = [
      {
        element: <FriendModal member={mockMember} userId={2} />,
        path: "/",
      },
    ];

    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole("heading", { name: "Utonium" })
    ).toBeInTheDocument();
    const userImg = screen.getByRole("presentation");
    expect(userImg.src).toBe("http://ppg_dad.jpg/");
    expect(screen.getByText("I made the Powerpuff girls")).toBeInTheDocument();
  });

  it("Modal should display a friend request button if the users aren't friends", () => {
    const mockMember = {
      username: "Utonium",
      id: 1,
      pfp: "http://ppg_dad.jpg/",
      about: "I made the Powerpuff girls",
      friends: [],
      friend_id: [],
    };

    const mockRoute = [
      {
        element: <FriendModal member={mockMember} userId={2} />,
        path: "/",
      },
    ];

    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    expect(screen.getByRole("button", { name: "Friend Request" }));
  });

  it("Displays status on pending friend requests and no button", () => {
    const mockMember = {
      username: "Utonium",
      id: 1,
      pfp: "http://ppg_dad.jpg/",
      about: "I made the Powerpuff girls",

      friends: [
        {
          user_id: 1,
          status: "pending_2_1",
          board_id: null,
        },
      ],
      friend_id: [],
    };

    const mockRoute = [
      {
        element: <FriendModal member={mockMember} userId={2} />,
        path: "/",
      },
    ];

    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    expect(
      screen.queryByRole("button", { name: "Friend Request" })
    ).not.toBeInTheDocument();
    expect(screen.getByText(/Pending/)).toBeInTheDocument();
  });

  it("Displays link to direct message with confirmed friends", () => {
    const mockMember = {
      username: "Utonium",
      id: 1,
      pfp: "http://ppg_dad.jpg/",
      about: "I made the Powerpuff girls",

      friends: [
        {
          user_id: 1,
          status: "accepted",
          board_id: 1,
        },
      ],
      friend_id: [],
    };

    const mockRoute = [
      {
        element: <FriendModal member={mockMember} userId={2} />,
        path: "/",
      },
    ];

    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    expect(screen.getByText(/Accepted/)).toBeInTheDocument();
    const dmLink = screen.getByRole("link", { name: "Message" });
    expect(dmLink.href).toMatch(/dashboard\/1/);
  });

  it("Does not display friend options if user's own profile", () => {
    const mockMember = {
      username: "Utonium",
      id: 1,
      pfp: "http://ppg_dad.jpg/",
      about: "I made the Powerpuff girls",

      friends: [],
      friend_id: [],
    };

    const mockRoute = [
      {
        element: <FriendModal member={mockMember} userId={1} />,
        path: "/",
      },
    ];

    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    expect(
      screen.queryByRole("button", { name: "Friend Request" })
    ).not.toBeInTheDocument();
  });

  it("Displays accept and deny buttons if user did not send the request", () => {
    const mockMember = {
      username: "Utonium",
      id: 1,
      pfp: "http://ppg_dad.jpg/",
      about: "I made the Powerpuff girls",

      friends: [
        {
          user_id: 1,
          status: "pending_1_2",
        },
      ],
      friend_id: [],
    };

    const mockRoute = [
      {
        element: <FriendModal member={mockMember} userId={2} />,
        path: "/",
      },
    ];

    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    expect(screen.getByRole("button", { name: "Accept" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Deny" })).toBeInTheDocument();
  });

  it("Does not display accept and deny buttons to sender", () => {
    const mockMember = {
      username: "Utonium",
      id: 1,
      pfp: "http://ppg_dad.jpg/",
      about: "I made the Powerpuff girls",

      friends: [
        {
          user_id: 2,
          status: "pending_1_2",
        },
      ],
      friend_id: [],
    };

    const mockRoute = [
      {
        element: <FriendModal member={mockMember} userId={1} />,
        path: "/",
      },
    ];

    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    expect(screen.queryByRole("button", { name: "Accept" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Deny" })).toBeNull();
  });
});
