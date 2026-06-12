// src/components/Contact/Contact.jsx
import React, { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { FiSend, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import Reveal from '../Reveal/Reveal'
import SplitText from '../Reveal/SplitText'

const Contact = () => {
  const formRef = useRef()
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields' })
      setLoading(false)
      return
    }

    try {
      const result = await emailjs.sendForm(
        'service_zgw2ewf',
        'template_kzze0al',
        formRef.current,
        'uzots8qivXHxGCKRb'
      )
      console.log('EmailJS Success:', result)
      setStatus({ type: 'success', message: '✅ Message sent successfully! I\'ll get back to you soon.' })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('EmailJS Error:', error?.text || error)
      setStatus({ type: 'error', message: `Failed to send: ${error?.text || 'Please try again.'}` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @keyframes contactIn {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .contact-col { opacity: 0; }
        .contact-col.play { animation: contactIn 0.65s cubic-bezier(0.22,1,0.36,1) forwards; }
        .contact-info-row { transition: transform 0.22s ease; }
        .contact-info-row:hover { transform: translateX(5px); }
      `}</style>

      <section id="contact" className="section-container" ref={sectionRef}>
        <SplitText tag="h2" className="section-title" delay={0} wordDelay={80} type="up">
          Get In Touch
        </SplitText>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left — contact info */}
          <Reveal type="right" delay={150}>
            <div className={`contact-col space-y-8${inView ? ' play' : ''}`} style={{ animationDelay: '0s' }}>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Let's work together</h3>
                <p className="text-[var(--text-secondary)]">
                  I'm always open to new opportunities, collaborations, and interesting projects.
                  Feel free to reach out!
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center">
                    <FiMail className="text-primary-500" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-sm text-[var(--text-secondary)]">abhinaypal7017.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center">
                    <FiMapPin className="text-primary-500" />
                  </div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-sm text-[var(--text-secondary)]">Noida, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center">
                    <FiPhone className="text-primary-500" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-sm text-[var(--text-secondary)]">+91 70177 66745</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — contact form */}
          <Reveal type="up" delay={200}>
            <div className={`contact-col${inView ? ' play' : ''}`} style={{ animationDelay: '0.15s' }}>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                {/* Hidden fields to cover all common EmailJS template variable names */}
                <input type="hidden" name="from_name" value={formData.name} readOnly />
                <input type="hidden" name="from_email" value={formData.email} readOnly />
                <input type="hidden" name="user_name" value={formData.name} readOnly />
                <input type="hidden" name="user_email" value={formData.email} readOnly />
                <input type="hidden" name="reply_to" value={formData.email} readOnly />

                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-primary)] border
                             border-[var(--border-color)] focus:border-primary-500
                             focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-primary)] border
                             border-[var(--border-color)] focus:border-primary-500
                             focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-primary)] border
                             border-[var(--border-color)] focus:border-primary-500
                             focus:outline-none transition-colors"
                    placeholder="Subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-primary)] border
                             border-[var(--border-color)] focus:border-primary-500
                             focus:outline-none transition-colors resize-none"
                    placeholder="Your message"
                  />
                </div>

                {status.message && (
                  <div className={`p-3 rounded-lg text-sm ${
                    status.type === 'success'
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      <FiSend />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default Contact