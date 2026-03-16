import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/RecipeDetails.css'

const RecipeDetails = () => {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const [recipe, setRecipe] = useState(null)

  /* ── UI-only state ── */
  const [checkedIngs, setCheckedIngs] = useState(new Set())
  const [doneSteps,   setDoneSteps]   = useState(new Set())
  const [isSaved,     setIsSaved]     = useState(false)
  const [visible,     setVisible]     = useState(false)
  const pageRef = useRef(null)

  /* ── Original fetch logic — UNCHANGED ── */
  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      )
      const data = await response.json()
      setRecipe(data.meals[0])
    }
    fetchRecipe()
  }, [id])

  /* ── Check if already saved ── */
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsSaved(!!favs.find(f => f.idMeal === id))
  }, [id])

  /* ── Scroll entrance ── */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  /* ── Loading state ── */
  if (!recipe) {
    return (
      <div className='rd-loading-screen'>
        <div className='rd-loading-spinner' />
        <p className='rd-loading-txt'>Loading recipe...</p>
      </div>
    )
  }

  /* ── Original ingredients extract — UNCHANGED ── */
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`]
    const measure    = recipe[`strMeasure${i}`]
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure: measure || '' })
    }
  }

  /* ── Toggle ingredient checked ── */
  const toggleIng = idx => {
    setCheckedIngs(prev => {
      const next = new Set(prev)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      return next
    })
  }

  /* ── Toggle step done ── */
  const toggleStep = idx => {
    setDoneSteps(prev => {
      const next = new Set(prev)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      return next
    })
  }

  /* ── Save / unsave ── */
  const handleSave = () => {
    let favs = JSON.parse(localStorage.getItem('favorites') || '[]')
    if (isSaved) {
      favs = favs.filter(f => f.idMeal !== recipe.idMeal)
      setIsSaved(false)
    } else {
      favs.push(recipe)
      setIsSaved(true)
    }
    localStorage.setItem('favorites', JSON.stringify(favs))
  }

  /* ── Share ── */
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: recipe.strMeal, url: window.location.href })
    } else {
      navigator.clipboard?.writeText(window.location.href)
    }
  }

  const ingProgress = Math.round((checkedIngs.size / ingredients.length) * 100)

  /* ── Original instructions split — UNCHANGED ── */
  const steps = recipe.strInstructions
    .split(/\r\n|\n|\r/)
    .filter(s => s.trim().length > 10)

  return (
    <div
      ref={pageRef}
      className={`rd-page ${visible ? 'rd-page--vis' : ''}`}
    >

      {/* ══════════════════════════
          HERO — full bleed image
      ══════════════════════════ */}
      <div className='rd-hero'>
        <img
          className='rd-hero-img'
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          onLoad={e => e.currentTarget.classList.add('rd-hero-img--loaded')}
        />
        <div className='rd-hero-overlay' />

        {/* Back button */}
        <button className='back-btn' onClick={() => navigate(-1)} type='button'>
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none'
            stroke='currentColor' strokeWidth='2.5'
            strokeLinecap='round' strokeLinejoin='round'>
            <polyline points='15 18 9 12 15 6'/>
          </svg>
          Back
        </button>

        {/* Hero bottom content */}
        <div className='rd-hero-bottom'>
          <div className='rd-tags'>
            {recipe.strCategory && (
              <span className='rd-tag rd-tag--cat'>{recipe.strCategory}</span>
            )}
            {recipe.strArea && (
              <span className='rd-tag rd-tag--area'>{recipe.strArea}</span>
            )}
            <span className='rd-tag rd-tag--pop'>⭐ Popular</span>
          </div>
          <h1 className='rd-title'>{recipe.strMeal}</h1>
        </div>
      </div>

      {/* ══════════════════════════
          META STRIP + FABs
      ══════════════════════════ */}
      <div className='rd-main'>
        <div className='rd-meta-row'>
          <div className='rd-meta-strip'>
            <div className='rd-meta-item'>
              <svg width='18' height='18' viewBox='0 0 24 24' fill='none'
                stroke='currentColor' strokeWidth='2'
                strokeLinecap='round' strokeLinejoin='round'>
                <circle cx='12' cy='12' r='10'/><polyline points='12 6 12 12 16 14'/>
              </svg>
              <span className='rd-meta-val'>30+</span>
              <span className='rd-meta-lbl'>Minutes</span>
            </div>
            <div className='rd-meta-item'>
              <svg width='18' height='18' viewBox='0 0 24 24' fill='none'
                stroke='currentColor' strokeWidth='2'
                strokeLinecap='round' strokeLinejoin='round'>
                <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/>
                <circle cx='9' cy='7' r='4'/>
                <path d='M23 21v-2a4 4 0 0 0-3-3.87'/>
                <path d='M16 3.13a4 4 0 0 1 0 7.75'/>
              </svg>
              <span className='rd-meta-val'>4</span>
              <span className='rd-meta-lbl'>Servings</span>
            </div>
            <div className='rd-meta-item'>
              <svg width='18' height='18' viewBox='0 0 24 24' fill='none'
                stroke='currentColor' strokeWidth='2'
                strokeLinecap='round' strokeLinejoin='round'>
                <path d='M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2'/>
                <path d='M7 2v20'/><path d='M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7'/>
              </svg>
              <span className='rd-meta-val'>{ingredients.length}</span>
              <span className='rd-meta-lbl'>Ingredients</span>
            </div>
            <div className='rd-meta-item'>
              <svg width='18' height='18' viewBox='0 0 24 24' fill='none'
                stroke='currentColor' strokeWidth='2'
                strokeLinecap='round' strokeLinejoin='round'>
                <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/>
              </svg>
              <span className='rd-meta-val'>4.8</span>
              <span className='rd-meta-lbl'>Rating</span>
            </div>
          </div>

          {/* FABs */}
          <div className='rd-fabs'>
            <button
              className='rd-fab rd-fab--share'
              onClick={handleShare}
              title='Share recipe'
              type='button'
            >
              <svg width='16' height='16' viewBox='0 0 24 24' fill='none'
                stroke='currentColor' strokeWidth='2'
                strokeLinecap='round' strokeLinejoin='round'>
                <circle cx='18' cy='5' r='3'/><circle cx='6' cy='12' r='3'/>
                <circle cx='18' cy='19' r='3'/>
                <line x1='8.59' y1='13.51' x2='15.42' y2='17.49'/>
                <line x1='15.41' y1='6.51' x2='8.59' y2='10.49'/>
              </svg>
            </button>
            <button
              className={`rd-fab rd-fab--save ${isSaved ? 'rd-fab--saved' : ''}`}
              onClick={handleSave}
              title={isSaved ? 'Saved!' : 'Save recipe'}
              type='button'
            >
              <svg width='16' height='16' viewBox='0 0 24 24'
                fill={isSaved ? '#e53e3e' : 'none'}
                stroke={isSaved ? '#e53e3e' : 'currentColor'}
                strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/>
              </svg>
            </button>
          </div>
        </div>

        {/* ══════════════════════════
            2-COLUMN LAYOUT
        ══════════════════════════ */}
        <div className='rd-cols'>

          {/* LEFT — Instructions + Video */}
          <div className='rd-left'>

            {/* Steps card */}
            <div className='rd-card rd-steps-card'>
              <div className='rd-card-header'>
                <h2 className='rd-card-title'>
                  Instructions
                  <span className='rd-card-title-line' />
                </h2>
                <span className='rd-steps-count'>{steps.length} steps</span>
              </div>

              <ol className='rd-steps'>
                {steps.map((step, i) => (
                  <li
                    key={i}
                    className={`rd-step ${doneSteps.has(i) ? 'rd-step--done' : ''}`}
                    style={{ '--si': i }}
                    onClick={() => toggleStep(i)}
                  >
                    <div className='rd-step-num'>
                      {doneSteps.has(i) ? (
                        <svg width='14' height='14' viewBox='0 0 24 24' fill='none'
                          stroke='currentColor' strokeWidth='3'
                          strokeLinecap='round' strokeLinejoin='round'>
                          <polyline points='20 6 9 17 4 12'/>
                        </svg>
                      ) : i + 1}
                    </div>
                    <p className='rd-step-text'>{step.trim()}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Video */}
            {recipe.strYoutube && (
              <div className='rd-card rd-video-card'>
                <div className='rd-card-header'>
                  <h2 className='rd-card-title'>
                    Watch Video
                    <span className='rd-card-title-line' />
                  </h2>
                </div>
                <div className='rd-video-wrap'>
                  <iframe
                    src={`https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}`}
                    title='YouTube video'
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Ingredients */}
          <div className='rd-right'>
            <div className='rd-card rd-ing-card'>
              <div className='rd-card-header'>
                <h2 className='rd-card-title'>Ingredients</h2>
                <span className='rd-ing-badge'>{ingredients.length} items</span>
              </div>

              <ul className='rd-ing-list'>
                {ingredients.map(({ ingredient, measure }, i) => (
                  <li
                    key={i}
                    className={`rd-ing-item ${checkedIngs.has(i) ? 'rd-ing-item--checked' : ''}`}
                    style={{ '--ii': i }}
                    onClick={() => toggleIng(i)}
                  >
                    {/* Checkbox */}
                    <div className='rd-ing-check'>
                      {checkedIngs.has(i) && (
                        <svg width='11' height='11' viewBox='0 0 24 24' fill='none'
                          stroke='currentColor' strokeWidth='3.5'
                          strokeLinecap='round' strokeLinejoin='round'>
                          <polyline points='20 6 9 17 4 12'/>
                        </svg>
                      )}
                    </div>

                    {/* Ingredient image from TheMealDB */}
                    <img
                      className='rd-ing-img'
                      src={`https://www.themealdb.com/images/ingredients/${ingredient.trim()}-Small.png`}
                      alt={ingredient}
                      onError={e => {
                        e.currentTarget.style.opacity = '0'
                      }}
                    />

                    {/* Info */}
                    <div className='rd-ing-info'>
                      <span className='rd-ing-name'>{ingredient}</span>
                      {measure && (
                        <span className='rd-ing-measure'>{measure}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Progress bar */}
              <div className='rd-ing-footer'>
                <div className='rd-prog-labels'>
                  <span>Progress</span>
                  <span className='rd-prog-pct'>{checkedIngs.size} / {ingredients.length}</span>
                </div>
                <div className='rd-prog-track'>
                  <div
                    className='rd-prog-fill'
                    style={{ width: `${ingProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default RecipeDetails