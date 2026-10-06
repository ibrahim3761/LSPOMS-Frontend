import apiClient from "@/lib/apiClient";
import { BuyPremiumPayload } from "@/types";

export function getMyPayments() {
  return apiClient("/payment/my-payments");
}

export function getPaymentDetails(id: string) {
  return apiClient(`/payment/${id}`);
}

export function buyPremium(payload: BuyPremiumPayload) {
  return apiClient("/payment/buy-premium", { method: "POST", body: payload });
}