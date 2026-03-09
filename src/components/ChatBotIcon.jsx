import React, { useState } from 'react'
import ChatBot from './ChatBot'
import '../styles/ChatBot.css'

export default function ChatBotIcon ({ onAISearch }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className='chat-icon' onClick={() => setOpen(!open)}>
        💬
      </div>

      {open && <ChatBot onAISearch={onAISearch} />}
    </>
  )
}
