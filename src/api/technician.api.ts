// technician.api.ts

import apiClient from "@/lib/apiClient";
import { TechnicianApplicationPayload, UpdateTechnicianProfilePayload, VerifyAccountPayload } from "@/types";

export function applyAsTechnician(
  payload: TechnicianApplicationPayload,
) {
  const formData = new FormData();

  formData.append("data", JSON.stringify(payload.data));
  formData.append("resume", payload.resume);

  return apiClient("/technician/apply-as-technician", {
    method: "POST",
    body: formData,
  });
}

export function verifyTechnicianAccount(
  payload: VerifyAccountPayload,
) {
  return apiClient("/technician/apply-as-technician/verify-email", {
    method: "POST",
    body: payload,
  });
}

export function updateTechnicianProfile(payload : UpdateTechnicianProfilePayload) {
  return apiClient("/technician/update-my-profile", { method: "PATCH", body: payload });
}