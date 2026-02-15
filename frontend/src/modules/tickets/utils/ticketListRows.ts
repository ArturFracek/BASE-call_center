import type { ITicket } from "@/modules/tickets/types";

export interface ITicketListRow {
  id: string;
  tickets: ITicket[];
}

export const ticketsToRows = (tickets: ITicket[]): ITicketListRow[] => {
  const rows: ITicketListRow[] = [];

  for (let i = 0; i < tickets.length; i += 2) {
    const first = tickets[i];
    const second = tickets[i + 1];

    if (first == null) continue;

    const rowTickets: ITicket[] = second != null ? [first, second] : [first];
    const rowId = second != null ? `row-${first.id}-${second.id}` : `row-${first.id}`;

    rows.push({ id: rowId, tickets: rowTickets });
  }

  return rows;
};
