import { Root } from "../pages/Root/Root";
import { Auth } from "../pages/Auth/Auth";
import { Layout } from "../pages/Layout/Layout";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { authAction, dashBoardAction, boardAction } from "../utils/actions";
import {
  fetchPublicBoards,
  fetchAllBoardInfo,
  fetchYourBoards,
  getAllFriends,
} from "../utils/loaders";
import { Settings } from "../pages/Settings/Settings";
import { Friends } from "../pages/Friends/Friends";
import { BoardWrapper } from "../pages/BoardWrapper/BoardWrapper";

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
        loader: fetchYourBoards,
      },
      {
        element: <Settings />,
        path: "settings",
      },
      {
        element: <Friends />,
        path: "friends",
        loader: getAllFriends,
        shouldRevalidate: ({ currentUrl }) => {
          return currentUrl.pathname === "/dashboard/friends";
        },
      },
      {
        element: <BoardWrapper />,
        path: ":board_id",
        loader: fetchAllBoardInfo,
        action: boardAction,
      },
    ],
  },
];
