import { NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(request: Request) {
  try {
    const { prompt, aspectRatio = '9:16' } = await request.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Use custom Flux model if specified, otherwise use default Flux
    const model = process.env.REPLICATE_FLUX_MODEL || 'black-forest-labs/flux-1.1-pro'

    const output = await replicate.run(
      model as `${string}/${string}:${string}` | `${string}/${string}`,
      {
        input: {
          prompt: `Oracle card art: ${prompt}. Mystical, spiritual, ethereal, cosmic energy, divine symbolism, sacred geometry, beautiful lighting`,
          aspect_ratio: aspectRatio,
          output_format: 'jpg',
          output_quality: 90,
          safety_tolerance: 2,
        },
      }
    )

    // Replicate returns different formats depending on the model
    // Handle both single URL and array of URLs
    let imageUrl: string | null = null

    if (typeof output === 'string') {
      imageUrl = output
    } else if (Array.isArray(output) && output.length > 0) {
      imageUrl = output[0] as string
    } else if (output && typeof output === 'object' && 'url' in output) {
      imageUrl = (output as { url: string }).url
    }

    if (!imageUrl) {
      throw new Error('No image generated')
    }

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}
