# Grimoire - Modernized 2025

A modern reimplementation of the Grimoire oracle card platform, upgraded from 2019 to 2025 technologies.

## 🚀 Phase 1: Foundation (COMPLETED)

### Modern Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **State Management**: Zustand + TanStack Query v5
- **API Layer**: tRPC (type-safe APIs)
- **Database**: Neon PostgreSQL (serverless)
- **Database ORM**: Drizzle ORM
- **Auth**: NextAuth v5 (Auth.js) with Google OAuth
- **Storage**: Vercel Blob (file uploads)

### Features Implemented

✅ Next.js 16 project structure with App Router
✅ TypeScript configuration
✅ Tailwind CSS 4 with shadcn/ui components
✅ tRPC setup for type-safe APIs
✅ Drizzle ORM with NextAuth-compatible schema
✅ NextAuth v5 with Google OAuth (custom UI)
✅ Vercel Blob for file storage
✅ Landing page with mystical gradient theme
✅ Sign-in page with custom mystical UI (no Firebase!)
✅ Account/dashboard page with Server Components  

### Project Structure

```
app/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Landing page
│   ├── signin/              # Authentication
│   │   └── page.tsx
│   ├── account/             # User dashboard
│   │   └── page.tsx
│   └── api/trpc/[trpc]/    # tRPC API routes
│       └── route.ts
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   └── card.tsx
│   └── providers/           # React providers
│       └── trpc-provider.tsx
├── lib/
│   ├── auth.ts              # NextAuth configuration
│   ├── trpc.ts              # tRPC client hooks
│   └── utils.ts             # Utility functions
├── types/
│   └── next-auth.d.ts       # NextAuth type extensions
├── db/
│   ├── schema.ts            # Drizzle database schema
│   └── index.ts             # Database client
└── server/
    ├── trpc.ts              # tRPC initialization
    └── routers/
        └── _app.ts          # Main API router
```

### Database Schema

```typescript
// NextAuth-compatible schema with AI support
users {
  id: uuid (PK)
  name: string
  email: string (unique)
  emailVerified: timestamp
  image: string
  createdAt: timestamp
  updatedAt: timestamp
}

accounts {
  userId: uuid (FK → users)
  type: string
  provider: string (Google, etc.)
  providerAccountId: string
  // OAuth tokens
}

sessions {
  sessionToken: string (PK)
  userId: uuid (FK → users)
  expires: timestamp
}

oracleCards {
  id: uuid (PK)
  userId: uuid (FK → users)
  imageUrl: string
  thumbnailUrl: string
  caption: string
  style: string
  aiGenerated: boolean
  aiPrompt: string
  processingParams: jsonb
  tags: string[]
  createdAt: timestamp
  updatedAt: timestamp
}
```

## 📋 Setup Instructions

### 1. Install Dependencies

```bash
cd app
npm install
```

### 2. Configure Environment Variables

Update `.env.local` with your credentials:

```bash
# NextAuth Configuration
AUTH_SECRET=your_secret  # Generate with: openssl rand -base64 32
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Database (Neon PostgreSQL)
# Get from Vercel integration or Neon dashboard
DATABASE_URL=postgresql://user:password@host/database

# Vercel Blob (auto-configured in Vercel)
BLOB_READ_WRITE_TOKEN=your_token
```

**Getting Credentials:**

1. **Google OAuth**: [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials
2. **Neon Database**: Deploy to Vercel and add Neon integration (one-click)
3. **Vercel Blob**: Automatic when deployed to Vercel


### 3. Set Up Database

```bash
# Push schema to database
npm run db:push

# Or generate migrations
npm run db:generate
npm run db:migrate
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## 🎯 What's Next: Phase 2 & Beyond

### Phase 2: AI Core (Planned)
- [ ] OpenAI DALL-E 3 integration for image generation
- [ ] GPT-4V for image analysis and caption suggestions
- [ ] Vector search with pgvector for semantic card discovery
- [ ] AI-powered tagging and categorization

### Phase 3: Enhanced UX (Planned)
- [ ] File upload with drag-and-drop (react-dropzone)
- [ ] Image editor with filters and effects
- [ ] Gallery view with masonry layout
- [ ] Card drawing/random selection feature
- [ ] Real-time updates with optimistic UI

### Phase 4: Advanced Features (Planned)
- [ ] Collaborative grimoires
- [ ] Social features (browse others' cards)
- [ ] Voice journaling with Whisper API
- [ ] PWA support for offline access
- [ ] Advanced image processing (Cloudinary/Imgix)

## 🏗️ Architecture Improvements Over 2019 Version

| Aspect | 2019 | 2025 |
|--------|------|------|
| Framework | React 16 + CRA | Next.js 16 + App Router |
| Language | JavaScript | TypeScript |
| Auth | Firebase Auth | NextAuth v5 (Auth.js) |
| Storage | Firebase Storage | Vercel Blob |
| Database | PostgreSQL + raw SQL | Neon + Drizzle ORM |
| API | GraphQL (Hasura) | tRPC |
| Styling | Emotion (CSS-in-JS) | Tailwind CSS |
| State | Apollo Client | TanStack Query |
| Build | Webpack (CRA) | Turbopack |
| Deployment | Firebase Hosting | Vercel |
| **Cost** | $$$ | Free tier forever |

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Drizzle Studio (database GUI)
```

## 📝 Notes

- The original 2019 client code is preserved in `/client`
- This modernized version is in `/app`
- Firebase credentials must be configured before building
- Database migrations should be run before first use

## 🤝 Contributing

This is a modernization project. Contributions welcome!

## 📄 License

See LICENSE file in root directory.
