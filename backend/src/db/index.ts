import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const options = {
  max: 20,
  idle_timeout: 30,
  connect_timeout: 10,
};

const sql = process.env.DATABASE_URL
  ? postgres(process.env.DATABASE_URL, options)
  : postgres({
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432", 10),
      database: process.env.DB_NAME || "call_center",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || undefined,
      ssl: false,
      ...options,
    });

export const db = drizzle(sql);
