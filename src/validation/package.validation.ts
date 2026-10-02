import { z } from "zod";

export const createPackageSchema = z.object({
  name: z.string().trim().min(2, "Package name must be at least 2 characters"),
  description: z.string().trim().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be greater than 0"),
  durationDays: z.number().int().positive("Duration must be at least 1 day"),
});

export const updatePackageSchema = z.object({
  name: z.string().trim().min(2, "Package name must be at least 2 characters"),
  description: z.string().trim().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be greater than 0"),
  durationDays: z.number().int().positive("Duration must be at least 1 day"),
});