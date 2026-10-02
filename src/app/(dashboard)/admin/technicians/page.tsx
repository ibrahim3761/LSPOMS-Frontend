"use client";

import { useGetAllTechnicians, useApproveTechnician } from "@/hooks";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import TablePagination from "@/components/ui/table-pagination";
import TechniciansTable from "@/components/modules/admin/technicians-table";
import { IAdminTechnician } from "@/types";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useQueryClient } from "@tanstack/react-query";

export default function TechniciansPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");

  const queryClient = useQueryClient();

  const { data, isLoading } = useGetAllTechnicians({
    page,
    limit: 10,
    search: search || undefined,
    verificationStatus: verificationStatus || undefined,
  });

  const { mutate: approveTechnician } = useApproveTechnician();

  const technicians = (data?.data ?? []) as IAdminTechnician[];
  const meta = data?.meta;

  const handleApprove = (id: string) => {
    approveTechnician(
      { technicianId: id, verificationStatus: "APPROVED" },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["admin-technicians"] });
          queryClient.invalidateQueries({ queryKey: ["admin-analytics"] });
          toast.add({
            title: "Technician Approved",
            description: "Technician has been approved successfully",
            type: "success",
          });
        },
        onError: (err) => {
          toast.add({ title: "Failed", description: getErrorMessage(err), type: "error" });
        },
      }
    );
  };

  const handleReject = (id: string) => {
    approveTechnician(
      { technicianId: id, verificationStatus: "REJECTED" },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["admin-technicians"] });
          queryClient.invalidateQueries({ queryKey: ["admin-analytics"] });
          toast.add({
            title: "Technician Rejected",
            description: "Technician has been rejected",
            type: "success",
          });
        },
        onError: (err) => {
          toast.add({ title: "Failed", description: getErrorMessage(err), type: "error" });
        },
      }
    );
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Technicians</h1>
        <p className="text-muted-foreground text-sm">
          Manage and approve technician applications
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search technicians..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="sm:max-w-xs"
        />
        <Select
          value={verificationStatus}
          onValueChange={(val) => { setVerificationStatus(val === "ALL" ? "" : val); setPage(1); }}
        >
          <SelectTrigger className="sm:max-w-xs">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <TechniciansTable
        technicians={technicians}
        isLoading={isLoading}
        onApprove={handleApprove}
        onReject={handleReject}
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