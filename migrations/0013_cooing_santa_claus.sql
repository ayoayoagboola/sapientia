ALTER TABLE "flashcardSet" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "flashcard" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();