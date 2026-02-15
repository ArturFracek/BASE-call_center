import { useI18n } from "vue-i18n";
import type { SupportedLocale } from "@/plugins/i18n";
import { supportedLocalesList } from "@/plugins/i18n";

export const useLocale = () => {
  const { locale } = useI18n();

  const setLocale = (newLocale: SupportedLocale): void => {
    locale.value = newLocale;
  };

  return {
    locale,
    setLocale,
    supportedLocales: supportedLocalesList,
  };
};
