import { computed, type Ref } from "vue";
import type { DataTableColumnOpts, DataTableOpts } from "./types";
import type { SortOrder } from "./constants";

export interface UseDataTablePagination {
  page: Ref<number>;
  pageSize: number;
  total: Ref<number>;
  getActiveFilterLabel?: () => string;
}

export interface UseDataTableDeps<T> {
  columns: DataTableColumnOpts[];
  data: Ref<T[]>;
  rowKey?: string;
  selectable?: boolean;
  sortField: Ref<string | null>;
  sortOrder: Ref<SortOrder>;
  emptyText?: string;
  pagination?: UseDataTablePagination;
}

export const useDataTable = <T>(deps: UseDataTableDeps<T>) => {
  const tableOpts = computed<DataTableOpts<T>>(() => {
    const base: DataTableOpts<T> = {
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
