import React from 'react'
import '../styles/RecipeCard.css'
import { useNavigate } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate()

  return (
    <div
      className='recipe-card'
      onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
    >
      {/* Image wrapper for zoom + aspect ratio */}
      <div className='recipe-card-image-wrap'>
        <span className='recipe-card-tag'>Recipe</span>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      </div>

      {/* Card body */}
      <div className='recipe-card-body'>
        <h3>{recipe.strMeal}</h3>

        <button className='recipe-card-btn'>
          View Recipe <span className='recipe-card-btn-arrow'>→</span>
        </button>
      </div>
    </div>
  )
}

export default RecipeCard
