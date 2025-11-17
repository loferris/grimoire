/**
 * Simple in-memory rate limiter
 *
 * For production with multiple servers, consider using:
 * - Upstash Redis (https://upstash.com)
 * - Vercel KV (https://vercel.com/docs/storage/vercel-kv)
 * - Redis with ioredis
 */

interface RateLimitConfig {
  interval: number // Time window in milliseconds
  maxRequests: number // Max requests per interval
}

interface RateLimitRecord {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitRecord>()

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of rateLimitStore.entries()) {
    if (record.resetTime < now) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

export async function rateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<{ success: boolean; remaining: number; resetTime: number }> {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)

  if (!record || record.resetTime < now) {
    // Create new record
    const resetTime = now + config.interval
    rateLimitStore.set(identifier, { count: 1, resetTime })
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetTime,
    }
  }

  if (record.count >= config.maxRequests) {
    // Rate limit exceeded
    return {
      success: false,
      remaining: 0,
      resetTime: record.resetTime,
    }
  }

  // Increment count
  record.count++
  rateLimitStore.set(identifier, record)

  return {
    success: true,
    remaining: config.maxRequests - record.count,
    resetTime: record.resetTime,
  }
}

// Preset configurations for different operations
export const rateLimits = {
  // Image generation: 10 per hour (expensive operation)
  imageGeneration: { interval: 60 * 60 * 1000, maxRequests: 10 },
  // Caption enhancement: 30 per hour
  captionEnhancement: { interval: 60 * 60 * 1000, maxRequests: 30 },
  // File upload: 20 per hour
  fileUpload: { interval: 60 * 60 * 1000, maxRequests: 20 },
}
