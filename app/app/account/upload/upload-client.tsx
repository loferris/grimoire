'use client'

import { useState } from 'react'
import { FileUpload } from '@/components/upload/file-upload'
import { ImageEditor } from '@/components/upload/image-editor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc'
import Link from 'next/link'

interface UploadClientProps {
  userId: string
}

export function UploadClient({ userId }: UploadClientProps) {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  const createCardMutation = trpc.createCard.useMutation({
    onSuccess: () => {
      setIsComplete(true)
    },
  })

  const handleUploadComplete = (url: string) => {
    setUploadedImageUrl(url)
  }

  const handleSave = async (data: {
    imageUrl: string
    caption: string
    style: 'original' | 'vibrant' | 'classic' | 'vintage'
  }) => {
    await createCardMutation.mutateAsync({
      userId,
      imageUrl: data.imageUrl,
      caption: data.caption,
      style: data.style,
    })
  }

  const handleReset = () => {
    setUploadedImageUrl(null)
    setIsComplete(false)
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-purple-900/30 border-purple-500/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">✨</div>
            <CardTitle className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
              Card Created!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-purple-200 text-center">
              Your oracle card has been added to your grimoire
            </p>
            <div className="flex gap-4">
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1 border-purple-500/50 text-purple-100 hover:bg-purple-800/50"
              >
                Create Another
              </Button>
              <Link href="/account" className="flex-1">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  View Gallery
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-purple-900/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/account">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
              Grimoire
            </h1>
          </Link>
          <Link href="/account">
            <Button
              variant="outline"
              className="border-purple-500/50 text-purple-100 hover:bg-purple-800/50"
            >
              Back to Gallery
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-purple-100">
              Create Oracle Card
            </h2>
            <p className="text-purple-200/70">
              Upload an image and craft your message
            </p>
          </div>

          {!uploadedImageUrl ? (
            <FileUpload onUploadComplete={handleUploadComplete} />
          ) : (
            <ImageEditor imageUrl={uploadedImageUrl} onSave={handleSave} />
          )}
        </div>
      </main>
    </div>
  )
}
