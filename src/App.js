import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import RecipeDetails from './pages/RecipeDetails'
import ChatBotIcon from './components/ChatBotIcon'
import Categories from './pages/Categories'
import Favorites from './pages/Favorites'
import CategoryRecipes from './components/CategoryRecipes'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import About from './pages/About'
import Footer from './components/Footer'

function App () {
  useEffect(() => {
    const nav = document.querySelector('.navbar')
    const onScroll = () =>
      nav?.classList.toggle('scrolled', window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <BrowserRouter>
      <Navbar />

      <ToastContainer position='top-right' autoClose={2000} theme='colored' />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/about' element={<About />} />
        <Route path='/recipe/:id' element={<RecipeDetails />} />
        <Route path='/category/:category' element={<CategoryRecipes />} />
      </Routes>
      <ChatBotIcon />

      <Footer />
    </BrowserRouter>
  )
}

export default App
