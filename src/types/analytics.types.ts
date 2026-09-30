import { IPremiumUser } from "./payment.types";


export interface ICustomerAnalytics {
  outages: {
    total: number;
    reported: number;
    assigned: number;
    inProgress: number;
    resolved: number;
  };
  subscriptions: {
    active: IPremiumUser[];
    totalExpired: number;
    totalCancelled: number;
  };
  payments: {
    totalAmountSpent: number;
    totalPaidPayments: number;
  };
}