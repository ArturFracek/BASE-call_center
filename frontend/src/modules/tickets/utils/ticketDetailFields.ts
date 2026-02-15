import { TICKET_DETAIL_FIELD_DEFS } from "@/modules/tickets/config/ticketDetailFieldsConfig";
import type { ITicket } from "@/modules/tickets/types";

export interface ITicketDetailFieldItem {
  fieldKey: string;
  labelKey: string;
  label: string;
  value: string;
  contentClass?: string;
  fullWidth?: boolean;
}

export const getDetailFieldsForTicket = (
  ticket: ITicket | null,
  t: (key: string) => string
): ITicketDetailFieldItem[] => {
  if (!ticket) return [];

  return TICKET_DETAIL_FIELD_DEFS.map(
    ({ fieldKey, labelKey, getValue, contentClass, fullWidth }) => ({
      fieldKey,
      labelKey,
      label: t(labelKey),
      value: getValue(ticket, t),
      contentClass,
      fullWidth,
    })
  );
};
