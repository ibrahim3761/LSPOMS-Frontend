import { buyPremium, getMyPayments, getPaymentDetails } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export function useBuyPremium() {
  return useMutation({
    mutationFn: buyPremium,
  });
}