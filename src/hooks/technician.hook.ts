import {
  applyAsTechnician,
  updateTechnicianProfile,
  verifyTechnicianAccount,
} from "@/api";
import { useMutation } from "@tanstack/react-query";

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