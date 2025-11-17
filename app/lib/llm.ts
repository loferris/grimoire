/**
 * LLM Provider Abstraction Layer
 *
 * Supports multiple LLM providers with a unified interface.
 * Configure via environment variables:
 * - LLM_PROVIDER: 'openai' | 'openrouter' (default: 'openai')
 * - LLM_MODEL: Model identifier for the selected provider
 * - LLM_API_KEY: API key for the selected provider
 * - LLM_BASE_URL: Optional custom base URL (for OpenRouter or custom endpoints)
 */

import OpenAI from 'openai'

type LLMProvider = 'openai' | 'openrouter'

interface LLMConfig {
  provider: LLMProvider
  model: string
  apiKey: string
  baseURL?: string
}

class LLMClient {
  private client: OpenAI
  private model: string

  constructor(config: LLMConfig) {
    this.model = config.model

    // OpenAI SDK works with OpenRouter too - just change the baseURL
    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseURL || this.getDefaultBaseURL(config.provider),
    })
  }

  private getDefaultBaseURL(provider: LLMProvider): string | undefined {
    switch (provider) {
      case 'openrouter':
        return 'https://openrouter.ai/api/v1'
      case 'openai':
      default:
        return undefined // Use OpenAI's default
    }
  }

  async chat(messages: { role: 'system' | 'user' | 'assistant'; content: string }[], options?: {
    maxTokens?: number
    temperature?: number
  }): Promise<string> {
    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages,
      max_tokens: options?.maxTokens || 100,
      temperature: options?.temperature ?? 0.8,
    })

    const content = completion.choices[0]?.message?.content?.trim()

    if (!content) {
      throw new Error('No response from LLM')
    }

    return content
  }
}

// Singleton instance configuration
function getLLMConfig(): LLMConfig {
  const provider = (process.env.LLM_PROVIDER || 'openai') as LLMProvider

  // Model defaults per provider
  const defaultModels: Record<LLMProvider, string> = {
    openai: 'gpt-4',
    openrouter: 'anthropic/claude-3.5-sonnet', // or any OpenRouter model
  }

  const model = process.env.LLM_MODEL || defaultModels[provider]
  const apiKey = process.env.LLM_API_KEY || process.env.OPENAI_API_KEY || ''
  const baseURL = process.env.LLM_BASE_URL

  if (!apiKey) {
    throw new Error(`Missing API key for LLM provider: ${provider}. Set LLM_API_KEY or OPENAI_API_KEY`)
  }

  return {
    provider,
    model,
    apiKey,
    baseURL,
  }
}

// Export singleton instance
export const llm = new LLMClient(getLLMConfig())

// Export for testing or custom instances
export { LLMClient, type LLMConfig, type LLMProvider }
