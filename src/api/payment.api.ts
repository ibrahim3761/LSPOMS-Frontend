import apiClient from "@/lib/apiClient";

export function getMyPayments() {
  return apiClient("/payment/my-payments");
}

export function getPaymentDetails(id: string) {
  return apiClient(`/payment/${id}`);
}