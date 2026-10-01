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
import { IScheduledOutage, ScheduledOutageStatus } from "@/types";
import { format } from "date-fns";

const statusColor: Record<ScheduledOutageStatus, string> = {
  UPCOMING: "bg-yellow-500 hover:bg-yellow-600",
  ONGOING: "bg-blue-500 hover:bg-blue-600",
  COMPLETED: "bg-green-500 hover:bg-green-600",
  CANCELLED: "bg-slate-500 hover:bg-slate-600",
};

interface Props {
  outages: IScheduledOutage[];
  isLoading: boolean;
}

export default function ScheduledOutagesTable({ outages, isLoading }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Area</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton rows={3} cols={5} />
        ) : outages.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No scheduled outages assigned
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {outages.map((outage) => (
              <TableRow key={outage.id}>
                <TableCell className="font-medium">
                  {outage.area.name}, {outage.area.district}
                </TableCell>
                <TableCell className="max-w-xs truncate">{outage.reason}</TableCell>
                <TableCell>
                  {format(new Date(outage.startTime), "dd MMM yyyy, hh:mm a")}
                </TableCell>
                <TableCell>
                  {format(new Date(outage.endTime), "dd MMM yyyy, hh:mm a")}
                </TableCell>
                <TableCell>
                  <Badge className={statusColor[outage.status]}>
                    {outage.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}