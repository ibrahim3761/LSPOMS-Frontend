import {
  getAdminAnalytics,
  getAllUsers,
  changeUserStatus,
  deleteUser,
  getAllAreas,
  createArea,
  updateArea,
  deleteArea,
  getAllTechnicians,
  approveTechnician,
  getAllPayments,
  getAllScheduledOutages,
  getSingleScheduledOutage,
  createScheduledOutage,
  updateScheduledOutage,
  deleteScheduledOutage,
  getAllUnexpectedOutages,
  assignTechnician,
  deleteUnexpectedOutage,
} from "@/api";
import {
  ApproveTechnicianPayload,
  ChangeUserStatusPayload,
  CreateAreaPayload,
  CreateScheduledOutagePayload,
  UpdateAreaPayload,
  UpdateScheduledOutagePayload,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

// Analytics
export function useGetAdminAnalytics() {
  return useQuery({
    queryKey: ["admin-analytics"],
    queryFn: getAdminAnalytics,
  });
}

// Users
export function useGetAllUsers(params?: {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => getAllUsers(params),
  });
}

export function useChangeUserStatus() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ChangeUserStatusPayload }) =>
      changeUserStatus(id, payload),
  });
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
  });
}

// Areas
export function useGetAllAreas(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: ["admin-areas", params],
    queryFn: () => getAllAreas(params),
  });
}

export function useCreateArea() {
  return useMutation({
    mutationFn: (payload: CreateAreaPayload) => createArea(payload),
  });
}

export function useUpdateArea() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAreaPayload }) =>
      updateArea(id, payload),
  });
}

export function useDeleteArea() {
  return useMutation({
    mutationFn: (id: string) => deleteArea(id),
  });
}

// Technicians
export function useGetAllTechnicians(params?: {
  page?: number;
  limit?: number;
  verificationStatus?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ["admin-technicians", params],
    queryFn: () => getAllTechnicians(params),
  });
}

export function useApproveTechnician() {
  return useMutation({
    mutationFn: (payload: ApproveTechnicianPayload) => approveTechnician(payload),
  });
}

// Payments
export function useGetAllPayments() {
  return useQuery({
    queryKey: ["admin-payments"],
    queryFn: () => getAllPayments(),
  });
}

// scheduled Outages
export function useGetAllScheduledOutages(params?: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  return useQuery({
    queryKey: ["admin-scheduled-outages", params],
    queryFn: () => getAllScheduledOutages(params),
  });
}

export function useGetSingleScheduledOutage(id: string) {
  return useQuery({
    queryKey: ["scheduled-outage", id],
    queryFn: () => getSingleScheduledOutage(id),
    enabled: !!id,
  });
}

export function useCreateScheduledOutage() {
  return useMutation({
    mutationFn: (payload: CreateScheduledOutagePayload) =>
      createScheduledOutage(payload),
  });
}

export function useUpdateScheduledOutage() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateScheduledOutagePayload }) =>
      updateScheduledOutage(id, payload),
  });
}

export function useDeleteScheduledOutage() {
  return useMutation({
    mutationFn: (id: string) => deleteScheduledOutage(id),
  });
}

// Unexpected Outages
export function useGetAllUnexpectedOutages(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ["admin-unexpected-outages", params],
    queryFn: () => getAllUnexpectedOutages(params),
  });
}

export function useAssignTechnician() {
  return useMutation({
    mutationFn: ({ id, technicianId }: { id: string; technicianId: string }) =>
      assignTechnician(id, { technicianId }),
  });
}

export function useDeleteUnexpectedOutage() {
  return useMutation({
    mutationFn: (id: string) => deleteUnexpectedOutage(id),
  });
}