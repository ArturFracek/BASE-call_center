import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { DEFAULT_DB_NAME, ENV_KEYS } from "../constants.js";

const options = {
  max: 20,
  idle_timeout: 30,
  connect_timeout: 10,
};

const connectionUrl = process.env[ENV_KEYS.DATABASE_URL];
const sql = connectionUrl
  ? postgres(connectionUrl, options)
  : postgres({
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432", 10),
      database: process.env[ENV_KEYS.DB_NAME] || DEFAULT_DB_NAME,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || undefined,
      ssl: false,
      ...options,
    });

export const db = drizzle(sql);
