import type { TSortOrder } from "./constants";

export interface IDataTableColumnOpts {
  key: string;
  header: string;
  sortable?: boolean;
  cellClass?: string;
  cellSlot?: string;
}

export interface IDataTableOpts<T = unknown> {
  columns: IDataTableColumnOpts[];
  data: T[];
  rowKey?: string;
  selectable?: boolean;
  sortField?: string | null;
  sortOrder?: TSortOrder;
  emptyText?: string;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    activeFilterLabel?: string;
  };
}

export interface IDataTableSortPayload {
  field: string;
  order: TSortOrder;
}
