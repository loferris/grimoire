'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Wand2, RotateCw, RefreshCw } from 'lucide-react'

type FilterStyle = 'original' | 'vibrant' | 'classic' | 'vintage' | 'custom'

interface AdvancedEditorProps {
  imageUrl: string
  onSave: (data: {
    imageUrl: string
    caption: string
    style: FilterStyle
    customFilters?: ImageAdjustments
  }) => void
  onEnhanceCaption?: (caption: string) => Promise<string>
}

interface ImageAdjustments {
  brightness: number
  contrast: number
  saturation: number
  blur: number
  rotate: number
}

const presetStyles: Record<Exclude<FilterStyle, 'custom'>, ImageAdjustments> = {
  original: { brightness: 100, contrast: 100, saturation: 100, blur: 0, rotate: 0 },
  vibrant: { brightness: 105, contrast: 125, saturation: 150, blur: 0, rotate: 0 },
  classic: { brightness: 100, contrast: 125, saturation: 0, blur: 0, rotate: 0 },
  vintage: { brightness: 100, contrast: 125, saturation: 150, blur: 0, rotate: 0 },
}

export function AdvancedEditor({ imageUrl, onSave, onEnhanceCaption }: AdvancedEditorProps) {
  const [caption, setCaption] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<FilterStyle>('original')
  const [adjustments, setAdjustments] = useState<ImageAdjustments>(presetStyles.original)
  const [isSaving, setIsSaving] = useState(false)
  const [isEnhancing, setIsEnhancing] = useState(false)

  const handlePresetChange = (preset: Exclude<FilterStyle, 'custom'>) => {
    setSelectedFilter(preset)
    setAdjustments(presetStyles[preset])
  }

  const handleAdjustmentChange = (key: keyof ImageAdjustments, value: number) => {
    setSelectedFilter('custom')
    setAdjustments(prev => ({ ...prev, [key]: value }))
  }

  const handleEnhance = async () => {
    if (!onEnhanceCaption || !caption.trim()) return

    setIsEnhancing(true)
    try {
      const enhanced = await onEnhanceCaption(caption)
      setCaption(enhanced)
    } finally {
      setIsEnhancing(false)
    }
  }

  const handleReset = () => {
    setAdjustments(presetStyles.original)
    setSelectedFilter('original')
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave({
        imageUrl,
        caption,
        style: selectedFilter,
        customFilters: selectedFilter === 'custom' ? adjustments : undefined,
      })
    } finally {
      setIsSaving(false)
    }
  }

  const getFilterString = () => {
    const { brightness, contrast, saturation, blur, rotate } = adjustments
    let filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`

    if (selectedFilter === 'classic') {
      filter += ' grayscale(100%)'
    } else if (selectedFilter === 'vintage') {
      filter += ' sepia(70%)'
    }

    if (blur > 0) {
      filter += ` blur(${blur}px)`
    }

    return filter
  }

  const getTransformString = () => {
    return `rotate(${adjustments.rotate}deg)`
  }

  return (
    <div className="space-y-6">
      {/* Image Preview */}
      <Card className="bg-purple-900/20 border-purple-500/20">
        <CardContent className="p-6">
          <div className="relative aspect-[1/2] max-w-md mx-auto overflow-hidden rounded-lg bg-black">
            <img
              src={imageUrl}
              alt="Oracle card preview"
              className="w-full h-full object-cover transition-all duration-200"
              style={{
                filter: getFilterString(),
                transform: getTransformString(),
              }}
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

      {/* Quick Presets */}
      <Card className="bg-purple-900/20 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-purple-100 text-sm">Quick Styles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            {(['original', 'vibrant', 'classic', 'vintage'] as const).map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetChange(preset)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  selectedFilter === preset
                    ? 'border-purple-500 ring-2 ring-purple-500/50'
                    : 'border-purple-500/30 hover:border-purple-500/60'
                }`}
              >
                <img
                  src={imageUrl}
                  alt={preset}
                  className="w-full h-full object-cover"
                  style={{
                    filter: (() => {
                      const adj = presetStyles[preset]
                      let f = `brightness(${adj.brightness}%) contrast(${adj.contrast}%) saturate(${adj.saturation}%)`
                      if (preset === 'classic') f += ' grayscale(100%)'
                      if (preset === 'vintage') f += ' sepia(70%)'
                      return f
                    })()
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-1">
                  <span className="text-white text-xs font-medium capitalize">
                    {preset}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Controls */}
      <Card className="bg-purple-900/20 border-purple-500/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-purple-100 text-sm">Advanced Adjustments</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-purple-300 hover:text-purple-100"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Brightness */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-purple-200">Brightness</label>
              <span className="text-sm text-purple-300">{adjustments.brightness}%</span>
            </div>
            <Slider
              value={[adjustments.brightness]}
              onValueChange={([value]) => handleAdjustmentChange('brightness', value)}
              min={50}
              max={150}
              step={1}
              className="[&_[role=slider]]:bg-purple-600"
            />
          </div>

          {/* Contrast */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-purple-200">Contrast</label>
              <span className="text-sm text-purple-300">{adjustments.contrast}%</span>
            </div>
            <Slider
              value={[adjustments.contrast]}
              onValueChange={([value]) => handleAdjustmentChange('contrast', value)}
              min={50}
              max={150}
              step={1}
            />
          </div>

          {/* Saturation */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-purple-200">Saturation</label>
              <span className="text-sm text-purple-300">{adjustments.saturation}%</span>
            </div>
            <Slider
              value={[adjustments.saturation]}
              onValueChange={([value]) => handleAdjustmentChange('saturation', value)}
              min={0}
              max={200}
              step={1}
            />
          </div>

          {/* Blur */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-purple-200">Blur</label>
              <span className="text-sm text-purple-300">{adjustments.blur}px</span>
            </div>
            <Slider
              value={[adjustments.blur]}
              onValueChange={([value]) => handleAdjustmentChange('blur', value)}
              min={0}
              max={10}
              step={0.5}
            />
          </div>

          {/* Rotate */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-purple-200">Rotate</label>
              <span className="text-sm text-purple-300">{adjustments.rotate}°</span>
            </div>
            <Slider
              value={[adjustments.rotate]}
              onValueChange={([value]) => handleAdjustmentChange('rotate', value)}
              min={-45}
              max={45}
              step={1}
            />
          </div>
        </CardContent>
      </Card>

      {/* Caption Input */}
      <Card className="bg-purple-900/20 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-purple-100 text-sm">Oracle Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            type="text"
            placeholder="Enter your oracle card message..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="bg-purple-900/30 border-purple-500/30 text-purple-100 placeholder:text-purple-300/50"
            maxLength={200}
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-purple-300/60">
              {caption.length}/200 characters
            </p>
            {onEnhanceCaption && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleEnhance}
                disabled={isEnhancing || !caption.trim()}
                className="border-purple-500/50 text-purple-200 hover:bg-purple-800/50"
              >
                <Wand2 className="w-4 h-4 mr-1" />
                {isEnhancing ? 'Enhancing...' : 'Enhance with AI'}
              </Button>
            )}
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
