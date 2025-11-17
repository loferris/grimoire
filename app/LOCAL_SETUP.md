# Local Development Setup

## Quick Start (5 minutes)

### 1. Start PostgreSQL with Docker

```bash
cd app
docker-compose up -d
```

This starts a PostgreSQL database on `localhost:5432`.

### 2. Set up environment variables

```bash
# Copy the example file
cp .env.local.example .env.local

# Generate an AUTH_SECRET
openssl rand -base64 32
```

Edit `.env.local` and add:
- The generated `AUTH_SECRET`
- Google OAuth credentials (see below)
- Database URL is already set: `postgresql://grimoire:grimoire_dev@localhost:5432/grimoire_db`

### 3. Set up Google OAuth (Required for auth)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or use existing)
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Set authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`

### 4. Install dependencies

```bash
npm install
```

### 5. Push database schema

```bash
npx drizzle-kit push
```

Type `yes` when prompted.

### 6. Start the dev server

```bash
npm run dev
```

Visit `http://localhost:3000` 🎉

---

## Optional Features

### Enable AI Image Generation

Sign up for [Replicate](https://replicate.com) and add to `.env.local`:
```
REPLICATE_API_TOKEN=your-token
```

### Enable Caption Enhancement

Add your OpenAI API key to `.env.local`:
```
LLM_API_KEY=sk-...
```

### Enable File Uploads

For local dev without Vercel Blob, you can:
1. Sign up for [Vercel Blob](https://vercel.com/dashboard/stores) (free tier)
2. Or mock the upload endpoint for testing

---

## Minimal Setup (Just Auth + Database)

You can test the core functionality with just:
- PostgreSQL (via Docker)
- Google OAuth
- No AI features, no file uploads

Just skip the optional API keys and the upload/generate features will show errors (which is fine for testing auth and tRPC).

---

## Troubleshooting

### "Connection refused" on database
```bash
# Check if Docker is running
docker ps

# Restart the database
docker-compose restart
```

### "Invalid session" errors
Make sure `AUTH_SECRET` is set and restart dev server.

### Port 5432 already in use
Another PostgreSQL instance is running. Either:
- Stop it: `sudo systemctl stop postgresql`
- Or change the port in `docker-compose.yml`: `"5433:5432"`
  And update `DATABASE_URL` to use port 5433

---

## Alternative: Use Your System PostgreSQL

If you already have PostgreSQL installed:

```bash
# Create database
createdb grimoire_db

# Update .env.local
DATABASE_URL=postgresql://your-username@localhost:5432/grimoire_db
```

Skip the `docker-compose up` step.

---

## View Database

```bash
# Using Drizzle Studio (recommended)
npx drizzle-kit studio

# Or use psql
docker exec -it app-postgres-1 psql -U grimoire -d grimoire_db
```

---

## Clean Restart

```bash
# Stop and remove database
docker-compose down -v

# Start fresh
docker-compose up -d
npx drizzle-kit push
npm run dev
```
