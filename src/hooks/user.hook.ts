import { changePassword, updateMyProfile, uploadProfileImage } from "@/api/user.api";
import { useMutation } from "@tanstack/react-query";

export function useUpdateMyProfile() {
  return useMutation({ mutationFn: updateMyProfile });
}

export function useUploadProfileImage() {
  return useMutation({ mutationFn: uploadProfileImage });
}

export function useChangePassword() {
  return useMutation({ mutationFn: changePassword });
}