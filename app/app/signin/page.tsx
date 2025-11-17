import { redirect } from 'next/navigation'
import { auth, signIn } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function SignInPage() {
  const session = await auth()

  // Redirect to account if already signed in
  if (session?.user) {
    redirect('/account')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-purple-900/30 border-purple-500/20 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
          <div className="text-6xl mx-auto mb-4">🔮</div>
          <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
            Enter Your Grimoire
          </CardTitle>
          <CardDescription className="text-purple-200/80 text-base">
            Sign in to create your own book of shadows
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-purple-200/70 text-sm">
              A grimoire is your personal collection of wisdom and magic. Begin your mystical journey by signing in.
            </p>
            <form
              action={async () => {
                'use server'
                await signIn('google', { redirectTo: '/account' })
              }}
            >
              <Button
                type="submit"
                className="w-full bg-white hover:bg-gray-100 text-gray-900 font-medium py-6"
                size="lg"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
