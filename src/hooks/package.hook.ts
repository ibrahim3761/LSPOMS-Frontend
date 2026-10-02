import {
  getAllPackages,
  createPackage,
  updatePackage,
  deletePackage,
} from "@/api";
import { CreatePackagePayload, UpdatePackagePayload } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetAllPackages(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["packages", params],
    queryFn: () => getAllPackages(params),
  });
}

export function useCreatePackage() {
  return useMutation({
    mutationFn: (payload: CreatePackagePayload) => createPackage(payload),
  });
}

export function useUpdatePackage() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdatePackagePayload }) =>
      updatePackage(id, payload),
  });
}

export function useDeletePackage() {
  return useMutation({
    mutationFn: (id: string) => deletePackage(id),
  });
}