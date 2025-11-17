'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface FileUploadProps {
  onUploadComplete: (url: string, file: File) => void
}

export function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      setIsUploading(true)
      setError(null)

      try {
        // Upload to Vercel Blob
        const response = await fetch(
          `/api/upload?filename=${encodeURIComponent(file.name)}`,
          {
            method: 'POST',
            body: file,
          }
        )

        if (!response.ok) {
          throw new Error('Upload failed')
        }

        const blob = await response.json()
        onUploadComplete(blob.url, file)
      } catch (err) {
        console.error('Upload error:', err)
        setError('Failed to upload image. Please try again.')
      } finally {
        setIsUploading(false)
      }
    },
    [onUploadComplete]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'],
    },
    maxFiles: 1,
    disabled: isUploading,
  })

  return (
    <Card
      {...getRootProps()}
      className={`cursor-pointer transition-all border-2 border-dashed ${
        isDragActive
          ? 'border-purple-500 bg-purple-500/10'
          : 'border-purple-500/30 bg-purple-900/20 hover:bg-purple-900/30'
      }`}
    >
      <CardContent className="p-12 text-center">
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="text-6xl">
            {isUploading ? 'ó' : isDragActive ? '=ø' : '=¼'}
          </div>
          {isUploading ? (
            <p className="text-purple-200">Uploading your image...</p>
          ) : isDragActive ? (
            <p className="text-purple-200 text-lg font-medium">
              Drop your image here
            </p>
          ) : (
            <>
              <p className="text-purple-200 text-lg font-medium">
                Drag & drop an image here
              </p>
              <p className="text-purple-300/70 text-sm">
                or click to browse your files
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-4 border-purple-500/50 text-purple-100 hover:bg-purple-800/50"
              >
                Select Image
              </Button>
            </>
          )}
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
