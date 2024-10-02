import { Root } from "../pages/Root/Root";
import { Auth } from "../pages/Auth/Auth";
import { Layout } from "../pages/Layout/Layout";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { authAction } from "../utils/actions";
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
        shouldRevalidate: ({ currentUrl }) => {
          return currentUrl.pathname === "/dashboard";
        },
      },
    ],
  },
];
