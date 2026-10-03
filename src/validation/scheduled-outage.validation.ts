import { z } from "zod";

export const createScheduledOutageSchema = z
  .object({
    reason: z.string().trim().min(5, "Reason must be at least 5 characters"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    areaId: z.string().trim().min(1, "Area is required"),
    technicianId: z.string().trim().min(1, "Technician is required"),
  })
  .refine((data) => new Date(data.startTime) < new Date(data.endTime), {
    message: "Start time must be before end time",
    path: ["endTime"],
  })
  .refine((data) => new Date(data.startTime) > new Date(), {
    message: "Start time must be in the future",
    path: ["startTime"],
  });

export const updateScheduledOutageSchema = z.object({
  reason: z.string().trim().min(5, "Reason must be at least 5 characters"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  areaId: z.string().trim().min(1, "Area is required"),
  technicianId: z.string().trim().min(1, "Technician is required"),
  status: z.enum(["CANCELLED"]).optional(),
});