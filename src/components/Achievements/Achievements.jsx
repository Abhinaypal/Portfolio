// src/components/Achievements/Achievements.jsx
import React, { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'
import { FiAward, FiCode, FiDatabase, FiStar } from 'react-icons/fi'
import SplitText from '../Reveal/SplitText'
import Reveal from '../Reveal/Reveal'

const stats = [
  { icon: FiCode,     label: 'LeetCode Problems',  value: 350, suffix: '+' },
  { icon: FiStar,     label: 'HackerRank Badges',  value: 15,  suffix: ''  },
  { icon: FiAward,    label: 'Coding Contests',     value: 25,  suffix: '+' },
  { icon: FiDatabase, label: 'Projects Completed',  value: 30,  suffix: '+' }
]

const Achievements = () => {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @keyframes achCard {
          from { opacity: 0; transform: translateY(30px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ach-card { opacity: 0; }
        .ach-card.play {
          animation: achCard 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .ach-card:hover {
          transform: translateY(-4px) !important;
          border-color: #ec4899 !important;
          box-shadow: 0 10px 28px rgba(236,72,153,0.18);
        }
        .ach-card { transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
        .ach-icon { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .ach-card:hover .ach-icon { transform: scale(1.2) rotate(-6deg); }
      `}</style>

      <section
        id="achievements"
        className="section-container"
        ref={sectionRef}
      >
        <SplitText tag="h2" className="section-title" delay={0} wordDelay={80} type="up">
          Achievements &amp; Stats
        </SplitText>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`ach-card card text-center${inView ? ' play' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <stat.icon className="ach-icon text-4xl text-primary-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary-500">
                {inView
                  ? <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
                  : '0'
                }
              </div>
              <p className="text-sm text-[var(--text-secondary)] mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Detail cards */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">LeetCode Stats</h3>
            <div className="space-y-4">
              {[
                { label: 'Easy',   solved: '88/949',   pct: 75,  color: 'bg-green-500'  },
                { label: 'Medium', solved: '72/2067',  pct: 48,  color: 'bg-yellow-500' },
                { label: 'Hard',   solved: '6/942',    pct: 53,  color: 'bg-red-500'    },
              ].map(({ label, solved, pct, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{label}</span>
                    <span>{solved}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${color} h-2 rounded-full transition-all duration-700`}
                      style={{ width: inView ? `${pct}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4">LeetCode Badges</h3>
            <div className="grid grid-cols-3 gap-3">
              {['Python', 'Java', 'SQL', 'C++', 'JavaScript', 'Problem Solving'].map((badge) => (
                <div
                  key={badge}
                  className="text-center p-2 rounded-lg bg-primary-500/10
                             hover:bg-primary-500/20 transition-colors duration-200 cursor-default"
                >
                  <span className="text-2xl">⭐</span>
                  <p className="text-xs mt-1 font-medium">{badge}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Achievements