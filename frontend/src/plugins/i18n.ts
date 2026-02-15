import { createI18n } from "vue-i18n";
import pl from "@/locales/pl.json";
import en from "@/locales/en.json";

export const LOCALE_STORAGE_KEY = "app-locale";

const supportedLocales = ["pl", "en"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

function getStoredLocale(): SupportedLocale | null {
  if (typeof document === "undefined") return null;
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored && supportedLocales.includes(stored as SupportedLocale)) {
    return stored as SupportedLocale;
  }
  return null;
}

export const i18n = createI18n({
  legacy: false,
  locale: getStoredLocale() ?? "pl",
  fallbackLocale: "en",
  messages: {
    pl,
    en,
  },
});

export const supportedLocalesList = supportedLocales;
