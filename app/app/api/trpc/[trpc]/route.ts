import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/server/routers/_app'
import { auth } from '@/lib/auth'
import type { Context } from '@/server/trpc'

const handler = async (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: async (): Promise<Context> => {
      const session = await auth()
      return { session }
    },
  })

export { handler as GET, handler as POST }
