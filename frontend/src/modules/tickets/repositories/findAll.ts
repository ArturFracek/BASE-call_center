import { api } from "@api";
import type { ITicket, TFindAllTicketsParams } from "@/modules/tickets/types";
import { TICKETS_BASE } from "./base";

export const findAllPath = () => TICKETS_BASE;

export interface FindAllResponse {
  data: ITicket[];
  total: number;
}

export const findAll = (params?: TFindAllTicketsParams) =>
  api.get<FindAllResponse>(findAllPath(), {
    params: params ?? undefined,
  });
