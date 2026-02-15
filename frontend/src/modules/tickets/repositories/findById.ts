import { api } from "@api";
import type { ITicket } from "@/modules/tickets/types";
import { TICKETS_BASE } from "./base";

export const findByIdPath = (id: number) => `${TICKETS_BASE}/${id}`;
export type FindByIdResponse = ITicket;

export function findById(id: number) {
  return api.get<FindByIdResponse>(findByIdPath(id));
}
