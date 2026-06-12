// src/components/Loading/Loading.jsx
import React, { useEffect, useState } from 'react'

const LINES = [
  { text: '> Initializing portfolio...', delay: 0    },
  { text: '> Loading modules...',        delay: 400  },
  { text: '> Compiling components...',   delay: 850  },
  { text: '> Injecting creativity...',   delay: 1300 },
  { text: '> Almost ready ✓',            delay: 1750 },
]

const GLITCH_CHARS = '!@#$%^&*<>?/\\|{}[]~`ABCDEFabcdef0123456789'

function useGlitchName(finalName, startDelay = 1900) {
  const [display, setDisplay] = useState('')
  const [done, setDone]       = useState(false)

  useEffect(() => {
    let timeout
    let interval
    let iter = 0

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplay(
          finalName
            .split('')
            .map((char, i) => {
              if (i < iter) return char
              if (char === ' ') return ' '
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            })
            .join('')
        )
        iter += 0.35
        if (iter >= finalName.length) {
          setDisplay(finalName)
          setDone(true)
          clearInterval(interval)
        }
      }, 40)
    }, startDelay)

    return () => { clearTimeout(timeout); clearInterval(interval) }
  }, [finalName, startDelay])

  return { display, done }
}

const Loading = ({ onDone }) => {
  const [visibleLines, setVisibleLines]   = useState([])
  const [exitAnim,     setExitAnim]       = useState(false)
  const [barWidth,     setBarWidth]       = useState(0)
  const { display: glitchName, done: nameDone } = useGlitchName('Abhinay Pal', 1900)

  /* reveal terminal lines one by one */
  useEffect(() => {
    const timers = LINES.map(({ delay }, i) =>
      setTimeout(() => setVisibleLines(prev => [...prev, i]), delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  /* animate progress bar */
  useEffect(() => {
    let raf
    let start = null
    const duration = 2200
    const step = (ts) => {
      if (!start) start = ts
      const pct = Math.min(((ts - start) / duration) * 100, 100)
      setBarWidth(pct)
      if (pct < 100) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  /* exit after 2.6s */
  useEffect(() => {
    const t = setTimeout(() => setExitAnim(true), 2600)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');

        .loader-wrap {
          position: fixed; inset: 0; z-index: 9999;
          background: #0a0a14;
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 0;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .loader-wrap.exit {
          opacity: 0;
          transform: scale(1.04);
          pointer-events: none;
        }

        /* Grid background */
        .loader-wrap::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(236,72,153,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(236,72,153,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Corner decorations */
        .corner {
          position: absolute;
          width: 32px; height: 32px;
          border-color: #ec4899;
          border-style: solid;
          opacity: 0.5;
        }
        .corner-tl { top: 24px; left: 24px; border-width: 2px 0 0 2px; }
        .corner-tr { top: 24px; right: 24px; border-width: 2px 2px 0 0; }
        .corner-bl { bottom: 24px; left: 24px; border-width: 0 0 2px 2px; }
        .corner-br { bottom: 24px; right: 24px; border-width: 0 2px 2px 0; }

        /* Terminal card */
        .terminal {
          font-family: 'JetBrains Mono', monospace;
          background: rgba(17,17,27,0.9);
          border: 1px solid rgba(236,72,153,0.25);
          border-radius: 12px;
          width: min(520px, 90vw);
          overflow: hidden;
          box-shadow: 0 0 60px rgba(236,72,153,0.12), 0 24px 64px rgba(0,0,0,0.6);
          position: relative; z-index: 1;
        }

        /* Title bar */
        .term-bar {
          background: rgba(236,72,153,0.08);
          border-bottom: 1px solid rgba(236,72,153,0.15);
          padding: 10px 16px;
          display: flex; align-items: center; gap: 8px;
        }
        .dot { width: 12px; height: 12px; border-radius: 9999px; }
        .dot-r { background: #ff5f57; }
        .dot-y { background: #ffbd2e; }
        .dot-g { background: #28c840; }
        .term-title { color: rgba(255,255,255,0.35); font-size: 12px; margin-left: auto; margin-right: auto; letter-spacing: 0.05em; }

        /* Body */
        .term-body { padding: 20px 22px 24px; }

        /* Lines */
        @keyframes termLine {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .term-line {
          font-size: 13px;
          line-height: 1.9;
          color: #94a3b8;
          animation: termLine 0.3s ease forwards;
        }
        .term-line .sym { color: #ec4899; }
        .term-line.ok .sym { color: #4ade80; }

        /* Cursor blink */
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .cursor {
          display: inline-block; width: 8px; height: 14px;
          background: #ec4899; margin-left: 4px; vertical-align: middle;
          animation: blink 1s step-end infinite;
        }

        /* Glitch name */
        @keyframes glitchFlicker {
          0%,100% { text-shadow: 0 0 8px #ec4899; }
          33%      { text-shadow: -2px 0 #00ffff, 2px 0 #ec4899; }
          66%      { text-shadow: 2px 0 #ff00ff, -2px 0 #ec4899; }
        }
        .glitch-name {
          font-size: clamp(26px, 5vw, 38px);
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #ec4899;
          animation: glitchFlicker 0.15s linear infinite;
          transition: text-shadow 0.3s;
        }
        .glitch-name.done {
          animation: none;
          text-shadow: 0 0 24px rgba(236,72,153,0.5);
        }

        /* Progress bar */
        .prog-track {
          height: 3px;
          background: rgba(236,72,153,0.15);
          border-radius: 999px;
          margin-top: 18px;
          overflow: hidden;
        }
        .prog-fill {
          height: 100%;
          background: linear-gradient(90deg, #be185d, #ec4899, #f472b6);
          border-radius: 999px;
          transition: width 0.05s linear;
          box-shadow: 0 0 10px rgba(236,72,153,0.6);
        }

        /* Percent label */
        .prog-pct {
          font-size: 11px;
          color: rgba(236,72,153,0.7);
          text-align: right;
          margin-top: 5px;
          font-family: 'JetBrains Mono', monospace;
        }

        /* Floating particles */
        @keyframes floatDot {
          0%   { transform: translateY(0)   scale(1);   opacity: 0.6; }
          50%  { transform: translateY(-18px) scale(1.3); opacity: 1;   }
          100% { transform: translateY(0)   scale(1);   opacity: 0.6; }
        }
        .particle {
          position: absolute;
          border-radius: 9999px;
          background: #ec4899;
          animation: floatDot linear infinite;
          opacity: 0.5;
        }
      `}</style>

      <div className={`loader-wrap${exitAnim ? ' exit' : ''}`}>
        {/* Corner brackets */}
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />

        {/* Floating particles */}
        {[
          { size: 4, top: '15%', left: '12%', dur: '3.1s', delay: '0s'   },
          { size: 6, top: '72%', left: '82%', dur: '4s',   delay: '0.5s' },
          { size: 3, top: '60%', left: '8%',  dur: '2.6s', delay: '1s'   },
          { size: 5, top: '20%', left: '88%', dur: '3.5s', delay: '0.3s' },
          { size: 4, top: '85%', left: '45%', dur: '2.8s', delay: '0.8s' },
          { size: 3, top: '40%', left: '92%', dur: '3.3s', delay: '0.1s' },
        ].map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: p.size, height: p.size,
              top: p.top, left: p.left,
              animationDuration: p.dur,
              animationDelay: p.delay,
            }}
          />
        ))}

        {/* Terminal card */}
        <div className="terminal">
          {/* Title bar */}
          <div className="term-bar">
            <div className="dot dot-r" />
            <div className="dot dot-y" />
            <div className="dot dot-g" />
            <span className="term-title">portfolio.init — zsh</span>
          </div>

          {/* Body */}
          <div className="term-body">
            {/* Name with glitch */}
            <div style={{ marginBottom: 18, textAlign: 'center' }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'rgba(148,163,184,0.5)', marginBottom: 4 }}>
                // welcome to
              </p>
              <span className={`glitch-name${nameDone ? ' done' : ''}`}>
                {glitchName || '\u00a0'}
              </span>
            </div>

            {/* Terminal lines */}
            <div style={{ minHeight: 130 }}>
              {LINES.map((line, i) =>
                visibleLines.includes(i) ? (
                  <div
                    key={i}
                    className={`term-line${line.text.includes('✓') ? ' ok' : ''}`}
                  >
                    <span className="sym">
                      {line.text.includes('✓') ? '✓ ' : '> '}
                    </span>
                    {line.text.replace(/^> /, '').replace(/^> /, '')}
                    {i === visibleLines.length - 1 && !exitAnim && (
                      <span className="cursor" />
                    )}
                  </div>
                ) : null
              )}
            </div>

            {/* Progress bar */}
            <div className="prog-track">
              <div className="prog-fill" style={{ width: `${barWidth}%` }} />
            </div>
            <div className="prog-pct">{Math.round(barWidth)}%</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Loading