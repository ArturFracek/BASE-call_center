/**
 * Porównuje dwie wartości do sortowania.
 * Wartości null/undefined traktowane jako "na końcu" przy asc, "na początku" przy desc.
 */
function compareValues(a: unknown, b: unknown): number {
  const aIsEmpty = a == null;
  const bIsEmpty = b == null;

  if (aIsEmpty && bIsEmpty) return 0;
  if (aIsEmpty) return 1;
  if (bIsEmpty) return -1;

  const strA = String(a);
  const strB = String(b);
  return strA.localeCompare(strB, undefined, { numeric: true });
}

/**
 * Zwraca kopię tablicy wierszy posortowaną po zadanym polu i kierunku.
 * Dane wejściowe nie są mutowane.
 */
export function sortRows<T>(
  rows: T[],
  field: string | null | undefined,
  order: "asc" | "desc"
): T[] {
  if (!field) return rows;

  const direction = order === "asc" ? 1 : -1;

  return [...rows].sort((rowA, rowB) => {
    const recordA = rowA as Record<string, unknown>;
    const recordB = rowB as Record<string, unknown>;
    const valueA = recordA[field];
    const valueB = recordB[field];
    const comparison = compareValues(valueA, valueB);
    return comparison * direction;
  });
}
