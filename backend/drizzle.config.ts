import { defineConfig } from "drizzle-kit";
import { DEFAULT_DB_NAME, ENV_KEYS } from "./src/constants.js";

const connectionString = process.env[ENV_KEYS.DATABASE_URL];

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/**/dbSchema/*.ts",
  out: "./drizzle",
  dbCredentials: connectionString
    ? { url: connectionString }
    : {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "5432", 10),
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || undefined,
        database: process.env[ENV_KEYS.DB_NAME] || DEFAULT_DB_NAME,
        ssl: false,
      },
});
