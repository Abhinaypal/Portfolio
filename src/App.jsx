import React, { useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Certifications from './components/Certifications/Certifications'
import Experience from './components/Experience/Experience'
import Achievements from './components/Achievements/Achievements'
import CodingProfiles from './components/CodingProfiles/CodingProfiles'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Loading from './components/Loading/Loading'
import ScrollProgress from './components/ScrollProgress/ScrollProgress'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import AnimatedBackground from './components/Background/AnimatedBackground'

function App() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 1,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="relative min-h-screen">
      {/* Animated background — neural net + aurora + grid */}
      <AnimatedBackground />
      
      <ScrollProgress />
      <Navbar />
      <ThemeToggle theme={theme} setTheme={setTheme} />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Experience />
        <Achievements />
        <CodingProfiles />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App