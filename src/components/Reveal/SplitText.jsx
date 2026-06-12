// src/components/Reveal/SplitText.jsx
/**
 * Splits text into words and reveals each one with a staggered animation.
 * 
 * Usage:
 *   <SplitText tag="h2" className="section-title" delay={0} wordDelay={60}>
 *     Skills & Technologies
 *   </SplitText>
 */
import React, { useRef, useEffect, useState } from 'react'

const SplitText = ({
  children,
  tag: Tag    = 'h2',
  className   = '',
  delay       = 0,
  wordDelay   = 70,
  duration    = 600,
  type        = 'up',       // 'up' | 'blur' | 'zoom'
  threshold   = 0.2,
  style       = {},
}) => {
  const ref  = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const text  = typeof children === 'string' ? children : ''
  const words = text.split(' ')

  const getInit = () => {
    if (type === 'blur')  return { opacity: 0, filter: 'blur(12px)', transform: 'none' }
    if (type === 'zoom')  return { opacity: 0, transform: 'scale(0.6)' }
    return { opacity: 0, transform: 'translateY(1.2em)' }  // 'up'
  }

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ overflow: 'hidden', ...style }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden',
                                marginRight: '0.28em', verticalAlign: 'bottom' }}>
          <span
            style={{
              display: 'inline-block',
              ...(vis ? { opacity: 1, transform: 'none', filter: 'none' } : getInit()),
              transition: `opacity     ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay + i * wordDelay}ms,
                           transform   ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay + i * wordDelay}ms,
                           filter      ${duration}ms ease                         ${delay + i * wordDelay}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  )
}

export default SplitText
