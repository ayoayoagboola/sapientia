"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { db } from "@/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { users } from "@/schema";

export const signup = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, firstName, lastName } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "Email is already in use!",
    };
  }

  let newUser;

  try {
    const insertedUser = await db
      .insert(users)
      .values({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      })
      .returning();
    newUser = insertedUser[0];
  } catch (error) {
    console.log("sign up failed");
  }

  if (!newUser) {
    return;
  }

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(
    verificationToken?.email as string,
    verificationToken?.token as string
  );

  return { success: "Confirmation email sent!" };
};
