import { formatDateTime } from "@/shared/helpers/formatDateTime";
import type { ITicket } from "@/modules/tickets/types";

export interface ITicketDetailFieldDef {
  fieldKey: string;
  labelKey: string;
  getValue: (t: ITicket, tFn: (key: string) => string) => string;
  contentClass?: string;
  fullWidth?: boolean;
}

export const TICKET_DETAIL_FIELD_DEFS: ITicketDetailFieldDef[] = [
  {
    fieldKey: "id",
    labelKey: "tickets.headers.id",
    getValue: (t) => String(t.id),
  },
  {
    fieldKey: "customerName",
    labelKey: "tickets.headers.customerName",
    getValue: (t) => t.customerName,
  },
  {
    fieldKey: "subject",
    labelKey: "tickets.headers.subject",
    getValue: (t) => t.subject,
    fullWidth: true,
  },
  {
    fieldKey: "description",
    labelKey: "tickets.headers.description",
    getValue: (t) => t.description,
    contentClass: "whitespace-pre-wrap",
    fullWidth: true,
  },
  {
    fieldKey: "priority",
    labelKey: "tickets.headers.priority",
    getValue: (t, tFn) => tFn("tickets.priority." + t.priority),
  },
  {
    fieldKey: "createdAt",
    labelKey: "tickets.headers.createdAt",
    getValue: (t) => formatDateTime(t.createdAt),
  },
];
