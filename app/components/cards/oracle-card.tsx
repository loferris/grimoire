'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, Edit2, Sparkles } from 'lucide-react'
import { useState } from 'react'

interface OracleCardProps {
  id: string
  imageUrl: string
  caption: string
  style: string
  createdAt: Date
  onDelete?: (id: string) => void
  onEdit?: (id: string) => void
  onEnhance?: (id: string) => void
}

const filterStyles: Record<string, string> = {
  original: 'none',
  vibrant: 'saturate(1.5) contrast(1.25) brightness(1.05)',
  classic: 'grayscale(1) contrast(1.25)',
  vintage: 'sepia(0.7) saturate(1.5) contrast(1.25)',
}

export function OracleCard({
  id,
  imageUrl,
  caption,
  style,
  createdAt,
  onDelete,
  onEdit,
  onEnhance,
}: OracleCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showActions, setShowActions] = useState(false)

  return (
    <Card
      className="group relative overflow-hidden bg-purple-900/20 border-purple-500/20 hover:border-purple-500/40 transition-all hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setShowActions(!showActions)}
    >
      {/* Image with filter */}
      <div
        className="aspect-[1/2] relative overflow-hidden"
        style={{
          filter: filterStyles[style] || 'none',
        }}
      >
        <img
          src={imageUrl}
          alt={caption}
          className="w-full h-full object-cover"
        />

        {/* Caption overlay */}
        {caption && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white text-center text-sm font-serif line-clamp-3">
              {caption}
            </p>
          </div>
        )}

        {/* Hover overlay with actions */}
        {(isHovered || showActions) && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3 transition-opacity">
            <div className="flex gap-2">
              {onEdit && (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-purple-500/50 text-purple-100 hover:bg-purple-800/50"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(id)
                  }}
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              )}
              {onEnhance && (
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEnhance(id)
                  }}
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  Enhance
                </Button>
              )}
            </div>
            {onDelete && (
              <Button
                size="sm"
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation()
                  if (confirm('Delete this oracle card?')) {
                    onDelete(id)
                  }
                }}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            )}
            <p className="text-purple-300/60 text-xs mt-2">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      {/* Style badge */}
      <div className="absolute top-2 right-2">
        <span className="px-2 py-1 text-xs bg-purple-900/80 text-purple-200 rounded-full capitalize backdrop-blur-sm">
          {style}
        </span>
      </div>
    </Card>
  )
}
