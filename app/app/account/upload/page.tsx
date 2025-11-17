import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { UploadClient } from './upload-client'

export default async function UploadPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/signin')
  }

  return <UploadClient />
}
