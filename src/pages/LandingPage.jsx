import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import Logo from '../components/Logo.jsx'
import { fetchRandomImages } from '../services/api.js'

const rand = (min, max) => Math.random() * (max - min) + min

const isMobile =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches

// Randomise a natural aspect ratio: landscape, portrait, or near-square
function randomAspect() {
  const r = Math.random()
  if (r < 0.45) return rand(1.3, 1.85)   // landscape
  if (r < 0.75) return rand(0.58, 0.82)  // portrait
  return rand(0.9, 1.15)                  // square-ish
}

// Static dot positions for background decoration (generated once)
const DOT_COUNT = 60
const dots = Array.from({ length: DOT_COUNT }, () => ({
  top:  rand(2, 98),   // percent
  left: rand(2, 98),
  size: rand(2, 4),
  opacity: rand(0.12, 0.35),
}))

export default function LandingPage() {
  const navigate      = useRef(useNavigate()).current
  const containerRef  = useRef(null)
  const cardsRef      = useRef([])
  const aliveRef      = useRef(new Set())
  const [images, setImages]         = useState([])
  const [ready,  setReady]          = useState(false)
  const [shattering, setShattering] = useState(false)

  // ── Load images ─────────────────────────────────────────────────────────────
  useEffect(() => {
    fetchRandomImages(isMobile ? 44 : 80).then(imgs => {
      const eagerCount = Math.min(20, imgs.length)
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
        { opacity: 0, scale: 0.85, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.0,
          stagger: { each: 0.04, from: 'random' },
          ease: 'power2.out',
          onComplete: () => {
            startWandering()
            setReady(true)
          },
        }
      )
    }, 80)
    return () => clearTimeout(id)
  }, [images])

  // ── Cleanup on unmount ────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      aliveRef.current.clear()
      cardsRef.current.forEach(c => c && gsap.killTweensOf(c))
    }
  }, [])

  // ── Wandering animation ───────────────────────────────────────────────────────
  function startWandering() {
    const cards = cardsRef.current.filter(Boolean)
    aliveRef.current = new Set(cards)

    function wander(card) {
      if (!aliveRef.current.has(card)) return
      gsap.to(card, {
        x:        rand(-50, 50),
        y:        rand(-40, 40),
        duration: rand(7, 16),
        ease:     'sine.inOut',
        onComplete: () => wander(card),
      })
    }

    cards.forEach(card => {
      gsap.delayedCall(rand(0, 4), () => wander(card))
    })
  }

  // ── Mouse parallax (depth layer) ─────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return
    let rafId = null
    let pendingX = 0, pendingY = 0

    function onMove(e) {
      const cx = window.innerWidth  / 2
      const cy = window.innerHeight / 2
      pendingX = (e.clientX - cx) / cx
      pendingY = (e.clientY - cy) / cy
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        cardsRef.current.forEach((card, i) => {
          if (!card) return
          const depth = cardPropsRef.current?.[i]?.depth ?? 1
          gsap.to(card, {
            x:        `+=${pendingX * depth * 10}`,
            y:        `+=${pendingY * depth *  5}`,
            duration: 1.4,
            ease:     'power2.out',
            overwrite: 'auto',
          })
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
  const handleImageClick = useCallback((img) => {
    if (!ready || shattering) return
    setShattering(true)

    aliveRef.current.clear()
    const cards = cardsRef.current.filter(Boolean)
    cards.forEach(c => gsap.killTweensOf(c))

    const tl = gsap.timeline({
      onComplete: () => navigate(
        `/series/${encodeURIComponent(img.series_name)}`,
        { state: { selectedImage: img } }
      ),
    })

    cards.forEach((card, i) => {
      tl.to(
        card,
        {
          x:       rand(-700, 700),
          y:       rand(200, 900),
          rotateZ: rand(-720, 720),
          rotateX: rand(-60, 60),
          scale:   rand(0.05, 0.4),
          opacity: 0,
          duration: rand(0.55, 1.0),
          ease:    'power3.in',
        },
        i * 0.03
      )
    })
  }, [ready, shattering, navigate])

  // ── Per-card layout props (stable) ───────────────────────────────────────────
  const cardPropsRef = useRef(null)
  if (!cardPropsRef.current && images.length) {
    const vw = typeof window !== 'undefined' ? window.innerWidth  : 1440
    const vh = typeof window !== 'undefined' ? window.innerHeight : 900

    const count = images.length
    const cols  = isMobile ? 4 : 8
    const rows  = Math.ceil(count / cols)

    const cellIndices = Array.from({ length: count }, (_, i) => i % (cols * rows))
    for (let k = cellIndices.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1))
      ;[cellIndices[k], cellIndices[j]] = [cellIndices[j], cellIndices[k]]
    }

    // Expand canvas 10% beyond viewport so edge images bleed off-screen
    const spreadW = vw * 1.10
    const spreadH = vh * 1.10
    const offsetX = -vw * 0.05
    const offsetY = -vh * 0.05
    const cellW   = spreadW / cols
    const cellH   = spreadH / rows

    cardPropsRef.current = images.map((_, i) => {
      const tier = Math.random()
      // Base width — scaled down on mobile so cards fit the narrower viewport
      const w = isMobile
        ? (tier < 0.45 ? rand(55, 80) : tier < 0.82 ? rand(80, 110) : rand(110, 140))
        : (tier < 0.45 ? rand(90, 145) : tier < 0.82 ? rand(145, 220) : rand(220, 310))

      const aspect = randomAspect()
      const h = w / aspect

      const cellIdx = cellIndices[i]
      const col     = cellIdx % cols
      const row     = Math.floor(cellIdx / cols)
      const pad     = 10
      const left    = offsetX + col * cellW + rand(pad, Math.max(pad + 1, cellW - w - pad))
      const top     = offsetY + row * cellH + rand(pad, Math.max(pad + 1, cellH - h - pad))

      const depth = Math.ceil(Math.random() * 3)

      return { top, left, w, h, depth, zIndex: depth }
    })
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden bg-manila"
    >
      {/* Background dot particles */}
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-umber pointer-events-none"
          style={{
            top:     `${d.top}%`,
            left:    `${d.left}%`,
            width:   d.size,
            height:  d.size,
            opacity: d.opacity,
          }}
        />
      ))}

      {/* KAHF Logo */}
      <div className="fixed top-6 left-8 z-30">
        <Logo size={52} />
      </div>

      {/* Tagline — centred above the nav row */}
      <div className="fixed bottom-[4.5rem] left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none hidden sm:block">
        <p className="font-mono text-[10px] text-neutral-400 tracking-[0.25em] uppercase">
          Click any work to explore
        </p>
      </div>

      {/* Mobile hint */}
      <div className="fixed bottom-[4.5rem] left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none sm:hidden">
        <p className="font-mono text-[10px] text-neutral-400 tracking-[0.2em] uppercase whitespace-nowrap">
          Tap any work to explore
        </p>
      </div>

      {/* All Works */}
      <button
        onClick={() => navigate('/works')}
        className="fixed bottom-8 right-8 z-30 font-mono text-xs text-ink/70
                   border border-ink/30 hover:border-ink hover:text-ink
                   bg-manila/60 backdrop-blur-sm hover:bg-manila/80
                   transition-all duration-200 tracking-widest uppercase
                   px-5 py-2.5 rounded-full"
        data-cursor-grow
      >
        All Works →
      </button>

      {/* Explore */}
      <button
        onClick={() => navigate('/explore')}
        className="fixed bottom-8 left-8 z-30 font-mono text-xs text-ink/70
                   border border-ink/30 hover:border-ink hover:text-ink
                   bg-manila/60 backdrop-blur-sm hover:bg-manila/80
                   transition-all duration-200 tracking-widest uppercase
                   px-5 py-2.5 rounded-full"
        data-cursor-grow
      >
        ← Explore
      </button>

      {/* Floating images */}
      {images.map((img, i) => {
        const cp = cardPropsRef.current?.[i]
        if (!cp) return null
        return (
          <div
            key={img.id}
            ref={el => { cardsRef.current[i] = el }}
            onClick={() => handleImageClick(img)}
            data-cursor-grow
            className="absolute cursor-pointer group"
            style={{
              top:        cp.top,
              left:       cp.left,
              width:      cp.w,
              height:     cp.h,
              zIndex:     cp.zIndex,
              opacity:    0,
              willChange: 'transform',
            }}
          >
            {/* Subtle shadow */}
            <div
              className="absolute inset-0 translate-y-1 translate-x-1 bg-black/8 blur-sm
                         group-hover:blur-md group-hover:bg-black/12 transition-all duration-400"
            />
            {/* Image */}
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={img.thumb}
                alt={img.image_name}
                loading={i < 16 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover
                           group-hover:scale-103 transition-transform duration-600 ease-out"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10
                              transition-colors duration-300" />
            </div>
          </div>
        )
      })}

      {/* Loading state */}
      {!images.length && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-px h-12 bg-neutral-300 animate-pulse" />
        </div>
      )}
    </div>
  )
}
