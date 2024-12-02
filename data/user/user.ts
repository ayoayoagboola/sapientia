import { users } from "@/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id?: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id as string),
    });
    return user;
  } catch {
    return null;
  }
};
