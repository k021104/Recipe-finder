import React, { useEffect, useState, useRef } from 'react'
import { getCategories } from '../services/recipeApi'
import { useNavigate } from 'react-router-dom'
import '../styles/Category.css'

/* ── Skeleton card ── */
const SkeletonCard = () => (
  <div className='cat-skeleton'>
    <div className='cat-sk-img' />
    <div className='cat-sk-body'>
      <div
        className='cat-sk-line'
        style={{ width: '50%', marginBottom: '6px' }}
      />
      <div className='cat-sk-line' />
      <div className='cat-sk-line cat-sk-short' />
      <div className='cat-sk-line cat-sk-btn' />
    </div>
  </div>
)

/* ── Empty state ── */
const EmptyState = () => (
  <div className='categories-empty'>
    <div className='cat-empty-icon'>
      <svg
        width='28'
        height='28'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <circle cx='11' cy='11' r='8' />
        <line x1='21' y1='21' x2='16.65' y2='16.65' />
        <line x1='8' y1='11' x2='14' y2='11' />
      </svg>
    </div>
    <h3 className='cat-empty-h'>No categories found</h3>
    <p className='cat-empty-p'>Try a different keyword</p>
  </div>
)

/* ── Category card ── */
const CategoryCard = ({ cat, index }) => {
  const navigate = useNavigate()
  const cardRef = useRef(null)

  const onMouseMove = e => {
    if (!cardRef.current) return
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width - 0.5) * 14
    const y = ((e.clientY - top) / height - 0.5) * -14
    cardRef.current.style.transform = `translateY(-8px) scale(1.02) perspective(700px) rotateY(${x}deg) rotateX(${y}deg)`
  }
  const onMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = ''
  }

  return (
    <div
      ref={cardRef}
      className='category-card'
      style={{ '--ci': index }}
      onClick={() => navigate(`/category/${cat.strCategory}`)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className='category-image-wrap'>
        <span className='cat-card-num'>{index + 1}</span>
        <div className='cat-card-overlay' />
        <span className='cat-card-count'>
          {cat.strCategoryDescription
            ? `${cat.strCategoryDescription.split(' ').length}+ recipes`
            : 'Explore →'}
        </span>
        <img
          className='category-image'
          src={cat.strCategoryThumb}
          alt={cat.strCategory}
          loading='lazy'
        />
      </div>
      <div className='category-body'>
        <h3 className='category-name'>{cat.strCategory}</h3>
        <p className='category-desc'>
          {cat.strCategoryDescription.substring(0, 80)}...
        </p>
        <div className='category-meta'>
          Explore Recipes
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
            <line x1='5' y1='12' x2='19' y2='12' />
            <polyline points='12 5 19 12 12 19' />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function Categories () {
  /* ── Original logic — UNCHANGED ── */
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const data = await getCategories()
    setCategories(data || [])
  }

  const handleCategoryClick = category => {
    navigate(`/category/${category}`)
  }

  /* ── UI-only state ── */
  const [loading, setLoading] = useState(true)
  const [gridView, setGridView] = useState(true)
  const inputRef = useRef(null)

  /* Simulate loading done when categories arrive */
  useEffect(() => {
    if (categories.length > 0) setLoading(false)
  }, [categories])

  const filtered = categories.filter(cat =>
    cat.strCategory.toLowerCase().includes(search.toLowerCase())
  )

  const clearSearch = () => {
    setSearch('')
    inputRef.current?.focus()
  }

  return (
    <div className='categories-page'>
      {/* ══ HERO BANNER ══ */}
      <div className='cat-hero'>
        {/* Floating food emoji decor */}
        <div className='cat-hero-deco' aria-hidden='true'>
          {[
            { e: '🍕', s: 'top:12%;left:8%', dur: '5s', del: '0s' },
            { e: '🍜', s: 'top:20%;right:10%', dur: '6s', del: '1s' },
            { e: '🥩', s: 'bottom:22%;left:15%', dur: '4.5s', del: '.5s' },
            { e: '🍰', s: 'bottom:28%;right:8%', dur: '5.5s', del: '1.5s' },
            { e: '🥗', s: 'top:50%;left:4%', dur: '7s', del: '.2s' },
            { e: '🦐', s: 'top:40%;right:4%', dur: '4s', del: '.8s' }
          ].map(({ e, s, dur, del }, i) => (
            <span
              key={i}
              className='cat-deco-item'
              style={{
                [s.split(';')[0].split(':')[0]]: s.split(';')[0].split(':')[1],
                '--dur': dur,
                '--del': del
              }}
            />
          ))}
        </div>

        <p className='cat-hero-tag'>Browse by Category</p>
        <h1 className='cat-hero-title'>
          Explore Every <em>Cuisine</em>
        </h1>
        <p className='cat-hero-sub'>
          From Italian pasta to Indian curries — discover recipes across{' '}
          {categories.length || 14} delicious categories
        </p>

        <div className='cat-stats'>
          <div className='cat-stat'>
            <span className='cat-stat-n'>{categories.length || 14}</span>
            <span className='cat-stat-l'>Categories</span>
          </div>
          <div className='cat-stat-div' />
          <div className='cat-stat'>
            <span className='cat-stat-n'>50K+</span>
            <span className='cat-stat-l'>Recipes</span>
          </div>
          <div className='cat-stat-div' />
          <div className='cat-stat'>
            <span className='cat-stat-n'>25+</span>
            <span className='cat-stat-l'>Cuisines</span>
          </div>
        </div>
      </div>

      {/* ══ SEARCH BAR ══ */}
      <div className='cat-search-wrap'>
        <div
          className={`cat-search-inner ${
            search ? 'cat-search-inner--has-value' : ''
          }`}
        >
          <span className='cat-search-ico'>
            <svg
              width='17'
              height='17'
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

          {/* ── Original input — only added ref ── */}
          <input
            ref={inputRef}
            type='text'
            className='categories-search'
            placeholder='Search categories... e.g. Chicken, Pasta'
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoComplete='off'
          />

          {/* Clear button */}
          <button
            className={`cat-search-clear ${
              search ? 'cat-search-clear--vis' : ''
            }`}
            onClick={clearSearch}
            type='button'
            aria-label='Clear search'
          >
            <svg
              width='13'
              height='13'
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

          <button className='cat-search-btn' type='button'>
            <svg
              width='14'
              height='14'
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
        </div>
      </div>

      {/* ══ MAIN ══ */}
      <div className='cat-main'>
        {/* Results row */}
        <div className='cat-results-row'>
          <p className='cat-results-txt'>
            Showing <strong>{filtered.length}</strong> categor
            {filtered.length === 1 ? 'y' : 'ies'}
            {search && (
              <span>
                {' '}
                for "<strong>{search}</strong>"
              </span>
            )}
          </p>
          {/* View toggle */}
          <div className='cat-view-toggle'>
            <button
              className={`cat-vbtn ${gridView ? 'cat-vbtn--on' : ''}`}
              onClick={() => setGridView(true)}
              title='Grid view'
              type='button'
            >
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
                <rect x='3' y='3' width='7' height='7' />
                <rect x='14' y='3' width='7' height='7' />
                <rect x='3' y='14' width='7' height='7' />
                <rect x='14' y='14' width='7' height='7' />
              </svg>
            </button>
            <button
              className={`cat-vbtn ${!gridView ? 'cat-vbtn--on' : ''}`}
              onClick={() => setGridView(false)}
              title='List view'
              type='button'
            >
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
                <line x1='8' y1='6' x2='21' y2='6' />
                <line x1='8' y1='12' x2='21' y2='12' />
                <line x1='8' y1='18' x2='21' y2='18' />
                <line x1='3' y1='6' x2='3.01' y2='6' />
                <line x1='3' y1='12' x2='3.01' y2='12' />
                <line x1='3' y1='18' x2='3.01' y2='18' />
              </svg>
            </button>
          </div>
        </div>

        {/* Grid */}
        <div
          className={`categories-grid ${
            !gridView ? 'categories-grid--list' : ''
          }`}
        >
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          ) : filtered.length === 0 ? (
            <EmptyState />
          ) : (
            filtered.map((cat, i) => (
              <CategoryCard key={cat.idCategory} cat={cat} index={i} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
