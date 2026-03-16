import React, { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import { useNavigate } from 'react-router-dom'
import '../styles/Favorites.css'

export default function Favorites () {
  /* ── Original logic — UNCHANGED ── */
  const [favorites, setFavorites] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    setFavorites(savedFavorites)
  }, [])

  const handleRemove = idMeal => {
    const updated = favorites.filter(item => item.idMeal !== idMeal)
    setFavorites(updated)
    localStorage.setItem('favorites', JSON.stringify(updated))
  }

  /* ── UI-only state ── */
  const [sortBy, setSortBy] = useState('recent')

  /* Sort favorites */
  const sorted = [...favorites].sort((a, b) => {
    if (sortBy === 'az') return a.strMeal.localeCompare(b.strMeal)
    if (sortBy === 'za') return b.strMeal.localeCompare(a.strMeal)
    return 0 // recent = insertion order
  })

  /* Clear all */
  const handleClearAll = () => {
    setFavorites([])
    localStorage.setItem('favorites', JSON.stringify([]))
  }

  return (
    <div className='favorites-page'>
      {/* ══ HERO ══ */}
      <div className='fav-hero'>
        <p className='fav-hero-tag'>My Collection</p>

        <h2>
          Your <em>Favourite</em> Recipes
        </h2>

        <p className='fav-hero-subtitle'>
          All the recipes you love, saved in one place
        </p>

        {favorites.length > 0 && (
          <div className='fav-hero-actions'>
            {/* Count badge */}
            <div className='fav-count-badge'>
              <span className='fav-badge-heart'>♥</span>
              <span className='fav-badge-num'>{favorites.length}</span>
              <span>recipe{favorites.length !== 1 ? 's' : ''} saved</span>
            </div>

            {/* Clear all */}
            <button
              className='fav-clear-btn'
              onClick={handleClearAll}
              type='button'
            >
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
                <polyline points='3 6 5 6 21 6' />
                <path d='M19 6l-1 14H6L5 6' />
                <path d='M10 11v6' />
                <path d='M14 11v6' />
                <path d='M9 6V4h6v2' />
              </svg>
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* ══ CONTENT ══ */}
      <div className='fav-content'>
        {favorites.length === 0 ? (
          /* ── Empty state ── */
          <div className='fav-empty'>
            <div className='fav-empty-heart'>
              <svg
                width='36'
                height='36'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#e53e3e'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
              </svg>
            </div>
            <h3>No favourites yet</h3>
            <p>Explore recipes and tap the ♥ heart to save them here</p>
            <button
              className='fav-empty-btn'
              onClick={() => navigate('/')}
              type='button'
            >
              <svg
                width='15'
                height='15'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='11' cy='11' r='8' />
                <line x1='21' y1='21' x2='16.65' y2='16.65' />
              </svg>
              Explore Recipes
            </button>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className='fav-toolbar'>
              <p className='fav-count-txt'>
                Showing <strong>{favorites.length}</strong> saved recipe
                {favorites.length !== 1 ? 's' : ''}
              </p>
              <div className='fav-sort'>
                <span>Sort by</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option value='recent'>Recently Added</option>
                  <option value='az'>A → Z</option>
                  <option value='za'>Z → A</option>
                </select>
              </div>
            </div>

            {/* Grid — uses existing RecipeCard with showRemove + onRemove */}
            <div className='recipes-grid'>
              {sorted.map((recipe, i) => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  showRemove={true}
                  onRemove={handleRemove}
                  style={{ '--ci': i }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
