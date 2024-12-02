import { z, ZodType } from "zod";

type LoginData = {
  email: string;
  password: string;
  code?: string;
};
type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const LoginSchema: ZodType<LoginData> = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema: ZodType<RegisterData> = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "A minimum of 8 characters is required",
  }),
});

export const WordFormSchema = z.object({
  pos: z.optional(z.string()),
  person: z.optional(z.string()),
  number: z.optional(z.string()),
  tense: z.optional(z.string()),
  mood: z.optional(z.string()),
  voice: z.optional(z.string()),
  gender: z.optional(z.string()),
  case: z.optional(z.string()),
  degree: z.optional(z.string()),
});
