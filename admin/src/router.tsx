import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Login } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/auth",
    element: <Login />,
  },
]);
