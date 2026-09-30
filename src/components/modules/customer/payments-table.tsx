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
    CANCELLED: "bg-gray-500 hover:bg-gray-600",
};

interface Props {
    payments: IPayment[];
    isLoading: boolean;
    onRowClick: (id: string) => void;
}

export default function PaymentsTable({
    payments,
    isLoading,
    onRowClick,
}: Props) {
    return (
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
                {isLoading ? (
                    <TableSkeleton rows={3} cols={5} />
                ) : payments.length === 0 ? (
                    <TableBody>
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="text-center py-8 text-muted-foreground"
                            >
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
                                onClick={() => onRowClick(payment.id)}
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
                        ))}
                    </TableBody>
                )}
            </Table>
        </div>
    );
}