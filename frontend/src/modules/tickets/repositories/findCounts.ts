import { api } from "@api";
import { TICKETS_BASE } from "./base";

export interface ICountsByStatus {
  new: number;
  in_progress: number;
  closed: number;
  all: number;
}

export const findCountsPath = () => `${TICKETS_BASE}/counts`;

export const findCounts = () =>
  api.get<ICountsByStatus>(findCountsPath());