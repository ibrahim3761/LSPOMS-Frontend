import { IArea } from "./area.types";
import { IPackage } from "./payment.types";


export interface IAdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  emailVerified: boolean;
  authProvider: string;
  imageUrl: string;
  needPasswordChange: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminTechnician {
  id: string;
  name: string;
  email: string;
  address: string;
  experienceYears: number;
  bio: string | null;
  contactNumber: string;
  verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
  rejectionReason: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  resume: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: IAdminUser;
}

export interface IAdminAnalytics {
  users: {
    totalUsers: number;
    totalCustomers: number;
    totalTechnicians: number;
    totalPendingTechnicians: number;
    totalBlockedUsers: number;
  };
  unexpectedOutages: {
    total: number;
    reported: number;
    assigned: number;
    inProgress: number;
    resolved: number;
  };
  scheduledOutages: {
    total: number;
    upcoming: number;
    ongoing: number;
    completed: number;
    cancelled: number;
  };
  premium: {
    totalActivePremiumUsers: number;
    totalExpiredPremiumUsers: number;
  };
  revenue: {
    totalRevenue: number;
    totalPaidPayments: number;
  };
  mostPopularPackage: IPackage & {
    _count: { premiumUsers: number };
  };
  mostAffectedArea: IArea & {
    _count: { unexpectedOutages: number };
  };
}

export interface ApproveTechnicianPayload {
  technicianId: string;
  verificationStatus: "APPROVED" | "REJECTED";
  rejectionReason?: string;
}

export interface ChangeUserStatusPayload {
  status: "ACTIVE" | "BLOCKED";
}