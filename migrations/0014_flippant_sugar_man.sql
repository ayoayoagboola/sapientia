ALTER TABLE "flashcardSet" DROP CONSTRAINT "flashcardSet_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "flashcard" DROP CONSTRAINT "flashcard_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "flashcard" DROP CONSTRAINT "flashcard_setId_flashcardSet_id_fk";
--> statement-breakpoint
ALTER TABLE "flashcardSet" ADD CONSTRAINT "flashcardSet_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flashcard" ADD CONSTRAINT "flashcard_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flashcard" ADD CONSTRAINT "flashcard_setId_flashcardSet_id_fk" FOREIGN KEY ("setId") REFERENCES "public"."flashcardSet"("id") ON DELETE cascade ON UPDATE no action;