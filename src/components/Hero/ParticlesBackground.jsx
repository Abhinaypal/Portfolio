// src/components/Hero/ParticlesBackground.jsx
import React, { useCallback, useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const ParticlesBackground = () => {
  const [engineReady, setEngineReady] = useState(false)
  const [theme, setTheme] = useState('dark')

  // Init engine once (v3 API)
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setEngineReady(true))
  }, [])

  // Watch theme changes
  useEffect(() => {
    const sync = () => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
    }
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    sync()
    return () => observer.disconnect()
  }, [])

  const particleColor = theme === 'dark' ? '#ec4899' : '#db2777'
  const linkColor    = theme === 'dark' ? '#ec4899' : '#db2777'

  if (!engineReady) return null

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        fpsLimit: 60,
        background: { color: 'transparent' },
        particles: {
          color: { value: particleColor },
          links: {
            color: linkColor,
            distance: 160,
            enable: true,
            opacity: 0.12,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'bounce' },
          },
          number: {
            density: { enable: true, area: 900 },
            value: 30,
          },
          opacity: { value: 0.25 },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 2.5 } },
        },
        detectRetina: true,
      }}
    />
  )
}

export default ParticlesBackground