# Grimoire ✨

A modern oracle card creation platform with AI-powered generation and editing. Create, customize, and manage your personal oracle deck with advanced image editing and mystical AI assistance.

> Originally built in 2019 with Firebase + React. Fully modernized in 2025 with Next.js 16 + AI features. See [README.2019.md](./README.2019.md) for the original architecture.

## Features

### 🎨 Advanced Image Editing
- **Canva-level CSS controls**: Brightness, contrast, saturation, blur, and rotation sliders
- **Quick preset filters**: Original, Vibrant, Classic, Vintage
- **Real-time preview** with all adjustments applied
- **No external APIs** - pure CSS filters keep costs at $0

### 🤖 AI-Powered Enhancements
- **AI Image Generation**: Create oracle cards from text prompts using Replicate Flux models
- **AI Caption Enhancement**: Transform simple captions into mystical, poetic wisdom using LLM
- **Flexible LLM Provider**: Easy switching between OpenAI, OpenRouter, or any OpenAI-compatible API

### 📸 Upload & Gallery
- **Drag-and-drop upload** with Vercel Blob storage
- **Personal oracle deck** with responsive masonry grid
- **Card management**: Edit, enhance, and delete cards
- **Draw a card** for daily inspiration (coming soon)

### 🔐 Authentication
- **NextAuth v5** with Google OAuth
- **Drizzle adapter** for database sessions
- **Custom mystical UI** with Server Components

## Tech Stack (2025)

### Frontend
- **Next.js 16** - App Router with React Server Components
- **TypeScript 5** - Full type safety
- **Tailwind CSS 4** - Modern styling with CSS variables
- **shadcn/ui** - Accessible component library built on Radix UI
- **React 19** - Latest features and optimizations

### Backend
- **tRPC** - End-to-end type-safe APIs
- **Drizzle ORM** - Type-safe database queries
- **NextAuth v5 (Auth.js)** - Modern authentication
- **Neon PostgreSQL** - Serverless database

### AI & Media
- **Replicate** - Flux model image generation
- **OpenAI / OpenRouter** - LLM caption enhancement (swappable)
- **Vercel Blob** - File storage

### Infrastructure
- **Vercel** - Deployment platform
- **TanStack Query v5** - Server state management

## Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm
- Google OAuth credentials
- Neon PostgreSQL database
- Vercel Blob storage token
- LLM API key (OpenAI or OpenRouter)
- Replicate API token

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/grimoire.git
   cd grimoire/app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env.local` and fill in your credentials:

   ```bash
   cp .env.example .env.local
   ```

   Required variables:
   ```bash
   # NextAuth
   AUTH_SECRET=              # Generate with: openssl rand -base64 32
   GOOGLE_CLIENT_ID=         # From Google Cloud Console
   GOOGLE_CLIENT_SECRET=     # From Google Cloud Console

   # Database
   DATABASE_URL=             # Neon PostgreSQL connection string

   # Storage
   BLOB_READ_WRITE_TOKEN=    # From Vercel Blob

   # LLM (choose one)
   LLM_PROVIDER=openrouter   # or 'openai'
   LLM_API_KEY=              # Your LLM API key
   LLM_MODEL=anthropic/claude-3.5-sonnet  # or 'gpt-4'

   # Image Generation
   REPLICATE_API_TOKEN=      # From Replicate
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

### Database Setup (Neon)

1. Create account at [Neon](https://neon.tech/)
2. Create a new project
3. Copy the connection string
4. Add to `.env.local` as `DATABASE_URL`
5. Run `npm run db:push` to create tables

### Vercel Blob Setup

1. Create a [Vercel](https://vercel.com/) account
2. Create a new Blob store in your project settings
3. Copy the `BLOB_READ_WRITE_TOKEN`
4. Add to `.env.local`

### LLM Provider Configuration

See [app/lib/LLM_PROVIDERS.md](./app/lib/LLM_PROVIDERS.md) for detailed configuration options.

**Quick setup with OpenRouter:**
```bash
LLM_PROVIDER=openrouter
LLM_API_KEY=sk-or-v1-xxx
LLM_MODEL=anthropic/claude-3.5-sonnet
```

**Quick setup with OpenAI:**
```bash
LLM_PROVIDER=openai
LLM_API_KEY=sk-proj-xxx
LLM_MODEL=gpt-4
```

### Replicate Setup

1. Create account at [Replicate](https://replicate.com/)
2. Get your API token from account settings
3. Add to `.env.local` as `REPLICATE_API_TOKEN`
4. (Optional) Train a custom Flux model and set `REPLICATE_FLUX_MODEL`

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push database schema changes
npm run db:studio    # Open Drizzle Studio (database GUI)
```

### Project Structure

```
app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth handlers
│   │   ├── upload/        # Vercel Blob upload
│   │   ├── enhance-caption/  # LLM caption enhancement
│   │   └── generate/      # Replicate image generation
│   ├── account/           # Protected user pages
│   │   ├── upload/        # Upload & edit workflow
│   │   └── generate/      # AI generation workflow
│   └── signin/            # Authentication page
├── components/            # React components
│   ├── cards/            # Oracle card components
│   ├── ui/               # shadcn/ui components
│   └── upload/           # Upload & editing components
├── db/                   # Database schema & config
├── lib/                  # Utilities & configurations
│   ├── auth.ts           # NextAuth setup
│   ├── llm.ts            # LLM provider abstraction
│   └── trpc.ts           # tRPC client setup
└── server/               # tRPC server
    └── routers/          # API routers
```

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `app`

3. **Configure Environment Variables**

   Add all variables from `.env.local` to Vercel project settings.

4. **Deploy**

   Vercel will automatically deploy on push to main branch.

### Database Migrations

When deploying schema changes:

```bash
# Push schema changes to production
npm run db:push
```

## Documentation

- [LLM Provider Configuration](./app/lib/LLM_PROVIDERS.md) - Detailed LLM setup guide
- [Architecture Decisions](./ARCHITECTURE.md) - Why we chose this tech stack
- [2019 Original README](./README.2019.md) - Historical reference

## Features Roadmap

- [ ] Draw a random card for daily inspiration
- [ ] Card spreads (3-card, Celtic Cross, etc.)
- [ ] Export cards as images
- [ ] Share cards publicly
- [ ] Collaborative decks
- [ ] Mobile app (React Native)

## Contributing

This is a personal project showcasing modern web development practices, but contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

MIT

## Acknowledgments

- Original 2019 architecture inspired by JAMstack and serverless trends
- Modernized in 2025 with the latest React Server Components and AI capabilities
- Built with Next.js, TypeScript, and a love for mystical aesthetics ✨
