import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  serial,
  integer, 
  uuid,
  AnyPgColumn,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters";

// user + account stuff

export const users = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  firstName: text("firstName"),
  lastName: text("lastName"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified"),
  image: text("image"),
  password: text("password"),
  isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false),
});

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references((): AnyPgColumn => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable("verificationToken", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const passwordResetTokens = pgTable("passwordResetToken", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  token: text("token").unique().notNull(),
  expires: timestamp("expires").notNull(),
});

export const twoFactorTokens = pgTable("twoFactorToken", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  token: text("token").unique().notNull(),
  expires: timestamp("expires").notNull(),
});

export const twoFactorConfirmations = pgTable("twoFactorConfirmation", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("userId")
    .references((): AnyPgColumn => users.id, { onDelete: "cascade" })
    .notNull(),
});

// the good stuff

export const words = pgTable("word", {
  id: serial("id").primaryKey(),
  dateAdded: timestamp("dateAdded").defaultNow().notNull(),
  word: text("lemma").notNull(), 
  declension: text("declension"),
  conjugation: text("conjugation"),
});

export const wordForms = pgTable("wordForm", {
  id: serial("id").primaryKey(),
  wordId: serial("wordId")
    .references((): AnyPgColumn => words.id, { onDelete: "cascade" })
    .notNull(),
  dateAdded: timestamp("dateAdded").defaultNow().notNull(),
  lemma: text("lemma").notNull(), 
  form: text("form").notNull(), 
  pos: text("pos"), 
  person: text("person"), 
  number: text("number"), 
  tense: text("tense"), 
  mood: text("mood"),
  voice: text("voice"),
  gender: text("gender"),
  case: text("case"),
  degree: text("degree"),
});

// relations

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const twoFactorConfirmationRelations = relations(
  twoFactorConfirmations,
  ({ one }) => ({
    user: one(users, {
      fields: [twoFactorConfirmations.userId],
      references: [users.id],
    }),
  })
);

export const wordFormRelations = relations(wordForms, ({ one }) => ({
  word: one(words, {
    fields: [wordForms.wordId],
    references: [words.id],
  }),
}));
