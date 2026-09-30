import { getMyReports, reportOutage } from "@/api";
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