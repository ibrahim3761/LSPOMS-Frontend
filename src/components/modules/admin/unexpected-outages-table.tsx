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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import TableSkeleton from "@/components/shared/table-skeleton";
import { IUnexpectedOutage, OutageStatus } from "@/types";
import { Eye, Trash2, UserPlus } from "lucide-react";
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
  onView: (id: string) => void;
  onAssign: (outage: IUnexpectedOutage) => void;
  onDelete: (id: string) => void;
}

export default function UnexpectedOutagesAdminTable({
  outages,
  isLoading,
  onView,
  onAssign,
  onDelete,
}: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Area</TableHead>
            <TableHead>Reporter</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Technician</TableHead>
            <TableHead>Reported At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton rows={5} cols={7} />
        ) : outages.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No unexpected outages found
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
                <TableCell className="text-sm">
                  {outage.reporter?.name ?? "—"}
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
                  {outage.technician ? outage.technician.name : (
                    <span className="text-muted-foreground">Unassigned</span>
                  )}
                </TableCell>
                <TableCell className="text-sm">
                  {format(new Date(outage.createdAt), "dd MMM yyyy")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onView(outage.id)}
                    >
                      <Eye className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onAssign(outage)}
                      disabled={outage.status === "RESOLVED"}
                    >
                      <UserPlus className="size-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger
                        render={
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                          />
                        }
                      >
                        <Trash2 className="size-4" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Outage</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this outage report from{" "}
                            <span className="font-medium text-foreground">
                              {outage.area.name}
                            </span>
                            ? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive hover:bg-destructive/90"
                            onClick={() => onDelete(outage.id)}
                          >
                            Yes, Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}