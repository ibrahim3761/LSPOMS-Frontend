import z from "zod";

export const updateMyProfileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  contactNumber: z.string().trim(),
  address: z.string().trim(),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().trim().min(1, "Old password is required"),
  newPassword: z.string().trim().min(6, "New password must be at least 6 characters"),
});