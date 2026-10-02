import { z } from "zod";

export const createAreaSchema = z.object({
  name: z.string().trim().min(2, "Area name must be at least 2 characters"),
  district: z.string().trim().min(2, "District must be at least 2 characters"),
  city: z.string().trim().min(2, "City must be at least 2 characters"),
});

export const updateAreaSchema = z.object({
  name: z.string().trim().min(2, "Area name must be at least 2 characters"),
  district: z.string().trim().min(2, "District must be at least 2 characters"),
  city: z.string().trim().min(2, "City must be at least 2 characters"),
});