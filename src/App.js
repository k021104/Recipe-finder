import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import RecipeDetails from './pages/RecipeDetails'
import ChatBotIcon from './components/ChatBotIcon'
import Categories from './pages/Categories'
import Favourites from './pages/Favourites'
import CategoryRecipes from './components/CategoryRecipes'

function App () {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/favorites' element={<Favourites />} />
        {/* <Route path='/about' element={<About />} /> */}
        <Route path='/recipe/:id' element={<RecipeDetails />} />
        <Route path='/category/:category' element={<CategoryRecipes />} />
      </Routes>
      <ChatBotIcon />
    </BrowserRouter>
  )
}

export default App
