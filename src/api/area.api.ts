import apiClient from "@/lib/apiClient";

export function getPublicAreas() {
  return apiClient("/area/public/all");
}