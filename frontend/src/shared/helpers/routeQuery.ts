import type { RouteLocationNormalizedLoaded } from "vue-router";

export const getQueryString = (
  route: RouteLocationNormalizedLoaded,
  key: string
): string | null => {
  const raw = route.query[key];
  return typeof raw === "string" && raw.length > 0 ? raw : null;
};
