"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { IAdminTechnician } from "@/types";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { format } from "date-fns";

interface Props {
  technician: IAdminTechnician | null;
  isPending: boolean;
  onClose: () => void;
  onConfirm: (id: string, reason: string) => void;
}

export default function TechnicianRejectSheet({
  technician,
  isPending,
  onClose,
  onConfirm,
}: Props) {
  const [reason, setReason] = useState("");
  const [touched, setTouched] = useState(false);

  const isInvalid = touched && !reason.trim();

  const handleClose = () => {
    setReason("");
    setTouched(false);
    onClose();
  };

  const handleConfirm = () => {
    setTouched(true);
    if (!reason.trim() || !technician) return;
    onConfirm(technician.id, reason);
  };

  return (
    <Sheet open={!!technician} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto px-6">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle>Reject Technician Application</SheetTitle>
        </SheetHeader>

        {technician && (
          <div className="flex flex-col gap-6 mt-6 pb-6">
            {/* Technician details */}
            <div className="flex items-center gap-3">
              <Avatar className="size-12">
                <AvatarImage src={technician.user.imageUrl} alt={technician.name} />
                <AvatarFallback className="text-lg">
                  {technician.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{technician.name}</p>
                <p className="text-sm text-muted-foreground">{technician.email}</p>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-3 text-sm">
              <DetailRow label="Contact" value={technician.contactNumber} />
              <DetailRow label="Experience" value={`${technician.experienceYears} years`} />
              <DetailRow label="Address" value={technician.address ?? "—"} />
              <DetailRow
                label="Status"
                value={
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">
                    {technician.verificationStatus}
                  </Badge>
                }
              />
              <DetailRow
                label="Applied"
                value={format(new Date(technician.createdAt), "dd MMM yyyy")}
              />
              {technician.resume && (
                <DetailRow
                  label="Resume"
                  value={
                    <a
                      href={technician.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      View <ExternalLink className="size-3" />
                    </a>
                  }
                />
              )}
            </div>

            {technician.bio && (
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Bio</p>
                <p className="text-sm text-muted-foreground rounded-md bg-muted p-3">
                  {technician.bio}
                </p>
              </div>
            )}

            <Separator />

            {/* Rejection reason */}
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor="reason">
                Rejection Reason{" "}
                <span className="text-destructive">*</span>
              </FieldLabel>
              <Textarea
                id="reason"
                rows={4}
                placeholder="Provide a clear reason for rejecting this application..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                onBlur={() => setTouched(true)}
                aria-invalid={isInvalid}
              />
              {isInvalid && (
                <FieldError errors={[{ message: "Rejection reason is required" }]} />
              )}
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
                variant="destructive"
                className="flex-1"
                onClick={handleConfirm}
                disabled={isPending}
              >
                {isPending ? <><Spinner /> Rejecting...</> : "Confirm Rejection"}
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