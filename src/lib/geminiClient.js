const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL ?? 'gemini-3.6-flash'

export async function generateAspectAIReply(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error('Missing VITE_GEMINI_API_KEY in your .env file.')
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are Aspect AI, the support assistant for Aspect. Answer clearly, briefly, and practically. Use plain language and keep your replies concise. User message: ${prompt}`,
              },
            ],
          },
        ],
      }),
    }
  )

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = payload?.error?.message || 'Gemini API request failed.'

    if (/suspended|Permission denied|API key/i.test(message)) {
      throw new Error('Your Gemini API key is suspended, invalid, or disabled. Create a new key in Google AI Studio, ensure billing is enabled if required, and update VITE_GEMINI_API_KEY in your .env file.')
    }

    throw new Error(message)
  }

  const text = payload?.candidates
    ?.map((candidate) => candidate?.content?.parts)
    ?.flat()
    ?.filter((part) => typeof part?.text === 'string')
    .map((part) => part.text)
    .join('')
    .trim()

  if (!text) {
    throw new Error('Gemini returned an empty response.')
  }

  return text
}
