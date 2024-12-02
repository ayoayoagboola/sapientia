ALTER TABLE "wordForm" DROP CONSTRAINT "wordForm_wordId_word_id_fk";
--> statement-breakpoint
ALTER TABLE "wordForm" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "wordForm" DROP COLUMN IF EXISTS "wordId";--> statement-breakpoint
ALTER TABLE "word" DROP COLUMN IF EXISTS "id";