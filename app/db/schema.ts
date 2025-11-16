import { pgTable, uuid, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  firebaseUid: text('firebase_uid').notNull().unique(),
  email: text('email'),
  displayName: text('display_name'),
  photoURL: text('photo_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

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
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Type exports for TypeScript
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type OracleCard = typeof oracleCards.$inferSelect
export type NewOracleCard = typeof oracleCards.$inferInsert
