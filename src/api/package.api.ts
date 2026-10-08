import {apiClient} from "@/lib/apiClient";
import { CreatePackagePayload, UpdatePackagePayload } from "@/types";

export function getAllPackages(params?: { page?: number; limit?: number }) {
  return apiClient("/premium-package/all", { query: params });
}

export function getPublicPackages(params?: { page?: number; limit?: number }) {
  return apiClient("/premium-package/public/all", { query: params });
}

export function getSinglePackage(id: string) {
  return apiClient(`/premium-package/${id}`);
}

export function createPackage(payload: CreatePackagePayload) {
  return apiClient("/premium-package/create", { method: "POST", body: payload });
}

export function updatePackage(id: string, payload: UpdatePackagePayload) {
  return apiClient(`/premium-package/${id}`, { method: "PATCH", body: payload });
}

export function deletePackage(id: string) {
  return apiClient(`/premium-package/${id}`, { method: "DELETE" });
}