import { SORT_ORDER, type TSortOrder } from "./constants";

const compareTwo = (a: unknown, b: unknown): number => {
  const aEmpty = a == null;
  const bEmpty = b == null;

  if (aEmpty && bEmpty) return 0;
  if (aEmpty) return 1;
  if (bEmpty) return -1;

  const strA = String(a);
  const strB = String(b);

  return strA.localeCompare(strB, undefined, { numeric: true });
};

export const sortRows = <T>(
  rows: T[],
  field: string | null | undefined,
  order: TSortOrder
): T[] => {
  if (!field) {
    return rows;
  }

  const direction = order === SORT_ORDER.ASC ? 1 : -1;
  const copy = [...rows];

  copy.sort((rowA, rowB) => {
    const valueA = (rowA as Record<string, unknown>)[field];
    const valueB = (rowB as Record<string, unknown>)[field];
    const comparison = compareTwo(valueA, valueB);

    return comparison * direction;
  });

  return copy;
};
