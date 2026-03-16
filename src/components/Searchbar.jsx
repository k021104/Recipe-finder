import React, { useState, useEffect, useRef } from 'react'
import '../styles/Searchbar.css'

/* ── Typewriter phrases ── */
const PHRASES = [
  'Search for pasta recipes...',
  'Find healthy breakfast ideas...',
  'Try chocolate dessert recipes...',
  'Discover Indian curry dishes...',
  'Explore Italian classics...',
  'Looking for quick 20-min meals?'
]

/* ── Recent searches ── */
const RECENT = [
  { emoji: '🍝', label: 'Spaghetti Carbonara' },
  { emoji: '🫘', label: 'Dal Makhani' },
  { emoji: '🍫', label: 'Chocolate Lava Cake' },
  { emoji: '🥩', label: 'Beef Wellington' },
  { emoji: '🥗', label: 'Pasta Salad' }
]

/* ── All searchable suggestions ── */
const SUGGESTIONS = [
  { emoji: '🍝', label: 'Spaghetti Carbonara' },
  { emoji: '🍕', label: 'Margherita Pizza' },
  { emoji: '🫘', label: 'Dal Makhani' },
  { emoji: '🍛', label: 'Butter Chicken' },
  { emoji: '🍫', label: 'Chocolate Lava Cake' },
  { emoji: '🥮', label: 'Tiramisu' },
  { emoji: '🥩', label: 'Beef Wellington' },
  { emoji: '🦐', label: 'Prawn Curry' },
  { emoji: '🥗', label: 'Pasta Salad' },
  { emoji: '🥞', label: 'Pancakes' },
  { emoji: '🍜', label: 'Ramen' },
  { emoji: '🌮', label: 'Tacos' },
  { emoji: '🥘', label: 'Paella' },
  { emoji: '🍱', label: 'Sushi' }
]

/* ── Suggestion chips ── */
const CHIPS = [
  { emoji: '🍝', label: 'Pasta' },
  { emoji: '🍫', label: 'Dessert' },
  { emoji: '🫘', label: 'Indian' },
  { emoji: '🦐', label: 'Seafood' },
  { emoji: '🥞', label: 'Breakfast' },
  { emoji: '🥗', label: 'Vegetarian' }
]

