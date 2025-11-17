'use client'

import { useState } from 'react'
import { AdvancedEditor } from '@/components/upload/advanced-editor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { trpc } from '@/lib/trpc'
import Link from 'next/link'
import { Sparkles, Loader2 } from 'lucide-react'

interface GenerateClientProps {
  userId: string
}

export function GenerateClient({ userId }: GenerateClientProps) {
  const [prompt, setPrompt] = useState('')
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const createCardMutation = trpc.createCard.useMutation({
    onSuccess: () => {
      setIsComplete(true)
    },
  })

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, aspectRatio: '9:16' }),
      })

      if (!response.ok) throw new Error('Failed to generate image')

      const data = await response.json()
      setGeneratedImageUrl(data.imageUrl)
    } catch (error) {
      console.error('Generation error:', error)
      alert('Failed to generate image. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleEnhanceCaption = async (caption: string): Promise<string> => {
    try {
      const response = await fetch('/api/enhance-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption }),
      })

      if (!response.ok) throw new Error('Failed to enhance caption')

      const data = await response.json()
      return data.caption
    } catch (error) {
      console.error('Caption enhancement error:', error)
      return caption
    }
  }

  const handleSave = async (data: {
    imageUrl: string
    caption: string
    style: 'original' | 'vibrant' | 'classic' | 'vintage' | 'custom'
    customFilters?: {
      brightness: number
      contrast: number
      saturation: number
      blur: number
      rotate: number
    }
  }) => {
    await createCardMutation.mutateAsync({
      userId,
      imageUrl: data.imageUrl,
      caption: data.caption,
      style: data.style === 'custom' ? 'original' : data.style,
    })
  }

  const handleReset = () => {
    setPrompt('')
    setGeneratedImageUrl(null)
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
              Your AI-generated oracle card has been added to your grimoire
            </p>
            <div className="flex gap-4">
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1 border-purple-500/50 text-purple-100 hover:bg-purple-800/50"
              >
                Generate Another
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
              Generate Oracle Card
            </h2>
            <p className="text-purple-200/70">
              Describe your vision and let AI bring it to life
            </p>
          </div>

          {!generatedImageUrl ? (
            <Card className="bg-purple-900/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-100 text-center">
                  Enter Your Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Input
                    type="text"
                    placeholder="e.g., A cosmic phoenix rising from stars, surrounded by golden light"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="bg-purple-900/30 border-purple-500/30 text-purple-100 placeholder:text-purple-300/50"
                    maxLength={500}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !isGenerating && prompt.trim()) {
                        handleGenerate()
                      }
                    }}
                  />
                  <p className="text-xs text-purple-300/60">
                    {prompt.length}/500 characters
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Generate Image
                      </>
                    )}
                  </Button>
                </div>

                <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-purple-200 font-medium">Tips for better results:</p>
                  <ul className="text-xs text-purple-300/80 space-y-1 list-disc list-inside">
                    <li>Be specific about colors, lighting, and mood</li>
                    <li>Include mystical or spiritual elements</li>
                    <li>Describe the main subject and background</li>
                    <li>Use descriptive adjectives (ethereal, cosmic, radiant, etc.)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          ) : (
            <AdvancedEditor
              imageUrl={generatedImageUrl}
              onSave={handleSave}
              onEnhanceCaption={handleEnhanceCaption}
            />
          )}
        </div>
      </main>
    </div>
  )
}
