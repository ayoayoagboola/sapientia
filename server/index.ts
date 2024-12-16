// index.ts - for all of our procedures
import { flashCardRouter } from "./routers/flashcards";
import { textRouter } from "./routers/text";
import { userRouter } from "./routers/users";
import { wordRouter } from "./routers/words";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  // creating an instance of an app router
  words: wordRouter,
  users: userRouter,
  texts: textRouter,
  flashcards: flashCardRouter,
});

export type AppRouter = typeof appRouter;
