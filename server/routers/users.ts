import { z } from "zod";

import { protectedProcedure, router } from "@/server/trpc";
import { getUserById } from "@/db/queries";

export const userRouter = router({
  getUserById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const user = await getUserById(input.id);
      return user;
    }),
});
