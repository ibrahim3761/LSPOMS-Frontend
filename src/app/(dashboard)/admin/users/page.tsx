"use client";

import { useGetAllUsers, useChangeUserStatus, useDeleteUser } from "@/hooks";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TablePagination from "@/components/ui/table-pagination";
import UsersTable from "@/components/modules/admin/users-table";
import { IAdminUser } from "@/types";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useQueryClient } from "@tanstack/react-query";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const queryClient = useQueryClient();
  const { data, isLoading } = useGetAllUsers({
    page,
    limit: 10,
    search: search || undefined,
    role: role || undefined,
    status: status || undefined,
  });

  const { mutate: changeStatus } = useChangeUserStatus();
  const { mutate: deleteUser } = useDeleteUser();

  const users = (data?.data ?? []) as IAdminUser[];
  const meta = data?.meta;

  const handleChangeStatus = (id: string, status: "ACTIVE" | "BLOCKED") => {
    changeStatus(
      { id, payload: { status } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["admin-users"] });
          queryClient.invalidateQueries({ queryKey: ["admin-analytics"] });
          toast.add({
            title: "Status Updated",
            description: "User status has been updated",
            type: "success",
          });
        },
        onError: (err) => {
          toast.add({
            title: "Failed",
            description: getErrorMessage(err),
            type: "error",
          });
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteUser(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin-users"] });
        queryClient.invalidateQueries({ queryKey: ["admin-analytics"] });
        toast.add({
          title: "User Deleted",
          description: "User has been deleted successfully",
          type: "success",
        });
      },
      onError: (err) => {
        toast.add({
          title: "Failed",
          description: getErrorMessage(err),
          type: "error",
        });
      },
    });
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground text-sm">Manage all system users</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="sm:max-w-xs"
        />
        <Select value={role} onValueChange={(val) => { setRole(val === "ALL" ? "" : val); setPage(1); }}>
          <SelectTrigger className="sm:max-w-xs">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Roles</SelectItem>
            <SelectItem value="CUSTOMER">Customer</SelectItem>
            <SelectItem value="TECHNICIAN">Technician</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={(val) => { setStatus(val === "ALL" ? "" : val); setPage(1); }}>
          <SelectTrigger className="sm:max-w-xs">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="BLOCKED">Blocked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <UsersTable
        users={users}
        isLoading={isLoading}
        onChangeStatus={handleChangeStatus}
        onDelete={handleDelete}
      />

      {meta && (
        <TablePagination
          totalPages={meta.totalPages}
          page={page}
          handlePageChange={setPage}
        />
      )}
    </div>
  );
}