'use client'

import { OracleCard } from './oracle-card'
import { trpc } from '@/lib/trpc'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function GalleryGrid() {
  const utils = trpc.useUtils()

  const { data, isLoading } = trpc.getCards.useQuery()

  const deleteMutation = trpc.deleteCard.useMutation({
    onSuccess: () => {
      // Refetch cards after deletion
      utils.getCards.invalidate()
    },
  })

  const handleDelete = async (cardId: string) => {
    await deleteMutation.mutateAsync({ cardId })
  }

  const handleEdit = (cardId: string) => {
    // TODO: Navigate to edit page
    console.log('Edit card:', cardId)
  }

  const handleEnhance = (cardId: string) => {
    // TODO: Implement AI enhancement
    console.log('Enhance card:', cardId)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-purple-200">Loading your grimoire...</p>
      </div>
    )
  }

  if (!data?.cards.length) {
    return (
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
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-purple-300/70">
          {data.count} {data.count === 1 ? 'card' : 'cards'} in your collection
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.cards.map((card) => (
          <OracleCard
            key={card.id}
            id={card.id}
            imageUrl={card.imageUrl}
            caption={card.caption || ''}
            style={card.style || 'original'}
            createdAt={card.createdAt}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onEnhance={handleEnhance}
          />
        ))}
      </div>
    </div>
  )
}
