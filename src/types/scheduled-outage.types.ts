/** biome-ignore-all lint/style/useImportType: <explanation> */
import { IArea } from "./area.types";

export type ScheduledOutageStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";

export interface IScheduledOutage {
  id: string;
  reason: string;
  startTime: string;
  endTime: string;
  status: ScheduledOutageStatus;
  areaId: string;
  technicianId: string;
  createdAt: string;
  updatedAt: string;
  area: IArea;
}

export interface CreateScheduledOutagePayload {
  reason: string;
  startTime: string;
  endTime: string;
  areaId: string;
  technicianId: string;
}

export interface UpdateScheduledOutagePayload {
  reason?: string;
  startTime?: string;
  endTime?: string;
  technicianId?: string;
  status?: "CANCELLED";
}