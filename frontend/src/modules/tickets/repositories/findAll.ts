import { api } from "@api";
import type { ITicket, IFindAllTicketsParams } from "@/modules/tickets/types";
import { TICKETS_BASE } from "./base";

export const findAllPath = () => TICKETS_BASE;

export interface IFindAllResponse {
  data: ITicket[];
  total: number;
}

export const findAll = (params?: IFindAllTicketsParams) =>
  api.get<IFindAllResponse>(findAllPath(), {
    params: params ?? undefined,
  });
