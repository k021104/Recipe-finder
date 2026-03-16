import React, { useState } from 'react'
import SearchBar from '../components/Searchbar'
import RecipeList from '../components/RecipeList'
import { searchRecipes, getRecipesByCategory } from '../services/recipeApi'
import CategoryFilter from '../components/CategoryFilter'
import ChatBotIcon from '../components/ChatBotIcon'
import HeroSection from '../components/Hero'
import TrendingSlider from '../components/TrendingRecipes'
import HomeCategories from '../components/HomeCategories'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const [recipes, setRecipes] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async query => {
    setSearchQuery(query)
    if (!query.trim()) {
      setRecipes([])
      return
    }
    setLoading(true)
    const results = await searchRecipes(query)
    setRecipes(results || [])
    setLoading(false)
  }

  // // const handleCategory = async category => {
  // //   const results = await getRecipesByCategory(category)
  // //   setRecipes(results || [])
  // setSearchQuery(category)
  // // }

  const handleCategoryClick = name => {
    navigate(`/category/${name}`)
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
      <HomeCategories onCategorySelect={handleCategoryClick} />

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
