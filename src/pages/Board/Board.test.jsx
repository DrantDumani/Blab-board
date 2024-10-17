import { Board } from "./Board";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const user = {
  username: "Bubbles",
  id: 1,
};

const mockData = {
  type: "public",
  creator_id: 1,
  members: [
    {
      pfp: "Octi.png",
      username: "Bubbles",
      id: 1,
    },
  ],
  posts: [
    {
      id: 1,
      text: "Bunnies",
      timestamp: new Date(2000000000),
      is_edited: true,
      author_id: 1,
      type: "text",
      author: {
        pfp: "Octi.png",
        username: "Bubbles",
      },
    },
    {
      id: 2,
      text: "professor.png",
      timestamp: new Date(3000000000),
      is_edited: false,
      author_id: 3,
      type: "image",
      author: {
        pfp: "",
        username: "Blossom",
      },
    },
    {
      id: 3,
      text: "Violence",
      timestamp: new Date(4000000000),
      is_edited: false,
      author_id: 2,
      type: "text",
      author: {
        pfp: "",
        username: "Buttercup",
      },
    },
  ],
};

vi.mock(import("react-router-dom"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: () => user,
  };
});

describe("Board page", () => {
  it("Displays settings button for public boards", async () => {
    const mockRoute = [
      {
        path: "/",
        element: <Board />,
        loader: async () => mockData,
      },
    ];
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole("button", { name: "Settings" })
    ).toBeInTheDocument();
  });

  it("Does not display settings button in private board", async () => {
    const privateMockBoard = { ...mockData, type: "private" };
    const mockRoute = [
      {
        path: "/",
        element: <Board />,
        loader: async () => privateMockBoard,
      },
    ];
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    await waitFor(() =>
      expect(screen.getByLabelText("Post a message")).toBeInTheDocument()
    );
    expect(screen.queryByRole("button", { name: "Settings" })).toBeNull();
  });

  it("User can enter text in post form", async () => {
    const mockRoute = [
      {
        path: "/",
        element: <Board />,
        loader: async () => mockData,
      },
    ];
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const postForm = await screen.findByLabelText("Post a message");
    await user.type(postForm, "abc");
    expect(postForm.value).toBe("abc");
  });

  it("Pressing the settings button opens modal for board settings", async () => {
    const mockRoute = [
      {
        path: "/",
        element: <Board />,
        loader: async () => mockData,
      },
    ];
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    await waitFor(() =>
      expect(screen.getByLabelText("Post a message")).toBeInTheDocument()
    );
    expect(
      screen.queryByRole("heading", { name: "Board Settings" })
    ).toBeNull();
    const settingsBtn = await screen.findByRole("button", { name: "Settings" });

    await user.click(settingsBtn);
    expect(
      screen.getByRole("heading", { name: "Board Settings" })
    ).toBeInTheDocument();
  });

  it("Renders array of posts", async () => {
    const mockRoute = [
      {
        path: "/",
        element: <Board />,
        loader: async () => mockData,
      },
    ];
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const posts = await screen.findAllByTestId("post");
    expect(posts.length).toBe(3);
    expect(posts[0].textContent).toBe("Bunnies");
    expect(posts[2].textContent).toBe("Violence");
  });

  it("Should render all post dates in mm/dd/yyyy hh:mm format", async () => {
    const mockRoute = [
      {
        path: "/",
        element: <Board />,
        loader: async () => mockData,
      },
    ];
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const dates = await screen.findAllByTestId("date");
    expect(dates.length).toBe(3);
    expect(dates[0].textContent).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/);
  });

  it("Renders edit and delete buttons for posts created by the user", async () => {
    const mockRoute = [
      {
        path: "/",
        element: <Board />,
        loader: async () => mockData,
      },
    ];
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const postContainers = await screen.findAllByTestId("postWrapper");
    expect(
      within(postContainers[0]).getByRole("button", { name: "Edit" })
    ).not.toBeNull();

    expect(
      within(postContainers[0]).getByRole("button", {
        name: "Delete",
      })
    ).not.toBeNull();
  });

  it("Pressing the image button opens a form for uploading images", async () => {
    const mockRoute = [
      {
        path: "/",
        element: <Board />,
        loader: async () => mockData,
      },
    ];
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const imageBtn = await screen.findByRole("button", { name: "Image" });
    expect(screen.queryByLabelText("Image:")).toBeNull();
    expect(screen.queryByRole("button", { name: "Upload" })).toBeNull();

    await user.click(imageBtn);
    expect(screen.getByLabelText("Image:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Upload" })).toBeInTheDocument();
  });

  it("Opens an edit form when a user clicks on an edit button", async () => {
    const mockRoute = [
      {
        path: "/",
        element: <Board />,
        loader: async () => mockData,
      },
    ];
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const postContainers = await screen.findAllByTestId("postWrapper");
    const editBtn = within(postContainers[0]).getByRole("button", {
      name: "Edit",
    });

    expect(
      within(postContainers[0]).queryByRole("button", { name: "Save" })
    ).toBeNull();
    expect(
      within(postContainers[0]).queryByRole("button", { name: "Cancel" })
    ).toBeNull();

    await user.click(editBtn);
    expect(
      within(postContainers[0]).getByRole("button", { name: "Save" })
    ).toBeInTheDocument();
    expect(
      within(postContainers[0]).getByRole("button", { name: "Cancel" })
    ).toBeInTheDocument();
    expect(
      within(postContainers[0]).getByLabelText("Edit Message").textContent
    ).toBe("Bunnies");
  });

  it("Can close the edit form by clicking the cancel button", async () => {
    const mockRoute = [
      {
        path: "/",
        element: <Board />,
        loader: async () => mockData,
      },
    ];
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const postContainers = await screen.findAllByTestId("postWrapper");
    const editBtn = within(postContainers[0]).getByRole("button", {
      name: "Edit",
    });

    await user.click(editBtn);
    const cancelBtn = within(postContainers[0]).getByRole("button", {
      name: "Cancel",
    });
    await user.click(cancelBtn);
    expect(
      within(postContainers[0]).queryByRole("button", { name: "Cancel" })
    ).toBeNull();
    expect(
      within(postContainers[0]).queryByRole("button", { name: "Save" })
    ).toBeNull();
    expect(
      within(postContainers[0]).queryByLabelText("Edit Message")
    ).toBeNull();
  });
});
