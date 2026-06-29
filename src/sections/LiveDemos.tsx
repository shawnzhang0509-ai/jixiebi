import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const demoVideos = [
  {
    src: '/videos/product-packaging.mp4',
    poster: '/videos/product-packaging-poster.jpg',
    title: 'Product Packaging',
    desc: 'Premium packaging design showcasing the ADTRON brand identity',
    tag: 'BRAND',
  },
  {
    src: '/videos/demo-scrolling.mp4',
    poster: '/videos/demo-scrolling-poster.jpg',
    title: 'Auto-Scrolling & Discovery',
    desc: 'Physical arm swipes through Xiaohongshu content, identifying target users',
    tag: 'DISCOVERY',
  },
  {
    src: '/videos/demo-promo.mp4',
    poster: '/videos/demo-promo-poster.jpg',
    title: 'AI Vision + Robotic Execution',
    desc: 'Split-screen showing UI recognition algorithm and CAD blueprint in action',
    tag: 'TECHNOLOGY',
  },
  {
    src: '/videos/demo-typing.mp4',
    poster: '/videos/demo-typing-poster.jpg',
    title: 'Intelligent Commenting',
    desc: 'AI-generated comments physically typed by the robotic stylus in real-time',
    tag: 'ENGAGEMENT',
  },
  {
    src: '/videos/demo-structure.mp4',
    poster: '/videos/demo-structure-poster.jpg',
    title: 'Hardware Architecture',
    desc: 'Full mechanical structure with aluminum frame, motors, and linear rail system',
    tag: 'HARDWARE',
  },
  {
    src: '/videos/demo-liking.mp4',
    poster: '/videos/demo-liking-poster.jpg',
    title: 'Auto-Like & Interaction',
    desc: 'Robotic arm taps hearts and interacts with Douyin/TikTok video content',
    tag: 'INTERACTION',
  },
]

function VideoCard({ video }: { video: typeof demoVideos[0] }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [isPlaying])

  return (
    <>
      <div
        className="video-card"
        style={{
          background: '#1a1a1a',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '2px',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsPlaying(true)}
      >
        {/* Thumbnail Container */}
        <div
          style={{
            position: 'relative',
            height: '220px',
            overflow: 'hidden',
            background: '#0a0a0a',
            backgroundImage: `url(${video.poster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 0.4s ease',
            transform: isHovered ? 'scale(1.03)' : 'scale(1)',
          }}
        >
          {/* Dark overlay on hover */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.4)',
              transition: 'opacity 0.3s ease',
              opacity: isHovered ? 1 : 0,
            }}
          />
          {/* Play button - always visible, larger on hover */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: isHovered ? '64px' : '48px',
              height: isHovered ? '64px' : '48px',
              borderRadius: '50%',
              background: isHovered ? 'rgba(0, 212, 255, 0.25)' : 'rgba(0, 212, 255, 0.15)',
              border: '2px solid #00d4ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
          >
            <Play size={isHovered ? 28 : 20} color="#00d4ff" fill="#00d4ff" />
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span className="label-tag">{video.tag}</span>
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '1.125rem',
              color: '#ffffff',
              marginBottom: '0.5rem',
            }}
          >
            {video.title}
          </h3>
          <p
            style={{
              fontSize: '0.875rem',
              lineHeight: 1.55,
              color: 'var(--color-fg-muted)',
            }}
          >
            {video.desc}
          </p>
        </div>
      </div>

      {/* Video Lightbox */}
      {isPlaying && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.9)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
          onClick={() => setIsPlaying(false)}
        >
          {/* Close button */}
          <button
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#ffffff',
              padding: '0.5rem',
            }}
            onClick={() => setIsPlaying(false)}
          >
            <X size={32} />
          </button>
          {/* Video */}
          <video
            ref={videoRef}
            src={video.src}
            autoPlay
            muted
            controls
            playsInline
            preload="auto"
            style={{
              maxWidth: '100%',
              maxHeight: '90vh',
              borderRadius: '4px',
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

export default function LiveDemos() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.demos-header > *', {
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

      gsap.from('.video-card', {
        y: 40,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.video-grid',
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
      id="demos"
      style={{ background: '#141414' }}
      className="section-padding"
    >
      <div className="content-inner">
        {/* Header */}
        <div className="demos-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>
            Product Demos
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '1rem',
            }}
          >
            See It In Action
          </h2>
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.65,
              color: 'var(--color-fg-muted)',
              maxWidth: '480px',
              margin: '0 auto',
            }}
          >
            Real footage of ADTRON performing automated social media interactions
          </p>
        </div>

        {/* Video Grid */}
        <div
          className="video-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
            gap: '1.5rem',
          }}
        >
          {demoVideos.map((video) => (
            <VideoCard key={video.src} video={video} />
          ))}
        </div>
      </div>
    </section>
  )
}
