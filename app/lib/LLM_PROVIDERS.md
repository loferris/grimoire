# LLM Provider Configuration

The app uses an abstraction layer for LLM providers, making it easy to switch between OpenAI, OpenRouter, or any OpenAI-compatible API.

## Quick Start

### Using OpenAI (Default)

```bash
LLM_PROVIDER=openai
LLM_API_KEY=sk-proj-xxx
# Optional: LLM_MODEL=gpt-4
```

### Using OpenRouter

```bash
LLM_PROVIDER=openrouter
LLM_API_KEY=sk-or-v1-xxx
LLM_MODEL=anthropic/claude-3.5-sonnet
```

### Using Custom OpenAI-Compatible API

```bash
LLM_PROVIDER=openai
LLM_API_KEY=your-api-key
LLM_BASE_URL=https://your-custom-endpoint.com/v1
LLM_MODEL=your-model-name
```

## Configuration Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `LLM_PROVIDER` | Provider type: `openai` or `openrouter` | `openai` |
| `LLM_API_KEY` | API key for the selected provider | Falls back to `OPENAI_API_KEY` |
| `LLM_MODEL` | Model identifier | `gpt-4` (OpenAI)<br>`anthropic/claude-3.5-sonnet` (OpenRouter) |
| `LLM_BASE_URL` | Custom API endpoint | Auto-set per provider |

## Supported Providers

### OpenAI
- **Base URL**: Default OpenAI endpoint
- **Models**: `gpt-4`, `gpt-4-turbo`, `gpt-3.5-turbo`, etc.
- **Docs**: https://platform.openai.com/docs

### OpenRouter
- **Base URL**: `https://openrouter.ai/api/v1`
- **Models**: All models from https://openrouter.ai/models
  - `anthropic/claude-3.5-sonnet`
  - `openai/gpt-4`
  - `google/gemini-pro`
  - `meta-llama/llama-3.1-70b-instruct`
  - And many more!
- **Docs**: https://openrouter.ai/docs

## Adding a New Provider

1. Update the `LLMProvider` type in `/app/lib/llm.ts`:
   ```typescript
   type LLMProvider = 'openai' | 'openrouter' | 'your-provider'
   ```

2. Add the base URL in `getDefaultBaseURL()`:
   ```typescript
   case 'your-provider':
     return 'https://api.your-provider.com/v1'
   ```

3. Add a default model in `getLLMConfig()`:
   ```typescript
   const defaultModels: Record<LLMProvider, string> = {
     openai: 'gpt-4',
     openrouter: 'anthropic/claude-3.5-sonnet',
     'your-provider': 'your-default-model',
   }
   ```

That's it! The provider will work as long as it's OpenAI-compatible.

## Usage in Code

The abstraction is already used throughout the app. To use it in new features:

```typescript
import { llm } from '@/lib/llm'

const response = await llm.chat(
  [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Hello!' },
  ],
  {
    maxTokens: 100,
    temperature: 0.8,
  }
)
```

## Why OpenRouter?

OpenRouter provides:
- **Access to 100+ models** from one API
- **Unified billing** across all providers
- **Automatic failover** between models
- **Cost optimization** with model routing
- **No rate limits** on most models
