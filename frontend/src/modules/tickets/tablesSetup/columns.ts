import type { DataTableColumnOpts } from "@/shared/components/data-table/types";

export const TICKET_TABLE_COLUMNS: DataTableColumnOpts[] = [
  { key: "id", header: "tickets.headers.id", sortable: true },
  { key: "customerName", header: "tickets.headers.customerName", sortable: true },
  {
    key: "subject",
    header: "tickets.headers.subject",
    sortable: true,
    cellClass: "max-w-[240px] truncate",
  },
  { key: "status", header: "tickets.headers.status" },
  { key: "priority", header: "tickets.headers.priority" },
];
