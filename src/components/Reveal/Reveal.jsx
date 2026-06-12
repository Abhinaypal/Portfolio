// src/components/Reveal/Reveal.jsx
/**
 * <Reveal> — wraps any content with a scroll-triggered entrance animation.
 *
 * Props:
 *   type      – 'up'|'down'|'left'|'right'|'zoom'|'flip'|'blur'|'clip' (default 'up')
 *   delay     – CSS delay in ms  (default 0)
 *   duration  – CSS duration in ms (default 650)
 *   threshold – IntersectionObserver threshold (default 0.12)
 *   stagger   – if true, auto-delays direct children by 80ms each
 *   className – extra classes on wrapper div
 *   tag       – wrapper tag (default 'div')
 *
 * Usage:
 *   <Reveal type="zoom" delay={100}>
 *     <Card />
 *   </Reveal>
 *
 *   <Reveal type="up" stagger>
 *     <p>Item 1</p>
 *     <p>Item 2</p>
 *   </Reveal>
 */
import React, { Children, cloneElement, useRef, useEffect, useState } from 'react'

const ANIMATIONS = {
  up:    'revealUp',
  down:  'revealDown',
  left:  'revealLeft',
  right: 'revealRight',
  zoom:  'revealZoom',
  flip:  'revealFlip',
  blur:  'revealBlur',
  clip:  'revealClip',
}

const Reveal = ({
  children,
  type      = 'up',
  delay     = 0,
  duration  = 650,
  threshold = 0.12,
  stagger   = false,
  className = '',
  tag: Tag  = 'div',
  style     = {},
}) => {
  const ref     = useRef(null)
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

  const anim = ANIMATIONS[type] ?? ANIMATIONS.up

  if (stagger) {
    const kids = Children.toArray(children)
    return (
      <Tag ref={ref} className={className} style={style}>
        {kids.map((child, i) => (
          <div
            key={i}
            style={{
              opacity:   vis ? 1 : 0,
              transform: vis ? 'none' : getInitialTransform(type),
              filter:    type === 'blur' ? (vis ? 'blur(0)' : 'blur(16px)') : undefined,
              transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay + i * 90}ms,
                           transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay + i * 90}ms,
                           filter ${duration}ms ease ${delay + i * 90}ms`,
            }}
          >
            {child}
          </div>
        ))}
      </Tag>
    )
  }

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity:   vis ? 1 : 0,
        transform: vis ? 'none' : getInitialTransform(type),
        filter:    type === 'blur' ? (vis ? 'blur(0)' : 'blur(18px)') : undefined,
        clipPath:  type === 'clip' ? (vis ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)') : undefined,
        transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                     transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                     filter ${duration}ms ease ${delay}ms,
                     clip-path ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        perspective: type === 'flip' ? '800px' : undefined,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}

function getInitialTransform(type) {
  switch (type) {
    case 'up':    return 'translateY(55px)'
    case 'down':  return 'translateY(-40px)'
    case 'left':  return 'translateX(-55px)'
    case 'right': return 'translateX(55px)'
    case 'zoom':  return 'scale(0.82)'
    case 'flip':  return 'rotateX(-85deg)'
    case 'blur':  return 'translateY(20px)'
    case 'clip':  return 'translateY(0)'
    default:      return 'translateY(55px)'
  }
}

export default Reveal
