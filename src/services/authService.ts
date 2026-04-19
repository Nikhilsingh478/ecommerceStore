import { BASE_URL, API_ENDPOINTS } from "@/config/api";

export interface AuthUser {
  emailId?: string;
  firstName?: string;
  lastName?: string;
  [key: string]: unknown;
}

export const login = async (email: string, password: string): Promise<AuthUser> => {
  const res = await fetch(`${BASE_URL}${API_ENDPOINTS.login}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      emailId: email,
      password,
    },
  });

  if (!res.ok) throw new Error("Login failed");

  const user: AuthUser = await res.json();

  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

export const logout = (): void => {
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userPassword");
  localStorage.removeItem("user");
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

export const getUser = (): AuthUser | null => {
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
};
