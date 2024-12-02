CREATE TABLE IF NOT EXISTS "wordForm" (
	"id" integer PRIMARY KEY NOT NULL,
	"wordId" integer NOT NULL,
	"dateAdded" timestamp DEFAULT now() NOT NULL,
	"lemma" text NOT NULL,
	"form" text NOT NULL,
	"pos" text,
	"person" text,
	"number" text,
	"tense" text,
	"mood" text,
	"voice" text,
	"gender" text,
	"case" text,
	"degree" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "word" (
	"id" integer PRIMARY KEY NOT NULL,
	"dateAdded" timestamp DEFAULT now() NOT NULL,
	"lemma" text NOT NULL,
	"declension" text,
	"conjugation" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wordForm" ADD CONSTRAINT "wordForm_wordId_word_id_fk" FOREIGN KEY ("wordId") REFERENCES "public"."word"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
