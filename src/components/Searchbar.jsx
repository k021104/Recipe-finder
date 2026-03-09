import React, { useState } from 'react'
import '../styles/Searchbar.css'

export default function Searchbar ({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <div className="searchbar-wrapper">          
      <form className="searchbar-form" onSubmit={handleSubmit}> 
        <input
          className="searchbar-input"            
          type='text'
          placeholder='Search recipes...'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="searchbar-btn" type='submit'>Search</button> 
      </form>
    </div>
  )
}
