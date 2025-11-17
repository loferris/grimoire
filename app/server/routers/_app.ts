import { router, publicProcedure, protectedProcedure } from '../trpc'
import { z } from 'zod'
import { db } from '@/db'
import { oracleCards } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'

export const appRouter = router({
  // Health check endpoint
  health: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date() }
  }),

  // Get user's oracle cards
  getCards: protectedProcedure.query(async ({ ctx }) => {
    const cards = await db
      .select()
      .from(oracleCards)
      .where(eq(oracleCards.userId, ctx.userId))
      .orderBy(oracleCards.createdAt)

    return {
      cards,
      count: cards.length,
    }
  }),

  // Create a new oracle card
  createCard: protectedProcedure
    .input(
      z.object({
        imageUrl: z.string().url(),
        caption: z.string().max(200),
        style: z.enum(['original', 'vibrant', 'classic', 'vintage']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [card] = await db
        .insert(oracleCards)
        .values({
          userId: ctx.userId,
          imageUrl: input.imageUrl,
          caption: input.caption,
          style: input.style,
          aiGenerated: false,
        })
        .returning()

      return card
    }),

  // Delete an oracle card
  deleteCard: protectedProcedure
    .input(z.object({ cardId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      // First check if the card exists and belongs to the user
      const card = await db
        .select()
        .from(oracleCards)
        .where(eq(oracleCards.id, input.cardId))
        .limit(1)

      if (card.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Card not found',
        })
      }

      if (card[0].userId !== ctx.userId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have permission to delete this card',
        })
      }

      await db
        .delete(oracleCards)
        .where(and(eq(oracleCards.id, input.cardId), eq(oracleCards.userId, ctx.userId)))

      return { success: true }
    }),
})

export type AppRouter = typeof appRouter
