import apiClient from "@/lib/apiClient";
import {
  IApiResponse,
  IAdminAnalytics,
  ApproveTechnicianPayload,
  ChangeUserStatusPayload,
  CreateAreaPayload,
  UpdateAreaPayload,
} from "@/types";

// Analytics
export function getAdminAnalytics() {
  return apiClient<IApiResponse<IAdminAnalytics>>("/analytics/admin-analytics");
}

// Users
export function getAllUsers(params?: {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
  search?: string;
}) {
  return apiClient("/user/all", { query: params });
}

export function changeUserStatus(id: string, payload: ChangeUserStatusPayload) {
  return apiClient(`/user/${id}/status`, { method: "PATCH", body: payload });
}

export function deleteUser(id: string) {
  return apiClient(`/user/${id}`, { method: "DELETE" });
}

// Areas
export function getAllAreas(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return apiClient("/area/all", { query: params });
}

export function createArea(payload: CreateAreaPayload) {
  return apiClient("/area/create", { method: "POST", body: payload });
}

export function updateArea(id: string, payload: UpdateAreaPayload) {
  return apiClient(`/area/${id}`, { method: "PATCH", body: payload });
}

export function deleteArea(id: string) {
  return apiClient(`/area/${id}`, { method: "DELETE" });
}

// Technicians
export function getAllTechnicians(params?: {
  page?: number;
  limit?: number;
  verificationStatus?: string;
  search?: string;
}) {
  return apiClient("/technician/all-technicians", { query: params });
}

export function approveTechnician(payload: ApproveTechnicianPayload) {
  return apiClient("/technician/approve-technician", {
    method: "POST",
    body: payload,
  });
}

// Payments
export function getAllPayments(params?: {
  page?: number;
  limit?: number;
}) {
  return apiClient("/payment/all", { query: params });
}