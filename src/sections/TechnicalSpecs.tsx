import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const specs = [
  { name: 'Dimensions', value: '380mm \u00d7 280mm \u00d7 420mm (L\u00d7W\u00d7H)' },
  { name: 'Weight', value: '2.8kg' },
  { name: 'Axis Configuration', value: '3-Axis (X/Y/Z)' },
  { name: 'Drive System', value: 'Stepper Motors with Lead Screws' },
  { name: 'Positioning Accuracy', value: '\u00b10.05mm' },
  { name: 'Stylus Type', value: 'Capacitive Touch Tip' },
  { name: 'Vision System', value: 'OpenCV + Custom UI Recognition' },
  { name: 'Compatible Platforms', value: 'iOS (iPhone 6-15), Android' },
  { name: 'Supported Apps', value: 'TikTok, Douyin, Xiaohongshu' },
  { name: 'Daily Message Capacity', value: '2,800+ messages' },
  { name: 'Continuous Operation', value: '365 days' },
  { name: 'Touch Durability', value: '1,000,000+ touches' },
  { name: 'Power Input', value: 'DC 24V / 3A' },
  { name: 'Operating Temperature', value: '5\u00b0C \u2013 40\u00b0C' },
  { name: 'Patent', value: 'Application 202411429837.8' },
  { name: 'Manufacturer', value: 'Hefei Hito Technology Development Co., Ltd.' },
]

export default function TechnicalSpecs() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.specs-header > *', {
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

      gsap.from('.spec-row', {
        x: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.specs-table',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="specs"
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
          className="specs-grid-layout"
        >
          {/* Left Column - Header */}
          <div className="specs-header">
            <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>
              Specifications
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
              Built for Industrial Performance
            </h2>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'var(--color-fg-muted)',
                maxWidth: '420px',
              }}
            >
              Every component is selected for 24/7 continuous operation. From the stepper motors to the capacitive stylus, ADTRON is engineered for zero-downtime automation.
            </p>
          </div>

          {/* Right Column - Table */}
          <div className="specs-table">
            <div
              style={{
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              {specs.map((spec, index) => (
                <div
                  key={spec.name}
                  className="spec-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    padding: '0.875rem 1.25rem',
                    borderBottom:
                      index < specs.length - 1
                        ? '1px solid rgba(255, 255, 255, 0.06)'
                        : 'none',
                    background:
                      index % 2 === 1
                        ? 'rgba(255, 255, 255, 0.02)'
                        : 'transparent',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 400,
                      fontSize: '0.8125rem',
                      color: 'var(--color-fg-dim)',
                    }}
                  >
                    {spec.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      color: '#ffffff',
                      textAlign: 'right',
                    }}
                  >
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .specs-grid-layout {
            grid-template-columns: 40% 60% !important;
          }
        }
      `}</style>
    </section>
  )
}
