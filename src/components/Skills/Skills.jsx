// src/components/Skills/Skills.jsx
import React, { useEffect, useRef, useState } from 'react'
import { skillsData } from '../../data/skills'
import Reveal from '../Reveal/Reveal'
import SplitText from '../Reveal/SplitText'

const Skills = () => {
  const [activeTab, setActiveTab]   = useState(0)
  const [animKey,   setAnimKey]     = useState(0)   // re-triggers animation on tab switch
  const [inView,    setInView]      = useState(false)
  const sectionRef                  = useRef(null)

  /* Intersection observer — fire once */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const switchTab = (idx) => {
    if (idx === activeTab) return
    setActiveTab(idx)
    setAnimKey(k => k + 1)
  }

  const category = skillsData[activeTab]

  return (
    <>
      <style>{`
        /* ── tab bar ── */
        .sk-tab {
          position: relative;
          padding: 6px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          border: 1.5px solid transparent;
          color: var(--text-secondary);
          background: transparent;
          transition: color 0.22s, border-color 0.22s, background 0.22s;
          white-space: nowrap;
        }
        .sk-tab:hover { color: #ec4899; border-color: rgba(236,72,153,0.35); }
        .sk-tab.active {
          color: #ec4899;
          border-color: #ec4899;
          background: rgba(236,72,153,0.08);
        }

        /* ── pill cards ── */
        @keyframes pillIn {
          from { opacity:0; transform: translateY(14px) scale(0.92); }
          to   { opacity:1; transform: translateY(0)    scale(1);    }
        }
        .sk-pill {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 14px 8px 10px;
          border-radius: 12px;
          border: 1.5px solid var(--border-color);
          background: var(--bg-primary);
          cursor: pointer;
          opacity: 0;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .sk-pill.visible {
          animation: pillIn 0.4s cubic-bezier(0.34,1.4,0.64,1) forwards;
        }
        .sk-pill:hover {
          border-color: #ec4899;
          box-shadow: 0 4px 18px rgba(236,72,153,0.18);
          transform: translateY(-2px);
        }
        .sk-pill:hover .sk-pill-logo {
          transform: scale(1.15) rotate(5deg);
        }
        .sk-pill-logo {
          width: 28px; height: 28px; object-fit: contain;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
          flex-shrink: 0;
        }
        .sk-pill-name {
          font-size: 13px; font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
        }

        /* section entrance */
        @keyframes skSection {
          from { opacity:0; transform: translateY(24px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .sk-section { opacity:0; }
        .sk-section.in { animation: skSection 0.55s cubic-bezier(0.22,1,0.36,1) forwards; }
      `}</style>

      <section
        id="skills"
        ref={sectionRef}
        className="section-container"
      >
        {/* Title */}
        <div className={`sk-section${inView ? ' in' : ''}`}>
          <SplitText tag="h2" className="section-title" delay={0} wordDelay={80} type="blur">
            Skills &amp; Technologies
          </SplitText>

          {/* ── Tab bar ── */}
          <Reveal type="up" delay={200}>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {skillsData.map((cat, i) => (
                <button
                  key={cat.category}
                  className={`sk-tab${activeTab === i ? ' active' : ''}`}
                  onClick={() => switchTab(i)}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </Reveal>

          {/* ── Active category label ── */}
          <div className="flex items-center gap-2 mb-5">
            <span className="w-5 h-0.5 bg-primary-500 rounded-full" />
            <span className="text-sm font-semibold text-primary-500 tracking-wide uppercase">
              {category.category}
            </span>
            <span className="text-xs text-[var(--text-secondary)] ml-1">
              ({category.skills.length} skills)
            </span>
          </div>

          {/* ── Pill grid ── */}
          <Reveal type="zoom" stagger delay={250}>
            <div
              key={animKey}           /* remount on tab switch → re-runs animations */
              className="flex flex-wrap gap-3"
            >
              {category.skills.map((skill, i) => (
                <div
                  key={skill.name}
                  className="sk-pill visible"
                  style={{ animationDelay: `${i * 55}ms` }}
                  onClick={() => window.open(skill.docs, '_blank', 'noopener,noreferrer')}
                  title={`Open ${skill.name} docs`}
                >
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className="sk-pill-logo"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      const fb = document.createElement('div')
                      fb.style.cssText = `width:28px;height:28px;border-radius:6px;background:${skill.color || '#ec4899'};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px;flex-shrink:0`
                      fb.textContent = skill.name.charAt(0)
                      e.currentTarget.parentNode.insertBefore(fb, e.currentTarget)
                    }}
                  />
                  <span className="sk-pill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ── All skills mini-map (all categories at once, tiny dots) ── */}
          <div className="mt-10 pt-8 border-t border-[var(--border-color)]">
            <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-4">
              All technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {skillsData.flatMap(cat =>
                cat.skills.map(skill => (
                  <span
                    key={cat.category + skill.name}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs
                               font-medium border border-[var(--border-color)]
                               text-[var(--text-secondary)] hover:border-primary-500
                               hover:text-primary-500 transition-colors duration-200 cursor-default"
                  >
                    <img
                      src={skill.logo}
                      alt=""
                      className="w-3.5 h-3.5 object-contain"
                      onError={(e) => { e.currentTarget.style.display='none' }}
                    />
                    {skill.name}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Skills