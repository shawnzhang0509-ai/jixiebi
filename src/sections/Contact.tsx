import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.contact-info > *', {
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.form-field', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{ background: '#141414' }}
      className="section-padding"
    >
      <div className="content-inner">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '4rem',
          }}
          className="contact-grid-layout"
        >
          {/* Left Column - Info */}
          <div className="contact-info">
            <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>
              Get In Touch
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                marginBottom: '1.5rem',
              }}
            >
              Ready to Automate Your Growth?
            </h2>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'var(--color-fg-muted)',
                marginBottom: '2rem',
                maxWidth: '420px',
              }}
            >
              Contact us to discuss how ADTRON can transform your customer acquisition strategy. Our team will help you set up a customized automation workflow.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <span
                  className="label"
                  style={{
                    display: 'block',
                    marginBottom: '0.25rem',
                    fontSize: '0.625rem',
                    color: 'var(--color-fg-dim)',
                  }}
                >
                  Company
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: '0.9375rem',
                    color: '#ffffff',
                  }}
                >
                  Hefei Hito Technology Development Co., Ltd.
                </span>
              </div>
              <div>
                <span
                  className="label"
                  style={{
                    display: 'block',
                    marginBottom: '0.25rem',
                    fontSize: '0.625rem',
                    color: 'var(--color-fg-dim)',
                  }}
                >
                  Patent
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 400,
                    fontSize: '0.875rem',
                    color: 'var(--color-fg-muted)',
                  }}
                >
                  Application 202411429837.8
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="contact-form">
            {submitted ? (
              <div
                style={{
                  background: 'rgba(0, 212, 255, 0.05)',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  borderRadius: '2px',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(0, 212, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                  }}
                >
                  <span style={{ fontSize: '1.5rem', color: '#00d4ff' }}>✓</span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    color: '#ffffff',
                    marginBottom: '0.5rem',
                  }}
                >
                  Message Sent
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-fg-muted)' }}>
                  Thank you for your interest. Our team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="form-field">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field">
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="form-input"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <textarea
                    placeholder="Tell us about your needs..."
                    className="form-input"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    style={{ resize: 'vertical' }}
                  />
                </div>
                <div className="form-field">
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%' }}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .contact-grid-layout {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
