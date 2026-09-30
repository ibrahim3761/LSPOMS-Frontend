/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import { useGetMyPayments, useGetPaymentDetails } from "@/hooks";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { IPayment, PaymentStatus } from "@/types";
import { format } from "date-fns";

const statusColor: Record<PaymentStatus, string> = {
  PAID: "bg-green-500 hover:bg-green-600",
  PENDING: "bg-yellow-500 hover:bg-yellow-600",
  FAILED: "bg-red-500 hover:bg-red-600",
};

export default function PaymentsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data, isLoading } = useGetMyPayments();
  const { data: detailData, isLoading: detailLoading } = useGetPaymentDetails(
    selectedId ?? ""
  );

  const payments = (data?.data ?? []) as IPayment[];
  const detail = detailData?.data as IPayment | undefined;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Payments</h1>
        <p className="text-muted-foreground text-sm">
          Your payment history
        </p>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Package</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : payments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No payments found
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow
                  key={payment.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedId(payment.id)}
                >
                  <TableCell className="font-medium">
                    {payment.premiumUser.package.name}
                  </TableCell>
                  <TableCell>
                    {payment.premiumUser.area.name},{" "}
                    {payment.premiumUser.area.district}
                  </TableCell>
                  <TableCell>৳{payment.amount}</TableCell>
                  <TableCell>
                    <Badge className={statusColor[payment.status]}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(payment.createdAt), "dd MMM yyyy")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Payment detail modal */}
      <Dialog
        open={!!selectedId}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>
          {detailLoading ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          ) : detail ? (
            <div className="flex flex-col gap-3 text-sm">
              <DetailRow label="Payment ID" value={detail.id} />
              <Separator />
              <DetailRow label="Package" value={detail.premiumUser.package.name} />
              <DetailRow
                label="Area"
                value={`${detail.premiumUser.area.name}, ${detail.premiumUser.area.district}`}
              />
              <DetailRow label="Amount" value={`৳${detail.amount}`} />
              <DetailRow
                label="Status"
                value={
                  <Badge className={statusColor[detail.status]}>
                    {detail.status}
                  </Badge>
                }
              />
              <Separator />
              <DetailRow
                label="bKash Payment ID"
                value={detail.bkashPaymentId ?? "—"}
              />
              <DetailRow
                label="Transaction ID"
                value={detail.bkashTrxId ?? "—"}
              />
              <DetailRow
                label="Payer Reference"
                value={detail.payerReference ?? "—"}
              />
              <Separator />
              <DetailRow
                label="Subscription Start"
                value={format(
                  new Date(detail.premiumUser.startDate),
                  "dd MMM yyyy"
                )}
              />
              <DetailRow
                label="Subscription Expires"
                value={format(
                  new Date(detail.premiumUser.expiresAt),
                  "dd MMM yyyy"
                )}
              />
              <DetailRow
                label="Created At"
                value={format(new Date(detail.createdAt), "dd MMM yyyy, hh:mm a")}
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
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