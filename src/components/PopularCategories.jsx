import { popularCategories } from '../data/PopularCategories'

import React from 'react'

export default function PopularCategories () {
  return (
    <div className='popular-section'>
      <h2>Popular Categories</h2>

      <div className='popular-grid'>
        {categories
          .filter(cat => popularCategories.includes(cat.strCategory))
          .map(cat => (
            <div key={cat.idCategory}>{cat.strCategory}</div>
          ))}
      </div>
    </div>
  )
}
