import { DateTime } from "luxon";

export const formatDateTime = (iso: string, locale?: string): string => {
  const dt = DateTime.fromISO(iso, { setZone: true });

  if (!dt.isValid) {
    return iso;
  }

  const usedLocale =
    locale ??
    (typeof navigator !== "undefined" ? navigator.language : "en");

  return dt.setLocale(usedLocale).toLocaleString(DateTime.DATETIME_MED);
};
