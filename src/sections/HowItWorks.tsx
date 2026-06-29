import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eye, Brain, MoveHorizontal, MessageCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'AI Vision Scans',
    description: 'Computer vision algorithm analyzes the smartphone screen in real-time, identifying UI elements like buttons, comment boxes, and user profiles.',
    icon: Eye,
  },
  {
    number: '02',
    title: 'Decision Engine',
    description: 'OpenCV-based recognition engine determines the optimal interaction point and generates the appropriate touch sequence.',
    icon: Brain,
  },
  {
    number: '03',
    title: 'Physical Execution',
    description: 'The 3-axis robotic arm positions the capacitive stylus with sub-millimeter accuracy and executes the touch gesture.',
    icon: MoveHorizontal,
  },
  {
    number: '04',
    title: 'Result Captured',
    description: 'The system verifies the interaction result, logs performance metrics, and proceeds to the next target.',
    icon: MessageCircle,
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.workflow-header > *', {
        y: 30,
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

      gsap.from('.step-item', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.steps-container',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      // Connecting line animation
      gsap.from('.connecting-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.steps-container',
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ background: '#0a0a0a' }}
      className="section-padding"
    >
      <div className="content-inner">
        {/* Header */}
        <div className="workflow-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>
            Workflow
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#ffffff',
            }}
          >
            From Vision to Touch
          </h2>
        </div>

        {/* Steps */}
        <div className="steps-container" style={{ position: 'relative' }}>
          {/* Connecting Line (desktop only) */}
          <div
            className="connecting-line"
            style={{
              position: 'absolute',
              top: '40px',
              left: '12.5%',
              right: '12.5%',
              height: '1px',
              background: 'linear-gradient(to right, rgba(0, 212, 255, 0.1), rgba(0, 212, 255, 0.5), rgba(0, 212, 255, 0.1))',
              zIndex: 0,
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '3rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {steps.map((step) => {
              const IconComponent = step.icon
              return (
                <div
                  key={step.number}
                  className="step-item"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  {/* Number Circle */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      border: '2px solid var(--color-accent-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                      background: '#0a0a0a',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        color: 'var(--color-accent-cyan)',
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div style={{ marginBottom: '1rem' }}>
                    <IconComponent size={24} color="#00d4ff" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '1.25rem',
                      color: '#ffffff',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      color: 'var(--color-fg-muted)',
                      maxWidth: '260px',
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
