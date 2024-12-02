// index.ts - for all of our procedures
import { userRouter } from "./routers/users";
import { wordRouter } from "./routers/words";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  // creating an instance of an app router
  getTodos: publicProcedure.query(async () => {
    // example function
    return [10, 20, 30];
  }),
  words: wordRouter,
  users: userRouter,
});

export type AppRouter = typeof appRouter;
