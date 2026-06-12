// src/components/Certifications/Certifications.jsx
import React, { useEffect, useRef, useState } from 'react'
import { FiExternalLink, FiAward, FiShield } from 'react-icons/fi'
import { certifications } from '../../data/certifications'

/* Duplicate list for seamless marquee loop */
const marqueeList = [...certifications, ...certifications]

const Certifications = () => {
  const [inView,    setInView]    = useState(false)
  const [hoveredId, setHoveredId] = useState(null)
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)
  const rafRef     = useRef(null)
  const posRef     = useRef(0)

  /* Intersection observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  /* Marquee animation */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const SPEED = 0.55   // px per frame
    const totalW = track.scrollWidth / 2

    const tick = () => {
      if (hoveredId === null) {
        posRef.current -= SPEED
        if (Math.abs(posRef.current) >= totalW) posRef.current = 0
        track.style.transform = `translateX(${posRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [hoveredId])

  return (
    <>
      <style>{`
        @keyframes certIn {
          from { opacity:0; transform: translateY(24px); }
          to   { opacity:1; transform: none; }
        }
        .cert-section { opacity:0; }
        .cert-section.in { animation: certIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }

        /* Marquee card */
        .cert-card {
          flex-shrink: 0;
          width: 300px;
          border-radius: 18px;
          border: 1.5px solid var(--border-color);
          background: var(--bg-primary);
          padding: 20px;
          cursor: pointer;
          transition: border-color .25s, transform .3s cubic-bezier(0.34,1.2,0.64,1), box-shadow .25s;
          position: relative;
          overflow: hidden;
        }
        .cert-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--cert-color, #ec4899);
          border-radius: 18px 18px 0 0;
          opacity: 0;
          transition: opacity .25s;
        }
        .cert-card:hover {
          border-color: var(--cert-color, #ec4899);
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 16px 40px rgba(0,0,0,.25);
        }
        .cert-card:hover::before { opacity: 1; }

        .cert-logo {
          width: 36px; height: 36px; object-fit: contain; border-radius: 8px;
          background: white; padding: 4px;
        }
        .cert-logo-fallback {
          width: 36px; height: 36px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; font-weight: 900; color: white; flex-shrink:0;
        }

        /* Verify badge */
        .verify-badge {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 11px; font-weight: 700; padding: 4px 10px;
          border-radius: 999px; color: white;
          background: var(--cert-color, #ec4899);
          transition: opacity .2s;
        }
        .verify-badge:hover { opacity: 0.85; }

        /* Fade masks on marquee */
        .marquee-wrap {
          position: relative;
          overflow: hidden;
        }
        .marquee-wrap::before,
        .marquee-wrap::after {
          content: '';
          position: absolute; top: 0; bottom: 0; width: 80px; z-index: 2; pointer-events: none;
        }
        .marquee-wrap::before {
          left: 0;
          background: linear-gradient(90deg, var(--bg-secondary), transparent);
        }
        .marquee-wrap::after {
          right: 0;
          background: linear-gradient(-90deg, var(--bg-secondary), transparent);
        }

        /* Stats strip */
        .stat-pill {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 20px; border-radius: 14px;
          border: 1.5px solid var(--border-color);
          background: var(--bg-primary);
          flex: 1; min-width: 140px;
          transition: border-color .2s, transform .2s;
        }
        .stat-pill:hover { border-color: #ec4899; transform: translateY(-2px); }
      `}</style>

      <section
        id="certifications"
        ref={sectionRef}
        className="section-container"
      >
        <div className={`cert-section${inView ? ' in' : ''}`}>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)]">
                Certifications &amp; <span className="text-primary-500">Credentials</span>
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Verified achievements — hover to pause, click to verify
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-3">
              <div className="stat-pill">
                <FiAward className="text-primary-500 text-xl flex-shrink-0" />
                <div>
                  <p className="text-lg font-black text-[var(--text-primary)] leading-none">
                    {certifications.length}
                  </p>
                  <p className="text-[11px] text-[var(--text-secondary)] font-medium">Certificates</p>
                </div>
              </div>
              <div className="stat-pill">
                <FiShield className="text-primary-500 text-xl flex-shrink-0" />
                <div>
                  <p className="text-lg font-black text-[var(--text-primary)] leading-none">
                    {[...new Set(certifications.map(c => c.organization))].length}
                  </p>
                  <p className="text-[11px] text-[var(--text-secondary)] font-medium">Issuers</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Marquee ribbon ── */}
          <div className="marquee-wrap py-2">
            <div
              ref={trackRef}
              className="flex gap-5"
              style={{ width: 'max-content' }}
            >
              {marqueeList.map((cert, i) => (
                <div
                  key={`${cert.id}-${i}`}
                  className="cert-card"
                  style={{ '--cert-color': cert.color }}
                  onMouseEnter={() => setHoveredId(cert.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => window.open(cert.verifyUrl, '_blank', 'noopener,noreferrer')}
                >
                  {/* Top row */}
                  <div className="flex items-center gap-3 mb-4">
                    {cert.logo ? (
                      <img
                        src={cert.logo}
                        alt={cert.organization}
                        className="cert-logo"
                        onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling.style.display='flex' }}
                      />
                    ) : null}
                    <div
                      className="cert-logo-fallback"
                      style={{ background: cert.color, display: cert.logo ? 'none' : 'flex' }}
                    >
                      {cert.organization.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                       <p className="text-xs font-bold text-[var(--text-secondary)] truncate">
                         {cert.organization}
                       </p>
                       <p className="text-xs text-[var(--text-secondary)] opacity-60">
                         {cert.date}
                       </p>
                     </div>

                     {/* Featured badge */}
                     {cert.badge && (
                       <span
                         className="text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0"
                         style={{ background: `${cert.color}25`, color: cert.color }}
                       >
                         {cert.badge}
                       </span>
                     )}
                   </div>

                  {/* Name */}
                  <h3 className="text-sm font-bold text-[var(--text-primary)] leading-snug mb-2 line-clamp-2">
                    {cert.name}
                  </h3>

                  {/* Hours badge if present */}
                  {cert.hours && (
                    <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2"
                          style={{ background: `${cert.color}22`, color: cert.color }}>
                      ⏱ {cert.hours}
                    </span>
                  )}

                  {/* Description */}
                  {cert.description && (
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mb-3 line-clamp-3">
                      {cert.description}
                    </p>
                  )}

                  {/* Cert number */}
                  {cert.certNo && (
                    <p className="text-[10px] text-[var(--text-secondary)] opacity-50 mb-2 font-mono truncate">
                      ID: {cert.certNo}
                    </p>
                  )}

                  {/* Verify button */}
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="verify-badge"
                    onClick={e => e.stopPropagation()}
                  >
                    <FiExternalLink size={11} />
                    Verify Certificate
                  </a>
                </div>
              ))}
            </div>
          </div>


        </div>
      </section>
    </>
  )
}

export default Certifications