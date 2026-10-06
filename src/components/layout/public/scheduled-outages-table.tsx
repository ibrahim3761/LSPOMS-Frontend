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
import { CalendarClock, Clock } from "lucide-react";

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

export default function PublicScheduledOutagesTable({ outages, isLoading }: Props) {
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
          <TableSkeleton rows={5} cols={5} />
        ) : outages.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No scheduled outages found
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {outages.map((outage) => (
              <TableRow key={outage.id}>
                <TableCell className="font-medium">
                  <p>{outage.area.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {outage.area.district}, {outage.area.city}
                  </p>
                </TableCell>
                <TableCell className="max-w-xs truncate text-sm">
                  {outage.reason}
                </TableCell>
                <TableCell className="text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="size-3 text-muted-foreground" />
                    {format(new Date(outage.startTime), "dd MMM yyyy, hh:mm a")}
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  <div className="flex items-center gap-1">
                    <CalendarClock className="size-3 text-muted-foreground" />
                    {format(new Date(outage.endTime), "dd MMM yyyy, hh:mm a")}
                  </div>
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