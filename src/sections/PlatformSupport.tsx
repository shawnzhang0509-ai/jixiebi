import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const platforms = [
  {
    name: 'TikTok / Douyin',
    features: ['Auto-scroll video feed', 'Auto-like and follow', 'AI-powered commenting'],
  },
  {
    name: 'Xiaohongshu (RED)',
    features: ['Discover and browse content', 'Intelligent commenting', 'User profile interaction'],
  },
  {
    name: 'More Platforms',
    features: ['Custom app training', 'OpenCV UI adaptation', 'API integration ready'],
  },
]

export default function PlatformSupport() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.platforms-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.platform-card', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.platforms-grid',
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
      style={{ background: '#0a0a0a' }}
      className="section-padding"
    >
      <div className="content-inner">
        {/* Header */}
        <div className="platforms-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              lineHeight: 1.2,
              color: '#ffffff',
            }}
          >
            Works With Your Favorite Platforms
          </h2>
        </div>

        {/* Platform Cards */}
        <div
          className="platforms-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="platform-card"
              style={{
                background: '#1a1a1a',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '2px',
                padding: '2.5rem',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '1.25rem',
                  color: '#ffffff',
                  marginBottom: '1.5rem',
                }}
              >
                {platform.name}
              </h3>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {platform.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.625rem 0',
                      fontSize: '0.9375rem',
                      color: 'var(--color-fg-muted)',
                    }}
                  >
                    <Check size={16} color="#00d4ff" strokeWidth={2.5} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
