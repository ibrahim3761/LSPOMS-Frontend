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