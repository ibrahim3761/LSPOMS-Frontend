import { getCustomerAnalytics } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetCustomerAnalytics() {
  return useQuery({
    queryKey: ["customer-analytics"],
    queryFn: getCustomerAnalytics,
  });
}