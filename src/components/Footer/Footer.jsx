// src/components/Footer/Footer.jsx
import React from 'react'
import { Link } from 'react-scroll'
import { FiArrowUp, FiGithub, FiLinkedin, FiTwitter, FiYoutube, FiInstagram } from 'react-icons/fi'
import { profiles } from '../../data/profiles'
import { socials } from '../../data/socials'

const Footer = () => {
  const quickLinks = [
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' }
  ]

  const socialLinks = [
    { icon: FiGithub, url: profiles.github },
    { icon: FiLinkedin, url: profiles.linkedin },
    { icon: FiTwitter, url: socials.twitter },
    { icon: FiYoutube, url: socials.youtube },
    { icon: FiInstagram, url: socials.instagram }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
      <div className="section-container py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary-500 mb-4">Portfolio</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Building innovative solutions with AI, ML, and Full Stack Development.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    className="text-sm text-[var(--text-secondary)] hover:text-primary-500 
                             transition-colors cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full 
                           bg-primary-500/10 text-primary-500 hover:bg-primary-500 
                           hover:text-white transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--border-color)] text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            © {new Date().getFullYear()} Abhinay Pal. All rights reserved.
          </p>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary-500 text-white 
                 rounded-full flex items-center justify-center shadow-lg 
                 hover:bg-primary-600 transition-all duration-300 
                 hover:scale-110 z-50"
      >
        <FiArrowUp size={20} />
      </button>
    </footer>
  )
}

export default Footer