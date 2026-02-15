export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
} as const;

export type TSortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];

export const DATA_TABLE_SORT_I18N = {
  ARIA_ASC: "common.dataTable.sortAsc",
  ARIA_DESC: "common.dataTable.sortDesc",
  ARIA_NEUTRAL: "common.dataTable.sort",
} as const;
