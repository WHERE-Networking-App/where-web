/**
 * Server-side API helper.
 * Reads the JWT from `next/headers` cookies – use in Server Components & Server Actions.
 */
import { cookies } from "next/headers";
import type { ApiResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;

/**
 * Generic fetch wrapper for calling the external backend from the server.
 *
 * @param endpoint – the path after the base URL, e.g. `/api/users/profile`
 * @param options  – method & optional body
 */
export async function apiServer<T>(
  endpoint: string,
  options: {
    method?: string;
    body?: unknown;
  } = {},
): Promise<ApiResponse<T>> {
  const { method = "GET", body } = options;

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        data: null,
        error:
          data?.error || data?.message || `Request failed (${res.status})`,
      };
    }

    return { data: data as T, error: null };
  } catch (_err) {
    return { data: null, error: "Network error. Please try again." };
  }
}
