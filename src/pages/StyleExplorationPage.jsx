import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Logo from '../components/Logo.jsx'
import { fetchRandomImages } from '../services/api.js'
import { shuffle } from '../data/gallery.js'

gsap.registerPlugin(ScrollTrigger)

// ── Section 1: Editorial / Museum ────────────────────────────────────────────
function EditorialSection({ images, onImageClick }) {
  const sectionRef = useRef(null)
  // Randomise layout on each load: vary sizes/positions from a few templates
  const layouts = useRef(null)
  if (!layouts.current && images.length) {
    const options = ['large-left', 'large-right', 'stacked', 'centered']
    layouts.current = options[Math.floor(Math.random() * options.length)]
  }
  const layout = layouts.current

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.reveal-item')
    if (!items) return
    gsap.fromTo(
      items,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [images])

  const main = images[0]
  const rest = images.slice(1, 4)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-manila flex flex-col justify-center px-12 py-24 overflow-hidden"
    >
      {layout === 'large-left' ? (
        <div className="reveal-item grid grid-cols-12 gap-6">
          <div
            className="col-span-7 cursor-pointer group overflow-hidden"
            onClick={() => onImageClick(main)}
            data-cursor-grow
          >
            <div className="relative overflow-hidden">
              <img
                src={main?.src}
                alt={main?.image_name}
                className="w-full h-[60vh] object-cover group-hover:scale-[1.04]
                           transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-ink/60 to-transparent
                              translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-display text-paper text-xl">{main?.image_name}</p>
                <p className="font-mono text-paper/70 text-sm">{main?.author}</p>
              </div>
            </div>
          </div>
          <div className="col-span-5 flex flex-col gap-6 justify-center">
            {rest.map(img => (
              <div
                key={img.id}
                className="cursor-pointer group overflow-hidden"
                onClick={() => onImageClick(img)}
                data-cursor-grow
              >
                <div className="relative overflow-hidden">
                  <img
                    src={img.src || img.thumb}
                    alt={img.image_name}
                    className="w-full h-36 object-cover group-hover:scale-[1.05]
                               transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10
                                  transition-colors duration-300" />
                </div>
                <p className="font-mono text-xs text-umber/60 mt-2">{img.image_name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : layout === 'large-right' ? (
        <div className="reveal-item grid grid-cols-12 gap-6">
          <div className="col-span-5 flex flex-col gap-6 justify-center">
            {rest.map(img => (
              <div
                key={img.id}
                className="cursor-pointer group overflow-hidden"
                onClick={() => onImageClick(img)}
                data-cursor-grow
              >
                <img
                  src={img.src || img.thumb}
                  alt={img.image_name}
                  className="w-full h-36 object-cover group-hover:scale-[1.05]
                             transition-transform duration-500"
                />
                <p className="font-mono text-xs text-umber/60 mt-2">{img.image_name}</p>
              </div>
            ))}
          </div>
          <div
            className="col-span-7 cursor-pointer group overflow-hidden"
            onClick={() => onImageClick(main)}
            data-cursor-grow
          >
            <div className="relative overflow-hidden">
              <img
                src={main?.src}
                alt={main?.image_name}
                className="w-full h-[60vh] object-cover group-hover:scale-[1.04]
                           transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-ink/60
                              to-transparent translate-y-full group-hover:translate-y-0
                              transition-transform duration-500">
                <p className="font-display text-paper text-xl">{main?.image_name}</p>
                <p className="font-mono text-paper/70 text-sm">{main?.author}</p>
              </div>
            </div>
          </div>
        </div>
      ) : layout === 'stacked' ? (
        <div className="reveal-item flex flex-col gap-8 max-w-2xl">
          {images.slice(0, 3).map((img, i) => (
            <div
              key={img.id}
              className="cursor-pointer group"
              onClick={() => onImageClick(img)}
              data-cursor-grow
              style={{ marginLeft: `${i * 48}px` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={img.src}
                  alt={img.image_name}
                  className="w-full h-56 object-cover group-hover:scale-[1.03]
                             transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/8
                                transition-colors duration-300" />
              </div>
              <div className="flex justify-between mt-2">
                <p className="font-display italic text-ink text-sm">{img.image_name}</p>
                <p className="font-mono text-umber/60 text-xs">{img.author}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Centered
        <div className="reveal-item flex flex-col items-center gap-10">
          <div
            className="cursor-pointer group w-full max-w-lg"
            onClick={() => onImageClick(main)}
            data-cursor-grow
          >
            <div className="relative overflow-hidden">
              <img
                src={main?.src}
                alt={main?.image_name}
                className="w-full h-[50vh] object-cover group-hover:scale-[1.04]
                           transition-transform duration-700"
              />
            </div>
            <p className="font-display text-ink text-xl mt-4 text-center">{main?.image_name}</p>
            <p className="font-mono text-umber/60 text-xs text-center mt-1">{main?.author}</p>
          </div>
          <div className="flex gap-6">
            {rest.slice(0, 2).map(img => (
              <div
                key={img.id}
                className="cursor-pointer group w-48"
                onClick={() => onImageClick(img)}
                data-cursor-grow
              >
                <img
                  src={img.src || img.thumb}
                  alt={img.image_name}
                  className="w-full h-32 object-cover group-hover:scale-[1.05]
                             transition-transform duration-500"
                />
                <p className="font-mono text-xs text-umber/60 mt-1">{img.image_name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

// ── Section 2: Magazine Flip ──────────────────────────────────────────────────

function MagazineSection({ images, onImageClick }) {
  const sectionRef     = useRef(null)
  const magazineRef    = useRef(null)
  const leftPageRef    = useRef(null)
  const rightPageRef   = useRef(null)
  const leftShadowRef  = useRef(null)
  const rightShadowRef = useRef(null)

  // Only 10 images → 5 spreads: [0,1], [2,3], [4,5], [6,7], [8,9]
  const pages = images.slice(0, 10)
  const spreads = []
  for (let i = 0; i < pages.length; i += 2) {
    spreads.push({ left: pages[i] ?? null, right: pages[i + 1] ?? null })
  }

  const [spreadIdx, setSpreadIdx] = useState(0)
  const [flipping, setFlipping]   = useState(false)

  const cur  = spreads[spreadIdx]     ?? { left: null, right: null }
  const prev = spreads[spreadIdx - 1]
  const next = spreads[spreadIdx + 1]

  // Entry animation
  useEffect(() => {
    if (!magazineRef.current) return
    gsap.fromTo(
      magazineRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 1.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  const imgSrc = (img) => img?.thumb || img?.src

  const flipForward = () => {
    if (flipping || spreadIdx >= spreads.length - 1) return
    setFlipping(true)
    const nextIdx = spreadIdx + 1

    gsap.timeline({ onComplete: () => setFlipping(false) })
      .to(rightPageRef.current, {
        rotateY: -90, duration: 0.3, ease: 'power2.in',
        transformOrigin: 'left center',
      })
      .to(leftShadowRef.current, { opacity: 0.45, duration: 0.3 }, '<')
      .call(() => setSpreadIdx(nextIdx))
      .to(rightPageRef.current, {
        rotateY: 0, duration: 0.3, ease: 'power2.out',
        transformOrigin: 'left center', delay: 0.02,
      })
      .to(leftShadowRef.current, { opacity: 0, duration: 0.3 }, '<')
  }

  const flipBackward = () => {
    if (flipping || spreadIdx <= 0) return
    setFlipping(true)
    const prevIdx = spreadIdx - 1

    gsap.timeline({ onComplete: () => setFlipping(false) })
      .to(leftPageRef.current, {
        rotateY: 90, duration: 0.3, ease: 'power2.in',
        transformOrigin: 'right center',
      })
      .to(rightShadowRef.current, { opacity: 0.45, duration: 0.3 }, '<')
      .call(() => setSpreadIdx(prevIdx))
      .to(leftPageRef.current, {
        rotateY: 0, duration: 0.3, ease: 'power2.out',
        transformOrigin: 'right center', delay: 0.02,
      })
      .to(rightShadowRef.current, { opacity: 0, duration: 0.3 }, '<')
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: '#0b0907', minHeight: '100vh' }}
    >
      {/* Film-grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.055,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}
      />

      {/* Vertical section label */}
      <div
        className="absolute right-0 top-1/2 pointer-events-none select-none z-10"
        style={{ transform: 'translateY(-50%) rotate(90deg) translateX(50%)', transformOrigin: 'right center' }}
      >
        <p className="font-mono text-[10px] tracking-[0.5em] uppercase whitespace-nowrap"
           style={{ color: 'rgba(196,168,122,0.18)' }}>
          02
        </p>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen py-16 px-4">

        {/* Magazine */}
        <div ref={magazineRef} style={{ opacity: 0, width: '100%', maxWidth: '860px' }}>

          {/* Book — drop shadow + pages */}
          <div style={{
            display: 'flex',
            height: 'min(58vh, 520px)',
            boxShadow: '0 50px 120px rgba(0,0,0,0.95), 0 20px 50px rgba(0,0,0,0.7)',
          }}>

            {/* ── Left page ──────────────────────────────────────────────── */}
            <div className="relative overflow-hidden" style={{ flex: 1, perspective: '1500px' }}>

              {/* Behind: prev spread's left, revealed when flipping backward */}
              <div className="absolute inset-0">
                {imgSrc(prev?.left) ? (
                  <img src={imgSrc(prev.left)} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full" style={{ background: '#100e0b' }} />
                )}
              </div>

              {/* Current left page (flips right when going backward) */}
              <div
                ref={leftPageRef}
                className="absolute inset-0"
                style={{ transformOrigin: 'right center', willChange: 'transform' }}
              >
                {imgSrc(cur.left) ? (
                  <img
                    src={imgSrc(cur.left)}
                    alt={cur.left?.image_name}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => !flipping && onImageClick(cur.left)}
                    data-cursor-grow
                  />
                ) : (
                  <div className="w-full h-full" style={{ background: '#100e0b' }} />
                )}
                {/* Right-edge depth shadow */}
                <div className="absolute inset-0 pointer-events-none"
                     style={{ background: 'linear-gradient(to right, transparent 72%, rgba(0,0,0,0.55) 100%)' }} />
                {cur.left && (
                  <div className="absolute bottom-3 left-3">
                    <p className="font-mono text-[8px] tracking-widest truncate"
                       style={{ color: 'rgba(240,230,200,0.38)', maxWidth: '80%' }}>
                      {cur.left.image_name}
                    </p>
                  </div>
                )}
              </div>

              {/* Shadow cast on left page when right page turns forward */}
              <div ref={leftShadowRef} className="absolute inset-0 pointer-events-none"
                   style={{ opacity: 0, background: 'linear-gradient(to right, transparent 15%, rgba(0,0,0,0.72) 100%)' }} />
            </div>

            {/* ── Spine ──────────────────────────────────────────────────── */}
            <div style={{
              width: '8px', flexShrink: 0, zIndex: 5,
              background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(196,168,122,0.1) 50%, rgba(0,0,0,0.55) 100%)',
              boxShadow: 'inset 0 0 8px rgba(0,0,0,0.5)',
            }} />

            {/* ── Right page ─────────────────────────────────────────────── */}
            <div className="relative overflow-hidden" style={{ flex: 1, perspective: '1500px' }}>

              {/* Behind: next spread's right, revealed when flipping forward */}
              <div className="absolute inset-0">
                {imgSrc(next?.right) ? (
                  <img src={imgSrc(next.right)} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"
                       style={{ background: '#100e0b' }}>
                    <p className="font-mono text-[10px] tracking-[0.4em] uppercase select-none"
                       style={{ color: 'rgba(196,168,122,0.12)' }}>fin</p>
                  </div>
                )}
              </div>

              {/* Current right page (flips left when going forward) */}
              <div
                ref={rightPageRef}
                className="absolute inset-0"
                style={{ transformOrigin: 'left center', willChange: 'transform' }}
              >
                {imgSrc(cur.right) ? (
                  <img
                    src={imgSrc(cur.right)}
                    alt={cur.right?.image_name}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => !flipping && onImageClick(cur.right)}
                    data-cursor-grow
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"
                       style={{ background: '#100e0b' }}>
                    <p className="font-mono text-[10px] tracking-[0.4em] uppercase select-none"
                       style={{ color: 'rgba(196,168,122,0.12)' }}>fin</p>
                  </div>
                )}
                {/* Left-edge depth shadow */}
                <div className="absolute inset-0 pointer-events-none"
                     style={{ background: 'linear-gradient(to left, transparent 72%, rgba(0,0,0,0.55) 100%)' }} />
                {cur.right && (
                  <div className="absolute bottom-3 right-3">
                    <p className="font-mono text-[8px] tracking-widest truncate text-right"
                       style={{ color: 'rgba(240,230,200,0.38)', maxWidth: '80%' }}>
                      {cur.right.image_name}
                    </p>
                  </div>
                )}
              </div>

              {/* Shadow cast on right page when left page turns backward */}
              <div ref={rightShadowRef} className="absolute inset-0 pointer-events-none"
                   style={{ opacity: 0, background: 'linear-gradient(to left, transparent 15%, rgba(0,0,0,0.72) 100%)' }} />
            </div>
          </div>

          {/* ── Navigation ─────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between mt-5 px-1">
            <button
              onClick={flipBackward}
              disabled={spreadIdx === 0 || flipping}
              data-cursor-grow
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(196,168,122,0.7)',
                opacity: spreadIdx === 0 || flipping ? 0.2 : 1,
                cursor: spreadIdx === 0 || flipping ? 'default' : 'pointer',
                transition: 'opacity 0.3s ease',
                background: 'none',
                border: 'none',
              }}
            >
              ← prev
            </button>

            {/* Pill-dot indicators */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {spreads.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === spreadIdx ? '22px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: i === spreadIdx
                      ? 'rgba(196,168,122,0.8)'
                      : 'rgba(196,168,122,0.22)',
                    transition: 'all 0.4s ease',
                  }}
                />
              ))}
            </div>

            <button
              onClick={flipForward}
              disabled={spreadIdx >= spreads.length - 1 || flipping}
              data-cursor-grow
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(196,168,122,0.7)',
                opacity: spreadIdx >= spreads.length - 1 || flipping ? 0.2 : 1,
                cursor: spreadIdx >= spreads.length - 1 || flipping ? 'default' : 'pointer',
                transition: 'opacity 0.3s ease',
                background: 'none',
                border: 'none',
              }}
            >
              next →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0b0907)' }}
      />
    </section>
  )
}

// ── Section 3: Cinematic / Oversized ─────────────────────────────────────────
function CinematicSection({ images, onImageClick }) {
  const sectionRef = useRef(null)
  const heroRef    = useRef(null)

  useEffect(() => {
    if (!heroRef.current) return

    const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches

    gsap.fromTo(
      heroRef.current,
      { scale: 1.08, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Slow parallax on scroll — skip on mobile (scroll scrub is expensive)
    if (!isMobile) {
      gsap.to(heroRef.current, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }
  }, [images])

  const hero = images[0]
  const row  = images.slice(1, 5)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-dust flex flex-col overflow-hidden"
    >
      {/* Cinematic hero */}
      <div
        className="relative h-[80vh] overflow-hidden cursor-pointer group"
        onClick={() => onImageClick(hero)}
        data-cursor-grow
      >
        <img
          ref={heroRef}
          src={hero?.src}
          alt={hero?.image_name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0 }}
        />
        {/* Dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/50" />

        {/* Cinematic bars */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-ink" />
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-ink" />

        {/* Text overlay */}
        <div className="absolute bottom-14 left-12 right-12">
          <h2 className="font-display text-6xl md:text-8xl text-paper leading-[0.9]">
            {hero?.image_name}
          </h2>
          <p className="font-mono text-paper/50 text-sm mt-3">{hero?.author}</p>
        </div>
      </div>

      {/* Strip */}
      <div className="flex gap-px bg-umber/20 mt-px">
        {row.map(img => (
          <div
            key={img.id}
            className="flex-1 cursor-pointer group overflow-hidden"
            onClick={() => onImageClick(img)}
            data-cursor-grow
          >
            <div className="relative overflow-hidden">
              <img
                src={img.thumb}
                alt={img.image_name}
                className="w-full h-40 object-cover group-hover:scale-110
                           transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/25
                              transition-colors duration-300 flex items-center justify-center">
                <p className="opacity-0 group-hover:opacity-100 font-display text-paper text-sm
                               italic transition-opacity duration-300">
                  {img.image_name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function StyleExplorationPage() {
  const navigate = useNavigate()
  const [images, setImages] = useState([])

  useEffect(() => {
    fetchRandomImages(22).then(imgs => setImages(shuffle(imgs)))
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  function handleImageClick(img) {
    navigate(`/series/${encodeURIComponent(img.series_name)}`, {
      state: { selectedImage: img },
    })
  }

  const s1 = images.slice(0, 5)
  const s2 = images.slice(5, 19)
  const s3 = images.slice(17, 22)

  if (!images.length) {
    return (
      <div className="w-screen h-screen bg-manila flex items-center justify-center">
        <div className="w-1 h-16 bg-sand animate-pulse" />
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-hidden">
      {/* Sticky logo */}
      <div className="fixed top-6 right-8 z-30 mix-blend-multiply">
        <Logo size={40} />
      </div>

      {/* Back */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-8 z-30 font-mono text-xs text-umber/60
                   hover:text-umber transition-colors tracking-widest uppercase"
        data-cursor-grow
      >
        ← Back
      </button>

      {/* All Works */}
      <button
        onClick={() => navigate('/works')}
        className="fixed top-6 left-28 z-30 font-mono text-xs text-umber/40
                   hover:text-umber/70 transition-colors tracking-widest uppercase"
        data-cursor-grow
      >
        All Works
      </button>

      <EditorialSection  images={s1}  onImageClick={handleImageClick} />
      <MagazineSection   images={s2}  onImageClick={handleImageClick} />
      <CinematicSection  images={s3}  onImageClick={handleImageClick} />
    </div>
  )
}
