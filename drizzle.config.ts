import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

export default defineConfig({
  schema: "./schema.ts",
  dialect: "postgresql",
  out: "./migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
    database: "postgres",
    port: 5432,
    host: "aws-0-us-west-1.pooler.supabase.com",
    user: "postgres.mbwxgztbfdbpxfasqygv",
    password: process.env.PW || "",
  },
});
