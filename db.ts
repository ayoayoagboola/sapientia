import * as schema from "./schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL!;

const client = new Pool({ connectionString });
export const db = drizzle(client, { schema });
