"use client";

import { useGetMyPayments, useGetPaymentDetails } from "@/hooks";
import { useState } from "react";
import { IPayment } from "@/types";
import PaymentsTable from "@/components/modules/customer/payments-table";
import PaymentDetailModal from "@/components/modules/customer/payment-detail-modal";

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
        <p className="text-muted-foreground text-sm">Your payment history</p>
      </div>

      <PaymentsTable
        payments={payments}
        isLoading={isLoading}
        onRowClick={(id) => setSelectedId(id)}
      />

      <PaymentDetailModal
        selectedId={selectedId}
        detail={detail}
        isLoading={detailLoading}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}