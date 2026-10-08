import {apiClient} from "@/lib/apiClient";
import {
  IApiResponse,
  IAdminAnalytics,
  ApproveTechnicianPayload,
  ChangeUserStatusPayload,
  CreateAreaPayload,
  UpdateAreaPayload,
  CreateScheduledOutagePayload,
  UpdateScheduledOutagePayload,
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
export function getAllPayments() {
  return apiClient("/payment/all");
}

//schedule outages
export function getAllScheduledOutages(params?: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  return apiClient("/scheduled-outage/all", { query: params });
}

export function getSingleScheduledOutage(id: string) {
  return apiClient(`/scheduled-outage/${id}`);
}

export function createScheduledOutage(payload: CreateScheduledOutagePayload) {
  return apiClient("/scheduled-outage/create", { method: "POST", body: payload });
}

export function updateScheduledOutage(id: string, payload: UpdateScheduledOutagePayload) {
  return apiClient(`/scheduled-outage/${id}`, { method: "PATCH", body: payload });
}

export function deleteScheduledOutage(id: string) {
  return apiClient(`/scheduled-outage/${id}`, { method: "DELETE" });
}

//Unexpected outages
export function getAllUnexpectedOutages(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) {
  return apiClient("/unexpected-outage/all", { query: params });
}

export function assignTechnician(id: string, payload: { technicianId: string }) {
  return apiClient(`/unexpected-outage/${id}/assign`, {
    method: "PATCH",
    body: payload,
  });
}

export function deleteUnexpectedOutage(id: string) {
  return apiClient(`/unexpected-outage/${id}`, { method: "DELETE" });
}