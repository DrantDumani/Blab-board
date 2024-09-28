import { Dashboard } from "./Dashboard";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const mockRoute = [
  {
    path: "/",
    element: <Dashboard />,
    loader: async () => mockData,
  },
];

const mockData = [
  { id: 1, name: "Big" },
  { id: 2, name: "Bad", imgurl: "prince_bowser.jpg" },
  { id: 3, name: "Baby" },
  { id: 4, name: "Bowser" },
];

describe("Dashboard page", () => {
  it("Renders every element in the fetched array of data", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const boardTitles = await screen.findAllByRole("heading");
    expect(boardTitles.length).toBe(4);
    expect(boardTitles[0].textContent).toBe("Big");
    expect(boardTitles[1].textContent).toBe("Bad");
    expect(boardTitles[2].textContent).toBe("Baby");
    expect(boardTitles[3].textContent).toBe("Bowser");
  });

  it("Renders not found image if falsy value", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const boardImgs = await screen.findAllByRole("img");
    expect(boardImgs[0].getAttribute("src")).toMatch(/notFound.png/);
  });

  it("Renders board image if truthy value", async () => {
    const router = createMemoryRouter(mockRoute);
    render(<RouterProvider router={router} />);

    const boardImgs = await screen.findAllByRole("img");
    expect(boardImgs[1].getAttribute("src")).toBe(mockData[1].imgurl);
  });

  // it("toggles create board form on button press", async () => {
  //   const router = createMemoryRouter(mockRoute);
  //   render(<RouterProvider router={router} />);

  // })
});
