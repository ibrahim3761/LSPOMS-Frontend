/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSingleScheduledOutage } from "@/hooks";
import { IScheduledOutage, ScheduledOutageStatus } from "@/types";
import { format } from "date-fns";

const statusColor: Record<ScheduledOutageStatus, string> = {
  UPCOMING: "bg-yellow-500 hover:bg-yellow-600",
  ONGOING: "bg-blue-500 hover:bg-blue-600",
  COMPLETED: "bg-green-500 hover:bg-green-600",
  CANCELLED: "bg-slate-500 hover:bg-slate-600",
};

interface Props {
  selectedId: string | null;
  onClose: () => void;
}

export default function ScheduledOutageDetailModal({ selectedId, onClose }: Props) {
  const { data, isLoading } = useGetSingleScheduledOutage(selectedId ?? "");
  const outage = data?.data as IScheduledOutage | undefined;

  return (
    <Dialog open={!!selectedId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Scheduled Outage Details</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        ) : outage ? (
          <div className="flex flex-col gap-3 text-sm">
            <DetailRow
              label="Area"
              value={`${outage.area.name}, ${outage.area.district}`}
            />
            <DetailRow
              label="Status"
              value={
                <Badge className={statusColor[outage.status]}>
                  {outage.status}
                </Badge>
              }
            />
            <Separator />
            <DetailRow
              label="Start Time"
              value={format(new Date(outage.startTime), "dd MMM yyyy, hh:mm a")}
            />
            <DetailRow
              label="End Time"
              value={format(new Date(outage.endTime), "dd MMM yyyy, hh:mm a")}
            />
            <Separator />
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">Reason</span>
              <p className="rounded-md bg-muted p-3">{outage.reason}</p>
            </div>
            <Separator />
            <DetailRow
              label="Created At"
              value={format(new Date(outage.createdAt), "dd MMM yyyy, hh:mm a")}
            />
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