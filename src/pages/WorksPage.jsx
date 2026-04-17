import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import Logo from '../components/Logo.jsx'
import { fetchSeries } from '../services/api.js'

export default function WorksPage() {
  const navigate   = useNavigate()
  const gridRef    = useRef(null)
  const headerRef  = useRef(null)
  const [series, setSeries] = useState([])

  useEffect(() => {
    fetchSeries().then(setSeries)
  }, [])

  useEffect(() => {
    if (!series.length) return

    const tl = gsap.timeline()

    if (headerRef.current) {
      tl.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      )
    }

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.series-card')
      tl.fromTo(
        cards,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.07, ease: 'power3.out' },
        '-=0.4'
      )
    }
  }, [series])

  const totalWorks = series.reduce((n, s) => n + s.image_count, 0)

  return (
    <div className="min-h-screen bg-manila">
      {/* Logo */}
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

      {/* Page header */}
      <div ref={headerRef} className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 pt-20 sm:pt-24 pb-10 sm:pb-12">
        <p className="font-mono text-xs text-umber/40 tracking-[0.3em] uppercase mb-3">
          The Collection
        </p>
        <h1 className="font-display text-5xl md:text-7xl text-ink leading-[0.95]">
          All Works
        </h1>
        {series.length > 0 && (
          <p className="font-mono text-sm text-umber/50 mt-4">
            {series.length} series &nbsp;·&nbsp; {totalWorks} works
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12">
        <div className="border-t border-dust" />
      </div>

      {/* Series grid */}
      {series.length === 0 ? (
        <div className="w-full h-64 flex items-center justify-center">
          <div className="w-1 h-16 bg-sand animate-pulse" />
        </div>
      ) : (
        <div
          ref={gridRef}
          className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 py-8 sm:py-12
                     grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {series.map((s, idx) => (
            <div
              key={s.id}
              className="series-card cursor-pointer group opacity-0"
              style={{ opacity: 0 }}
              onClick={() => navigate(`/series/${encodeURIComponent(s.series_name)}`)}
              data-cursor-grow
            >
              {/* Cover image */}
              <div className="relative overflow-hidden bg-dust" style={{ aspectRatio: '4/3' }}>
                {s.cover_thumb ? (
                  <img
                    src={s.cover_thumb}
                    alt={s.series_name}
                    loading={idx < 6 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-[1.05]
                               transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full bg-dust" />
                )}
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/35
                                transition-colors duration-500" />
                {/* CTA text */}
                <div className="absolute inset-0 flex items-center justify-center
                                opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <p className="font-mono text-xs text-paper/80 tracking-[0.25em] uppercase">
                    View Series
                  </p>
                </div>
              </div>

              {/* Metadata */}
              <div className="mt-4">
                <h2 className="font-display text-xl text-ink leading-tight
                               group-hover:text-umber transition-colors duration-300">
                  {s.series_name}
                </h2>
                <div className="flex items-center gap-2 mt-1.5">
                  <p className="font-mono text-xs text-umber/60">{s.author}</p>
                  <span className="w-1 h-1 rounded-full bg-umber/30 flex-shrink-0" />
                  <p className="font-mono text-xs text-umber/40">{s.image_count} works</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer padding */}
      <div className="h-16" />
    </div>
  )
}
