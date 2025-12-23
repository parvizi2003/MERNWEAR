const BASE_URL = "http://localhost:5000";

export class ApiError<T = any> extends Error {
  status: number;
  data?: T;

  constructor(status: number, data?: T) {
    super(`API Error ${status}`);
    this.status = status;
    this.data = data;
  }
}

export async function jsonApiInstance<T>(
  url: string,
  init?: RequestInit & { json?: unknown }
): Promise<T> {
  const headers = new Headers(init?.headers);

  const token = localStorage.getItem("auth_token");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let body = init?.body;

  if (init?.json !== undefined) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(init.json);
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...init,
    headers,
    body,
  });

  let data: any = null;

  try {
    data = await response.json();
  } catch {
    // тело может быть пустым
  }

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("auth_token");
    }

    throw new ApiError(response.status, data);
  }

  return data as T;
}
