import React, { useEffect, useState } from 'react'
import { getCategories } from '../services/recipeApi'
import { useNavigate } from 'react-router-dom'
import '../styles/Category.css'

export default function Categories () {
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const data = await getCategories()
    setCategories(data || [])
  }

  const handleCategoryClick = category => {
    navigate(`/category/${category}`)
  }

  return (
    <div className='categories-page'>
      <h1 className='categories-title'>Explore Recipe Categories</h1>

      <p className='categories-subtitle'>
        Find recipes by category like chicken, pasta, dessert and more
      </p>

      <input
        type='text'
        className='categories-search'
        placeholder='Search categories...'
        onChange={e => setSearch(e.target.value)}
      />

      <div className='categories-grid'>
        {categories
          .filter(cat =>
            cat.strCategory.toLowerCase().includes(search.toLowerCase())
          )
          .map(cat => (
            <div
              key={cat.idCategory}
              className='category-card'
              onClick={() => handleCategoryClick(cat.strCategory)}
            >
              <div className='category-image-wrap'>
                <img
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  className='category-image'
                />
              </div>

              <div className='category-body'>
                <h3 className='category-name'>{cat.strCategory}</h3>
                <p className='category-desc'>
                  {cat.strCategoryDescription.substring(0, 80)}...
                </p>
                <div className='category-meta'>🍽️ Explore Recipes</div>
              </div>
            </div>
          ))}

        {categories.filter(cat =>
          cat.strCategory.toLowerCase().includes(search.toLowerCase())
        ).length === 0 && (
          <p className='categories-empty'>No categories found! 🔍</p>
        )}
      </div>
    </div>
  )
}
