"use client";

import { useGetAllPayments } from "@/hooks";
import { useState } from "react";
import AdminPaymentsTable from "@/components/modules/admin/admin-payments-table";
import AdminPaymentDetailModal from "@/components/modules/admin/admin-payment-detail-modal";
import { IPayment } from "@/types";

export default function AdminPaymentsPage() {
  const [selectedPayment, setSelectedPayment] = useState<IPayment | null>(null);

  const { data, isLoading } = useGetAllPayments();
  const payments = (data?.data ?? []) as IPayment[];

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Payments</h1>
        <p className="text-muted-foreground text-sm">
          View all payment transactions — click a row for details
        </p>
      </div>

      <AdminPaymentsTable
        payments={payments}
        isLoading={isLoading}
        onRowClick={(payment) => setSelectedPayment(payment)}
      />

      <AdminPaymentDetailModal
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />
    </div>
  );
}