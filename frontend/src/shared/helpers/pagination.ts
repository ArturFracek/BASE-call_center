export interface IPaginationRange {
  first: number;
  last: number;
}

export const getPaginationRange = (
  page: number,
  pageSize: number,
  total: number
): IPaginationRange => {
  if (total === 0) {
    return { first: 0, last: 0 };
  }
  const first = (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, total);
  return { first, last };
};
