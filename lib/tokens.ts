import { getVerificationTokenByEmail } from "@/data/user/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/user/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/user/two-factor-token";

import { v4 as uuidv4 } from "uuid";

import { db } from "../db";
import {
  passwordResetTokens,
  twoFactorTokens,
  verificationTokens,
} from "@/schema";
import { and, eq } from "drizzle-orm";

export const generateTwoFactorToken = async (email: string) => {
  const token = uuidv4();
  // change to 15 mins
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(twoFactorTokens)
      .where(eq(twoFactorTokens.id, existingToken.id));
  }

  await db.insert(twoFactorTokens).values({
    email,
    token,
    expires,
  });

  const twoFactorToken = await db.query.twoFactorTokens.findFirst({
    where: eq(twoFactorTokens.email, email),
  });

  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.id, existingToken.id));
  }

  await db.insert(passwordResetTokens).values({
    email,
    token,
    expires,
  });

  const passwordResetToken = await db.query.passwordResetTokens.findFirst({
    where: eq(passwordResetTokens.email, email),
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.id, existingToken.id));
  }

  await db.insert(verificationTokens).values({
    email,
    token,
    expires,
  });

  const verificationToken = db.query.verificationTokens.findFirst({
    where: and(
      eq(verificationTokens.email, email),
      eq(verificationTokens.token, token),
      eq(verificationTokens.expires, expires)
    ),
  });

  return verificationToken;
};
