export interface DataTableColumnOpts {
  key: string;
  header: string;
  sortable?: boolean;
  cellClass?: string;
  cellSlot?: string;
}

export interface DataTableOpts<T = unknown> {
  columns: DataTableColumnOpts[];
  data: T[];
  rowKey?: string;
  selectable?: boolean;
  sortField?: string | null;
  sortOrder?: "asc" | "desc";
  emptyText?: string;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    activeFilterLabel?: string;
  };
}

export type DataTableSortPayload = { field: string; order: "asc" | "desc" };
