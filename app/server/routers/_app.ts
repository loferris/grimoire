import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { db } from '@/db'
import { oracleCards } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const appRouter = router({
  // Health check endpoint
  health: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date() }
  }),

  // Get user's oracle cards
  getCards: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const cards = await db
        .select()
        .from(oracleCards)
        .where(eq(oracleCards.userId, input.userId))
        .orderBy(oracleCards.createdAt)

      return {
        cards,
        count: cards.length,
      }
    }),

  // Create a new oracle card
  createCard: publicProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        imageUrl: z.string().url(),
        caption: z.string().max(200),
        style: z.enum(['original', 'vibrant', 'classic', 'vintage']),
      })
    )
    .mutation(async ({ input }) => {
      const [card] = await db
        .insert(oracleCards)
        .values({
          userId: input.userId,
          imageUrl: input.imageUrl,
          caption: input.caption,
          style: input.style,
          aiGenerated: false,
        })
        .returning()

      return card
    }),
})

export type AppRouter = typeof appRouter
