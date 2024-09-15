import { Root } from "../pages/Root/Root";
import { Auth } from "../pages/Auth/Auth";
import { Layout } from "../pages/Layout/Layout";

export const routes = [
  {
    element: <Root />,
    path: "/",
  },
  {
    element: <Auth />,
    path: "/auth",
  },
  {
    element: <Layout />,
    path: "/dashboard",
  },
];
