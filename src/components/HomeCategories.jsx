import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/HomeCategories.css'

const CATEGORIES = [
  {
    name: 'Beef',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z' />
        <path d='M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z' />
        <path d='M12 8V6M12 18v-2M8 12H6M18 12h-2' />
      </svg>
    )
  },
  {
    name: 'Chicken',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M20 10c0 4.4-3.6 8-8 8H8l-2 4h12' />
        <path d='M8 18c0 0-2-2-2-6 0-5.5 4-8 6-8 1 0 4 .5 4 3 0 1.5-1.5 2-1.5 2' />
        <circle cx='15' cy='7' r='1' fill='currentColor' />
      </svg>
    )
  },
  {
    name: 'Dessert',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M12 2a5 5 0 0 1 5 5c0 2-1 3.5-2.5 4.5L16 20H8l1.5-8.5C8 10.5 7 9 7 7a5 5 0 0 1 5-5z' />
        <path d='M8 20h8' />
        <path d='M10 7h4' />
      </svg>
    )
  },
  {
    name: 'Pasta',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M3 12c0 5 3.6 8 9 8s9-3 9-8' />
        <path d='M3 12c0-2 1-3.5 3-4' />
        <path d='M21 12c0-2-1-3.5-3-4' />
        <path d='M12 4v4M8 5v3M16 5v3' />
        <ellipse cx='12' cy='12' rx='4' ry='2' />
      </svg>
    )
  },
  {
    name: 'Seafood',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M20 12c0 0-2-6-8-6S4 12 4 12s2 6 8 6 8-6 8-6z' />
        <circle cx='15' cy='11' r='1' fill='currentColor' />
        <path d='M4 12c-2 0-2-2-2-2M20 12c2 0 2-2 2-2' />
        <path d='M8 14c0 1 .5 2 1.5 2' />
      </svg>
    )
  },
  {
    name: 'Vegetarian',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M12 22V12' />
        <path d='M12 12C12 7 17 3 21 4c0 5-3 8-9 8z' />
        <path d='M12 12C12 7 7 3 3 4c0 5 3 8 9 8z' />
        <path d='M12 12c0 4-2 7-2 10' />
      </svg>
    )
  },
  {
    name: 'Breakfast',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M18 8h1a4 4 0 0 1 0 8h-1' />
        <path d='M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z' />
        <line x1='6' y1='1' x2='6' y2='4' />
        <line x1='10' y1='1' x2='10' y2='4' />
        <line x1='14' y1='1' x2='14' y2='4' />
      </svg>
    )
  },
  {
    name: 'Lamb',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <ellipse cx='12' cy='10' rx='6' ry='5' />
        <circle cx='9' cy='8' r='1.5' fill='currentColor' stroke='none' />
        <circle cx='15' cy='8' r='1.5' fill='currentColor' stroke='none' />
        <path d='M9 17v4M15 17v4' />
        <path d='M6 10c-2 0-3 1-3 2.5S4 15 6 15' />
        <path d='M18 10c2 0 3 1 3 2.5S20 15 18 15' />
      </svg>
    )
  },
  {
    name: 'Pork',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M3 11l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2' />
        <path d='M5 11v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5' />
        <path d='M8 18v2M16 18v2' />
      </svg>
    )
  },
  {
    name: 'Vegan',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M2 22c1-4 4-7 10-8' />
        <path d='M16 3s-8 2-8 11c0 0 2-4 6-6' />
        <path d='M22 3s-2 8-8 11c0 0 2-5 1-9' />
      </svg>
    )
  },
  {
    name: 'Starter',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z' />
      </svg>
    )
  },
  {
    name: 'Side',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M3 6h18M3 12h18M3 18h18' />
        <circle cx='7' cy='6' r='1' fill='currentColor' stroke='none' />
        <circle cx='7' cy='12' r='1' fill='currentColor' stroke='none' />
        <circle cx='7' cy='18' r='1' fill='currentColor' stroke='none' />
      </svg>
    )
  }
]

export default function HomeCategoriesSection ({ onCategorySelect }) {
  const [active, setActive] = useState(null)
  const navigate = useNavigate()

  const handleClick = name => {
    setActive(name)
    if (onCategorySelect) {
      onCategorySelect(name)
    } else {
      navigate(`/category/${name}`)
    }
  }

  return (
    <section className='hcs-section'>
      <div className='hcs-inner'>
        <div className='hcs-header'>
          <p className='hcs-tag'>Categories</p>
          <h2 className='hcs-title'>
            What are you in the <em>mood</em> for?
          </h2>
        </div>

        <div className='hcs-grid'>
          {CATEGORIES.map(({ name, icon }, i) => (
            <button
              key={name}
              className={`hcs-pill ${
                active === name ? 'hcs-pill--active' : ''
              }`}
              style={{ '--pi': i }}
              onClick={() => handleClick(name)}
              type='button'
            >
              <span className='hcs-pill-icon'>{icon}</span>
              <span className='hcs-pill-name'>{name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
