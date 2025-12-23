import { createBrowserRouter } from "react-router-dom";
import { Dashboard, ErrorPage, Genders, Login, NotFound } from "./pages";
import { PublicRoutes, PrivateRoutes } from "./utils";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <PublicRoutes />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },

  {
    path: "/",
    element: <PrivateRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/genders",
        element: <Genders />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
