/**
 * Client-side API helper.
 * Reads the JWT from `document.cookie` so it can be used inside "use client" components.
 */
import type { ApiResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;

/** Read the `auth_token` cookie from the browser. */
function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)auth_token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Generic fetch wrapper for calling the external backend from client components.
 *
 * @param endpoint  – the path after the base URL, e.g. `/api/auth/login`
 * @param options   – method, body, and whether to attach the Bearer token
 */
export async function apiClient<T>(
  endpoint: string,
  options: {
    method?: string;
    body?: unknown;
    authenticated?: boolean;
  } = {},
): Promise<ApiResponse<T>> {
  const { method = "GET", body, authenticated = false } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (authenticated) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
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