export default function Searchbar ({ onSearch }) {
  /* ── Original logic — UNCHANGED ── */
  const [query, setQuery] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
    onSearch(query)
  }

  /* ── UI state ── */
  const [focused, setFocused] = useState(false)
  const [phText, setPhText] = useState('')
  const [phPaused, setPhPaused] = useState(false)

  /* dropdown mode:
     'none'    = closed
     'recent'  = show recent searches (no query)
     'suggest' = show filtered suggestions (has query)
  */
  const [dropMode, setDropMode] = useState('none')

  const wrapRef = useRef(null)
  const inputRef = useRef(null)
  const twRef = useRef(null)

  /* ── Filtered suggestions based on query ── */
  const filtered =
    query.trim().length > 0
      ? SUGGESTIONS.filter(s =>
          s.label.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6)
      : []

  /* ── Dropdown logic ──
     - focus + no query  → show recent
     - typing query      → show filtered suggestions (if any)
     - query clears      → back to recent
  */
  useEffect(() => {
    if (!focused) {
      setDropMode('none')
      return
    }
    if (query.trim().length === 0) setDropMode('recent')
    else setDropMode(filtered.length > 0 ? 'suggest' : 'none')
  }, [focused, query, filtered.length])

  /* ── Typewriter ── */
  useEffect(() => {
    let pi = 0,
      ci = 0,
      typing = true
    const step = () => {
      if (phPaused || query.length > 0) {
        twRef.current = setTimeout(step, 120)
        return
      }
      const phrase = PHRASES[pi]
      if (typing) {
        if (ci < phrase.length) {
          setPhText(phrase.slice(0, ++ci))
          twRef.current = setTimeout(step, 48 + Math.random() * 28)
        } else {
          typing = false
          twRef.current = setTimeout(step, 1600)
        }
      } else {
        if (ci > 0) {
          setPhText(phrase.slice(0, --ci))
          twRef.current = setTimeout(step, 26)
        } else {
          typing = true
          pi = (pi + 1) % PHRASES.length
          twRef.current = setTimeout(step, 300)
        }
      }
    }
    step()
    return () => clearTimeout(twRef.current)
  }, [phPaused, query])

  /* ── Outside click closes dropdown ── */
  useEffect(() => {
    const fn = e => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  /* Fill input from dropdown / chip */
  const fill = val => {
    setQuery(val)
    setFocused(false)
    inputRef.current?.blur()
  }

  /* Clear */
  const clearInput = () => {
    setQuery('')
    inputRef.current?.focus()
  }

  const dropOpen = dropMode !== 'none'

  return (
    <div className='sb-section'>
      <p className='sb-section-tag'>Search</p>
      <h2 className='sb-section-title'>
        What are you <em>craving?</em>
      </h2>
      <p className='sb-section-sub'>
        50,000+ recipes from every cuisine — find yours
      </p>

      <div className='searchbar-wrapper' ref={wrapRef}>
        {/* ══ FORM ══ */}
        <form
          className={`searchbar-form ${
            focused ? 'searchbar-form--focused' : ''
          }`}
          onSubmit={handleSubmit}
        >
          {/* Search icon */}
          <span
            className={`sb-icon-left ${focused ? 'sb-icon-left--focused' : ''}`}
          >
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='11' cy='11' r='8' />
              <line x1='21' y1='21' x2='16.65' y2='16.65' />
            </svg>
          </span>

          {/* Typewriter placeholder — hidden on focus */}
          {!query && !phPaused && (
            <span className='sb-placeholder' aria-hidden='true'>
              {phText}
              <span className='sb-cursor-blink' />
            </span>
          )}

          {/* Original input */}
          <input
            ref={inputRef}
            className='searchbar-input'
            type='text'
            placeholder=''
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => {
              setFocused(true)
              setPhPaused(true) /* stop typewriter on focus */
            }}
            onBlur={() => {
              /* slight delay so dropdown clicks register */
              setTimeout(() => {
                setFocused(false)
                if (!query) setPhPaused(false) /* resume if no query */
              }, 160)
            }}
          />

          {/* Clear button */}
          <button
            className={`sb-clear ${query ? 'sb-clear--visible' : ''}`}
            type='button'
            onClick={clearInput}
            tabIndex={-1}
            aria-label='Clear search'
          >
            <svg
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.5'
              strokeLinecap='round'
            >
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </button>

          {/* Original submit */}
          <button className='searchbar-btn' type='submit'>
            <svg
              width='15'
              height='15'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='11' cy='11' r='8' />
              <line x1='21' y1='21' x2='16.65' y2='16.65' />
            </svg>
            <span>Search</span>
          </button>
        </form>

        {/* ══ DROPDOWN — BELOW searchbar ══ */}
        <div className={`sb-dropdown ${dropOpen ? 'sb-dropdown--open' : ''}`}>
          {/* RECENT SEARCHES — shown when no query */}
          {dropMode === 'recent' && (
            <>
              <p className='sb-dropdown-header'>Recent Searches</p>
              {RECENT.map(({ emoji, label }) => (
                <div
                  key={label}
                  className='sb-dropdown-item'
                  onMouseDown={() => fill(label)}
                >
                  <span className='sb-di-icon sb-di-icon--clock'>
                    <svg
                      width='13'
                      height='13'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <circle cx='12' cy='12' r='10' />
                      <polyline points='12 6 12 12 16 14' />
                    </svg>
                  </span>
                  <span className='sb-di-emoji'>{emoji}</span>
                  <span className='sb-di-text'>{label}</span>
                  <span
                    className='sb-di-remove'
                    onMouseDown={e => e.stopPropagation()}
                  >
                    ✕
                  </span>
                </div>
              ))}
            </>
          )}

          {/* FILTERED SUGGESTIONS — shown when typing */}
          {dropMode === 'suggest' && (
            <>
              {filtered.map(({ emoji, label }) => {
                /* Bold the matched part */
                const idx = label.toLowerCase().indexOf(query.toLowerCase())
                const before = label.slice(0, idx)
                const match = label.slice(idx, idx + query.length)
                const after = label.slice(idx + query.length)
                return (
                  <div
                    key={label}
                    className='sb-dropdown-item'
                    onMouseDown={() => fill(label)}
                  >
                    <span className='sb-di-icon'>{emoji}</span>
                    <span className='sb-di-text'>
                      {before}
                      <strong className='sb-di-match'>{match}</strong>
                      {after}
                    </span>
                    <svg
                      width='13'
                      height='13'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      style={{ opacity: 0.35, flexShrink: 0 }}
                    >
                      <line x1='5' y1='12' x2='19' y2='12' />
                      <polyline points='12 5 19 12 12 19' />
                    </svg>
                  </div>
                )
              })}
            </>
          )}
        </div>

        {/* ── Suggestion chips ── */}
        <div className='sb-chips'>
          {CHIPS.map(({ emoji, label }) => (
            <button
              key={label}
              className='sb-chip'
              type='button'
              onClick={() => {
                fill(label)
                onSearch(label)
              }}
            >
              {emoji} {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
