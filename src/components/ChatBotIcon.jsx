import React, { useState } from 'react'
import ChatBot from './ChatBot'
import '../styles/ChatBot.css'

export default function ChatBotIcon ({ onAISearch }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating action button */}
      <div
        className='chat-icon'
        onClick={() => setOpen(!open)}
        title={open ? 'Close chat' : 'Ask Recipe AI'}
        role='button'
        aria-label={open ? 'Close Recipe AI' : 'Open Recipe AI'}
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setOpen(!open)}
      >
        {open ? (
          /* X icon when open */
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#ffffff'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='18' y1='6' x2='6' y2='18' />
            <line x1='6' y1='6' x2='18' y2='18' />
          </svg>
        ) : (
          /* Chat sparkle icon when closed */
          <svg
            width='22'
            height='22'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#ffffff'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
            <line x1='9' y1='10' x2='9' y2='10' />
            <line x1='12' y1='10' x2='12' y2='10' />
            <line x1='15' y1='10' x2='15' y2='10' />
          </svg>
        )}
      </div>

      {open && <ChatBot onAISearch={onAISearch} />}
    </>
  )
}
