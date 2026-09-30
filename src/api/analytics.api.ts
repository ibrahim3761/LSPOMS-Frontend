import apiClient from "@/lib/apiClient";
import { ICustomerAnalytics } from "@/types/analytics.types";
import { IApiResponse } from "@/types/common.types";

export function getCustomerAnalytics() {
  return apiClient<IApiResponse<ICustomerAnalytics>>("/analytics/customer-analytics");
}


