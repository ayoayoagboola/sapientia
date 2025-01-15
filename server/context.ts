import { auth } from "@/auth";
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

// added req + res 

export async function createContext({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  const session = await auth();

  // You can access the authenticated user in the context if needed
  return {
    req,
    res,
    db, // Drizzle ORM connection
    session, // Auth session (contains user info)
    user: session?.user || null, // Add user info to context
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
