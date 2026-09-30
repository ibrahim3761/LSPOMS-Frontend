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