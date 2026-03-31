import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import CursorTrail from './components/CursorTrail.jsx'

// Touch/mobile devices don't have a cursor — skip the trail entirely
const isTouchDevice =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches
import LandingPage from './pages/LandingPage.jsx'
import StyleExplorationPage from './pages/StyleExplorationPage.jsx'
import SeriesDetailPage from './pages/SeriesDetailPage.jsx'
import WorksPage from './pages/WorksPage.jsx'

function PageWrapper({ children }) {
  const wrapperRef = useRef(null)
  useEffect(() => {
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    )
  }, [])
  return <div ref={wrapperRef}>{children}</div>
}

export default function App() {
  const location = useLocation()

  return (
    <>
      {!isTouchDevice && <CursorTrail />}
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<PageWrapper><LandingPage /></PageWrapper>}
        />
        <Route
          path="/explore"
          element={<PageWrapper><StyleExplorationPage /></PageWrapper>}
        />
        <Route
          path="/series/:seriesName"
          element={<PageWrapper><SeriesDetailPage /></PageWrapper>}
        />
        <Route
          path="/works"
          element={<PageWrapper><WorksPage /></PageWrapper>}
        />
      </Routes>
    </>
  )
}
