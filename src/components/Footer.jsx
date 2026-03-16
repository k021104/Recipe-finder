import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../styles/Footer.css'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/categories', label: 'Categories' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/about', label: 'About' }
]

const CATEGORIES = [
  'Beef',
  'Chicken',
  'Dessert',
  'Pasta',
  'Seafood',
  'Vegetarian',
  'Breakfast',
  'Lamb'
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

export default function Footer () {
  const year = new Date().getFullYear()

  return (
    <footer className='footer'>
      <div className='footer-inner'>
        {/* ── Brand column ── */}
        <div className='footer-brand'>
          <Link to='/' className='footer-logo'>
            <LogoSVG />
            <span className='footer-wordmark'>
              Crav<em>es</em>
            </span>
          </Link>
          <p className='footer-tagline'>
            Discover, cook and savour 50,000+ recipes from every cuisine —
            completely free.
          </p>
          <p className='footer-powered'>
            Powered by{' '}
            <a
              href='https://www.themealdb.com'
              target='_blank'
              rel='noreferrer'
              className='footer-powered-link'
            >
              TheMealDB
            </a>
          </p>
        </div>

        {/* ── Quick links ── */}
        <div className='footer-col'>
          <h4 className='footer-col-title'>Quick Links</h4>
          <ul className='footer-links'>
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className='footer-link'>
                  <svg
                    width='12'
                    height='12'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <polyline points='9 18 15 12 9 6' />
                  </svg>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Categories ── */}
        <div className='footer-col'>
          <h4 className='footer-col-title'>Categories</h4>
          <ul className='footer-links'>
            {CATEGORIES.map(cat => (
              <li key={cat}>
                <Link to={`/category/${cat}`} className='footer-link'>
                  <svg
                    width='12'
                    height='12'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <polyline points='9 18 15 12 9 6' />
                  </svg>
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Newsletter ── */}
        <div className='footer-col footer-col--newsletter'>
          <h4 className='footer-col-title'>Stay Updated</h4>
          <p className='footer-newsletter-desc'>
            Get new recipes and cooking tips delivered to your inbox.
          </p>
          <form
            className='footer-newsletter'
            onSubmit={e => e.preventDefault()}
          >
            <input
              type='email'
              className='footer-email-input'
              placeholder='your@email.com'
            />
            <button className='footer-email-btn' type='submit'>
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
            </button>
          </form>
          <div className='footer-stats'>
            <div className='footer-stat'>
              <span className='footer-stat-n'>50K+</span>
              <span className='footer-stat-l'>Recipes</span>
            </div>
            <div className='footer-stat-div' />
            <div className='footer-stat'>
              <span className='footer-stat-n'>25+</span>
              <span className='footer-stat-l'>Cuisines</span>
            </div>
            <div className='footer-stat-div' />
            <div className='footer-stat'>
              <span className='footer-stat-n'>Free</span>
              <span className='footer-stat-l'>Always</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className='footer-bottom'>
        <div className='footer-bottom-inner'>
          <p className='footer-copy'>
            © {year} Craves. Made with ♥ for food lovers everywhere.
          </p>
          <div className='footer-bottom-links'>
            <a href='#' className='footer-bottom-link'>
              Privacy
            </a>
            <span className='footer-bottom-dot'>·</span>
            <a href='#' className='footer-bottom-link'>
              Terms
            </a>
            <span className='footer-bottom-dot'>·</span>
            <a
              href='https://www.themealdb.com'
              target='_blank'
              rel='noreferrer'
              className='footer-bottom-link'
            >
              TheMealDB API
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
