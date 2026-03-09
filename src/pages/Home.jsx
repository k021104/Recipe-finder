import React, { useEffect, useState } from 'react'
import SearchBar from '../components/Searchbar'
import RecipeList from '../components/RecipeList'
import { searchRecipes, getRandomRecipes } from '../services/recipeApi'
import CategoryFilter from '../components/CategoryFilter'
import { getRecipesByCategory } from '../services/recipeApi'
import ChatBotIcon from '../components/ChatBotIcon'
// import { popularCategories } from '../data/PopularCategories'
import HeroSection from '../components/Hero'

const Home = () => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const loadRandom = async () => {
      const randomRecipes = await getRandomRecipes()

      setRecipes(randomRecipes)
    }

    loadRandom()
  }, [])

  const handleSearch = async query => {
    const results = await searchRecipes(query)
    setRecipes(results || [])
  }

  const handleCategory = async category => {
    const results = await getRecipesByCategory(category)
    setRecipes(results || [])
  }

  const handleAISearch = async query => {
    const results = await searchRecipes(query)
    setRecipes(results || [])
  }

  return (
    <div className='home-page'>
      <HeroSection />
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter onSelectCategory={handleCategory} />
      <RecipeList recipes={recipes} />
      <ChatBotIcon onAISearch={handleAISearch} />
    </div>
  )
}

export default Home
