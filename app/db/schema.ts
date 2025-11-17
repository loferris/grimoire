import { pgTable, uuid, text, timestamp, boolean, jsonb, primaryKey, integer, index } from 'drizzle-orm/pg-core'
import type { AdapterAccountType } from 'next-auth/adapters'

// NextAuth required tables
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
})

export const accounts = pgTable(
  'accounts',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = pgTable('sessions', {
  sessionToken: text('session_token').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgTable(
  'verification_tokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)

export const oracleCards = pgTable('oracle_cards', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  // Image data
  imageUrl: text('image_url').notNull(),
  thumbnailUrl: text('thumbnail_url'),

  // Card content
  caption: text('caption'),
  style: text('style'), // 'original', 'vibrant', 'classic', 'vintage', etc.

  // AI metadata
  aiGenerated: boolean('ai_generated').default(false).notNull(),
  aiPrompt: text('ai_prompt'), // Original prompt if AI-generated

  // Image processing metadata (Imgix, Cloudinary params, etc.)
  processingParams: jsonb('processing_params'),

  // Tags and search
  tags: jsonb('tags').$type<string[]>(),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
}, (table) => ({
  // Index on userId for efficient queries by user
  userIdIdx: index('oracle_cards_user_id_idx').on(table.userId),
  // GIN index on tags JSONB for efficient tag searches
  tagsIdx: index('oracle_cards_tags_idx').using('gin', table.tags),
}))

// Type exports for TypeScript
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Account = typeof accounts.$inferSelect
export type NewAccount = typeof accounts.$inferInsert
export type Session = typeof sessions.$inferSelect
export type NewSession = typeof sessions.$inferInsert
export type OracleCard = typeof oracleCards.$inferSelect
export type NewOracleCard = typeof oracleCards.$inferInsert
