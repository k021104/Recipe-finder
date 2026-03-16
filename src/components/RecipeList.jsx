import React, { useState } from 'react'
import RecipeCard from './RecipeCard'
import '../styles/RecipeCard.css'

/* ── Skeleton card ── */
const SkeletonCard = () => (
  <div className='rc-skeleton'>
    <div className='rc-sk-img' />
    <div className='rc-sk-body'>
      <div
        className='rc-sk-line'
        style={{ width: '40%', marginBottom: '6px' }}
      />
      <div className='rc-sk-line' />
      <div className='rc-sk-line rc-sk-short' />
      <div className='rc-sk-line rc-sk-btn' />
    </div>
  </div>
)

/* ── Empty state ── */
const EmptyState = () => (
  <div className='recipe-empty'>
    <div className='recipe-empty-icon'>
      <svg
        width='32'
        height='32'
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
    <h3>No recipes found</h3>
    <p>
      We couldn't find any recipes matching your search. Try different keywords
      or explore our categories.
    </p>
    <button
      className='recipe-empty-btn'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
      Try Another Search
    </button>
  </div>
)

const RecipeList = ({ recipes, loading = false }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const recipesPerPage = 12

  /* Show skeletons while loading */
  if (loading) {
    return (
      <div className='recipe-list-wrap'>
        <div className='recipes-grid'>
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <div className='rc-loading-dots'>
          <span />
          <span />
          <span />
        </div>
      </div>
    )
  }

  /* Empty state */
  if (!recipes || recipes.length === 0) {
    return <EmptyState />
  }

  /* Pagination logic — UNCHANGED */
  const totalPages = Math.ceil(recipes.length / recipesPerPage)
  const startIndex = (currentPage - 1) * recipesPerPage
  const currentRecipes = recipes.slice(startIndex, startIndex + recipesPerPage)

  const getPageNumbers = () => {
    if (totalPages <= 5) return [...Array(totalPages)].map((_, i) => i + 1)
    if (currentPage <= 3) return [1, 2, 3, '...', totalPages]
    if (currentPage >= totalPages - 2)
      return [1, '...', totalPages - 2, totalPages - 1, totalPages]
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages
    ]
  }

  /* Scroll to top of grid on page change */
  const handlePageChange = page => {
    setCurrentPage(page)
    const el = document.querySelector('.recipes-grid')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className='recipe-list-wrap'>
      {/* Result count */}
      <p className='recipe-result-count'>
        Showing{' '}
        <strong>
          {startIndex + 1}–
          {Math.min(startIndex + recipesPerPage, recipes.length)}
        </strong>{' '}
        of <strong>{recipes.length}</strong> recipes
      </p>

      {/* Grid */}
      <div className='recipes-grid'>
        {currentRecipes.map((r, i) => (
          <RecipeCard key={r.idMeal} recipe={r} style={{ '--ci': i }} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='pagination'>
          <button
            className='pagination-btn'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            type='button'
          >
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
              <polyline points='15 18 9 12 15 6' />
            </svg>
            Prev
          </button>

          {getPageNumbers().map((page, i) =>
            page === '...' ? (
              <span key={`dots-${i}`} className='pagination-dots'>
                ···
              </span>
            ) : (
              <button
                key={page}
                className={`pagination-num ${
                  currentPage === page ? 'active' : ''
                }`}
                onClick={() => handlePageChange(page)}
                type='button'
              >
                {page}
              </button>
            )
          )}

          <button
            className='pagination-btn'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            type='button'
          >
            Next
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
              <polyline points='9 18 15 12 9 6' />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default RecipeList
