import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const specs = [
  { label: 'Axes', value: '3-Axis (X/Y/Z)' },
  { label: 'Material', value: '6061 Aluminum' },
  { label: 'Stylus', value: 'Capacitive Touch Tip' },
  { label: 'Weight', value: '2.8kg' },
]

export default function ProductOverview() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.product-image-container', {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.product-text > *', {
        x: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.spec-card', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.spec-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="product"
      style={{ background: '#0a0a0a' }}
      className="section-padding"
    >
      <div className="content-inner">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '4rem',
            alignItems: 'center',
          }}
          className="lg-grid-cols"
        >
          {/* Image Column */}
          <div className="product-image-container">
            <div
              style={{
                border: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '8px',
                borderRadius: '2px',
                boxShadow: '0 0 80px rgba(0, 212, 255, 0.08)',
              }}
            >
              <img
                src="/images/adtron-cad-wireframe.jpg"
                alt="ADTRON AI Marketing Robotic Arm CAD Blueprint"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '2px',
                }}
              />
            </div>
            <p
              className="label"
              style={{
                textAlign: 'center',
                marginTop: '1rem',
                color: 'var(--color-fg-dim)',
              }}
            >
              CAD Blueprint — 3-Axis Precision Arm
            </p>
          </div>

          {/* Text Column */}
          <div className="product-text">
            <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>
              The Hardware
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
              Engineered for Precision Interaction
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <p style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--color-fg-muted)' }}>
                ADTRON combines a precision 3-axis robotic arm with advanced AI computer vision. The mechanical stylus physically interacts with smartphone touchscreens — tapping, swiping, and typing with human-like accuracy.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--color-fg-muted)' }}>
                Built from black-anodized aluminum with industrial linear rails and high-torque stepper motors, ADTRON operates continuously for 365 days without interruption.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--color-fg-muted)' }}>
                Every interaction is powered by OpenCV-based UI element recognition, enabling the robot to navigate any app interface autonomously.
              </p>
            </div>

            {/* Spec Grid */}
            <div
              className="spec-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
              }}
            >
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="spec-card"
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '2px',
                    padding: '1rem',
                  }}
                >
                  <span
                    className="label"
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontSize: '0.625rem',
                      color: 'var(--color-fg-dim)',
                    }}
                  >
                    {spec.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      color: '#ffffff',
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
          .lg-grid-cols {
            grid-template-columns: 55% 45% !important;
          }
        }
      `}</style>
    </section>
  )
}
