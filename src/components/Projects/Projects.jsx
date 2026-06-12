// src/components/Projects/Projects.jsx
import React, { useEffect, useRef, useState } from 'react'
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi'
import { projects, projectCategories } from '../../data/projects'
import Reveal from '../Reveal/Reveal'
import SplitText from '../Reveal/SplitText'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [animKey,      setAnimKey]      = useState(0)
  const [inView,       setInView]       = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const setFilter = (f) => {
    if (f === activeFilter) return
    setActiveFilter(f)
    setAnimKey(k => k + 1)
  }

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  const featured = filtered.filter(p => p.featured)
  const rest     = filtered.filter(p => !p.featured)

  return (
    <>
      <style>{`
        /* ── section entrance ── */
        @keyframes projIn { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
        .proj-section { opacity:0 }
        .proj-section.in { animation: projIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards }

        /* ── filter tabs ── */
        .pf-tab {
          padding: 5px 16px; border-radius: 999px; font-size: 13px; font-weight: 600;
          border: 1.5px solid transparent; cursor: pointer; white-space: nowrap;
          color: var(--text-secondary); background: transparent;
          transition: color .22s, border-color .22s, background .22s;
        }
        .pf-tab:hover { color:#ec4899; border-color:rgba(236,72,153,.3); }
        .pf-tab.active { color:#ec4899; border-color:#ec4899; background:rgba(236,72,153,.08); }

        /* ── featured card ── */
        @keyframes featIn {
          from { opacity:0; transform: scale(0.94) translateY(20px); }
          to   { opacity:1; transform: scale(1) translateY(0); }
        }
        .feat-card {
          opacity:0;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .feat-card.play { animation: featIn .55s cubic-bezier(0.22,1,0.36,1) forwards; }
        .feat-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,.4); }

        .feat-glow {
          position: absolute; inset: 0; opacity: 0;
          transition: opacity .35s ease;
        }
        .feat-card:hover .feat-glow { opacity: 0.12; }

        .feat-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.85) 40%, transparent 100%);
        }

        /* ── grid card ── */
        @keyframes gridIn {
          from { opacity:0; transform: translateY(20px); }
          to   { opacity:1; transform: none; }
        }
        .grid-card {
          opacity:0;
          border-radius: 16px;
          border: 1.5px solid var(--border-color);
          background: var(--bg-primary);
          padding: 22px;
          transition: border-color .25s, transform .25s, box-shadow .25s;
          cursor: default;
        }
        .grid-card.play { animation: gridIn .45s cubic-bezier(0.22,1,0.36,1) forwards; }
        .grid-card:hover {
          border-color: #ec4899;
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(236,72,153,.15);
        }

        /* tech tag */
        .tech-tag {
          font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 999px;
          border: 1px solid rgba(236,72,153,.35); color: #ec4899;
          background: rgba(236,72,153,.07);
        }

        /* icon box */
        .proj-icon-box {
          width: 48px; height: 48px; border-radius: 14px; font-size: 22px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(236,72,153,.1); flex-shrink:0;
        }

        /* link btn */
        .proj-link {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 600; color: var(--text-secondary);
          transition: color .2s;
          text-decoration: none;
        }
        .proj-link:hover { color: #ec4899; }
      `}</style>

      <section
        id="projects"
        ref={sectionRef}
        className="section-container"
      >
        <div className={`proj-section${inView ? ' in' : ''}`}>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <SplitText tag="h2" className="section-title" delay={0} wordDelay={80} type="up">
                Projects
              </SplitText>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Things I've built — click a card to open the live demo
              </p>
            </div>

            {/* Filter tabs */}
            <Reveal type="up" delay={150}>
              <div className="flex flex-wrap gap-2">
                {projectCategories.map(cat => (
                  <button
                    key={cat}
                    className={`pf-tab${activeFilter === cat ? ' active' : ''}`}
                    onClick={() => setFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── Featured spotlight row ── */}
          {featured.length > 0 && (
            <Reveal type="zoom" delay={200}>
              <div
                key={`feat-${animKey}`}
                className={`grid gap-5 mb-6 ${featured.length === 1 ? '' : 'md:grid-cols-2'}`}
              >
              {featured.map((project, i) => (
                <div
                  key={project.id}
                  className="feat-card play"
                  style={{ animationDelay: `${i * 110}ms`, minHeight: 260 }}
                  onClick={() => window.open(project.demo !== 'https://demo-link.com' ? project.demo : project.github, '_blank', 'noopener,noreferrer')}
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                  {/* Hover glow */}
                  <div className={`feat-glow bg-gradient-to-br ${project.gradient}`} />
                  {/* Dark overlay for text */}
                  <div className="feat-overlay" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-6" style={{ minHeight: 260 }}>
                    {/* Top row */}
                    <div className="flex items-start justify-between">
                      <span className="text-4xl">{project.icon}</span>
                      <div className="flex gap-2">
                        <a
                          href={project.github}
                          target="_blank" rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
                          onClick={e => e.stopPropagation()}
                          title="GitHub"
                        >
                          <FiGithub size={14} className="text-white" />
                        </a>
                        <a
                          href={project.demo}
                          target="_blank" rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
                          onClick={e => e.stopPropagation()}
                          title="Live demo"
                        >
                          <FiExternalLink size={14} className="text-white" />
                        </a>
                      </div>
                    </div>

                    {/* Bottom info */}
                    <div>
                      <span className="text-xs font-semibold text-white/60 uppercase tracking-widest">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-black text-white mt-1 mb-2 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/75 leading-relaxed mb-3 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Live demo prominent button */}
                      {project.demo && project.demo !== 'https://demo-link.com' && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-xl
                                     bg-white text-gray-900 text-xs font-bold
                                     hover:bg-white/90 transition-all duration-200
                                     shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                          <FiExternalLink size={12} />
                          Live Demo
                        </a>
                      )}

                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map(tech => (
                          <span
                            key={tech}
                            className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full
                                       bg-white/15 text-white/90"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </Reveal>
          )}

          {/* ── Regular grid ── */}
          {rest.length > 0 && (
            <Reveal type="up" stagger delay={250}>
              <div
                key={`grid-${animKey}`}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
              {rest.map((project, i) => (
                <div
                  key={project.id}
                  className="grid-card play"
                  style={{ animationDelay: `${(featured.length * 110) + i * 90}ms` }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="proj-icon-box">{project.icon}</div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-semibold text-primary-500 uppercase tracking-wide">
                        {project.category}
                      </span>
                      <h3 className="font-bold text-[var(--text-primary)] leading-tight text-sm mt-0.5 truncate">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 4).map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-3 border-t border-[var(--border-color)]">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="proj-link">
                      <FiGithub size={13} /> Code
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="proj-link">
                      <FiExternalLink size={13} /> Demo
                    </a>
                    <a href={project.docs} target="_blank" rel="noopener noreferrer" className="proj-link">
                      <FiArrowUpRight size={13} /> Docs
                    </a>
                  </div>
                </div>
              ))}
              </div>
            </Reveal>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-[var(--text-secondary)]">
              <p className="text-4xl mb-3">🚧</p>
              <p className="font-semibold">No projects in this category yet</p>
            </div>
          )}

        </div>
      </section>
    </>
  )
}

export default Projects