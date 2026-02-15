import { api } from "@api";
import type { ITicket } from "@/modules/tickets/types";
import { TICKETS_BASE } from "./base";

export const findByIdPath = (id: number) => `${TICKETS_BASE}/${id}`;
export type TFindByIdResponse = ITicket;

export const findById = (id: number) =>
  api.get<TFindByIdResponse>(findByIdPath(id));
