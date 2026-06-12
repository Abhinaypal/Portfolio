// src/components/CodingProfiles/CodingProfiles.jsx
import React, { useEffect, useRef, useState } from 'react'
import { FiGithub, FiLinkedin, FiYoutube } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { profiles } from '../../data/profiles'

const profileData = [
  { name: 'GitHub',   icon: FiGithub,   url: profiles.github,   color: '#333',    hoverColor: '#ec4899' },
  { name: 'LinkedIn', icon: FiLinkedin, url: profiles.linkedin, color: '#0077B5', hoverColor: '#0077B5' },
  { name: 'LeetCode', icon: SiLeetcode, url: profiles.leetcode, color: '#FFA116', hoverColor: '#FFA116' },
  { name: 'YouTube',  icon: FiYoutube,  url: profiles.youtube,  color: '#FF0000', hoverColor: '#FF0000' },
]

const CodingProfiles = () => {
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
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @keyframes profilePop {
          from { opacity: 0; transform: scale(0.6) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .profile-item { opacity: 0; }
        .profile-item.play {
          animation: profilePop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .profile-circle {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.3s ease,
                      border-color 0.3s ease;
        }
        .profile-link:hover .profile-circle {
          transform: translateY(-6px) scale(1.08);
          box-shadow: 0 12px 28px rgba(236,72,153,0.2);
          border-color: #ec4899;
        }
      `}</style>

      <section id="profiles" className="section-container" ref={sectionRef}>
        <h2 className="section-title">Coding Profiles</h2>

        <div className="flex flex-wrap justify-center gap-10">
          {profileData.map((profile, index) => (
            <a
              key={index}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`profile-link profile-item flex flex-col items-center gap-3${inView ? ' play' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="profile-circle w-20 h-20 flex items-center justify-center
                           rounded-full bg-[var(--bg-secondary)]
                           border-2 border-[var(--border-color)]"
              >
                <profile.icon className="text-3xl" style={{ color: profile.color }} />
              </div>
              <span className="text-sm font-semibold text-[var(--text-secondary)]">
                {profile.name}
              </span>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}

export default CodingProfiles