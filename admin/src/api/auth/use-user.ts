import { useQuery } from "@tanstack/react-query";
import { authApi } from ".";

export function useUser() {
  const query = useQuery({
    ...authApi.getUser(),
    retry: false,
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
