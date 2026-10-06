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
  showAreaPrompt?: boolean;
}

export default function PublicUnexpectedOutagesTable({
  outages,
  isLoading,
  showAreaPrompt,
}: Props) {
  if (showAreaPrompt) {
    return (
      <div className="rounded-md border py-12 text-center text-muted-foreground text-sm">
        Select an area above to view unexpected outages
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Area</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reported At</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton rows={5} cols={4} />
        ) : outages.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                No reported outages found for this area
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
                  {outage.description}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={statusVariant[outage.status]}
                    className={statusColor[outage.status]}
                  >
                    {outage.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">
                  {format(new Date(outage.createdAt), "dd MMM yyyy, hh:mm a")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}