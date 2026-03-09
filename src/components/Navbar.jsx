import React, { useState } from 'react'
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar () {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='navbar'>
      <h2 className='logo'>RecipeAI</h2>

      <button
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/categories'>Categories</Link>
        </li>
        <li>
          <Link to='/favorites'>Favorites</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  )
}
