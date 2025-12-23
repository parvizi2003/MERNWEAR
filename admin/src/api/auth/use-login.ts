import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { authApi } from ".";
import { queryClient } from "../query-client";
import { ApiError } from "../api-instance";
import type { LoginFormValues } from "@/types";

export function useLogin() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: authApi.login,

    onSuccess: async (res) => {
      localStorage.setItem("auth_token", res.token);

      queryClient.setQueryData([authApi.baseKey, "user"], res.user);

      await queryClient.invalidateQueries({
        queryKey: [authApi.baseKey, "user"],
      });

      navigate("/");
    },
  });

  let errorMessage: string | null = null;

  const err = mutation.error;

  if (err instanceof ApiError) {
    errorMessage =
      err.data?.message ||
      (err.status === 401 ? "Неверный логин или пароль" : "Ошибка сервера");
  } else if (err instanceof Error) {
    errorMessage = err.message;
  }

  return {
    handleLogin: (data: LoginFormValues) => mutation.mutate(data),
    isPending: mutation.isPending,
    error: errorMessage,
  };
}
