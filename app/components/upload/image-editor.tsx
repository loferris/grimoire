'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type FilterStyle = 'original' | 'vibrant' | 'classic' | 'vintage'

interface ImageEditorProps {
  imageUrl: string
  onSave: (data: { imageUrl: string; caption: string; style: FilterStyle }) => void
}

const filterStyles: Record<FilterStyle, string> = {
  original: 'none',
  vibrant: 'saturate(1.5) contrast(1.25) brightness(1.05)',
  classic: 'grayscale(1) contrast(1.25)',
  vintage: 'sepia(0.7) saturate(1.5) contrast(1.25)',
}

export function ImageEditor({ imageUrl, onSave }: ImageEditorProps) {
  const [caption, setCaption] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<FilterStyle>('original')
  const [isSaving, setIsSaving] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave({
        imageUrl,
        caption,
        style: selectedFilter,
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Image Preview */}
      <Card className="bg-purple-900/20 border-purple-500/20">
        <CardContent className="p-6">
          <div
            ref={imageRef}
            className="relative aspect-[1/2] max-w-md mx-auto overflow-hidden rounded-lg"
            style={{
              filter: filterStyles[selectedFilter],
            }}
          >
            <img
              src={imageUrl}
              alt="Oracle card preview"
              className="w-full h-full object-cover"
            />
            {caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-center text-xl font-serif">
                  {caption}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Caption Input */}
      <Card className="bg-purple-900/20 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-purple-100">Add Caption</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Enter your oracle card message..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="bg-purple-900/30 border-purple-500/30 text-purple-100 placeholder:text-purple-300/50"
            maxLength={200}
          />
          <p className="text-xs text-purple-300/60 mt-2">
            {caption.length}/200 characters
          </p>
        </CardContent>
      </Card>

      {/* Filter Selection */}
      <Card className="bg-purple-900/20 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-purple-100">Choose a Style</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(Object.keys(filterStyles) as FilterStyle[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  selectedFilter === filter
                    ? 'border-purple-500 ring-2 ring-purple-500/50'
                    : 'border-purple-500/30 hover:border-purple-500/60'
                }`}
              >
                <img
                  src={imageUrl}
                  alt={filter}
                  className="w-full h-full object-cover"
                  style={{ filter: filterStyles[filter] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-2">
                  <span className="text-white text-sm font-medium capitalize">
                    {filter}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleSave}
          disabled={isSaving || !caption.trim()}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12"
        >
          {isSaving ? 'Saving...' : 'Save Oracle Card'}
        </Button>
      </div>
    </div>
  )
}
