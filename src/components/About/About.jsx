// src/components/About/About.jsx
import React from 'react'
import { FiBook, FiTarget, FiHeart } from 'react-icons/fi'
import Reveal from '../Reveal/Reveal'
import SplitText from '../Reveal/SplitText'

const About = () => {
  const interests = [
    { icon: '🤖', title: 'Artificial Intelligence' },
    { icon: '🧠', title: 'Machine Learning' },
    { icon: '🔒', title: 'Cybersecurity' },
    { icon: '📊', title: 'Data Science' },
    { icon: '💻', title: 'Web Development' },
    { icon: '🧩', title: 'Problem Solving' },
  ]

  return (
    <>
      <style>{`
        .info-row { transition: transform 0.25s ease; }
        .info-row:hover { transform: translateX(4px); }
        .interest-card:hover {
          transform: scale(1.06) !important;
          border-color: #ec4899 !important;
          box-shadow: 0 6px 24px rgba(236,72,153,0.18);
        }
      `}</style>

      <section id="about" className="section-container">

        {/* Title — word by word reveal */}
        <SplitText tag="h2" className="section-title" delay={0} wordDelay={80} type="up">
          About Me
        </SplitText>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left — slides in from left */}
          <Reveal type="left" delay={100}>
            <div className="space-y-6">
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                I'm a passionate Computer Science student with a deep interest in
                Artificial Intelligence, Machine Learning, and Cybersecurity.
                Currently pursuing my Master's degree, I combine academic
                excellence with hands-on project experience.
              </p>
              <div className="space-y-5">
                <div className="info-row flex items-start gap-4">
                  <span className="mt-1 p-2 rounded-lg bg-primary-500/10 text-primary-500">
                    <FiBook className="text-xl" />
                  </span>
                  <div>
                    <h3 className="font-semibold mb-1">Education</h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      Master's of Computer Applications<br />
                      Galgotias University • 2025 – 2027<br />
                      CGPA: 7.95 / 10
                    </p>
                  </div>
                </div>
                <div className="info-row flex items-start gap-4">
                  <span className="mt-1 p-2 rounded-lg bg-primary-500/10 text-primary-500">
                    <FiTarget className="text-xl" />
                  </span>
                  <div>
                    <h3 className="font-semibold mb-1">Career Goals</h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      To become a leading AI/ML engineer specializing in
                      cybersecurity applications, creating innovative solutions
                      that make technology safer and more accessible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — slides in from right */}
          <Reveal type="right" delay={200}>
            <h3 className="text-xl font-semibold mb-5 flex items-center gap-2">
              <FiHeart className="text-primary-500" />
              Areas of Interest
            </h3>
            {/* 2-column grid — each card pops in with individual stagger via inline transition */}
            <div className="grid grid-cols-2 gap-3">
              {interests.map((interest, index) => (
                <Reveal key={index} type="zoom" delay={280 + index * 80}>
                  <div className="interest-card card flex items-center gap-3 cursor-default transition-all duration-300 h-full">
                    <span className="text-2xl">{interest.icon}</span>
                    <span className="text-sm font-medium">{interest.title}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default About