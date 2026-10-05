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
import { IPayment, PaymentStatus } from "@/types";
import { format } from "date-fns";

const statusColor: Record<PaymentStatus, string> = {
  PAID: "bg-green-500 hover:bg-green-600",
  PENDING: "bg-yellow-500 hover:bg-yellow-600",
  FAILED: "bg-red-500 hover:bg-red-600",
  CANCELLED: "bg-slate-500 hover:bg-slate-600",
};

interface Props {
  payments: IPayment[];
  isLoading: boolean;
  onRowClick: (payment: IPayment) => void;
}

export default function AdminPaymentsTable({
  payments,
  isLoading,
  onRowClick,
}: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Package</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>bKash ID</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton rows={5} cols={7} />
        ) : payments.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No payments found
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {payments.map((payment) => (
              <TableRow
                key={payment.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onRowClick(payment)}
              >
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">
                      {payment.premiumUser?.user.name ?? "—"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {payment.premiumUser?.user.email ?? payment.payerReference ?? "—"}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {payment.premiumUser?.package.name ?? "—"}
                </TableCell>
                <TableCell className="text-sm">
                  {payment.premiumUser?.area.name ?? "—"}
                </TableCell>
                <TableCell>৳{payment.amount}</TableCell>
                <TableCell>
                  <Badge className={statusColor[payment.status]}>
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground truncate max-w-32">
                  {payment.bkashPaymentId ?? "—"}
                </TableCell>
                <TableCell className="text-sm">
                  {format(new Date(payment.createdAt), "dd MMM yyyy")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}