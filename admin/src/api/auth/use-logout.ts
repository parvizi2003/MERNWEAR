import { useMutation } from "@tanstack/react-query";
import { authApi } from ".";
import { queryClient } from "../query-client";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../api-instance";
import { useState } from "react";

let logoutPromise: Promise<void> | null = null;

export function useLogout() {
  const navigate = useNavigate();
  const [throwSuspense, setThrowSuspense] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await authApi.logout();
      return res;
    },
    onMutate: () => {
      logoutPromise = new Promise(() => {});
      setThrowSuspense(true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(authApi.getUser());
      localStorage.removeItem("auth_token");
      navigate("/");

      logoutPromise = null;
      setThrowSuspense(false);
    },
    onError: (err: any) => {
      logoutPromise = null;
      setThrowSuspense(false);
      if (err instanceof ApiError) {
        console.error("Ошибка API:", err.response.status);
      } else {
        console.error("Неизвестная ошибка", err);
      }
    },
  });

  if (throwSuspense && logoutPromise) {
    throw logoutPromise;
  }

  return {
    handleLogout: () => logoutMutation.mutate(),
    isPending: logoutMutation.isPending,
    error: logoutMutation.error,
  };
}
