export type PaymentStatus = "PAID" | "PENDING" | "FAILED" | "CANCELLED";

export interface IPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  durationDays: number;
}

export interface IPremiumUser {
  id: string;
  status: string;
  startDate: string;
  expiresAt: string;
  package: IPackage;
  area: {
    id: string;
    name: string;
    district: string;
    city: string;
  };
}

export interface IPayment {
  id: string;
  amount: number;
  status: PaymentStatus;
  bkashPaymentId: string | null;
  bkashTrxId: string | null;
  payerReference: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  premiumUser: IPremiumUser;
}