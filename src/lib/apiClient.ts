import { ofetch } from "ofetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = ofetch.create({
  baseURL: BASE_URL,
  onRequest({ options }) {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        options.headers.set("Authorization", `Bearer ${token}`);
      }
    }
  },
  onResponseError({ request, response }) {
    const url = typeof request === "string" ? request : request.url;

    if (response.status === 401 && !url.includes("/auth/login")) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
  },
});

export default apiClient;
