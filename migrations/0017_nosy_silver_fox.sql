ALTER TABLE "flashcardSet" ALTER COLUMN "userId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "flashcard" ALTER COLUMN "userId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "flashcardSet" ADD COLUMN "isCustom" boolean NOT NULL;