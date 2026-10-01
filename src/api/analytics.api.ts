import apiClient from "@/lib/apiClient";
import { ITechnicianAnalytics } from "@/types";
import { ICustomerAnalytics } from "@/types/analytics.types";
import { IApiResponse } from "@/types/common.types";

export function getCustomerAnalytics() {
  return apiClient<IApiResponse<ICustomerAnalytics>>("/analytics/customer-analytics");
}

export function getTechnicianAnalytics() {
  return apiClient<IApiResponse<ITechnicianAnalytics>>("/analytics/technician-analytics");
}

