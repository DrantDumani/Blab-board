import { Root } from "../pages/Root/Root";
import { Auth } from "../pages/Auth/Auth";
import { Layout } from "../pages/Layout/Layout";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { authAction, dashBoardAction } from "../utils/actions";
import { fetchPublicBoards } from "../utils/loaders";

export const routes = [
  {
    element: <Root />,
    path: "/",
  },
  {
    element: <Auth />,
    path: "/auth",
    action: authAction,
  },
  {
    element: <Layout />,
    path: "/dashboard",
    children: [
      {
        element: <Dashboard />,
        index: true,
        loader: fetchPublicBoards,
        action: dashBoardAction,
        shouldRevalidate: ({ currentUrl }) => {
          return currentUrl.pathname === "/dashboard";
        },
      },
      {
        element: <Dashboard />,
        path: "your_boards",
        action: dashBoardAction,
      },
      {
        element: <h1>The settings page</h1>,
        path: "settings",
      },
      {
        element: <h1>The friends page</h1>,
        path: "friends",
      },
      {
        element: <h1>This is the page for the specific board</h1>,
        path: ":board_id",
      },
    ],
  },
];
