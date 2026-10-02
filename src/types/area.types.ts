import { IMeta } from "./common.types";

export interface IArea {
  id: string;
  name: string;
  district: string;
  city: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAreaResponse {
  data: IArea[];
  meta: IMeta;
}

export interface CreateAreaPayload {
  name: string;
  district: string;
  city: string;
}

export interface UpdateAreaPayload {
  name?: string;
  district?: string;
  city?: string;
}