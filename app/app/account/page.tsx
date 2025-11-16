'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function AccountPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/signin')
      } else {
        setUser(user)
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 flex items-center justify-center">
        <p className="text-purple-200">Loading your grimoire...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-purple-900/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
              Grimoire
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-purple-200">{user?.displayName}</span>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-purple-500/50 text-purple-100 hover:bg-purple-800/50"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-purple-100">
              Your Book of Shadows
            </h2>
            <p className="text-purple-200/70">
              Create and manage your oracle cards
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-purple-900/30 border-purple-500/20 backdrop-blur-sm hover:bg-purple-900/40 transition-all">
              <CardHeader>
                <div className="text-4xl mb-2">📸</div>
                <CardTitle className="text-purple-100">Upload Image</CardTitle>
                <CardDescription className="text-purple-200/70">
                  Upload your own photo to create an oracle card
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/account/upload">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Upload
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-indigo-900/30 border-indigo-500/20 backdrop-blur-sm hover:bg-indigo-900/40 transition-all">
              <CardHeader>
                <div className="text-4xl mb-2">🎨</div>
                <CardTitle className="text-purple-100">Generate with AI</CardTitle>
                <CardDescription className="text-purple-200/70">
                  Create unique oracle cards with AI image generation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/account/generate">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Generate
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-violet-900/30 border-violet-500/20 backdrop-blur-sm hover:bg-violet-900/40 transition-all">
              <CardHeader>
                <div className="text-4xl mb-2">🔮</div>
                <CardTitle className="text-purple-100">Draw a Card</CardTitle>
                <CardDescription className="text-purple-200/70">
                  Receive guidance from your collection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-violet-600 hover:bg-violet-700">
                  Draw Card
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Gallery Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-purple-100">Your Cards</h3>
            <Card className="bg-purple-900/20 border-purple-500/20 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">✨</div>
                <p className="text-purple-200/70 text-lg">
                  Your grimoire is empty. Create your first oracle card to begin your journey.
                </p>
                <div className="mt-6 flex gap-4 justify-center">
                  <Link href="/account/upload">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Upload Image
                    </Button>
                  </Link>
                  <Link href="/account/generate">
                    <Button variant="outline" className="border-purple-500/50 text-purple-100 hover:bg-purple-800/50">
                      Generate with AI
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
