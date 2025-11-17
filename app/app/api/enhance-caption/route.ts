import { NextResponse } from 'next/server'
import { llm } from '@/lib/llm'
import { auth } from '@/lib/auth'
import { rateLimit, rateLimits } from '@/lib/rate-limit'

export async function POST(request: Request) {
  // Authentication check
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Rate limiting
  const rateLimitResult = await rateLimit(
    `caption-enhance:${session.user.id}`,
    rateLimits.captionEnhancement
  )

  if (!rateLimitResult.success) {
    const resetIn = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000 / 60)
    return NextResponse.json(
      {
        error: `Rate limit exceeded. You can enhance ${rateLimits.captionEnhancement.maxRequests} captions per hour. Please try again in ${resetIn} minutes.`,
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

  try {
    const { caption } = await request.json()

    if (!caption || typeof caption !== 'string') {
      return NextResponse.json(
        { error: 'Caption is required' },
        { status: 400 }
      )
    }

    const enhancedCaption = await llm.chat(
      [
        {
          role: 'system',
          content: `You are a mystical oracle assistant. Your task is to enhance user-provided captions for oracle cards to make them more poetic, mystical, and meaningful while preserving the original intent. Keep the enhanced caption under 200 characters. Make it feel like ancient wisdom delivered with modern clarity.`,
        },
        {
          role: 'user',
          content: `Enhance this oracle card caption: "${caption}"`,
        },
      ],
      {
        maxTokens: 100,
        temperature: 0.8,
      }
    )

    // Ensure it's under 200 characters
    const finalCaption = enhancedCaption.slice(0, 200)

    return NextResponse.json({ caption: finalCaption })
  } catch (error) {
    console.error('Caption enhancement error:', error)
    return NextResponse.json(
      { error: 'Failed to enhance caption' },
      { status: 500 }
    )
  }
}
