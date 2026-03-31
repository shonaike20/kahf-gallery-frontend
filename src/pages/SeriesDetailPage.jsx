import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import Logo from '../components/Logo.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { fetchSeriesDetail } from '../services/api.js'

export default function SeriesDetailPage() {
  const { seriesName }  = useParams()
  const { state }       = useLocation()
  const navigate        = useNavigate()
  const heroRef         = useRef(null)
  const metaRef         = useRef(null)
  const gridRef         = useRef(null)
  const [series, setSeries]           = useState(null)
  const [images, setImages]           = useState([])
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [loading, setLoading]         = useState(true)

  const selectedImage = state?.selectedImage ?? null
  const [heroIndex, setHeroIndex] = useState(null)

  // ── Load data ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const decoded = decodeURIComponent(seriesName)
    fetchSeriesDetail(decoded).then(({ series, images }) => {
      setSeries(series)
      setImages(images)
      // pin hero to the image the user clicked, fallback to 0
      if (selectedImage) {
        const idx = images.findIndex(img => img.id === selectedImage.id)
        setHeroIndex(idx >= 0 ? idx : 0)
      } else {
        setHeroIndex(0)
      }
      setLoading(false)
    })
  }, [seriesName])

  // ── Entry animations ───────────────────────────────────────────────────────
  useEffect(() => {
    if (loading) return
    const tl = gsap.timeline()

    if (heroRef.current) {
      tl.fromTo(
        heroRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
      )
    }
    if (metaRef.current) {
      tl.fromTo(
        metaRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
        '-=0.7'
      )
    }
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.grid-item')
      tl.fromTo(
        items,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out' },
        '-=0.4'
      )
    }
  }, [loading])

  if (loading) {
    return (
      <div className="w-screen h-screen bg-manila flex items-center justify-center">
        <div className="w-1 h-16 bg-sand animate-pulse" />
      </div>
    )
  }

  // Hero image driven by heroIndex
  const heroImage     = images[heroIndex ?? 0]
  const galleryImages = images.filter(img => img.id !== heroImage?.id)

  const heroPrev = () => setHeroIndex(i => (i - 1 + images.length) % images.length)
  const heroNext = () => setHeroIndex(i => (i + 1) % images.length)

  // Lightbox helpers — navigate through galleryImages
  const openLightbox  = i => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage     = () => setLightboxIndex(i => (i - 1 + galleryImages.length) % galleryImages.length)
  const nextImage     = () => setLightboxIndex(i => (i + 1) % galleryImages.length)

  return (
    <div className="min-h-screen bg-manila">
      {/* Logo */}
      <div className="fixed top-6 right-8 z-30 mix-blend-multiply">
        <Logo size={40} />
      </div>

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-8 z-30 font-mono text-xs text-umber/60
                   hover:text-umber transition-colors tracking-widest uppercase"
        data-cursor-grow
      >
        ← Back
      </button>

      {/* All series link */}
      <button
        onClick={() => navigate('/works')}
        className="fixed top-6 left-28 z-30 font-mono text-xs text-umber/40
                   hover:text-umber/70 transition-colors tracking-widest uppercase"
        data-cursor-grow
      >
        All Works
      </button>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden bg-ink group/hero">
        {heroImage && (
          <img
            ref={heroRef}
            src={heroImage.src}
            alt={heroImage.image_name}
            className="absolute inset-0 w-full h-full object-contain"
            style={{ opacity: 0 }}
          />
        )}

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />

        {/* Image title overlay — top left, offset below fixed nav */}
        {heroImage?.image_name && (
          <div className="absolute top-16 left-6 z-10 pointer-events-none">
            <p className="font-display text-paper/70 text-sm md:text-base
                          bg-ink/25 backdrop-blur-sm px-3 py-1.5 rounded-sm
                          tracking-wide leading-snug">
              {heroImage.image_name}
            </p>
          </div>
        )}

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={heroPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                         w-10 h-10 flex items-center justify-center
                         text-paper/50 hover:text-paper/90
                         bg-ink/10 hover:bg-ink/30 backdrop-blur-sm
                         rounded-full border border-paper/10 hover:border-paper/30
                         transition-all duration-300
                         opacity-0 group-hover/hero:opacity-100"
              data-cursor-grow
              aria-label="Previous image"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13L5 8l5-5" />
              </svg>
            </button>

            <button
              onClick={heroNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                         w-10 h-10 flex items-center justify-center
                         text-paper/50 hover:text-paper/90
                         bg-ink/10 hover:bg-ink/30 backdrop-blur-sm
                         rounded-full border border-paper/10 hover:border-paper/30
                         transition-all duration-300
                         opacity-0 group-hover/hero:opacity-100"
              data-cursor-grow
              aria-label="Next image"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10
                            flex gap-1.5 opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300
                    ${i === heroIndex
                      ? 'bg-paper/80 scale-125'
                      : 'bg-paper/30 hover:bg-paper/60'}`}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Metadata ──────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-8 md:px-12 py-16">
        <div ref={metaRef} className="border-b border-dust pb-12 mb-12">
          {/* Author label */}
          <p className="font-mono text-xs text-umber/50 tracking-[0.3em] uppercase mb-4">
            {series?.author ?? heroImage?.author}
          </p>

          {/* Series name — primary title */}
          <h1 className="font-display text-4xl md:text-6xl text-ink leading-[1.0]">
            {series?.series_name ?? heroImage?.series_name}
          </h1>

          {/* Description */}
          {series?.description && (
            <p className="font-body text-inksoft/70 text-base md:text-lg mt-6 max-w-2xl leading-relaxed">
              {series.description}
            </p>
          )}

          {/* Stats row */}
          <div className="flex gap-8 mt-8">
            {series?.image_count && (
              <div>
                <p className="font-mono text-xs text-umber/40 uppercase tracking-widest">Works</p>
                <p className="font-display text-2xl text-ink mt-0.5">{series.image_count}</p>
              </div>
            )}
            <div>
              <p className="font-mono text-xs text-umber/40 uppercase tracking-widest">Artist</p>
              <p className="font-display text-2xl text-ink mt-0.5">
                {series?.author ?? heroImage?.author}
              </p>
            </div>
            {heroImage?.description && (
              <div>
                <p className="font-mono text-xs text-umber/40 uppercase tracking-widest">Medium</p>
                <p className="font-display text-2xl text-ink mt-0.5">{heroImage.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Series Gallery ─────────────────────────────────────────────── */}
        {galleryImages.length > 0 && (
          <div>
            <p className="font-mono text-xs text-umber/50 tracking-[0.3em] uppercase mb-8">
              Series — {series?.series_name ?? heroImage?.series_name}
            </p>

            <div
              ref={gridRef}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {galleryImages.map((img, i) => (
                <div
                  key={img.id}
                  className="grid-item cursor-pointer group"
                  style={{ opacity: 0 }}
                  onClick={() => openLightbox(i)}
                  data-cursor-grow
                >
                  <div className="relative overflow-hidden aspect-square bg-dust">
                    <img
                      src={img.thumb}
                      alt={img.image_name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover
                                 group-hover:scale-[1.08] transition-transform duration-500 ease-out"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20
                                    transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-end p-3
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div>
                        <p className="font-display text-paper text-sm leading-tight">
                          {img.image_name}
                        </p>
                        {img.description && (
                          <p className="font-mono text-paper/60 text-xs mt-0.5">
                            {img.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          image={galleryImages[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={galleryImages.length > 1 ? prevImage : undefined}
          onNext={galleryImages.length > 1 ? nextImage : undefined}
        />
      )}
    </div>
  )
}
