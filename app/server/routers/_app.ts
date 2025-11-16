import { router, publicProcedure } from '../trpc'
import { z } from 'zod'

export const appRouter = router({
  // Health check endpoint
  health: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date() }
  }),

  // Example: Get user's oracle cards
  getCards: publicProcedure
    .input(z.object({ userId: z.string() }).optional())
    .query(async ({ input }) => {
      // TODO: Replace with actual database query
      return {
        cards: [],
        count: 0,
      }
    }),

  // Example: Create a new oracle card
  createCard: publicProcedure
    .input(
      z.object({
        imageUrl: z.string().url(),
        caption: z.string().max(200),
        style: z.enum(['original', 'vibrant', 'classic', 'vintage']).optional(),
      })
    )
    .mutation(async ({ input }) => {
      // TODO: Replace with actual database mutation
      return {
        id: crypto.randomUUID(),
        ...input,
        createdAt: new Date(),
      }
    }),
})

export type AppRouter = typeof appRouter
