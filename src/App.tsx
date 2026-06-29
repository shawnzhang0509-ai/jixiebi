import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Hero from './sections/Hero'
import ProductOverview from './sections/ProductOverview'
import LiveDemos from './sections/LiveDemos'
import HowItWorks from './sections/HowItWorks'
import TechnicalSpecs from './sections/TechnicalSpecs'
import PlatformSupport from './sections/PlatformSupport'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback)
    }
  }, [])

  return (
    <div>
      <Hero />
      <ProductOverview />
      <LiveDemos />
      <HowItWorks />
      <TechnicalSpecs />
      <PlatformSupport />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
