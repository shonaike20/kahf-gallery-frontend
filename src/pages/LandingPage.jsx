import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import Logo from '../components/Logo.jsx'
import { fetchRandomImages } from '../services/api.js'

// Random float between min and max
const rand = (min, max) => Math.random() * (max - min) + min

// Touch/mobile: fewer cards, simpler animation
const isMobile =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches

export default function LandingPage() {
  const navigate     = useNavigate()
  const containerRef = useRef(null)
  const cardsRef     = useRef([])
  const floatTweens  = useRef([])
  const quickXFns    = useRef([])   // pre-built quickTo setters — avoids tween creation per frame
  const [images, setImages]         = useState([])
  const [ready,  setReady]          = useState(false)
  const [shattering, setShattering] = useState(false)

  // ── Load images ─────────────────────────────────────────────────────────────
  useEffect(() => {
    fetchRandomImages(isMobile ? 36 : 72).then(imgs => {
      // Decode the first 24 images before mounting so the entry animation
      // never plays over half-decoded images (eliminates pop-in / jank)
      const eagerCount = Math.min(24, imgs.length)
      const decodes = imgs.slice(0, eagerCount).map(img => {
        const el = new window.Image()
        el.src = img.thumb || img.src
        return el.decode().catch(() => {})
      })
      Promise.all(decodes).then(() => setImages(imgs))
    })
  }, [])

  // ── Entry animation ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!images.length) return
    const id = setTimeout(() => {
      const cards = cardsRef.current.filter(Boolean)
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.8, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          stagger: { each: 0.07, from: 'random' },
          ease: 'power3.out',
          onComplete: () => {
            startFloating()
            setReady(true)
          },
        }
      )
    }, 80)
    return () => clearTimeout(id)
  }, [images])

  // ── Cleanup on unmount ────────────────────────────────────────────────────────
  useEffect(() => {
    return () => { floatTweens.current.forEach(t => t?.kill()) }
  }, [])

  // ── Floating animation ────────────────────────────────────────────────────────
  function startFloating() {
    const cards = cardsRef.current.filter(Boolean)

    floatTweens.current = cards.map((card) => {
      const duration = rand(4, 9)
      const yAmp     = rand(8, 20)

      // Simple vertical bob — symmetrical so cards never snap back to origin.
      const tween = gsap.fromTo(
        card,
        { y: -yAmp },
        {
          y:        yAmp,
          duration,
          ease:     'sine.inOut',
          repeat:   -1,
          yoyo:     true,
          paused:   true,
        }
      )

      // Start at a random phase so cards desync immediately.
      tween.time(rand(0, duration * 2))
      tween.play()
      return tween
    })
    // Build quickTo setters once so parallax never creates new tweens
    quickXFns.current = cards.map(card =>
      gsap.quickTo(card, 'x', { duration: 0.8, ease: 'power2.out' })
    )
  }

  // ── Mouse parallax ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return
    let rafId = null
    let pendingX = 0

    function onMove(e) {
      const cx = window.innerWidth / 2
      pendingX = (e.clientX - cx) / cx  // -1 to 1
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        quickXFns.current.forEach(qx => {
          qx(pendingX * 8)
        })
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [ready])

  // ── Shatter transition ────────────────────────────────────────────────────────
  const handleImageClick = useCallback((seriesName) => {
    if (!ready || shattering) return
    setShattering(true)

    floatTweens.current.forEach(t => t?.kill())
    floatTweens.current = []

    const cards = cardsRef.current.filter(Boolean)
    const tl = gsap.timeline({
      onComplete: () => navigate(`/series/${encodeURIComponent(seriesName)}`),
    })

    cards.forEach((card, i) => {
      tl.to(
        card,
        {
          x:        rand(-600, 600),
          y:        rand(200, 800),
          rotateZ:  rand(-720, 720),
          rotateX:  rand(-60, 60),
          scale:    rand(0.1, 0.5),
          opacity:  0,
          duration: rand(0.6, 1.1),
          ease:     'power3.in',
        },
        i * 0.04
      )
    })
  }, [ready, shattering, navigate])

  // ── Per-card tilt (stable across renders) ────────────────────────────────────
  const cardProps = useRef(null)
  if (!cardProps.current && images.length) {
    cardProps.current = images.map(() => ({
      rotate: rand(-4, 4),
    }))
  }

  return (
    <div
      ref={containerRef}
      className="relative w-screen min-h-screen overflow-x-hidden overflow-y-auto bg-manila"
    >
      {/* KAHF Logo — mix-blend-multiply on wrapper so it blends against the page, not its own stacking context */}
      <div className="fixed top-6 left-8 z-30 mix-blend-multiply">
        <Logo size={52} />
      </div>

      {/* Subtle tagline */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
        <p className="font-mono text-xs text-umber/50 tracking-[0.25em] uppercase">
          Click any work to explore
        </p>
      </div>

      {/* View all series link */}
      <button
        onClick={() => navigate('/works')}
        className="fixed bottom-8 right-8 z-30 font-mono text-xs text-umber/50
                   hover:text-umber transition-colors tracking-widest uppercase"
        data-cursor-grow
      >
        All Works →
      </button>

      {/* Explore editorial view */}
      <button
        onClick={() => navigate('/explore')}
        className="fixed bottom-8 left-8 z-30 font-mono text-xs text-umber/50
                   hover:text-umber transition-colors tracking-widest uppercase"
        data-cursor-grow
      >
        ← Explore
      </button>

      {/* Scrollable image grid */}
      <div
        className={`grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-1 p-2 pt-20 pb-16${!ready ? ' pointer-events-none select-none' : ''}`}
      >
        {images.map((img, i) => {
          const cp = cardProps.current?.[i]
          if (!cp) return null
          return (
            <div
              key={img.id}
              ref={el => cardsRef.current[i] = el}
              onClick={() => handleImageClick(img.series_name)}
              data-cursor-grow
              className="relative cursor-pointer group aspect-square"
              style={{
                transform: `rotateZ(${cp.rotate}deg)`,
                opacity:   0,
              }}
            >
              {/* Shadow */}
              <div
                className="absolute inset-0 translate-y-1 translate-x-1 bg-ink/15 blur-sm
                           group-hover:blur-md group-hover:bg-ink/20 transition-all duration-500"
              />
              {/* Image */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={img.thumb}
                  alt={img.image_name}
                  loading={i < 24 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-cover
                             group-hover:scale-105 transition-transform duration-700 ease-out"
                  draggable={false}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20
                                transition-colors duration-300" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Loading state */}
      {!images.length && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-16 bg-sand animate-pulse" />
        </div>
      )}
    </div>
  )
}
