import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/TrendingRecipes.css'

/* ── Toast component ── */
const Toast = ({ icon, message, color, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2800)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div className='ts-toast'>
      <span
        className='ts-toast-icon'
        style={{ background: `${color}22`, color }}
      >
        {icon}
      </span>
      <span>{message}</span>
      <div className='ts-toast-bar' style={{ background: color }} />
    </div>
  )
}

/* ── Skeleton card ── */
const SkeletonCard = () => (
  <div className='ts-skeleton'>
    <div className='ts-sk-img' />
    <div className='ts-sk-body'>
      <div className='ts-sk-line' />
      <div className='ts-sk-line ts-sk-short' />
      <div className='ts-sk-line ts-sk-btn' />
    </div>
  </div>
)

/* ── Recipe card ── */
const TrendingCard = ({ meal, index, isFav, onFavToggle }) => {
  const navigate = useNavigate()
  const cardRef = useRef(null)

  /* 3D tilt on mouse move */
  const onMouseMove = e => {
    if (!cardRef.current) return
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width - 0.5) * 16
    const y = ((e.clientY - top) / height - 0.5) * -16
    cardRef.current.style.transform = `translateY(-10px) scale(1.02) perspective(700px) rotateY(${x}deg) rotateX(${y}deg)`
  }
  const onMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = ''
  }

  return (
    <article
      ref={cardRef}
      className='ts-card'
      style={{ '--ci': index }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => navigate(`/recipe/${meal.idMeal}`)}
    >
      {/* Favourite button */}
      <button
        className={`ts-fav ${isFav ? 'ts-fav--on' : ''}`}
        onClick={e => {
          e.stopPropagation()
          onFavToggle(meal)
        }}
        aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
        type='button'
      >
        <svg
          width='15'
          height='15'
          viewBox='0 0 24 24'
          fill={isFav ? '#e53e3e' : 'none'}
          stroke='#e53e3e'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
        </svg>
      </button>

      {/* Image */}
      <div className='ts-card-imgw'>
        <span className='ts-card-tag'>Recipe</span>
        <div className='ts-card-overlay' />
        <span className='ts-card-area'>{meal.strArea}</span>
        <img
          className='ts-card-img'
          src={meal.strMealThumb}
          alt={meal.strMeal}
          loading='lazy'
        />
      </div>

      {/* Body */}
      <div className='ts-card-body'>
        <span className='ts-card-cat'>{meal.strCategory}</span>
        <h3 className='ts-card-name'>{meal.strMeal}</h3>
        <div className='ts-card-foot'>
          <span className='ts-card-meta'>
            <svg
              width='11'
              height='11'
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
            {meal.cookTime || '30 min'}
          </span>
          <button
            className='ts-card-btn'
            onClick={e => {
              e.stopPropagation()
              navigate(`/recipe/${meal.idMeal}`)
            }}
            type='button'
          >
            View Recipe
            <svg
              width='11'
              height='11'
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
          </button>
        </div>
      </div>
    </article>
  )
}

