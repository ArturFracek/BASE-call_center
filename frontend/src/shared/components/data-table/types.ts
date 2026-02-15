import type { SortOrder } from "./constants";

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
  sortOrder?: SortOrder;
  emptyText?: string;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    activeFilterLabel?: string;
  };
}

export interface DataTableSortPayload {
  field: string;
  order: SortOrder;
}
