import React, { useState, useEffect, useRef } from 'react'
import '../styles/Navbar.css'
import { Link, NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/categories', label: 'Categories' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/about', label: 'About' }
]

const LogoSVG = () => (
  <svg width='32' height='32' viewBox='0 0 72 72' fill='none'>
    <ellipse cx='36' cy='55' rx='30' ry='5.5' fill='#B85C1F' opacity='.14' />
    <ellipse
      cx='36'
      cy='53'
      rx='28'
      ry='4.8'
      fill='#fff'
      stroke='#B85C1F'
      strokeWidth='1.8'
    />
    <ellipse cx='36' cy='53' rx='22' ry='3.2' fill='rgba(184,92,31,.09)' />
    <path
      d='M10 45 Q10 17 36 17 Q62 17 62 45 Z'
      fill='#fff'
      stroke='#B85C1F'
      strokeWidth='1.8'
      strokeLinejoin='round'
    />
    <path
      d='M18 38 Q22 24 36 20 Q46 18 54 26'
      fill='none'
      stroke='rgba(184,92,31,.11)'
      strokeWidth='5'
      strokeLinecap='round'
    />
    <rect x='8' y='42' width='56' height='6' rx='3' fill='#B85C1F' />
    <rect
      x='8'
      y='42'
      width='56'
      height='3'
      rx='1.5'
      fill='#DC823C'
      opacity='.65'
    />
    <ellipse cx='36' cy='17' rx='7.5' ry='4.5' fill='#B85C1F' />
    <ellipse cx='36' cy='15' rx='5.5' ry='3.2' fill='#DC823C' />
    <ellipse cx='36' cy='13.5' rx='2.8' ry='1.9' fill='#F5A55A' />
  </svg>
)

export default function Navbar () {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const fn = e => {
      if (isOpen && navRef.current && !navRef.current.contains(e.target))
        setIsOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [isOpen])

  useEffect(() => {
    const fn = () => {
      if (window.innerWidth >= 860) setIsOpen(false)
    }
    window.addEventListener('resize', fn, { passive: true })
    return () => window.removeEventListener('resize', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const close = () => setIsOpen(false)

  return (
    <header ref={navRef} className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className='nav__bar'>
        {/* Brand */}
        <Link to='/' className='nav__brand' onClick={close}>
          <span className='nav__logo'>
            <LogoSVG />
          </span>
          <span className='nav__wordmark'>
            Crav<em>es</em>
          </span>
        </Link>

        {/* Desktop center links */}
        <ul className='nav__links'>
          {LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `nav__link${isActive ? ' nav__link--on' : ''}`
                }
              >
                {label}
                <span className='nav__link-bar' />
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop right actions */}
        <div className='nav__actions'>
          <Link
            to='/favorites'
            className='nav__icon-btn'
            aria-label='Favorites'
          >
            <svg
              width='19'
              height='19'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
            </svg>
          </Link>
          <button className='nav__icon-btn' aria-label='Search'>
            <svg
              width='19'
              height='19'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='11' cy='11' r='8' />
              <line x1='21' y1='21' x2='16.65' y2='16.65' />
            </svg>
          </button>
          <Link to='/categories' className='nav__cta'>
            Explore
            <svg
              width='13'
              height='13'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.4'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='5' y1='12' x2='19' y2='12' />
              <polyline points='12 5 19 12 12 19' />
            </svg>
          </Link>
        </div>

        {/* Hamburger with proper X icon */}
        <button
          className={`nav__ham ${isOpen ? 'nav__ham--open' : ''}`}
          onClick={() => setIsOpen(v => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          type='button'
        >
          {/* Three lines */}
          <span className='nav__ham-lines'>
            <span className='nav__ham-line' />
            <span className='nav__ham-line' />
            <span className='nav__ham-line' />
          </span>
          {/* X icon */}
          <span className='nav__ham-x' aria-hidden='true'>
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.5'
              strokeLinecap='round'
            >
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`nav__drawer ${isOpen ? 'nav__drawer--open' : ''}`}
        aria-hidden={!isOpen}
      >
        <nav className='nav__drawer-body'>
          <ul className='nav__drawer-list'>
            {LINKS.map(({ to, label }, i) => (
              <li key={to} style={{ '--i': i }}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `nav__drawer-link${isActive ? ' nav__drawer-link--on' : ''}`
                  }
                  onClick={close}
                >
                  {label}
                  <svg
                    width='14'
                    height='14'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <line x1='5' y1='12' x2='19' y2='12' />
                    <polyline points='12 5 19 12 12 19' />
                  </svg>
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to='/categories' className='nav__drawer-cta' onClick={close}>
            Explore All Recipes
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
              <line x1='5' y1='12' x2='19' y2='12' />
              <polyline points='12 5 19 12 12 19' />
            </svg>
          </Link>
          <div className='nav__drawer-stats'>
            {[
              ['50K+', 'Recipes'],
              ['25+', 'Cuisines'],
              ['100%', 'Free']
            ].map(([n, l]) => (
              <div key={l} className='nav__drawer-stat'>
                <span className='nav__drawer-stat-n'>{n}</span>
                <span className='nav__drawer-stat-l'>{l}</span>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
