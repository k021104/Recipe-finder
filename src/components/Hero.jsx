import React, { useState, useEffect, useRef, useCallback } from 'react'
import '../styles/Hero.css'

const SLIDES = [
  {
    id: 1,
    dish: 'Spaghetti Carbonara',
    tag: 'Italian',
    thumb:
      'https://images.ctfassets.net/u41cm62nxtp7/62UHWIwJN0woXdZDzUk5Ph/214fbcfc3720334d995de063ed9b4dee/spaghetti-carbonara.jpg?fm=webp'
  },
  {
    id: 2,
    dish: 'Chicken Tikka Masala',
    tag: 'British',
    thumb:
      'https://static.vecteezy.com/system/resources/previews/056/106/404/non_2x/chicken-tikka-masala-curry-in-a-bowl-on-a-white-background-free-png.png'
  },
  {
    id: 3,
    dish: 'Chocolate Lava Cake',
    tag: 'Dessert',
    thumb:
      'https://thumbs.dreamstime.com/b/lava-chocolate-cake-plate-top-view-isolated-brownie-decorated-fruits-white-png-transparent-background-362415459.jpg'
  },
  {
    id: 4,
    dish: 'Dal Makhani',
    tag: 'Indian',
    thumb:
      'https://www.shutterstock.com/image-photo/dal-makhani-isolated-on-white-600nw-1837738894.jpg'
  }
]

const PROOF = [
  { initials: 'AR', bg: '#B85C1F' },
  { initials: 'PK', bg: '#3D7A3A' },
  { initials: 'SL', bg: '#2B6CB0' },
  { initials: 'MR', bg: '#744210' },
  { initials: 'NT', bg: '#6B21A8' }
]

// const SPARK_COLORS = ['#B85C1F', '#DC823C', '#F5E6CC', '#F59E0B', '#B45309']

export default function Hero () {
  const [active, setActive] = useState(0)
  const [cursor, setCursor] = useState({ x: -200, y: -200 })
  const [curHover, setCurHover] = useState(false)
  const [labelTxt, setLabelTxt] = useState(SLIDES[0].dish)
  const [labelHide, setLabelHide] = useState(false)
  const timerRef = useRef(null)

  const isMobile = useCallback(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer:coarse)').matches,
    []
  )

  /* Custom cursor */
  useEffect(() => {
    if (isMobile()) return
    const move = e => setCursor({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [isMobile])

  /* Spark on click */
  useEffect(() => {
    if (isMobile()) return
    const onClick = e => {
      const burst = document.createElement('div')
      burst.className = 'glow-burst'
      burst.style.left = e.clientX + 'px'
      burst.style.top = e.clientY + 'px'
      document.body.appendChild(burst)
      setTimeout(() => burst.remove(), 520)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [isMobile])

  /* Carousel auto-cycle — 2.5s */
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(
      () => setActive(p => (p + 1) % SLIDES.length),
      2500
    )
  }, [])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  /* Animate dish label on change */
  useEffect(() => {
    setLabelHide(true)
    const t = setTimeout(() => {
      setLabelTxt(SLIDES[active].dish)
      setLabelHide(false)
    }, 300)
    return () => clearTimeout(t)
  }, [active])

  const goTo = i => {
    setActive(i)
    startTimer()
  }

  return (
    <>
      {/* Spark cursor — desktop only */}
      {!isMobile() && (
        <div
          className={`glow-cursor ${curHover ? 'glow-cursor--hover' : ''}`}
          style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
          aria-hidden='true'
        >
          <div className='glow-cursor__blob' />
          <div className='glow-cursor__dot' />
        </div>
      )}

      <section className='hero' aria-label='Hero'>
        <div className='hero__split'>
          {/* ── LEFT ── */}
          <div className='hero__left'>
            <p className='hero__tag'>Discover · Cook · Savour</p>

            <h1 className='hero__title'>
              it's not just
              <br />
              Food, It's an
              <br />
              <em>Experience.</em>
            </h1>

            <p className='hero__desc'>
              Explore 50,000+ real recipes — Italian pasta, Indian curries,
              dreamy desserts and more. Powered by TheMealDB, completely free.
            </p>

            <div className='hero__btns'>
              <a
                href='#search'
                className='hero__btn hero__btn--solid'
                onMouseEnter={() => setCurHover(true)}
                onMouseLeave={() => setCurHover(false)}
              >
                Explore Recipes
              </a>
              <a
                href='/categories'
                className='hero__btn hero__btn--outline'
                onMouseEnter={() => setCurHover(true)}
                onMouseLeave={() => setCurHover(false)}
              >
                Browse Menu
              </a>
            </div>

            {/* Initials avatars */}
            <div className='hero__proof'>
              <div className='hero__avatars'>
                {PROOF.map(({ initials, bg }) => (
                  <div
                    key={initials}
                    className='hero__avatar'
                    style={{ background: bg }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div className='hero__stars'>★★★★★</div>
                <p className='hero__proof-txt'>
                  <strong>12,000+</strong> happy cooks
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT — Carousel ── */}
          <div className='hero__right'>
            {/* Badge */}
            <div className='hero__badge'>
              <svg
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
              </svg>
              <div>
                <span className='hero__badge-main'>50K+</span>
                <span className='hero__badge-sub'>Recipes to Explore</span>
              </div>
            </div>

            {/* Circular carousel */}
            <div className='hero__carousel'>
              <div className='hero__carousel-glow' />

              {SLIDES.map((s, i) => (
                <div
                  key={s.id}
                  className={`hero__slide ${
                    i === active ? 'hero__slide--active' : ''
                  }`}
                >
                  <span className='hero__slide-tag'>{s.tag}</span>
                  <img
                    src={s.thumb}
                    alt={s.dish}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}

              {/* Dish label */}
              <div
                className={`hero__dish-label ${
                  labelHide ? 'hero__dish-label--hidden' : ''
                }`}
              >
                {labelTxt}
              </div>

              {/* Progress dots */}
              <div className='hero__dots'>
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    className={`hero__dot ${
                      i === active ? 'hero__dot--on' : ''
                    }`}
                    onClick={() => goTo(i)}
                    aria-label={`Slide ${i + 1}`}
                    type='button'
                  />
                ))}
              </div>
            </div>

            {/* Chips — evenly on circle border */}
            <div className='hero__chips' aria-hidden='true'>
              <div className='hero__chip hero__chip--1'>
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
                Quick Recipes
              </div>
              <div className='hero__chip hero__chip--2'>
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
                  <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
                </svg>
                Free Forever
              </div>
              <div className='hero__chip hero__chip--3'>
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
                  <line x1='2' y1='12' x2='22' y2='12' />
                  <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
                </svg>
                25+ Cuisines
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
