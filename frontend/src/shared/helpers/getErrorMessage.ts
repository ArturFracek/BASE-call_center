import { i18n } from "@/plugins/i18n";

export const getErrorMessage = (err: unknown, i18nKey: string): string => {
  if (err instanceof Error && err.message) return err.message;
  return i18n.global.t(i18nKey);
};
