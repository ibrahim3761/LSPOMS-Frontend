import apiClient from "@/lib/apiClient";
import { ReportOutagePayload } from "@/types";

export function reportOutage(payload: ReportOutagePayload) {
  return apiClient("/unexpected-outage/report", {
    method: "POST",
    body: payload,
  });
}

export function getMyReports(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) {
  return apiClient("/unexpected-outage/my-reports", { query: params });
}

export function getPublicScheduledOutages(params?: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  return apiClient("/scheduled-outage/public/all", { query: params });
}

export function getScheduledOutagesByArea(areaId: string, params?: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  return apiClient(`/scheduled-outage/public/area/${areaId}`, { query: params });
}

export function getUnexpectedOutagesByArea(areaId: string, params?: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  return apiClient(`/unexpected-outage/public/area/${areaId}`, { query: params });
}