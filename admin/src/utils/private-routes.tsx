import { useUser } from "@/api/auth/use-user";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoutes() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null; // или loader
  }

  if (!user?.id) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
