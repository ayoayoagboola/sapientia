CREATE TABLE IF NOT EXISTS "flashcardSet" (
	"id" uuid PRIMARY KEY NOT NULL,
	"dateAdded" timestamp DEFAULT now() NOT NULL,
	"userId" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flashcard" (
	"id" uuid PRIMARY KEY NOT NULL,
	"dateAdded" timestamp DEFAULT now() NOT NULL,
	"userId" uuid NOT NULL,
	"setId" uuid NOT NULL,
	"term" text NOT NULL,
	"definitions" text[] NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flashcardSet" ADD CONSTRAINT "flashcardSet_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flashcard" ADD CONSTRAINT "flashcard_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flashcard" ADD CONSTRAINT "flashcard_setId_flashcardSet_id_fk" FOREIGN KEY ("setId") REFERENCES "public"."flashcardSet"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
