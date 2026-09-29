export type UserRole = "SUPER_ADMIN" | "ADMIN" | "TECHNICIAN" | "CUSTOMER";

export interface UpdateMyProfilePayload {
  name?: string;
  contactNumber?: string;
  address?: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED"

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  profileImage?: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  customer?: {
    contactNumber?: string;
    address?: string;
  };
  technician?: {
    contactNumber?: string;
    address?: string;
    bio?: string;
    experienceYears?: number;
  };
}