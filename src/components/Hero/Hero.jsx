// src/components/Hero/Hero.jsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
import { TypeAnimation } from 'react-type-animation'
import { FiDownload, FiMail } from 'react-icons/fi'

/* Tiny hook — returns true one frame after mount */
function useMounted() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setReady(true), 60)
    return () => clearTimeout(id)
  }, [])
  return ready
}

/* Animated wrapper — fades + slides in after `delay` ms */
function FadeUp({ delay = 0, children, className = '' }) {
  const ready = useMounted()
  return (
    <div
      className={className}
      style={{
        opacity:    ready ? 1 : 0,
        transform:  ready ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                     transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

const Hero = () => {
  const ready = useMounted()

  return (
    <>
      <style>{`
        @keyframes pulsering {
          0%   { box-shadow: 0 0 0 0px  rgba(236,72,153,0.55); }
          70%  { box-shadow: 0 0 0 20px rgba(236,72,153,0); }
          100% { box-shadow: 0 0 0 0px  rgba(236,72,153,0); }
        }
        .profile-pulse { animation: pulsering 2.4s ease-out infinite; }

        .btn-pink {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-pink:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(236,72,153,0.45);
        }
        .btn-outline-pink {
          transition: transform 0.2s ease, background-color 0.25s ease, color 0.25s ease;
        }
        .btn-outline-pink:hover { transform: translateY(-3px); }
      `}</style>

      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="section-container w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* ── LEFT ── */}
            <div className="space-y-6">

              <FadeUp delay={0}>
                <p className="text-primary-500 font-semibold text-lg tracking-widest uppercase">
                  Hello, I'm
                </p>
              </FadeUp>

              <FadeUp delay={100}>
                <h1 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] leading-tight">
                  Abhinay<br />
                  <span className="text-primary-500">Pal</span>
                </h1>
              </FadeUp>

              <FadeUp delay={200}>
                <div className="text-xl md:text-2xl">
                  <TypeAnimation
                    sequence={[
                      'Machine Learning Engineer', 2200,
                      'AI Enthusiast', 2000,
                      'Full Stack Developer', 2000,
                      'Problem Solver', 2000,
                    ]}
                    wrapper="span"
                    speed={55}
                    repeat={Infinity}
                    className="text-primary-500 font-semibold"
                  />
                </div>
              </FadeUp>

              <FadeUp delay={300}>
                <p className="text-lg text-[var(--text-secondary)] max-w-lg leading-relaxed">
                  Passionate about building innovative solutions using AI/ML,
                  Cybersecurity, and Full Stack Development. Turning complex
                  problems into elegant, efficient solutions.
                </p>
              </FadeUp>

              <FadeUp delay={420}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="/resume.pdf"
                    download
                    className="btn-pink px-7 py-3.5 bg-primary-500 hover:bg-primary-600
                               text-white rounded-xl font-semibold shadow-lg
                               inline-flex items-center gap-2"
                  >
                    <FiDownload />
                    Download Resume
                  </a>
                  <Link
                    to="contact"
                    smooth={true}
                    duration={500}
                    className="btn-outline-pink px-7 py-3.5 border-2 border-primary-500
                               text-primary-500 hover:bg-primary-500 hover:text-white
                               rounded-xl font-semibold inline-flex items-center gap-2 cursor-pointer"
                  >
                    <FiMail />
                    Contact Me
                  </Link>
                </div>
              </FadeUp>
            </div>

            {/* ── RIGHT — Profile ── */}
            <div className="flex justify-center">
              <div className="relative" style={{ width: 'fit-content' }}>

                {/* Profile photo circle */}
                <div
                  className="profile-pulse w-64 h-64 md:w-80 md:h-80 rounded-full
                             overflow-hidden border-4 border-primary-500
                             shadow-2xl shadow-primary-500/30"
                  style={{
                    opacity:    ready ? 1 : 0,
                    transform:  ready ? 'scale(1) translateX(0)' : 'scale(0.88) translateX(30px)',
                    transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1) 160ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) 160ms',
                  }}
                >
                  <img
                    src="/profile.jpeg"
                    alt="Abhinay Pal"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      // Fallback: gradient with initials
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.parentElement.style.background =
                        'linear-gradient(135deg, #be185d 0%, #ec4899 50%, #f472b6 100%)'
                      e.currentTarget.parentElement.innerHTML +=
                        '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:4rem;font-weight:900;color:white;letter-spacing:-2px">AP</div>'
                    }}
                  />
                </div>

                {/* Experience badge */}
                <div
                  className="absolute -bottom-3 -right-3 w-24 h-24 z-10
                             bg-primary-500 rounded-full flex items-center justify-center
                             text-white font-bold shadow-xl shadow-primary-500/50"
                  style={{
                    opacity:    ready ? 1 : 0,
                    transform:  ready ? 'scale(1)' : 'scale(0)',
                    transition: 'opacity 0.55s cubic-bezier(0.34,1.56,0.64,1) 580ms, transform 0.55s cubic-bezier(0.34,1.56,0.64,1) 580ms',
                  }}
                >
                  <div className="text-center">
                    <span className="block text-2xl leading-tight">1+</span>
                    <span className="block text-[10px] uppercase tracking-wide">Years</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Hero