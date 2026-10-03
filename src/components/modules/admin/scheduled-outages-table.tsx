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
import { IScheduledOutage, ScheduledOutageStatus } from "@/types";
import { format } from "date-fns";
import { Eye, Pencil, Trash2, Ban } from "lucide-react";

const statusColor: Record<ScheduledOutageStatus, string> = {
  UPCOMING: "bg-yellow-500 hover:bg-yellow-600",
  ONGOING: "bg-blue-500 hover:bg-blue-600",
  COMPLETED: "bg-green-500 hover:bg-green-600",
  CANCELLED: "bg-slate-500 hover:bg-slate-600",
};

interface Props {
  outages: IScheduledOutage[];
  isLoading: boolean;
  onView: (id: string) => void;
  onEdit: (outage: IScheduledOutage) => void;
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function AdminScheduledOutagesTable({
  outages,
  isLoading,
  onView,
  onEdit,
  onCancel,
  onDelete,
}: Props) {
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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton rows={5} cols={6} />
        ) : outages.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No scheduled outages found
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
                  {outage.reason}
                </TableCell>
                <TableCell className="text-sm">
                  {format(new Date(outage.startTime), "dd MMM yyyy, hh:mm a")}
                </TableCell>
                <TableCell className="text-sm">
                  {format(new Date(outage.endTime), "dd MMM yyyy, hh:mm a")}
                </TableCell>
                <TableCell>
                  <Badge className={statusColor[outage.status]}>
                    {outage.status}
                  </Badge>
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
                      onClick={() => onEdit(outage)}
                      disabled={outage.status !== "UPCOMING"}
                    >
                      <Pencil className="size-4" />
                    </Button>

                    {/* Cancel confirmation */}
                    <AlertDialog>
                      <AlertDialogTrigger
                        render={
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-yellow-600 hover:text-yellow-700"
                            disabled={
                              outage.status === "COMPLETED" ||
                              outage.status === "CANCELLED"
                            }
                          />
                        }
                      >
                        <Ban className="size-4" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel Outage</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to cancel this scheduled outage for{" "}
                            <span className="font-medium text-foreground">
                              {outage.area.name}
                            </span>
                            ? Premium users in this area will be notified by email.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-yellow-500 hover:bg-yellow-600"
                            onClick={() => onCancel(outage.id)}
                          >
                            Yes, Cancel
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    {/* Delete confirmation */}
                    <AlertDialog>
                      <AlertDialogTrigger
                        render={
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            disabled={outage.status === "ONGOING"}
                          />
                        }
                      >
                        <Trash2 className="size-4" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Outage</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this scheduled outage for{" "}
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