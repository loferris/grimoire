import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950">
      <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-3xl text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
              Grimoire
            </h1>
            <h2 className="text-2xl font-semibold text-purple-100">
              A platform for mindfulness and self-expression
            </h2>
            <p className="text-lg text-purple-200/80 max-w-2xl mx-auto">
              A grimoire or &quot;book of shadows&quot; is a book of magic spells - a collection
              of your own wisdom. Are you ready to make some magic?
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Card className="bg-purple-900/30 border-purple-500/20 backdrop-blur-sm hover:bg-purple-900/40 transition-all hover:scale-105">
              <CardContent className="p-6 text-center space-y-4">
                <div className="text-4xl">✨</div>
                <h3 className="text-xl font-semibold text-purple-100">
                  Your Book of Shadows
                </h3>
                <p className="text-purple-200/70">
                  Create and edit your own oracle cards with AI-powered image generation
                </p>
                <Link href="/account">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Enter Your Grimoire
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-indigo-900/30 border-indigo-500/20 backdrop-blur-sm hover:bg-indigo-900/40 transition-all hover:scale-105">
              <CardContent className="p-6 text-center space-y-4">
                <div className="text-4xl">🔮</div>
                <h3 className="text-xl font-semibold text-purple-100">
                  Explore Others&apos; Grimoires
                </h3>
                <p className="text-purple-200/70">
                  Find inspiration in the wisdom and creativity of the community
                </p>
                <Link href="/explore">
                  <Button
                    variant="outline"
                    className="w-full border-indigo-500/50 text-indigo-100 hover:bg-indigo-800/50"
                  >
                    Explore Grimoires
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="mt-12 space-y-4">
            <Link href="/signin">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg">
                Get Started
              </Button>
            </Link>
            <p className="text-sm text-purple-300/60">
              Sign in with Google to begin your journey
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
