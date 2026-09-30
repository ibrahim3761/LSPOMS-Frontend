"use client";

import { useGetMyReports } from "@/hooks";
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
import { IUnexpectedOutage } from "@/types";
import MyReportsTable from "@/components/modules/customer/my-reports-table";

export default function MyReportsPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetMyReports({
    page,
    limit: 10,
    status: status || undefined,
    search: search || undefined,
  });

  const reports = (data?.data ?? []) as IUnexpectedOutage[];
  const meta = data?.meta;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Reports</h1>
        <p className="text-muted-foreground text-sm">
          All your reported power outages
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

      <MyReportsTable reports={reports} isLoading={isLoading} />

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