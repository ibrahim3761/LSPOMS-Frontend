import {apiClient} from "@/lib/apiClient";
import { ChangePasswordPayload, UpdateMyProfilePayload } from "@/types";

export function updateMyProfile(payload : UpdateMyProfilePayload) {
  return apiClient("/user/update-my-profile", { method: "PATCH", body: payload });
}

export function uploadProfileImage(formData: FormData) {
  return apiClient("/user/profile-image", { method: "PATCH", body: formData });
}

export function changePassword(payload : ChangePasswordPayload) {
  return apiClient("/user/change-password", { method: "PATCH", body: payload });
}