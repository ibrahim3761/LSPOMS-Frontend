import { IMeta } from "./common.types";

export interface IArea {
  id: string;
  name: string;
  district: string;
  city: string;
}

export interface IAreaResponse {
  data: IArea[];
  meta: IMeta;
}