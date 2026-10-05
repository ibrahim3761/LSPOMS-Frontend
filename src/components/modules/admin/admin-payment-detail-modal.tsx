"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IPayment, PaymentStatus } from "@/types";
import { format } from "date-fns";

const statusColor: Record<PaymentStatus, string> = {
  PAID: "bg-green-500 hover:bg-green-600",
  PENDING: "bg-yellow-500 hover:bg-yellow-600",
  FAILED: "bg-red-500 hover:bg-red-600",
  CANCELLED: "bg-slate-500 hover:bg-slate-600",
};

interface Props {
  payment: IPayment | null;
  onClose: () => void;
}

export default function AdminPaymentDetailModal({ payment, onClose }: Props) {
  return (
    <Dialog open={!!payment} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>
        {payment && (
          <div className="flex flex-col gap-3 text-sm">
            <DetailRow label="Payment ID" value={payment.id} />
            <Separator />

            {/* Customer */}
            {payment.premiumUser && (
              <>
                <DetailRow
                  label="Customer"
                  value={payment.premiumUser.user.name}
                />
                <DetailRow
                  label="Email"
                  value={payment.premiumUser.user.email}
                />
                <Separator />
                <DetailRow
                  label="Package"
                  value={payment.premiumUser.package.name}
                />
                <DetailRow
                  label="Area"
                  value={`${payment.premiumUser.area.name}, ${payment.premiumUser.area.district}`}
                />
                <DetailRow
                  label="Subscription Start"
                  value={format(new Date(payment.premiumUser.startDate), "dd MMM yyyy")}
                />
                <DetailRow
                  label="Subscription Expires"
                  value={format(new Date(payment.premiumUser.expiresAt), "dd MMM yyyy")}
                />
                <Separator />
              </>
            )}

            {/* Payment info */}
            <DetailRow label="Amount" value={`৳${payment.amount}`} />
            <DetailRow
              label="Status"
              value={
                <Badge className={statusColor[payment.status]}>
                  {payment.status}
                </Badge>
              }
            />
            <DetailRow
              label="Payer Reference"
              value={payment.payerReference ?? "—"}
            />
            <DetailRow
              label="bKash Payment ID"
              value={payment.bkashPaymentId ?? "—"}
            />
            <DetailRow
              label="Transaction ID"
              value={payment.bkashTrxId ?? "—"}
            />
            <DetailRow
              label="Paid At"
              value={payment.paidAt ?? "—"}
            />
            <Separator />

            <DetailRow
              label="Created At"
              value={format(new Date(payment.createdAt), "dd MMM yyyy, hh:mm a")}
            />
          </div>
        )}
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
    <div className="flex items-start justify-between gap-4">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="font-medium text-right break-all">{value}</span>
    </div>
  );
}