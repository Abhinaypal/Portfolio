// src/components/ThemeToggle/ThemeToggle.jsx
import React from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 w-12 h-12 hidden md:flex items-center justify-center 
               rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)]
               hover:border-primary-500 transition-all duration-300 shadow-lg"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  )
}

export default ThemeToggle