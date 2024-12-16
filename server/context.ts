import { auth } from "@/auth";
import { db } from "@/db";

export async function createContext() {
  const session = await auth();

  // You can access the authenticated user in the context if needed
  return {
    db, // Drizzle ORM connection
    session, // Auth session (contains user info)
    user: session?.user || null, // Add user info to context
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
