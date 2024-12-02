ALTER TABLE "wordForm" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "wordForm" ADD COLUMN "wordId" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "word" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wordForm" ADD CONSTRAINT "wordForm_wordId_word_id_fk" FOREIGN KEY ("wordId") REFERENCES "public"."word"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
