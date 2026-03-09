import React, { useState } from 'react'
import '../styles/CategoryFilter.css';

const categories = [
  'Beef',
  'Chicken',
  'Dessert',
  'Seafood',
  'Vegetarian',
  'Breakfast'
]

const CategoryFilter = ({ onSelectCategory }) => {
  const [active, setActive] = useState(null)

  const handleClick = cat => {
    setActive(cat)
    onSelectCategory(cat)
  }

  return (
    <div className="category-filter">                  
      <h3>Categories</h3>

      <div className="category-filter-buttons">         
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${active === cat ? "active" : ""}`} 
            onClick={() => handleClick(cat)}            
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter
