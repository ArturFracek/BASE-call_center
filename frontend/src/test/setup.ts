import { config } from "@vue/test-utils";
import { createI18n } from "vue-i18n";
import { vi } from "vitest";
import en from "@/locales/en.json";
import pl from "@/locales/pl.json";

const storage: Record<string, string> = {};
const localStorageMock = {
  getItem: vi.fn((key: string) => storage[key] ?? null),
  setItem: vi.fn((key: string, value: string) => {
    storage[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete storage[key];
  }),
  clear: vi.fn(() => {
    Object.keys(storage).forEach((k) => delete storage[k]);
  }),
  length: 0,
  key: vi.fn(),
};
Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  writable: true,
});

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, pl },
});

config.global.plugins = [i18n];
