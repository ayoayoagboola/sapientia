import { twoFactorConfirmations } from "@/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    // const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
    //     where: { userId }
    // });

    await db
      .select()
      .from(twoFactorConfirmations)
      .where(eq(twoFactorConfirmations.userId, userId));

    const twoFactorConfirmation =
      await db.query.twoFactorConfirmations.findFirst({
        where: eq(twoFactorConfirmations.userId, userId),
      });

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
