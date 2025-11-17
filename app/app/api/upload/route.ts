import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { rateLimit, rateLimits } from '@/lib/rate-limit'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export async function POST(request: Request) {
  // Authentication check
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Rate limiting
  const rateLimitResult = await rateLimit(
    `file-upload:${session.user.id}`,
    rateLimits.fileUpload
  )

  if (!rateLimitResult.success) {
    const resetIn = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000 / 60)
    return NextResponse.json(
      {
        error: `Rate limit exceeded. You can upload ${rateLimits.fileUpload.maxRequests} files per hour. Please try again in ${resetIn} minutes.`,
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        },
      }
    )
  }

  const { searchParams } = new URL(request.url)
  const filename = searchParams.get('filename')

  if (!filename || !request.body) {
    return NextResponse.json({ error: 'Missing filename or file' }, { status: 400 })
  }

  // Validate file size
  const contentLength = parseInt(request.headers.get('content-length') || '0')
  if (contentLength > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` },
      { status: 413 }
    )
  }

  if (contentLength === 0) {
    return NextResponse.json({ error: 'File is empty' }, { status: 400 })
  }

  // Validate file type by extension
  const extension = filename.toLowerCase().split('.').pop()
  const validExtensions = ['jpg', 'jpeg', 'png', 'webp']
  if (!extension || !validExtensions.includes(extension)) {
    return NextResponse.json(
      { error: 'Invalid file type. Allowed types: JPG, PNG, WebP' },
      { status: 400 }
    )
  }

  try {
    const blob = await put(filename, request.body, {
      access: 'public',
    })

    return NextResponse.json(blob)
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}
