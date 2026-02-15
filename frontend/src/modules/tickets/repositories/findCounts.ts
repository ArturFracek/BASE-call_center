import { api } from "@api";
import { TICKETS_BASE } from "./base";

export interface TCountsByStatus {
  new: number;
  in_progress: number;
  closed: number;
  all: number;
}

export const findCountsPath = () => `${TICKETS_BASE}/counts`;

export const findCounts = () =>
  api.get<TCountsByStatus>(findCountsPath());