/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import { useGetMyReports } from "@/hooks";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import TablePagination from "@/components/ui/table-pagination";
import { IUnexpectedOutage, OutageStatus } from "@/types";
import { format } from "date-fns";

const statusVariant: Record<OutageStatus, "default" | "secondary" | "destructive" | "outline"> = {
  REPORTED: "secondary",
  ASSIGNED: "outline",
  IN_PROGRESS: "default",
  RESOLVED: "default",
};

const statusColor: Record<OutageStatus, string> = {
  REPORTED: "",
  ASSIGNED: "",
  IN_PROGRESS: "bg-blue-500 hover:bg-blue-600",
  RESOLVED: "bg-green-500 hover:bg-green-600",
};

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

  // FIX 1: Explicitly type the reports array so TypeScript knows report.status is OutageStatus
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

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search by description..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="sm:max-w-xs"
        />
        <Select
          value={status}
          onValueChange={(val) => {
            // FIX 2: Handle null by falling back to empty string
            setStatus(val === "ALL" || !val ? "" : val);
            setPage(1);
          }}
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

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Area</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>Reported At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : reports.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No reports found
                </TableCell>
              </TableRow>
            ) : (
              reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">
                    {report.area.name}, {report.area.district}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {report.description}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={statusVariant[report.status]}
                      className={statusColor[report.status]}
                    >
                      {report.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {report.technician ? report.technician.name : "—"}
                  </TableCell>
                  <TableCell>
                    {format(new Date(report.createdAt), "dd MMM yyyy, hh:mm a")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

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