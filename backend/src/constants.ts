/**
 * Wartości domyślne i klucze env. Spójne z root constants.mjs.
 */
export const DEFAULT_PORT = 3000;
export const DEFAULT_DB_NAME = "call_center";

export const ENV_KEYS = {
  DATABASE_URL: "DATABASE_URL",
  DB_NAME: "DB_NAME",
  PORT: "PORT",
} as const;
