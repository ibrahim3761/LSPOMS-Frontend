"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

const statusColor: Record<OutageStatus, string> = {
  REPORTED: "",
  ASSIGNED: "",
  IN_PROGRESS: "bg-blue-500 hover:bg-blue-600",
  RESOLVED: "bg-green-500 hover:bg-green-600",
};

const statusVariant: Record<OutageStatus, "default" | "secondary" | "outline"> = {
  REPORTED: "secondary",
  ASSIGNED: "outline",
  IN_PROGRESS: "default",
  RESOLVED: "default",
};

interface Props {
  outages: IUnexpectedOutage[];
  isLoading: boolean;
  onViewDetails: (id: string) => void;
}

export default function UnexpectedOutagesTable({
  outages,
  isLoading,
  onViewDetails,
}: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Area</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Reporter</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reported At</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton rows={5} cols={6} />
        ) : outages.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No unexpected outages assigned
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
                <TableCell className="max-w-xs truncate">
                  {outage.description}
                </TableCell>
                <TableCell>{outage.reporter?.name ?? "—"}</TableCell>
                <TableCell>
                  <Badge
                    variant={statusVariant[outage.status]}
                    className={statusColor[outage.status]}
                  >
                    {outage.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(outage.createdAt), "dd MMM yyyy")}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant={outage.status === "RESOLVED" ? "outline" : "default"}
                    onClick={() => onViewDetails(outage.id)}
                  >
                    {outage.status === "RESOLVED" ? "View" : "Update"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}