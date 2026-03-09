import React, { useState } from 'react'
import '../styles/ChatBot.css'
import { getAIResponse } from '../services/aiApi'

export default function ChatBot ({ onAISearch }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = {
      sender: 'user',
      text: input
    }

    setMessages(prev => [...prev, userMessage])

    setTyping(true)

    await new Promise(resolve => setTimeout(resolve, 800))

    const reply = await getAIResponse(input, messages)

    const botMessage = {
      sender: 'bot',
      text: reply
    }

    setTyping(false)

    setMessages(prev => [...prev, botMessage])

    if (onAISearch) {
      onAISearch(input)
    }

    setInput('')
  }

  return (
    <div className='chatbot-container'>
      <div className='chat-header'>Recipe AI Assistant</div>

      <div className='chat-messages'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            {msg.text}
          </div>
        ))}

        {typing && <div className='chat-bubble bot'>Bot is typing...</div>}
      </div>

      <div className='chat-input'>
        <input
          type='text'
          placeholder='Ask about recipes...'
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />

        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}
