export const AUTH_KEYS = {
  USER: "csuser",
  EMAIL: "csemail",
  TOKEN: "cstoken",
};

export function setAuth(user, token) {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_KEYS.USER, JSON.stringify(user));
  localStorage.setItem(AUTH_KEYS.EMAIL, user?.email ?? "");
  localStorage.setItem(AUTH_KEYS.TOKEN, token ?? "");
}

export function getAuth() {
  if (typeof window === "undefined") return { user: null, email: "", token: "" };
  try {
    const userStr = localStorage.getItem(AUTH_KEYS.USER);
    const user = userStr ? JSON.parse(userStr) : null;
    const email = localStorage.getItem(AUTH_KEYS.EMAIL) ?? "";
    const token = localStorage.getItem(AUTH_KEYS.TOKEN) ?? "";
    return { user, email, token };
  } catch {
    return { user: null, email: "", token: "" };
  }
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEYS.USER);
  localStorage.removeItem(AUTH_KEYS.EMAIL);
  localStorage.removeItem(AUTH_KEYS.TOKEN);
}
