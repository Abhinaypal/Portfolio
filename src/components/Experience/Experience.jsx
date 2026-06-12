// src/components/Experience/Experience.jsx
import React, { useEffect, useRef, useState } from 'react'
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi'
import Reveal from '../Reveal/Reveal'
import SplitText from '../Reveal/SplitText'

const experiences = [
  {
    id: 1,
    title: 'IR Associate',
    company: 'UnitedLex',
    location: 'Gurugram, India',
    period: 'Jan 2024 – Nov 2024',
    type: 'Full-Time',
    color: '#6366f1',          // indigo
    icon: '⚖️',
    bullets: [
      'Utilized the Relativity CRM Tool to evaluate and extract data from various file formats for US and UK clients.',
      'Conducted self-QC, confidential searches, and data extraction for corporate legal departments and law firms.',
      'Managed HIPAA-compliant healthcare documentation projects for top insurers including BCBS, Aetna, and UnitedLex.',
      'Extracted critical identifiers — Medicare/Medicaid IDs, group numbers, subscriber IDs, and claim numbers with high accuracy.',
      'Ensured regulatory adherence in handling sensitive PHI and PII data: SSN, DOB, DI, PP, MRN, PAN, HIC, and HIN.',
    ],
    tags: ['Relativity CRM', 'HIPAA', 'Data Extraction', 'PHI/PII', 'Legal Tech'],
  },
  {
    id: 2,
    title: 'Customer Support Associate',
    company: 'Tech Mahindra',
    location: 'India',
    period: 'Feb 2023 – Oct 2023',
    type: 'Full-Time',
    color: '#ec4899',          // pink
    icon: '🏢',
    bullets: [
      'Handled customer queries and issue resolution through efficient troubleshooting and support processes, ensuring high customer satisfaction.',
      'Developed in-depth knowledge of client products and services to provide accurate technical and operational assistance to customers.',
      'Adapted quickly to 10+ internal tools, product updates, and support systems, maintaining service quality and operational efficiency.',
      'Utilized TCS ERP software for managing customer data, tracking service requests, and improving operational workflows.',
      'Contributed to process optimization initiatives that improved team efficiency and reduced issue resolution time by approximately 10%.',
    ],
    tags: ['TCS ERP', 'Customer Support', 'Troubleshooting', 'Process Optimization'],
  },
  // ─── Add more experiences here ────────────────────────────────────────────
  // Fields: id, title, company, location, period, type, color, icon, bullets[], tags[]
]

const Experience = () => {
  const [visible, setVisible] = useState({})
  const refs = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setVisible(p => ({ ...p, [e.target.dataset.idx]: true }))
      }),
      { threshold: 0.12 }
    )
    refs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
        /* ── entrance animations ── */
        @keyframes expLeft  { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:none} }
        @keyframes expRight { from{opacity:0;transform:translateX(40px)}  to{opacity:1;transform:none} }
        .exp-item { opacity:0; }
        .exp-left  { animation: expLeft  0.65s cubic-bezier(0.22,1,0.36,1) forwards; }
        .exp-right { animation: expRight 0.65s cubic-bezier(0.22,1,0.36,1) forwards; }

        /* ── card ── */
        .exp-card {
          border-radius: 18px;
          border: 1.5px solid var(--border-color);
          background: var(--bg-primary);
          padding: 24px;
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .exp-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(0,0,0,.18);
        }

        /* ── bullet ── */
        .exp-bullet {
          display: flex; gap: 10px; align-items: flex-start;
          font-size: 13px; line-height: 1.65;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }
        .exp-bullet-dot {
          width: 6px; height: 6px; border-radius: 50%;
          flex-shrink: 0; margin-top: 7px;
        }

        /* ── tag ── */
        .exp-tag {
          font-size: 11px; font-weight: 600;
          padding: 3px 10px; border-radius: 999px;
          border: 1px solid; opacity: 0.85;
        }

        /* ── timeline dot pulse ── */
        @keyframes dotPing {
          0%   { transform: translate(-50%,-50%) scale(1);   opacity:.7; }
          70%  { transform: translate(-50%,-50%) scale(2.2); opacity:0;  }
          100% { transform: translate(-50%,-50%) scale(1);   opacity:0;  }
        }
        .tl-ping {
          position: absolute; inset:0;
          border-radius: 50%;
          animation: dotPing 2.5s ease-out infinite;
        }
      `}</style>

      <section id="experience" className="section-container">

        {/* Header */}
        <div className="mb-12">
          <SplitText tag="h2" className="text-3xl md:text-4xl font-black text-[var(--text-primary)]" delay={0} wordDelay={80} type="up">
            Work Experience
          </SplitText>
          <Reveal type="blur" delay={100}>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Professional journey &amp; real-world impact
            </p>
          </Reveal>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">

            {/* Vertical timeline line */}
            <div
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/60 via-primary-500/30 to-transparent"
              style={{ left: '20px' }}
            />

            {experiences.map((exp, i) => {
              const isVis = visible[i]
              return (
                <div
                  key={exp.id}
                  data-idx={i}
                  ref={el => (refs.current[i] = el)}
                  className={`exp-item relative pl-14 pb-14 last:pb-0 ${isVis ? (i % 2 === 0 ? 'exp-left' : 'exp-right') : ''}`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute"
                    style={{ left: '12px', top: '26px', width: '16px', height: '16px' }}
                  >
                    <div
                      className="tl-ping"
                      style={{ background: exp.color }}
                    />
                    <div
                      className="w-full h-full rounded-full ring-4"
                      style={{ background: exp.color, ringColor: `${exp.color}33` }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className="exp-card"
                    style={{ borderColor: isVis ? `${exp.color}30` : 'var(--border-color)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = exp.color}
                    onMouseLeave={e => e.currentTarget.style.borderColor = `${exp.color}30`}
                  >
                    {/* Card header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        {/* Role */}
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">{exp.icon}</span>
                          <h3 className="text-lg font-black text-[var(--text-primary)]">
                            {exp.title}
                          </h3>
                        </div>

                        {/* Company + location */}
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className="text-sm font-bold"
                            style={{ color: exp.color }}
                          >
                            {exp.company}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                            <FiMapPin size={11} />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Right side — date + type */}
                      <div className="flex flex-col items-end gap-1.5">
                        <span
                          className="text-[11px] font-black px-2.5 py-1 rounded-full"
                          style={{ background: `${exp.color}18`, color: exp.color }}
                        >
                          <FiBriefcase size={10} style={{ display:'inline', marginRight:4 }} />
                          {exp.type}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                          <FiCalendar size={11} />
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div
                      className="h-px w-full mb-4"
                      style={{ background: `linear-gradient(90deg, ${exp.color}40, transparent)` }}
                    />

                    {/* Bullet points */}
                    <ul className="mb-4">
                      {exp.bullets.map((b, bi) => (
                        <li key={bi} className="exp-bullet">
                          <span
                            className="exp-bullet-dot"
                            style={{ background: exp.color }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map(tag => (
                        <span
                          key={tag}
                          className="exp-tag"
                          style={{ color: exp.color, borderColor: `${exp.color}45`, background: `${exp.color}0e` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </section>
    </>
  )
}

export default Experience