import apiClient from "@/lib/apiClient";
import { IAreaResponse } from "@/types";

export function getPublicAreas() {
  return apiClient<IAreaResponse>("/area/public/all");
}