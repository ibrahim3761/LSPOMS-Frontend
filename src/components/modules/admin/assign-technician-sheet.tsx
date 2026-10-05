"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { useGetAllTechnicians } from "@/hooks";
import { IAdminTechnician, IUnexpectedOutage, OutageStatus } from "@/types";
import { useState } from "react";
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
  outage: IUnexpectedOutage | null;
  isPending: boolean;
  onClose: () => void;
  onConfirm: (outageId: string, technicianId: string) => void;
}

export default function AssignTechnicianSheet({
  outage,
  isPending,
  onClose,
  onConfirm,
}: Props) {
  const [technicianId, setTechnicianId] = useState("");

  const { data: techniciansData } = useGetAllTechnicians({
    limit: 100,
    verificationStatus: "APPROVED",
  });

  const technicians = (techniciansData?.data ?? []) as IAdminTechnician[];

  const handleClose = () => {
    setTechnicianId("");
    onClose();
  };

  const handleConfirm = () => {
    if (!outage || !technicianId) return;
    onConfirm(outage.id, technicianId);
  };

  return (
    <Sheet open={!!outage} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto px-6">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle>Assign Technician</SheetTitle>
        </SheetHeader>

        {outage && (
          <div className="flex flex-col gap-6 mt-6">
            {/* Outage details */}
            <div className="flex flex-col gap-3 text-sm">
              <DetailRow
                label="Area"
                value={`${outage.area.name}, ${outage.area.district}`}
              />
              <DetailRow
                label="Reporter"
                value={outage.reporter?.name ?? "—"}
              />
              <DetailRow
                label="Status"
                value={
                  <Badge
                    variant={statusVariant[outage.status]}
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
              {outage.technician && (
                <DetailRow
                  label="Current Technician"
                  value={outage.technician.name}
                />
              )}
            </div>

            <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
              {outage.description}
            </div>

            <Separator />

            {/* Technician select */}
            <Field>
              <FieldLabel htmlFor="technician">
                {outage.technicianId ? "Reassign Technician" : "Assign Technician"}
              </FieldLabel>
              <Select
                value={technicianId}
                onValueChange={(val) => val && setTechnicianId(val)}
              >
                <SelectTrigger id="technician">
                  <SelectValue placeholder="Select a technician" />
                </SelectTrigger>
                <SelectContent>
                  {technicians.map((tech) => (
                    <SelectItem key={tech.id} value={tech.id}>
                      {tech.name} — {tech.experienceYears} yrs
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleClose}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleConfirm}
                disabled={!technicianId || isPending}
              >
                {isPending ? <><Spinner /> Assigning...</> : "Assign"}
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
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