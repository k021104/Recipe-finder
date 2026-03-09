import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RecipeList from '../components/RecipeList'
import { getRecipesByCategory } from '../services/recipeApi'
import '../styles/Category.css'

export default function CategoryRecipes () {
  const { category } = useParams()
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getRecipesByCategory(category)
      setRecipes(data || [])
    }
    fetchRecipes()
  }, [category])

  return (
    <div>
      <div className='category-recipes-page'>
        <h1 className='category-recipes-title'>{category} Recipes</h1>
        <RecipeList recipes={recipes} />
      </div>
    </div>
  )
}
