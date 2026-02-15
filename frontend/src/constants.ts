/**
 * Wartości domyślne i klucze env. Spójne z root constants.mjs.
 */
export const DEFAULT_API_PORT = 3000;
export const DEFAULT_API_BASE_URL = `http://localhost:${DEFAULT_API_PORT}`;

export const ENV_KEYS = {
  VITE_API_URL: "VITE_API_URL",
} as const;
