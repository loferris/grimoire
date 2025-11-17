import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { caption } = await request.json()

    if (!caption || typeof caption !== 'string') {
      return NextResponse.json(
        { error: 'Caption is required' },
        { status: 400 }
      )
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a mystical oracle assistant. Your task is to enhance user-provided captions for oracle cards to make them more poetic, mystical, and meaningful while preserving the original intent. Keep the enhanced caption under 200 characters. Make it feel like ancient wisdom delivered with modern clarity.`,
        },
        {
          role: 'user',
          content: `Enhance this oracle card caption: "${caption}"`,
        },
      ],
      max_tokens: 100,
      temperature: 0.8,
    })

    const enhancedCaption = completion.choices[0]?.message?.content?.trim()

    if (!enhancedCaption) {
      throw new Error('No caption generated')
    }

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
