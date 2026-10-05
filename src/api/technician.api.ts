// technician.api.ts

import apiClient from "@/lib/apiClient";
import { IApiResponse, IAssignmentsResponse, TechnicianApplicationPayload, UpdateOutageStatusPayload, UpdateTechnicianProfilePayload, VerifyAccountPayload } from "@/types";

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

export function getMyAssignments(params?: {
  page?: number;
  limit?: number;
}) {
  return apiClient<IApiResponse<IAssignmentsResponse>>("/technician/my-assignments", {
    query: params,
  });
}

export function getOutageDetails(id: string) {
  return apiClient(`/unexpected-outage/${id}`);
}

export function updateOutageStatus(id: string, payload: UpdateOutageStatusPayload) {
  return apiClient(`/technician/${id}/update-status`, {
    method: "PATCH",
    body: payload,
  });
}