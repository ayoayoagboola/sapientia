import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import { Context } from "./context";
import { db } from "@/db";

export const createTRPCContext = cache(async (opts: { headers: Headers }) => {
  return {
    db,
    ...opts,
  };
});

const t = initTRPC.context<Context>().create(); // initializing our trpc server

export const protectedProcedure = t.procedure.use(function isAuthed(opts) {
  if (!opts.ctx.session?.user?.id) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return opts.next({
    ctx: {
      // Infers the `session` as non-nullable
      session: opts.ctx.session,
      user: opts.ctx.session.user,
    },
  });
});

export const router = t.router; // getting the router
export const publicProcedure = t.procedure; // getting the public procedure
