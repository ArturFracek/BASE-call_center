import { computed, type Ref } from "vue";
import type { IDataTableColumnOpts, IDataTableOpts } from "./types";
import type { TSortOrder } from "./constants";

export interface IUseDataTablePagination {
  page: Ref<number>;
  pageSize: number;
  total: Ref<number>;
  getActiveFilterLabel?: () => string;
}

export interface IUseDataTableDeps<T> {
  columns: IDataTableColumnOpts[];
  data: Ref<T[]>;
  rowKey?: string;
  selectable?: boolean;
  sortField: Ref<string | null>;
  sortOrder: Ref<TSortOrder>;
  emptyText?: string;
  pagination?: IUseDataTablePagination;
}

export const useDataTable = <T>(deps: IUseDataTableDeps<T>) => {
  const tableOpts = computed<IDataTableOpts<T>>(() => {
    const base: IDataTableOpts<T> = {
      columns: deps.columns,
      data: deps.data.value,
      rowKey: deps.rowKey ?? "id",
      selectable: deps.selectable ?? false,
      sortField: deps.sortField.value,
      sortOrder: deps.sortOrder.value,
      emptyText: deps.emptyText,
    };

    if (
      deps.pagination &&
      deps.pagination.total.value > 0
    ) {
      base.pagination = {
        page: deps.pagination.page.value,
        pageSize: deps.pagination.pageSize,
        total: deps.pagination.total.value,
        activeFilterLabel: deps.pagination.getActiveFilterLabel?.(),
      };
    }

    return base;
  });

  return { tableOpts };
};
