import { api } from "@api";
import type { ITicket, TFindAllTicketsParams } from "@/modules/tickets/types";
import { TICKETS_BASE } from "./base";

export const findAllPath = () => TICKETS_BASE;

export interface FindAllResponse {
  data: ITicket[];
  total: number;
}

export function findAll(params?: TFindAllTicketsParams) {
  return api.get<FindAllResponse>(findAllPath(), {
    params: params ?? undefined,
  });
}
