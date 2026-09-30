/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { IPayment, PaymentStatus } from "@/types";
import { format } from "date-fns";

const statusColor: Record<PaymentStatus, string> = {
    PAID: "bg-green-500 hover:bg-green-600",
    PENDING: "bg-yellow-500 hover:bg-yellow-600",
    FAILED: "bg-red-500 hover:bg-red-600",
    CANCELLED: "bg-gray-500 hover:bg-gray-600",
};

interface Props {
    selectedId: string | null;
    detail: IPayment | undefined;
    isLoading: boolean;
    onClose: () => void;
}

export default function PaymentDetailModal({
    selectedId,
    detail,
    isLoading,
    onClose,
}: Props) {
    return (
        <Dialog open={!!selectedId} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Payment Details</DialogTitle>
                </DialogHeader>
                {isLoading ? (
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
                            value={format(new Date(detail.premiumUser.startDate), "dd MMM yyyy")}
                        />
                        <DetailRow
                            label="Subscription Expires"
                            value={format(new Date(detail.premiumUser.expiresAt), "dd MMM yyyy")}
                        />
                        <DetailRow
                            label="Created At"
                            value={format(new Date(detail.createdAt), "dd MMM yyyy, hh:mm a")}
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