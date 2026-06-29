import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const tl = gsap.timeline()
    tl.from('.hero-label', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' })
      .from('.hero-headline', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
      .from('.hero-subline', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .from('.hero-cta', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .from('.hero-ticker', { opacity: 0, duration: 0.8 }, '-=0.2')

    if (videoRef.current) {
      gsap.from(videoRef.current, { scale: 1.05, duration: 2, ease: 'power2.out' })
      videoRef.current.play().catch(() => {})
    }

    return () => { tl.kill() }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const tickerText = "Patent No. 202411429837.8 \u00a0|\u00a0 Hefei Hito Technology \u00a0|\u00a0 2800+ msgs/day \u00a0|\u00a0 365 days continuous operation \u00a0|\u00a0 1,000,000+ touch durability \u00a0|\u00a0 "

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: '#0a0a0a',
      }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/videos/demo-promo.mp4" type="video/mp4" />
      </video>

      {/* Dark Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.6) 70%, #0a0a0a 100%)',
          zIndex: 1,
        }}
      />

      {/* Navigation */}
      <nav
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.25rem',
            letterSpacing: '0.15em',
            color: '#ffffff',
          }}
        >
          ADTRON
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[
            { label: 'Product', target: '#product' },
            { label: 'Demos', target: '#demos' },
            { label: 'Specs', target: '#specs' },
            { label: 'Contact', target: '#contact' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.target)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-fg-muted)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-fg-muted)')}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          width: '100%',
          maxWidth: '75rem',
          margin: '0 auto',
          padding: '8rem 2rem 6rem',
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <span className="hero-label label" style={{ display: 'block', marginBottom: '1.5rem' }}>
            AI Marketing Robotic Arm
          </span>

          <h1
            className="hero-headline"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              marginBottom: '1.5rem',
              textShadow: '0 2px 40px rgba(0,0,0,0.5)',
            }}
          >
            Automate Every Touchpoint
          </h1>

          <p
            className="hero-subline"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: '1.125rem',
              lineHeight: 1.65,
              color: 'var(--color-fg-muted)',
              maxWidth: '520px',
              marginBottom: '2.5rem',
              textShadow: '0 1px 20px rgba(0,0,0,0.5)',
            }}
          >
            Precision robotic arm with AI vision. 24/7 autonomous customer acquisition on TikTok, Douyin, and Xiaohongshu.
          </p>

          <div className="hero-cta" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              className="btn-primary"
              onClick={() => scrollTo('#demos')}
            >
              Watch Demo
            </button>
            <button
              className="btn-secondary"
              onClick={() => scrollTo('#specs')}
            >
              View Specs
            </button>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div
        className="hero-ticker"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: 0,
          width: '100%',
          overflow: 'hidden',
          zIndex: 5,
        }}
      >
        <div
          className="ticker-content"
          style={{
            display: 'inline-flex',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8125rem',
            color: 'var(--color-fg-dim)',
          }}
        >
          <span style={{ paddingRight: '2rem' }}>{tickerText}{tickerText}{tickerText}{tickerText}</span>
          <span>{tickerText}{tickerText}{tickerText}{tickerText}</span>
        </div>
      </div>
    </section>
  )
}
