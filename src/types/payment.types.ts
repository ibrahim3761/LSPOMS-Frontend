import { IArea } from "./area.types";
import { IPackage } from "./package.types";

export type PaymentStatus = "PAID" | "PENDING" | "FAILED" | "CANCELLED";



export interface IPremiumUser {
  id: string;
  status: string;
  startDate: string;
  expiresAt: string;
  package: IPackage;
  area: IArea;
  user: {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
  };
}

export interface IPayment {
  id: string;
  amount: number;
  status: PaymentStatus;
  bkashPaymentId: string | null;
  bkashTrxId: string | null;
  merchantInvoiceNumber: string | null;
  payerReference: string | null;
  paidAt: string | null;
  gatewayResponse: Record<string, string> | null;
  premiumUserId: string | null;
  createdAt: string;
  updatedAt: string;
  premiumUser: IPremiumUser | null;
}