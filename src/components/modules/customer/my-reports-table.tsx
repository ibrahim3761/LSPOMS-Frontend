"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/shared/table-skeleton";
import { IUnexpectedOutage, OutageStatus } from "@/types";
import { format } from "date-fns";

const statusVariant: Record<
  OutageStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
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

interface Props {
  reports: IUnexpectedOutage[];
  isLoading: boolean;
}

export default function MyReportsTable({ reports, isLoading }: Props) {
  return (
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
        {isLoading ? (
          <TableSkeleton rows={5} cols={5} />
        ) : reports.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                No reports found
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {reports.map((report) => (
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
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}