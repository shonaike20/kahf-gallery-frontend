import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CursorTrail() {
  const dotRef    = useRef(null)
  const ringRef   = useRef(null)
  const trailRefs = useRef([])

  useEffect(() => {
    const dot    = dotRef.current
    const ring   = ringRef.current
    const trails = trailRefs.current

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const history = trails.map(() => ({ x: pos.x, y: pos.y }))

    const qDot  = gsap.quickTo(dot,  'x', { duration: 0.08, ease: 'power3' })
    const qDotY = gsap.quickTo(dot,  'y', { duration: 0.08, ease: 'power3' })
    const qRing  = gsap.quickTo(ring, 'x', { duration: 0.28, ease: 'power3' })
    const qRingY = gsap.quickTo(ring, 'y', { duration: 0.28, ease: 'power3' })

    let raf
    let mouseX = pos.x
    let mouseY = pos.y

    function onMove(e) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function onEnter() { gsap.to(ring, { scale: 1.6, duration: 0.3 }) }
    function onLeave()  { gsap.to(ring, { scale: 1,   duration: 0.3 }) }

    function loop() {
      // Shift history
      for (let i = history.length - 1; i > 0; i--) {
        history[i].x += (history[i - 1].x - history[i].x) * 0.35
        history[i].y += (history[i - 1].y - history[i].y) * 0.35
      }
      history[0].x += (mouseX - history[0].x) * 0.45
      history[0].y += (mouseY - history[0].y) * 0.45

      qDot(mouseX)
      qDotY(mouseY)
      qRing(history[1]?.x ?? mouseX)
      qRingY(history[1]?.y ?? mouseY)

      // Trail dots
      trails.forEach((el, i) => {
        const h = history[i] ?? history[history.length - 1]
        gsap.set(el, { x: h.x, y: h.y, opacity: 1 - i / trails.length })
      })

      raf = requestAnimationFrame(loop)
    }

    // Grow ring on interactive elements
    document.querySelectorAll('a, button, [data-cursor-grow]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ left: 0, top: 0 }}
      >
        <div className="w-2 h-2 rounded-full bg-ink" />
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ left: 0, top: 0 }}
      >
        <div
          className="w-9 h-9 rounded-full border border-ink/40"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>

      {/* Trail particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={el => trailRefs.current[i] = el}
          className="pointer-events-none fixed z-[9997] -translate-x-1/2 -translate-y-1/2"
          style={{ left: 0, top: 0 }}
        >
          <div
            className="rounded-full bg-sand"
            style={{
              width:  `${6 - i * 0.5}px`,
              height: `${6 - i * 0.5}px`,
            }}
          />
        </div>
      ))}
    </>
  )
}
