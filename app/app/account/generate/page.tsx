import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { GenerateClient } from './generate-client'

export default async function GeneratePage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/signin')
  }

  return <GenerateClient userId={session.user.id} />
}
