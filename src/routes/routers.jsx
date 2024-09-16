import { Root } from "../pages/Root/Root";
import { Auth } from "../pages/Auth/Auth";
import { Layout } from "../pages/Layout/Layout";
import { authAction } from "../utils/actions";

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
  },
];
