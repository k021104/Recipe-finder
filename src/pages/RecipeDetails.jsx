import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import '../styles/Recipe.css';

const RecipeDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [recipe, setRecipe] = useState(null)

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

  if (!recipe) return <p>Loading...</p>

  // ⭐ Ingredients extract
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`]
    const measure = recipe[`strMeasure${i}`]

    if (ingredient) {
      ingredients.push(`${measure} ${ingredient}`)
    }
  }

  return (
    <div className='recipe-details'>
      <button className='back-btn' onClick={() => navigate('/')}>
        ← Back
      </button>

      <h1>{recipe.strMeal}</h1>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className='recipe-image'
      />

      <h2>Ingredients</h2>

      <ul className='ingredients'>
        {ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2>Instructions</h2>

      <p className='instructions'>{recipe.strInstructions}</p>

      {recipe.strYoutube && (
        <>
          <h2>Cooking Video</h2>

          <iframe
            width='560'
            height='315'
            src={`https://www.youtube.com/embed/${
              recipe.strYoutube.split('v=')[1]
            }`}
            title='YouTube video'
            allowFullScreen
          ></iframe>
        </>
      )}
    </div>
  )
}

export default RecipeDetails
