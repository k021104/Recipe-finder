export const getAIResponse = async (message, conversationHistory) => {
  const systemPrompt = {
    role: 'system',
    content:
      'You are a friendly recipe assistant. Keep your responses short, conversational and to the point. Max 2-3 lines per response. Only talk about food, recipes, ingredients and cooking tips.'
  }

  const formattedHistory = conversationHistory.map(msg => ({
    role: msg.sender === 'bot' ? 'assistant' : 'user',
    content: msg.text
  }))

  const messages = [
    systemPrompt,
    ...formattedHistory,
    { role: 'user', content: message }
  ]

  const response = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: messages
      })
    }
  )

  const data = await response.json()
  console.log(data)
  return data.choices[0].message.content

  console.log(import.meta.env.VITE_GROQ_API_KEY)
}
