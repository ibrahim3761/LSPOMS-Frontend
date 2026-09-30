import { getMyPayments, getPaymentDetails } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetMyPayments() {
  return useQuery({
    queryKey: ["my-payments"],
    queryFn: getMyPayments,
  });
}

export function useGetPaymentDetails(id: string) {
  return useQuery({
    queryKey: ["payment", id],
    queryFn: () => getPaymentDetails(id),
    enabled: !!id,
  });
}