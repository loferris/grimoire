import { redirect } from 'next/navigation'
import { auth, signOut } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GalleryGrid } from '@/components/cards/gallery-grid'
import Link from 'next/link'

export default async function AccountPage() {
  const session = await auth()

  // Redirect to signin if not authenticated
  if (!session?.user?.id) {
    redirect('/signin')
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
            <span className="text-purple-200">{session.user.name}</span>
            <form
              action={async () => {
                'use server'
                await signOut({ redirectTo: '/' })
              }}
            >
              <Button
                type="submit"
                variant="outline"
                className="border-purple-500/50 text-purple-100 hover:bg-purple-800/50"
              >
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
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
            <GalleryGrid userId={session.user.id} />
          </div>
        </div>
      </main>
    </div>
  )
}
