import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { Session } from 'next-auth'

export type Context = {
  session: Session | null
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure

// Protected procedure that requires authentication
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user?.id) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      ...ctx,
      userId: ctx.session.user.id,
    },
  })
})
