import { useUser } from "@/api/auth/use-user";
import { Navigate, Outlet } from "react-router-dom";

export function PublicRoutes() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null;
  }

  return user?.id ? <Navigate to="/" replace /> : <Outlet />;
}
