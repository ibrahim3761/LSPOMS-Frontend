"use client";

import { useGetMyPayments, useGetPaymentDetails } from "@/hooks";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { IPayment } from "@/types";
import PaymentsTable from "@/components/modules/customer/payments-table";
import PaymentDetailModal from "@/components/modules/customer/payment-detail-modal";
import { toast } from "@/components/ui/toast";

export default function PaymentsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const { data, isLoading } = useGetMyPayments();
  const { data: detailData, isLoading: detailLoading } = useGetPaymentDetails(
    selectedId ?? ""
  );

  const payments = (data?.data ?? []) as IPayment[];
  const detail = detailData?.data as IPayment | undefined;

  // handle bKash callback status
  useEffect(() => {
    const status = searchParams.get("status");
    if (!status) return;

    if (status === "success") {
      toast.add({
        title: "Payment Successful 🎉",
        description: "Your premium subscription is now active. Check your email for the invoice.",
        type: "success",
      });
    } else if (status === "failure") {
      toast.add({
        title: "Payment Failed",
        description: "Your payment could not be processed. Please try again.",
        type: "error",
      });
    } else if (status === "cancel") {
      toast.add({
        title: "Payment Cancelled",
        description: "You cancelled the payment.",
        type: "error",
      });
    }
  }, [searchParams]);

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