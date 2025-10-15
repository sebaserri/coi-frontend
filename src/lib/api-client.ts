const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const CSRF_COOKIE = "coi_csrf";
const CSRF_HEADER = "x-csrf-token";

function csrfHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const v = getCookie(CSRF_COOKIE);
  return v ? { [CSRF_HEADER]: v } : {};
}

import { getCookie } from "./cookies";

async function rawFetch(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers || {});
  const method = (init.method || "GET").toUpperCase();

  if (!headers.has("Content-Type") && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    const csrf = csrfHeader();
    Object.entries(csrf).forEach(([k, v]) => headers.set(k, v));
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });
  return res;
}

let isRefreshing = false;
let pending: Array<() => void> = [];

async function ensureRefreshed() {
  if (isRefreshing) {
    await new Promise<void>((resolve) => pending.push(resolve));
    return;
  }
  try {
    isRefreshing = true;
    const res = await rawFetch("/auth/refresh", { method: "POST" });
    if (!res.ok) throw new Error("refresh-failed");
  } finally {
    isRefreshing = false;
    pending.forEach((r) => r());
    pending = [];
  }
}

export async function fetchApi<T = any>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  let res = await rawFetch(path, init);

  if (res.status === 401) {
    try {
      await ensureRefreshed();
      res = await rawFetch(path, init); // reintento
    } catch {
      // si volvió a fallar, redirige a login (lado cliente)
      if (typeof window !== "undefined") {
        window.location.href = "/(auth)/sign-in";
      }
      throw new Error("Unauthorized");
    }
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json")
    ? res.json()
    : (res.text() as unknown as T);
}
