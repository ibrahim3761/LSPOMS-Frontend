import {
  applyAsTechnician,
  getMyAssignments,
  getOutageDetails,
  updateOutageStatus,
  updateTechnicianProfile,
  verifyTechnicianAccount,
} from "@/api";
import { UpdateOutageStatusPayload } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useApplyAsTechnician() {
  return useMutation({
    mutationFn: applyAsTechnician,
  });
}

export function useVerifyTechnicianAccount() {
  return useMutation({
    mutationFn: verifyTechnicianAccount,
  });
}

export function useUpdateTechnicianProfile() {
  return useMutation({ mutationFn: updateTechnicianProfile });
}


export function useGetMyAssignments(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["my-assignments", params],
    queryFn: () => getMyAssignments(params),
  });
}

export function useGetOutageDetails(id: string) {
  return useQuery({
    queryKey: ["outage", id],
    queryFn: () => getOutageDetails(id),
    enabled: !!id,
  });
}

export function useUpdateOutageStatus() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateOutageStatusPayload }) =>
      updateOutageStatus(id, payload),
  });
}