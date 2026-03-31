/**
 * Local data service — fully monolithic, no backend required.
 * All data comes from src/data/gallery.js (local images + text).
 */
import { GALLERY_SERIES, ALL_IMAGES, getSeriesByName, shuffle } from '../data/gallery.js'

// ─── Module-level caches (persist for the lifetime of the page session) ────────
const _randomImagesCache  = new Map()   // limit → images[]
let   _seriesCache        = null        // series summary array
const _seriesDetailCache  = new Map()   // series_name → { series, images }

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Return `limit` randomly shuffled images from the full collection.
 * Result is cached per limit value so repeated calls (e.g. hot-reload,
 * back-navigation) skip the shuffle work.
 */
export function fetchRandomImages(limit = 15) {
  if (_randomImagesCache.has(limit)) {
    return Promise.resolve(_randomImagesCache.get(limit))
  }
  const pool = []
  while (pool.length < limit) pool.push(...shuffle(ALL_IMAGES))
  const result = pool.slice(0, limit)
  _randomImagesCache.set(limit, result)
  return Promise.resolve(result)
}

/**
 * Return all images, optionally filtered by series_name.
 */
export function fetchImages({ series_name } = {}) {
  const items = series_name
    ? ALL_IMAGES.filter(img => img.series_name === series_name)
    : ALL_IMAGES
  return Promise.resolve({ items, has_more: false })
}

/**
 * Return all series as summary objects (no images array).
 * Result is computed once and cached.
 */
export function fetchSeries() {
  if (_seriesCache) return Promise.resolve(_seriesCache)
  _seriesCache = GALLERY_SERIES.map(s => {
    const cover = ALL_IMAGES.find(img => img.series_id === s.id)
    return {
      id:             s.id,
      series_name:    s.series_name,
      author:         s.author,
      description:    s.description,
      image_count:    s.images.length,
      cover_image_id: s.images[0]?.id ?? null,
      cover_thumb:    cover?.thumb ?? cover?.src ?? '',
      cover_src:      cover?.src ?? '',
    }
  })
  return Promise.resolve(_seriesCache)
}

/**
 * Return a series and its images by series_name string.
 * Result is cached per series_name.
 */
export function fetchSeriesDetail(series_name) {
  if (_seriesDetailCache.has(series_name)) {
    return Promise.resolve(_seriesDetailCache.get(series_name))
  }
  const seriesData = getSeriesByName(series_name)
  if (!seriesData) {
    return Promise.resolve({ series: null, images: [] })
  }
  const series = {
    id:          seriesData.id,
    series_name: seriesData.series_name,
    author:      seriesData.author,
    description: seriesData.description,
    image_count: seriesData.images.length,
  }
  const images = ALL_IMAGES.filter(img => img.series_id === seriesData.id)
  const result = { series, images }
  _seriesDetailCache.set(series_name, result)
  return Promise.resolve(result)
}
