import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/Hero.css'

// Animated number counter hook
const useCounter = (target, duration = 1800, startDelay = 1000) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime = null
    let rafId

    const timeout = setTimeout(() => {
      const step = timestamp => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        // ease-out curve
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * target))
        if (progress < 1) rafId = requestAnimationFrame(step)
      }
      rafId = requestAnimationFrame(step)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(rafId)
    }
  }, [target, duration, startDelay])

  return count
}

// Floating food emoji decoration
const floatingFoods = [
  { emoji: '🍕', className: 'float-1' },
  { emoji: '🥗', className: 'float-2' },
  { emoji: '🍜', className: 'float-3' },
  { emoji: '🧁', className: 'float-4' },
  { emoji: '🥘', className: 'float-5' }
]

const HeroSection = ({ onExplore }) => {
  const recipeCount = useCounter(304, 1600, 900)

  return (
    <section className='hero-section'>
      {/* Background image with gentle zoom */}
      <motion.div
        className='hero-bg'
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Soft warm pastel overlay */}
      <div className='hero-overlay' />

      {/* Floating food emojis */}
      {floatingFoods.map(({ emoji, className }) => (
        <div key={className} className={`hero-float ${className}`}>
          {emoji}
        </div>
      ))}

      {/* Main content */}
      <div className='hero-content'>
        {/* App intro tag */}
        <motion.div
          className='hero-intro-label'
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          🍽️ &nbsp; Your Personal Recipe Finder
        </motion.div>

        {/* Heading */}
        <motion.h1
          className='hero-heading'
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          Cook Something
          <span className='hero-heading-accent'> Wonderful </span>
          Today
        </motion.h1>

        {/* App description */}
        <motion.p
          className='hero-desc'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.6 }}
        >
          Explore <strong>{recipeCount}</strong> real recipes from around the
          world — search by ingredient, cuisine, or category. From cozy comfort
          food to healthy weeknight dinners, find your perfect dish every time.
        </motion.p>

        {/* CTA */}
        <motion.button
          className='hero-cta'
          onClick={onExplore}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.78 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          Start Exploring Recipes →
        </motion.button>

        {/* Feature pills — accurate MealDB data */}
        <motion.div
          className='hero-pills'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <span className='hero-pill'>
            🥗 <span className='hero-pill-count'>{recipeCount}</span> Recipes
          </span>
          <span className='hero-pill'>🌍 Multiple Cuisines</span>
          <span className='hero-pill'>🤖 AI Powered</span>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
