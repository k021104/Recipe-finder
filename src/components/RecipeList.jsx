import React, { useState } from 'react'
import RecipeCard from './RecipeCard'
import '../styles/RecipeCard.css'

const RecipeList = ({ recipes }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const recipesPerPage = 12
  const totalPages = Math.ceil(recipes.length / recipesPerPage)
  const startIndex = (currentPage - 1) * recipesPerPage
  const currentRecipes = recipes.slice(startIndex, startIndex + recipesPerPage)

  if (!recipes || recipes.length === 0) {
    return <p className='recipe-empty'>No recipes found</p>
  }

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

  return (
    <div>
      <div className='recipes-grid'>
        {currentRecipes.map(r => (
          <RecipeCard key={r.idMeal} recipe={r} />
        ))}

        {totalPages > 1 && (
          <div className='pagination'>
            <button
              className='pagination-btn'
              onClick={() => setCurrentPage(prev => prev - 1)}
              disabled={currentPage === 1}
            >
              ← Prev
            </button>

            {getPageNumbers().map((page, i) =>
              page === '...' ? (
                <span key={i} className='pagination-dots'>
                  ...
                </span>
              ) : (
                <button
                  key={i}
                  className={`pagination-num ${
                    currentPage === page ? 'active' : ''
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            )}

            <button
              className='pagination-btn'
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipeList
