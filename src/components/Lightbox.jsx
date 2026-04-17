import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Lightbox({ image, onClose, onPrev, onNext }) {
  const overlayRef    = useRef(null)
  const panelRef      = useRef(null)
  const touchStartX   = useRef(null)
  const [fullLoaded, setFullLoaded] = useState(false)

  // Progressive load: show thumb immediately, swap to full-res when ready
  useEffect(() => {
    setFullLoaded(false)
    if (!image?.src || image.src === image.thumb) { setFullLoaded(true); return }
    const img = new window.Image()
    img.onload = () => setFullLoaded(true)
    img.src = image.src
  }, [image?.src])

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(panelRef.current,
        { opacity: 0, scale: 0.92, y: 24 },
        { opacity: 1, scale: 1,    y: 0,  duration: 0.45, ease: 'power3.out' },
        '-=0.15'
      )
  }, [])

  function handleClose() {
    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(panelRef.current,   { opacity: 0, scale: 0.92, y: 24, duration: 0.3, ease: 'power3.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.25 }, '-=0.1')
  }

  // Keyboard: Escape closes, arrows navigate
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape')     handleClose()
      if (e.key === 'ArrowLeft')  onPrev?.()
      if (e.key === 'ArrowRight') onNext?.()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onPrev, onNext])

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function onTouchEnd(e) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) {
      if (dx > 0) onPrev?.()
      else onNext?.()
    }
    touchStartX.current = null
  }

  if (!image) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/75 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={panelRef}
        className="relative max-w-4xl max-h-[90vh] w-full mx-2 sm:mx-4 flex flex-col bg-paper shadow-2xl"
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          data-cursor-grow
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center
                     text-inksoft hover:text-ink transition-colors font-body text-lg leading-none"
          aria-label="Close"
        >
          ×
        </button>

        {/* Prev arrow */}
        {onPrev && (
          <button
            onClick={onPrev}
            data-cursor-grow
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10
                       w-9 h-9 flex items-center justify-center
                       bg-paper/80 hover:bg-paper text-ink
                       transition-colors duration-200 shadow"
          >
            ‹
          </button>
        )}

        {/* Next arrow */}
        {onNext && (
          <button
            onClick={onNext}
            data-cursor-grow
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10
                       w-9 h-9 flex items-center justify-center
                       bg-paper/80 hover:bg-paper text-ink
                       transition-colors duration-200 shadow"
          >
            ›
          </button>
        )}

        {/* Image — show thumb immediately, swap to full-res when loaded */}
        <div className="flex-1 overflow-hidden relative bg-dust">
          <img
            src={fullLoaded ? image.src : (image.thumb || image.src)}
            alt={image.image_name}
            className="w-full h-full object-contain max-h-[70vh] transition-[filter] duration-500"
            style={{ filter: fullLoaded ? 'none' : 'blur(4px)' }}
          />
        </div>

        {/* Meta */}
        <div className="px-4 sm:px-8 py-4 sm:py-5 border-t border-dust">
          <p className="font-display text-lg text-ink">{image.image_name}</p>
          <p className="font-body text-sm text-umber mt-1">
            {image.author}
            {image.series_name && <> — <span className="italic">{image.series_name}</span></>}
          </p>
          {image.description && (
            <p className="font-mono text-xs text-inksoft/60 mt-2">{image.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}
