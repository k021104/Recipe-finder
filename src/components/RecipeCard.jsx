import React, { useState, useRef, useEffect } from 'react'
import '../styles/RecipeCard.css'
import { useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'

/* ── Toast utility — no alert() ── */
const showToast = (icon, message) => {
  let wrap = document.getElementById('rc-toast-wrap')
  if (!wrap) {
    wrap = document.createElement('div')
    wrap.id = 'rc-toast-wrap'
    wrap.style.cssText =
      'position:fixed;bottom:28px;right:28px;display:flex;flex-direction:column;gap:8px;z-index:9999;pointer-events:none'
    document.body.appendChild(wrap)
  }
  const t = document.createElement('div')
  t.className = 'rc-toast'
  t.innerHTML = `
    <span class="rc-toast-icon">${icon}</span>
    <span class="rc-toast-msg">${message}</span>
    <div class="rc-toast-bar"></div>
  `
  wrap.appendChild(t)
  setTimeout(() => {
    t.classList.add('rc-toast--out')
    setTimeout(() => t.remove(), 320)
  }, 2600)
}

const RecipeCard = ({ recipe, showRemove = false, onRemove }) => {
  const navigate = useNavigate()
  const cardRef = useRef(null)
  const [isFavorite, setIsFavorite] = useState(false)

  /* Load fav state from localStorage */
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || []
    setIsFavorite(!!favs.find(f => f.idMeal === recipe.idMeal))
  }, [recipe])

  /* Toggle favourite — replaces alert() with toast */
  const handleFavorite = e => {
    e.stopPropagation()
    let favs = JSON.parse(localStorage.getItem('favorites')) || []
    const exists = favs.find(f => f.idMeal === recipe.idMeal)
    if (exists) {
      favs = favs.filter(f => f.idMeal !== recipe.idMeal)
      setIsFavorite(false)
      showToast('🗑️', 'Removed from favourites')
      if (onRemove) onRemove(recipe.idMeal)
    } else {
      favs.push(recipe)
      setIsFavorite(true)
      showToast('🔖', 'Saved to favourites!')
    }
    localStorage.setItem('favorites', JSON.stringify(favs))
  }

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
    <div
      ref={cardRef}
      className='recipe-card'
      onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Fav / Remove button */}
      <button
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        onClick={handleFavorite}
        aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
        type='button'
      >
        {showRemove ? (
          <FaTrash color='#B85C1F' size={13} />
        ) : (
          <svg
            width='15'
            height='15'
            viewBox='0 0 24 24'
            fill={isFavorite ? '#e53e3e' : 'none'}
            stroke='#e53e3e'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
          </svg>
        )}
      </button>

      {/* Image wrap */}
      <div className='recipe-card-image-wrap'>
        <span className='recipe-card-tag'>Recipe</span>
        <div className='rc-overlay' />
        {recipe.strArea && <span className='rc-area'>{recipe.strArea}</span>}
        <img src={recipe.strMealThumb} alt={recipe.strMeal} loading='lazy' />
      </div>

      {/* Card body */}
      <div className='recipe-card-body'>
        {recipe.strCategory && (
          <span className='rc-cat'>{recipe.strCategory}</span>
        )}
        <h3>{recipe.strMeal}</h3>
        <div className='rc-foot'>
          <span className='rc-meta'>
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
            {recipe.cookTime || '30 min'}
          </span>
          <button className='recipe-card-btn' type='button'>
            View Recipe
            <span className='recipe-card-btn-arrow'>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
