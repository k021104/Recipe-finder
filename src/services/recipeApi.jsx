// 🔍 Search recipes
export const searchRecipes = async query => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  )

  const data = await response.json()

  return data.meals
}

// 🎲 Get random recipes for home page
export const getRandomRecipes = async () => {
  const recipes = []

  for (let i = 0; i < 8; i++) {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/random.php'
    )

    const data = await response.json()

    recipes.push(data.meals[0])
  }

  return recipes
}

// Category filter
export const getRecipesByCategory = async (category) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  )

  const data = await res.json()

  return data.meals
}

// Category fetch from themealdb
export const getCategories = async () => {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  )

  const data = await res.json()

  return data.categories
}