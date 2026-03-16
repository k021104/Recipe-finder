import React, { useState } from 'react'
import SearchBar from '../components/Searchbar'
import RecipeList from '../components/RecipeList'
import { searchRecipes, getRecipesByCategory } from '../services/recipeApi'
import CategoryFilter from '../components/CategoryFilter'
import ChatBotIcon from '../components/ChatBotIcon'
import HeroSection from '../components/Hero'
import TrendingSlider from '../components/TrendingRecipes'
import HomeCategories from '../components/HomeCategories'

const Home = () => {
  const [recipes, setRecipes] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async query => {
    setSearchQuery(query)
    setLoading(true)
    if (!query.trim()) {
      setRecipes([])
      return
    }
    const results = await searchRecipes(query)
    setRecipes(results || [])
    setLoading(false)
  }

  const handleCategory = async category => {
    const results = await getRecipesByCategory(category)
    setRecipes(results || [])
  }

  const handleAISearch = async query => {
    setSearchQuery(query)
    const results = await searchRecipes(query)
    setRecipes(results || [])
  }

  return (
    <div className='home-page'>
      <HeroSection />
      <SearchBar onSearch={handleSearch} />
      <HomeCategories onCategorySelect={handleCategory} />

      {searchQuery ? (
        <RecipeList recipes={recipes} loading={loading} />
      ) : (
        <TrendingSlider />
      )}

      <ChatBotIcon onAISearch={handleAISearch} />
    </div>
  )
}

export default Home
