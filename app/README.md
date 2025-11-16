# Grimoire - Modernized 2025

A modern reimplementation of the Grimoire oracle card platform, upgraded from 2019 to 2025 technologies.

## 🚀 Phase 1: Foundation (COMPLETED)

### Modern Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **State Management**: Zustand + TanStack Query v5
- **API Layer**: tRPC (type-safe APIs)
- **Database ORM**: Drizzle ORM
- **Auth**: Firebase Auth (Google Sign-In)
- **Storage**: Firebase Cloud Storage

### Features Implemented

✅ Next.js 16 project structure with App Router  
✅ TypeScript configuration  
✅ Tailwind CSS 4 with shadcn/ui components  
✅ tRPC setup for type-safe APIs  
✅ Drizzle ORM with modernized database schema  
✅ Firebase authentication configuration  
✅ Landing page with mystical theme  
✅ Sign-in page with Google OAuth  
✅ Account/dashboard page structure  

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
│   ├── firebase.ts          # Firebase configuration
│   ├── trpc.ts              # tRPC client hooks
│   └── utils.ts             # Utility functions
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
// Modern schema with AI support
users {
  id: uuid (PK)
  firebaseUid: string (unique)
  email: string
  displayName: string
  photoURL: string
  createdAt: timestamp
  updatedAt: timestamp
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

Copy `.env.local` and fill in your Firebase credentials:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Database (Neon/Supabase PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/database
```

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
| Routing | React Router v5 | Next.js App Router |
| State | Hooks + Apollo | Zustand + TanStack Query |
| API | GraphQL (Hasura) | tRPC |
| Styling | Emotion | Tailwind + shadcn/ui |
| Database | Raw SQL | Drizzle ORM |
| Build | Create React App | Next.js (Turbopack) |
| Deployment | Firebase Hosting | Vercel (recommended) |

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
