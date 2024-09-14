import { Root } from "../pages/Root/Root";
import { Auth } from "../pages/Auth/Auth";

export const routes = [
  {
    element: <Root />,
    path: "/",
  },
  {
    element: <Auth />,
    path: "/auth",
  },
];
