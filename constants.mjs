/**
 * Wartości używane w skryptach i dokumentacji (README, DEPLOYMENT).
 * Backend i frontend mają własne pliki stałych z tymi samymi wartościami domyślnymi.
 */
export const API_PORT_DEFAULT = 3000;
export const FRONTEND_PORT_DEFAULT = 5173;
export const DB_NAME_DEFAULT = "call_center";

export const ENV_KEYS = {
  DATABASE_URL: "DATABASE_URL",
  VITE_API_URL: "VITE_API_URL",
  DB_NAME: "DB_NAME",
  PORT: "PORT",
};

export const PATH_BACKEND_ENV = "backend/.env";
export const PATH_FRONTEND_ENV = "frontend/.env";

export const DOCKER_START_CMD = "docker compose up --build";
export const TEST_CMD_WATCH = "npm run test";
export const TEST_CMD_RUN = "npm run test:run";
