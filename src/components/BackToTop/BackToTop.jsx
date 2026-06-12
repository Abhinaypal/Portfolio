// src/components/BackToTop/BackToTop.jsx
import React, { useState, useEffect } from 'react'
import { FiArrowUp } from 'react-icons/fi'

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-12 h-12 bg-primary-500 text-white 
               rounded-full flex items-center justify-center shadow-lg 
               hover:bg-primary-600 transition-all duration-300 
               animate-fade-in z-50"
      aria-label="Back to top"
    >
      <FiArrowUp size={20} />
    </button>
  )
}

export default BackToTop