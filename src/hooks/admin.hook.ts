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
} from "@/api";
import {
  ApproveTechnicianPayload,
  ChangeUserStatusPayload,
  CreateAreaPayload,
  UpdateAreaPayload,
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
export function useGetAllPayments(params?: {
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["admin-payments", params],
    queryFn: () => getAllPayments(params),
  });
}