import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/About.css'

const TEAM = [
  {
    initials: 'AR',
    name: 'Aryan Rathod',
    role: 'UI/UX Designer',
    bg: '#B85C1F'
  },
  {
    initials: 'PK',
    name: 'Priya Kulkarni',
    role: 'Frontend Developer',
    bg: '#3D7A3A'
  },
  { initials: 'SL', name: 'Sara Lopez', role: 'Recipe Curator', bg: '#2B6CB0' }
]

const STATS = [
  { num: '50K+', label: 'Recipes' },
  { num: '25+', label: 'Cuisines' },
  { num: '100%', label: 'Free' },
  { num: '14', label: 'Categories' }
]

const FEATURES = [
  {
    icon: (
      <svg
        width='22'
        height='22'
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
    ),
    title: 'Smart Search',
    desc: 'Search 50,000+ recipes by name, ingredient, or cuisine instantly.'
  },
  {
    icon: (
      <svg
        width='22'
        height='22'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
      </svg>
    ),
    title: 'Save Favourites',
    desc: 'Bookmark your favourite recipes and access them anytime, offline too.'
  },
  {
    icon: (
      <svg
        width='22'
        height='22'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2' />
        <path d='M7 2v20' />
        <path d='M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7' />
      </svg>
    ),
    title: '14 Categories',
    desc: 'Beef, Chicken, Dessert, Pasta, Seafood and more — filtered by category.'
  },
  {
    icon: (
      <svg
        width='22'
        height='22'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <polygon points='23 7 16 12 23 17 23 7' />
        <rect x='1' y='5' width='15' height='14' rx='2' ry='2' />
      </svg>
    ),
    title: 'Video Tutorials',
    desc: 'Watch step-by-step YouTube cooking videos for every recipe.'
  },
  {
    icon: (
      <svg
        width='22'
        height='22'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <circle cx='12' cy='12' r='10' />
        <line x1='2' y1='12' x2='22' y2='12' />
        <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
      </svg>
    ),
    title: '25+ Cuisines',
    desc: 'Explore authentic dishes from Italy, India, Mexico, Japan and beyond.'
  },
  {
    icon: (
      <svg
        width='22'
        height='22'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <rect x='2' y='3' width='20' height='14' rx='2' ry='2' />
        <line x1='8' y1='21' x2='16' y2='21' />
        <line x1='12' y1='17' x2='12' y2='21' />
      </svg>
    ),
    title: 'Fully Responsive',
    desc: 'Works beautifully on desktop, tablet and mobile — cook anywhere.'
  }
]

export default function About () {
  const navigate = useNavigate()

  return (
    <div className='about-page'>
      {/* ── Hero ── */}
      <div className='ab-hero'>
        <p className='ab-hero-tag'>About Craves</p>
        <h1 className='ab-hero-title'>
          Made with <em>Love</em> for
          <br />
          Food Lovers
        </h1>
        <p className='ab-hero-sub'>
          Craves is a free recipe discovery app powered by TheMealDB — helping
          you find, save and cook amazing meals from every corner of the world.
        </p>
        <div className='ab-hero-btns'>
          <button
            className='ab-btn ab-btn--solid'
            onClick={() => navigate('/')}
            type='button'
          >
            Explore Recipes
          </button>
          <button
            className='ab-btn ab-btn--outline'
            onClick={() => navigate('/categories')}
            type='button'
          >
            Browse Categories
          </button>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className='ab-stats'>
        {STATS.map(({ num, label }) => (
          <div key={label} className='ab-stat'>
            <span className='ab-stat-n'>{num}</span>
            <span className='ab-stat-l'>{label}</span>
          </div>
        ))}
      </div>

      {/* ── Mission ── */}
      <section className='ab-section ab-mission'>
        <div className='ab-section-inner'>
          <div className='ab-section-text'>
            <p className='ab-section-tag'>Our Mission</p>
            <h2 className='ab-section-title'>
              Bringing the World's
              <br />
              <em>Best Recipes</em> to You
            </h2>
            <p className='ab-section-desc'>
              We believe great cooking should be accessible to everyone. Whether
              you're a beginner making your first pasta or an experienced cook
              exploring Indian curries — Craves has something for you.
            </p>
            <p className='ab-section-desc'>
              Powered by TheMealDB's open API, every recipe comes with full
              ingredients, step-by-step instructions, and a YouTube video to
              guide you.
            </p>
          </div>
          <div className='ab-mission-visual'>
            <div className='ab-mission-card'>
              <div className='ab-mission-emoji'>🍽️</div>
              <h3>Discover</h3>
              <p>Search 50K+ recipes from every cuisine worldwide</p>
            </div>
            <div className='ab-mission-card'>
              <div className='ab-mission-emoji'>👨‍🍳</div>
              <h3>Cook</h3>
              <p>Follow step-by-step instructions with video guides</p>
            </div>
            <div className='ab-mission-card'>
              <div className='ab-mission-emoji'>♥</div>
              <h3>Save</h3>
              <p>Bookmark your favourites and build your collection</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className='ab-section ab-features'>
        <div className='ab-section-inner ab-section-inner--center'>
          <p className='ab-section-tag'>Features</p>
          <h2 className='ab-section-title'>Everything You Need</h2>
          <p className='ab-section-desc ab-section-desc--center'>
            Built with React and TheMealDB API — fast, free and always
            improving.
          </p>
          <div className='ab-features-grid'>
            {FEATURES.map(({ icon, title, desc }, i) => (
              <div
                key={title}
                className='ab-feature-card'
                style={{ '--fi': i }}
              >
                <div className='ab-feature-icon'>{icon}</div>
                <h3 className='ab-feature-title'>{title}</h3>
                <p className='ab-feature-desc'>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className='ab-section ab-team'>
        <div className='ab-section-inner ab-section-inner--center'>
          <p className='ab-section-tag'>The Team</p>
          <h2 className='ab-section-title'>Built by Food Lovers</h2>
          <div className='ab-team-grid'>
            {TEAM.map(({ initials, name, role, bg }) => (
              <div key={name} className='ab-team-card'>
                <div className='ab-team-avatar' style={{ background: bg }}>
                  {initials}
                </div>
                <h3 className='ab-team-name'>{name}</h3>
                <p className='ab-team-role'>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className='ab-cta'>
        <div className='ab-cta-inner'>
          <h2 className='ab-cta-title'>
            Ready to Start <em>Cooking?</em>
          </h2>
          <p className='ab-cta-sub'>
            Join thousands of food lovers discovering new recipes every day.
          </p>
          <button
            className='ab-btn ab-btn--solid ab-btn--large'
            onClick={() => navigate('/')}
            type='button'
          >
            Start Exploring
            <svg
              width='16'
              height='16'
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
          </button>
        </div>
      </section>
    </div>
  )
}
