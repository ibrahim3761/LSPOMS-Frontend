/** biome-ignore-all lint/correctness/noUnusedImports: <explanation> */
/** biome-ignore-all assist/source/organizeImports: <explanation> */
import { ofetch, type FetchOptions } from "ofetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function tryRefreshToken(): Promise<string | null> {
  if (isRefreshing && refreshPromise) return refreshPromise;

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return null;

      const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) return null;

      const data = await res.json();
      const newAccessToken = data?.data?.accessToken;
      const newRefreshToken = data?.data?.refreshToken;

      if (newAccessToken) localStorage.setItem("accessToken", newAccessToken);
      if (newRefreshToken) localStorage.setItem("refreshToken", newRefreshToken);

      return newAccessToken ?? null;
    } catch {
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

function clearTokensAndRedirect() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
}

const baseClient = ofetch.create({
  baseURL: BASE_URL,
  onRequest({ options }) {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        options.headers.set("Authorization", `Bearer ${token}`);
      }
    }
  },
});

// biome-ignore lint/suspicious/noExplicitAny: ofetch options typing
export const apiClient = async <T = any>(
  url: string,
  options?: Record<string, any>
): Promise<T> => {
  try {
    return await baseClient<T>(url, options);
  } catch (err: unknown) {
    const status = (err as { response?: { status?: number } })?.response?.status;

    if (status === 401 && typeof window !== "undefined") {
      const newToken = await tryRefreshToken();

      if (newToken) {
        return await baseClient<T>(url, {
          ...options,
          headers: {
            ...(options?.headers as Record<string, string> ?? {}),
            Authorization: `Bearer ${newToken}`,
          },
        });
      }

      clearTokensAndRedirect();
    }

    throw err;
  }
};