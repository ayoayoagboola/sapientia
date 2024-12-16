import { z, ZodType } from "zod";

// auth

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

// words

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

// charts

export const ChartFormSchema = z.object({
  cells: z.array(
    z.object({
      id: z.string(),
      userInput: z.string().min(1, "This field cannot be empty!"),
      correctAnswer: z.string(),
    })
  ),
});

export const SynopsisPreChartFormSchema = z.object({
  person: z.enum(["first", "second", "third"], {
    required_error: "Person is required",
  }),
  number: z.enum(["singular", "plural"], {
    required_error: "Number is required",
  }),
  lemma: z.string({ required_error: "Lemma is required" }),
  mood: z.enum(
    ["indicative", "subjunctive", "participles", "infinitives", "imperatives"],
    {
      required_error: "Mood is required",
    }
  ),
});

export const DeclinationPreChartFormSchema = z.object({
  lemma: z.string({ required_error: "Lemma is required" }),
});

export const SynopsisChartSchema = z.object({
  charts: z.array(
    z.object({
      person: z.enum(["first", "second", "third"]),
      number: z.enum(["singular", "plural"]),
      lemma: z.string().min(1, "Lemma is required"), // Example required field
      mood: z.enum([
        "indicative",
        "subjunctive",
        "participles",
        "infinitives",
        "imperatives",
      ]),
      responses: z.array(
        z.object({
          tense: z.string(),
          active: z.string().optional(),
          passive: z.string().optional(),
          correct: z
            .object({
              active: z.string().optional(),
              passive: z.string().optional(),
            })
            .optional(),
        })
      ),
    })
  ),
});

export const DeclinationChartSchema = z.object({
  charts: z.array(
    z.object({
      lemma: z.string().min(1, "Lemma is required"), // Example required field
      responses: z.array(
        z.object({
          form: z.string(),
          singular: z.string().optional(),
          plural: z.string().optional(),
          correct: z
            .object({
              singular: z.string().optional(),
              plural: z.string().optional(),
            })
            .optional(),
        })
      ),
    })
  ),
});

// flashcards

export const CreateFlashCardSetSchema = z.object({
  title: z.string().min(1, "A title is required!"),
  description: z.optional(z.string()),
  cards: z.array(
    z.object({
      term: z.string().min(1, "A term is required!"),
      definitions: z.string().min(1, "adfadsf"),
    })
  ),
});

export const CreateFlashCardSchema = z.object({
  term: z.string().min(1, "A term is required!"),
  definitions: z.string().min(1, "asdfadsfasdf"),
});