/* ══════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════ */
export default function TrendingSlider () {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [favIds, setFavIds] = useState(new Set())
  const [cur, setCur] = useState(0)
  const [toast, setToast] = useState(null)
  const trackRef = useRef(null)
  const outerRef = useRef(null)

  /* Visible cards based on window width */
  const getVisible = () => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth < 480) return 1
    if (window.innerWidth < 768) return 2
    return 3
  }
  const [visible, setVisible] = useState(getVisible)

  useEffect(() => {
    const fn = () => setVisible(getVisible())
    window.addEventListener('resize', fn, { passive: true })
    return () => window.removeEventListener('resize', fn)
  }, [])

  /* Fetch trending — 10 random meals from TheMealDB */
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true)
        /* TheMealDB free tier: fetch multiple random meals */
        const results = await Promise.all(
          Array.from({ length: 10 }, () =>
            fetch('https://www.themealdb.com/api/json/v1/1/random.php')
              .then(r => r.json())
              .then(d => d.meals?.[0])
          )
        )
        /* Deduplicate by idMeal */
        const seen = new Set()
        const unique = results.filter(m => {
          if (!m || seen.has(m.idMeal)) return false
          seen.add(m.idMeal)
          return true
        })
        setMeals(unique)
      } catch (err) {
        console.error('TrendingSlider fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMeals()
  }, [])

  /* Load favourites from localStorage */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavIds(new Set(stored.map(f => f.idMeal)))
  }, [])

  /* Toggle favourite */
  const handleFav = useCallback(meal => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]')
    const exists = stored.find(f => f.idMeal === meal.idMeal)
    let updated
    if (exists) {
      updated = stored.filter(f => f.idMeal !== meal.idMeal)
      setToast({
        icon: '🗑️',
        message: 'Removed from favourites',
        color: '#B85C1F'
      })
    } else {
      updated = [...stored, meal]
      setToast({
        icon: '🔖',
        message: 'Saved to favourites!',
        color: '#B85C1F'
      })
    }
    localStorage.setItem('favorites', JSON.stringify(updated))
    setFavIds(new Set(updated.map(f => f.idMeal)))
  }, [])

  /* Slide navigation */
  const maxIndex = Math.max(0, meals.length - visible)

  const goTo = useCallback(
    i => {
      const next = Math.max(0, Math.min(i, maxIndex))
      setCur(next)
      if (trackRef.current) {
        const cardW = trackRef.current.children[0]?.offsetWidth || 0
        const gap = 20
        trackRef.current.style.transform = `translateX(-${
          next * (cardW + gap)
        }px)`
      }
    },
    [maxIndex]
  )

  /* Touch swipe */
  const touchX = useRef(0)
  const onTouchStart = e => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = e => {
    const diff = touchX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) goTo(cur + (diff > 0 ? 1 : -1))
  }

  const skeletons = Array.from({ length: 3 })

  return (
    <section className='ts-section'>
      {/* Toast */}
      {toast && <Toast {...toast} onDone={() => setToast(null)} />}

      <div className='ts-inner'>
        {/* Header */}
        <div className='ts-header'>
          <div>
            <p className='ts-tag'>🔥 Trending Now</p>
            <h2 className='ts-title'>
              What everyone's <em>cooking</em>
            </h2>
            {!loading && (
              <p className='ts-count'>{meals.length} trending recipes</p>
            )}
          </div>

          <div className='ts-header-right'>
            <a href='/categories' className='ts-viewall'>
              View All
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
                <line x1='5' y1='12' x2='19' y2='12' />
                <polyline points='12 5 19 12 12 19' />
              </svg>
            </a>
            <div className='ts-arrows'>
              <button
                className='ts-arr'
                onClick={() => goTo(cur - 1)}
                disabled={cur === 0}
                aria-label='Previous'
                type='button'
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <polyline points='15 18 9 12 15 6' />
                </svg>
              </button>
              <button
                className='ts-arr'
                onClick={() => goTo(cur + 1)}
                disabled={cur >= maxIndex}
                aria-label='Next'
                type='button'
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <polyline points='9 18 15 12 9 6' />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div
          className='ts-outer'
          ref={outerRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className='ts-track' ref={trackRef}>
            {loading
              ? skeletons.map((_, i) => <SkeletonCard key={i} />)
              : meals.map((meal, i) => (
                  <TrendingCard
                    key={meal.idMeal}
                    meal={meal}
                    index={i}
                    isFav={favIds.has(meal.idMeal)}
                    onFavToggle={handleFav}
                  />
                ))}
          </div>
        </div>

        {/* Progress dots */}
        {!loading && meals.length > 0 && (
          <div className='ts-dots'>
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                className={`ts-dot ${i === cur ? 'ts-dot--on' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                type='button'
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
