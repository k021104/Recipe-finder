import React, { useState, useRef, useEffect } from 'react'
import '../styles/ChatBot.css'
import { getAIResponse } from '../services/aiApi'

/* ── Typing dots indicator ── */
const TypingDots = () => (
  <div className='chat-bubble bot'>
    <div className='typing-dots'>
      <span />
      <span />
      <span />
    </div>
  </div>
)

export default function ChatBot ({ onAISearch }) {
  /* ── Original logic — UNCHANGED ── */
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setTyping(true)

    await new Promise(resolve => setTimeout(resolve, 800))

    const reply = await getAIResponse(input, messages)
    const botMessage = { sender: 'bot', text: reply }

    setTyping(false)
    setMessages(prev => [...prev, botMessage])

    if (onAISearch) onAISearch(input)
    setInput('')
  }

  /* ── Auto scroll to bottom on new message ── */
  const messagesEndRef = useRef(null)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  return (
    <div className='chatbot-container'>
      {/* ── Header ── */}
      <div className='chat-header'>
        <div>
          <span className='chat-header-title'>
            Recipe AI
            <span className='chat-header-sub'>Powered by Craves</span>
          </span>
        </div>
        <div className='chat-header-status'>
          <span className='chat-header-dot' />
          Online
        </div>
      </div>

      {/* ── Messages ── */}
      <div className='chat-messages'>
        {/* Welcome message if no messages yet */}
        {messages.length === 0 && !typing && (
          <div className='chat-bubble bot'>
            👋 Hi! Ask me anything about recipes — I can suggest dishes,
            ingredients, or help you find something to cook!
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            {msg.text}
          </div>
        ))}

        {/* Typing indicator — replaces "Bot is typing..." text */}
        {typing && <TypingDots />}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input ── */}
      <div className='chat-input'>
        <input
          type='text'
          placeholder='Ask about recipes...'
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} type='button'>
          Send
        </button>
      </div>
    </div>
  )
}
