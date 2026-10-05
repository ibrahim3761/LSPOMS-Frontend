"use client";

import {
  useGetAllUnexpectedOutages,
  useAssignTechnician,
  useDeleteUnexpectedOutage,
} from "@/hooks";
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
import UnexpectedOutagesAdminTable from "@/components/modules/admin/unexpected-outages-table";
import AssignTechnicianSheet from "@/components/modules/admin/assign-technician-sheet";
import { useGetOutageDetails } from "@/hooks";
import OutageDetailModal from "@/components/modules/technician/outage-detail-modal";
import { IUnexpectedOutage } from "@/types";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useQueryClient } from "@tanstack/react-query";

export default function UnexpectedOutagesPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [viewId, setViewId] = useState<string | null>(null);
  const [assignOutage, setAssignOutage] = useState<IUnexpectedOutage | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useGetAllUnexpectedOutages({
    page,
    limit: 10,
    status: status || undefined,
    search: search || undefined,
  });

  const { mutate: assignTechnician, isPending: assignPending } = useAssignTechnician();
  const { mutate: deleteOutage } = useDeleteUnexpectedOutage();

  const outages = (data?.data ?? []) as IUnexpectedOutage[];
  const meta = data?.meta;

  const handleAssign = (outageId: string, technicianId: string) => {
    assignTechnician(
      { id: outageId, technicianId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["admin-unexpected-outages"] });
          queryClient.invalidateQueries({ queryKey: ["admin-analytics"] });
          toast.add({
            title: "Technician Assigned",
            description: "Technician has been assigned successfully",
            type: "success",
          });
          setAssignOutage(null);
        },
        onError: (err) => {
          toast.add({ title: "Failed", description: getErrorMessage(err), type: "error" });
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteOutage(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin-unexpected-outages"] });
        queryClient.invalidateQueries({ queryKey: ["admin-analytics"] });
        toast.add({
          title: "Outage Deleted",
          description: "Outage report has been deleted",
          type: "success",
        });
      },
      onError: (err) => {
        toast.add({ title: "Failed", description: getErrorMessage(err), type: "error" });
      },
    });
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Unexpected Outages</h1>
        <p className="text-muted-foreground text-sm">
          Manage and assign technicians to reported outages
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search by description..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="sm:max-w-xs"
        />
        <Select
          value={status}
          onValueChange={(val) => { setStatus(val === "ALL" || !val ? "" : val); setPage(1); }}
        >
          <SelectTrigger className="sm:max-w-xs">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="REPORTED">Reported</SelectItem>
            <SelectItem value="ASSIGNED">Assigned</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="RESOLVED">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <UnexpectedOutagesAdminTable
        outages={outages}
        isLoading={isLoading}
        onView={(id) => setViewId(id)}
        onAssign={(outage) => setAssignOutage(outage)}
        onDelete={handleDelete}
      />

      {meta && (
        <TablePagination
          totalPages={meta.totalPages}
          page={page}
          handlePageChange={setPage}
        />
      )}

      {/* View detail modal — reuse technician's outage detail modal */}
      <OutageDetailModal
        selectedId={viewId}
        onClose={() => setViewId(null)}
      />

      {/* Assign technician sheet */}
      <AssignTechnicianSheet
        outage={assignOutage}
        isPending={assignPending}
        onClose={() => setAssignOutage(null)}
        onConfirm={handleAssign}
      />
    </div>
  );
}