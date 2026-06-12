// src/components/CustomCursor/CustomCursor.jsx
import React, { useEffect, useRef } from 'react'
import './CustomCursor.css'

const CustomCursor = () => {
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const ringPosition = useRef({ x: 0, y: 0 })
  const isClicked = useRef(false)
  const isHovering = useRef(false)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth <= 768) return

    const cursorDot = cursorDotRef.current
    const cursorRing = cursorRingRef.current

    if (!cursorDot || !cursorRing) return

    // Update mouse position without state
    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseDown = () => {
      isClicked.current = true
      cursorDot.classList.add('cursor-clicked')
      cursorRing.classList.add('cursor-clicked')
    }

    const handleMouseUp = () => {
      isClicked.current = false
      cursorDot.classList.remove('cursor-clicked')
      cursorRing.classList.remove('cursor-clicked')
    }

    const handleMouseEnter = () => {
      cursorDot.style.opacity = '1'
      cursorRing.style.opacity = '1'
    }

    const handleMouseLeave = () => {
      cursorDot.style.opacity = '0'
      cursorRing.style.opacity = '0'
    }

    // Add hover listeners to all clickable elements
    const addHoverListeners = () => {
      const clickables = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .card, [onClick], .clickable, .cursor-pointer'
      )
      
      clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
          isHovering.current = true
          cursorDot.classList.add('cursor-link-hovered')
          cursorRing.classList.add('cursor-link-hovered')
        })
        el.addEventListener('mouseleave', () => {
          isHovering.current = false
          cursorDot.classList.remove('cursor-link-hovered')
          cursorRing.classList.remove('cursor-link-hovered')
        })
      })
    }

    // Animation loop for smooth cursor movement
    const animateCursor = () => {
      // Smooth the ring movement (follows dot with delay)
      const ease = 0.15
      ringPosition.current.x += (mousePosition.current.x - ringPosition.current.x) * ease
      ringPosition.current.y += (mousePosition.current.y - ringPosition.current.y) * ease

      // Update dot position (instant)
      cursorDot.style.left = `${mousePosition.current.x}px`
      cursorDot.style.top = `${mousePosition.current.y}px`

      // Update ring position (smoothed)
      cursorRing.style.left = `${ringPosition.current.x}px`
      cursorRing.style.top = `${ringPosition.current.y}px`

      animationFrameRef.current = requestAnimationFrame(animateCursor)
    }

    // Start animation
    animateCursor()

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Add hover listeners after a small delay to ensure DOM is ready
    setTimeout(addHoverListeners, 100)
    
    // Re-add hover listeners when DOM changes
    const observer = new MutationObserver(() => {
      addHoverListeners()
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      observer.disconnect()
    }
  }, [])

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null
  }

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" />
    </>
  )
}

export default CustomCursor