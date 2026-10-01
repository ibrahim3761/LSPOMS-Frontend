import { IArea } from "./area.types";


export type OutageStatus = "REPORTED" | "ASSIGNED" | "IN_PROGRESS" | "RESOLVED";

export interface ITechnician {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  experienceYears: number;
}

export interface IReporter {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
}

export interface IUnexpectedOutage {
  id: string;
  description: string;
  status: OutageStatus;
  note: string | null;
  resolvedAt: string | null;
  reporterId: string;
  technicianId: string | null;
  areaId: string;
  createdAt: string;
  updatedAt: string;
  area: IArea;
  technician: ITechnician | null;
  reporter?: IReporter;
}

export interface ReportOutagePayload {
  areaId: string;
  description: string;
}