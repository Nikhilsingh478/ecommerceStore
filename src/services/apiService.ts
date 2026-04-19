import { BASE_URL } from "@/config/api";

export interface ApiCallOptions extends RequestInit {
  headers?: Record<string, string>;
  /** Skip attaching auth headers (e.g. for public endpoints) */
  skipAuth?: boolean;
}

/**
 * Centralized fetch wrapper.
 * - Auto-attaches emailId/password headers from localStorage
 * - Handles 403 by clearing session and redirecting to /login
 * - Throws on non-2xx so callers can use try/catch
 */
export const apiCall = async (
  endpoint: string,
  options: ApiCallOptions = {}
): Promise<Response> => {
  const { skipAuth, headers: customHeaders, ...rest } = options;

  const authHeaders: Record<string, string> = {};
  if (!skipAuth) {
    const email = localStorage.getItem("emailId");
    const password = localStorage.getItem("password");
    if (email) authHeaders.emailId = email;
    if (password) authHeaders.password = password;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...(customHeaders || {}),
    },
  });

  if (response.status === 403) {
    localStorage.removeItem("emailId");
    localStorage.removeItem("password");
    localStorage.removeItem("user");
    if (typeof window !== "undefined" && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
    throw new Error("Authentication failed");
  }

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const data = await response.clone().json();
      message = data?.message || message;
    } catch {
      // ignore parse errors
    }
    throw new Error(message);
  }

  return response;
};

/** Convenience JSON helper */
export const apiJson = async <T = unknown>(
  endpoint: string,
  options: ApiCallOptions = {}
): Promise<T> => {
  const res = await apiCall(endpoint, options);
  return res.json() as Promise<T>;
};
