/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetOutageDetails } from "@/hooks";
import { IUnexpectedOutage, OutageStatus } from "@/types";
import { format } from "date-fns";
import UpdateStatusForm from "@/components/form/update-status-form";

const statusColor: Record<OutageStatus, string> = {
  REPORTED: "",
  ASSIGNED: "",
  IN_PROGRESS: "bg-blue-500 hover:bg-blue-600",
  RESOLVED: "bg-green-500 hover:bg-green-600",
};

interface Props {
  selectedId: string | null;
  onClose: () => void;
}

export default function OutageDetailModal({ selectedId, onClose }: Props) {
  const { data, isLoading } = useGetOutageDetails(selectedId ?? "");
  const outage = data?.data as IUnexpectedOutage | undefined;
  const isResolved = outage?.status === "RESOLVED";

  return (
    <Dialog open={!!selectedId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Outage Details</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        ) : outage ? (
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex flex-col gap-2">
              <DetailRow
                label="Area"
                value={`${outage.area.name}, ${outage.area.district}`}
              />
              <DetailRow label="Reported By" value={outage.reporter?.name ?? "—"} />
              <DetailRow
                label="Status"
                value={
                  <Badge
                    variant={isResolved ? "default" : "secondary"}
                    className={statusColor[outage.status]}
                  >
                    {outage.status.replace("_", " ")}
                  </Badge>
                }
              />
              <DetailRow
                label="Reported At"
                value={format(new Date(outage.createdAt), "dd MMM yyyy, hh:mm a")}
              />
              {outage.resolvedAt && (
                <DetailRow
                  label="Resolved At"
                  value={format(new Date(outage.resolvedAt), "dd MMM yyyy, hh:mm a")}
                />
              )}
              {outage.note && <DetailRow label="Note" value={outage.note} />}
            </div>

            <div className="rounded-md bg-muted p-3 text-muted-foreground">
              {outage.description}
            </div>

            {!isResolved && (
              <>
                <Separator />
                <div>
                  <p className="font-medium mb-3">Update Status</p>
                  <UpdateStatusForm
                    outageId={outage.id}
                    currentStatus={outage.status}
                    onSuccess={onClose}
                  />
                </div>
              </>
            )}

            {isResolved && (
              <p className="text-center text-muted-foreground text-xs">
                This outage has been resolved and cannot be updated.
              </p>
            )}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}