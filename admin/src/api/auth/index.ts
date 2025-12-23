import type { LoginFormValues, User } from "@/types";
import { jsonApiInstance } from "../api-instance";
import { queryOptions } from "@tanstack/react-query";

const RESOURCE = "auth";

export const authApi = {
  baseKey: RESOURCE,

  login: (formData?: LoginFormValues) => {
    return jsonApiInstance<{
      message: string;
      token: string;
      user: User;
    }>(`/${RESOURCE}/login`, {
      method: "POST",
      json: formData,
    });
  },

  getUser: () => {
    return queryOptions({
      queryKey: [authApi.baseKey, "user"],
      queryFn: (meta) =>
        jsonApiInstance<User>(`/${RESOURCE}/user`, {
          signal: meta.signal,
        }),
    });
  },

  logout: () => {
    return jsonApiInstance<{ message: string; token: string }>(
      `/${RESOURCE}/logout`,
      {
        method: "POST",
      }
    );
  },
};
