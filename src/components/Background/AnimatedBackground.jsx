// src/components/Background/AnimatedBackground.jsx
import React, { useEffect, useRef, useState } from 'react'

const INITIAL = [
  { id: 1, img: '/anime1.png', vx: 8,  vy: 10, size: 130, anim: 'floatA', glowDelay: '0s'   },
  { id: 2, img: '/anime2.png', vx: 78, vy: 5,  size: 120, anim: 'floatB', glowDelay: '1s'   },
  { id: 3, img: '/anime3.png', vx: 55, vy: 52, size: 125, anim: 'floatC', glowDelay: '0.5s' },
  { id: 4, img: '/anime4.png', vx: 5,  vy: 62, size: 115, anim: 'floatA', glowDelay: '1.5s' },
]

const LINKS = [[0,1],[1,2],[2,3],[3,0],[0,2]]

export default function AnimatedBackground() {
  const initPx = () => INITIAL.map(c => ({
    ...c,
    x: (c.vx / 100) * window.innerWidth,
    y: (c.vy / 100) * window.innerHeight,
  }))

  const [chars,    setChars]    = useState(initPx)
  const [dragging, setDragging] = useState(null)
  const [dims,     setDims]     = useState({ w: window.innerWidth, h: window.innerHeight })
  const dragState = useRef(null)   // { id, offsetX, offsetY }

  /* ── Resize: scale positions ── */
  useEffect(() => {
    const onResize = () => {
      const nw = window.innerWidth, nh = window.innerHeight
      setChars(prev => prev.map(c => ({
        ...c,
        x: (c.x / dims.w) * nw,
        y: (c.y / dims.h) * nh,
      })))
      setDims({ w: nw, h: nh })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [dims])

  /* ── Global mousemove / mouseup on WINDOW ── */
  useEffect(() => {
    const onMove = (e) => {
      if (!dragState.current) return
      const { id, offsetX, offsetY } = dragState.current
      const newX = Math.max(0, Math.min(window.innerWidth  - 140, e.clientX - offsetX))
      const newY = Math.max(0, Math.min(window.innerHeight - 140, e.clientY - offsetY))
      setChars(prev => prev.map(c => c.id === id ? { ...c, x: newX, y: newY } : c))
    }
    const onUp = () => {
      dragState.current = null
      setDragging(null)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onUp)
    window.addEventListener('touchmove', e => {
      if (!dragState.current) return
      onMove(e.touches[0])
    }, { passive: true })
    window.addEventListener('touchend', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend',  onUp)
    }
  }, [])

  /* Start drag on character mousedown */
  const startDrag = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    const char = chars.find(c => c.id === id)
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    dragState.current = { id, offsetX: clientX - char.x, offsetY: clientY - char.y }
    setDragging(id)
  }

  const centres = chars.map(c => ({ x: c.x + c.size / 2, y: c.y + c.size / 2 }))

  return (
    <>
      <style>{`
        @keyframes floatA {
          0%,100% { transform: translateY(0px)   rotate(-2deg); }
          33%      { transform: translateY(-18px) rotate(1deg);  }
          66%      { transform: translateY(-8px)  rotate(-1deg); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0px)   rotate(2deg);  }
          40%      { transform: translateY(-22px) rotate(-2deg); }
          70%      { transform: translateY(-10px) rotate(1deg);  }
        }
        @keyframes floatC {
          0%,100% { transform: translateY(0px)  rotate(1deg);  }
          50%      { transform: translateY(-16px) rotate(-3deg); }
        }
        @keyframes charGlow {
          0%,100% { filter: drop-shadow(0 0 8px rgba(236,72,153,0.5)) brightness(0.9); }
          50%      { filter: drop-shadow(0 0 22px rgba(236,72,153,1)) brightness(1.1); }
        }
        @keyframes dashFlow { to { stroke-dashoffset: -60; } }
        @keyframes auroraA {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(4vw,3vh) scale(1.15); }
        }
        @keyframes auroraB {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-5vw,-4vh) scale(1.1); }
        }

        .aurora {
          position: fixed; border-radius: 50%;
          filter: blur(90px); pointer-events: none; z-index: 0;
        }

        /* Characters sit at z-index 9000 — above all page content */
        .anime-char {
          position: fixed;
          z-index: 9000;
          user-select: none;
          -webkit-user-select: none;
          touch-action: none;
          cursor: grab;
        }
        .anime-char:active { cursor: grabbing; }

        .anime-char img {
          width: 100%; height: 100%;
          object-fit: contain;
          pointer-events: none;
          display: block;
        }

        /* Floating glow when idle */
        .anime-char.idle img {
          animation: charGlow 4s ease-in-out infinite;
        }
        .anime-char.idle {
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        /* Dragging state */
        .anime-char.active {
          cursor: grabbing !important;
          z-index: 9999 !important;
          filter: drop-shadow(0 0 30px rgba(236,72,153,1));
          transform: scale(1.1) !important;
          transition: filter 0.1s, transform 0.1s;
        }

        /* Hover hint */
        .drag-hint {
          position: absolute; bottom: -20px; left: 50%;
          transform: translateX(-50%);
          font-size: 10px; font-weight: 700; white-space: nowrap;
          color: rgba(236,72,153,0.85); font-family: monospace;
          opacity: 0; transition: opacity 0.2s;
          pointer-events: none;
        }
        .anime-char:hover .drag-hint { opacity: 1; }

        .connector-svg {
          position: fixed; inset: 0;
          width: 100vw; height: 100vh;
          pointer-events: none; z-index: 1;
          overflow: visible;
        }
      `}</style>

      {/* Aurora blobs */}
      <div className="aurora" style={{ width:'45vw',height:'45vw',top:'-5vh',left:'-5vw',
        background:'radial-gradient(circle,rgba(236,72,153,0.15) 0%,transparent 70%)',
        animation:'auroraA 20s ease-in-out infinite' }} />
      <div className="aurora" style={{ width:'40vw',height:'40vw',bottom:'0',right:'-5vw',
        background:'radial-gradient(circle,rgba(168,85,247,0.12) 0%,transparent 70%)',
        animation:'auroraB 24s ease-in-out infinite' }} />
      <div className="aurora" style={{ width:'35vw',height:'35vw',top:'40vh',left:'35vw',
        background:'radial-gradient(circle,rgba(6,182,212,0.08) 0%,transparent 70%)',
        animation:'auroraA 18s ease-in-out infinite reverse' }} />

      {/* SVG connection lines */}
      <svg className="connector-svg">
        <defs>
          {LINKS.map(([a,b],i) => (
            <linearGradient key={i} id={`lg${i}`}
              x1={centres[a].x} y1={centres[a].y}
              x2={centres[b].x} y2={centres[b].y}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%"   stopColor="#ec4899" stopOpacity="0.9"/>
              <stop offset="50%"  stopColor="#a855f7" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9"/>
            </linearGradient>
          ))}
          <filter id="glow2">
            <feGaussianBlur stdDeviation="3" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {LINKS.map(([a,b],i) => {
          const p1 = centres[a], p2 = centres[b]
          const mx = (p1.x+p2.x)/2 + (p2.y-p1.y)*0.12
          const my = (p1.y+p2.y)/2 - (p2.x-p1.x)*0.12
          const d  = `M ${p1.x} ${p1.y} Q ${mx} ${my} ${p2.x} ${p2.y}`
          return (
            <g key={i}>
              <path d={d} stroke={`url(#lg${i})`} strokeWidth="2.5"
                fill="none" strokeOpacity="0.25" filter="url(#glow2)"/>
              <path d={d} stroke={`url(#lg${i})`} strokeWidth="1.2"
                fill="none" strokeDasharray="10 7"
                style={{ animation:`dashFlow ${2.2+i*0.35}s linear infinite`,
                         animationDelay:`${i*0.28}s` }}/>
              <circle r="4.5" fill="white" opacity="0.95"
                style={{ filter:'drop-shadow(0 0 6px #ec4899)' }}>
                <animateMotion dur={`${3.2+i*0.5}s`} repeatCount="indefinite"
                  begin={`${i*0.7}s`} path={d}/>
              </circle>
            </g>
          )
        })}
      </svg>

      {/* Draggable characters */}
      {chars.map((c, i) => {
        const isDragging = dragging === c.id
        return (
          <div
            key={c.id}
            className={`anime-char ${isDragging ? 'active' : 'idle'}`}
            style={{
              left:              c.x,
              top:               c.y,
              width:             c.size,
              height:            c.size,
              opacity:           isDragging ? 0.95 : 0.78,
              animationName:     isDragging ? 'none' : c.anim,
              animationDuration: `${5 + i * 0.8}s`,
              animationDelay:    c.glowDelay,
            }}
            onMouseDown={e => startDrag(e, c.id)}
            onTouchStart={e => startDrag(e, c.id)}
          >
            <img src={c.img} alt="" draggable={false} />
            <span className="drag-hint">✦ drag me</span>
          </div>
        )
      })}
    </>
  )
}
