import { getMyReports, getPublicScheduledOutages, getScheduledOutagesByArea, getUnexpectedOutagesByArea, reportOutage } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useReportOutage() {
  return useMutation({
    mutationFn: reportOutage,
  });
}

export function useGetMyReports(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ["my-reports", params],
    queryFn: () => getMyReports(params),
  });
}

export function useGetPublicScheduledOutages(params?: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  return useQuery({
    queryKey: ["public-scheduled-outages", params],
    queryFn: () => getPublicScheduledOutages(params),
  });
}

export function useGetScheduledOutagesByArea(
  areaId: string,
  params?: { page?: number; limit?: number; status?: string }
) {
  return useQuery({
    queryKey: ["scheduled-outages-by-area", areaId, params],
    queryFn: () => getScheduledOutagesByArea(areaId, params),
    enabled: !!areaId,
  });
}

export function useGetUnexpectedOutagesByArea(
  areaId: string,
  params?: { page?: number; limit?: number; status?: string }
) {
  return useQuery({
    queryKey: ["unexpected-outages-by-area", areaId, params],
    queryFn: () => getUnexpectedOutagesByArea(areaId, params),
    enabled: !!areaId,
  });
}