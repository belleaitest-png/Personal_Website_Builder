import { useEffect, useRef, useState } from 'react'

// Respects prefers-reduced-motion: when set, content is revealed immediately
// and never animates. Motion must never hide essential content.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])
  return reduced
}

export function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) { setSeen(true); return }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSeen(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, reduced])

  return [ref, seen, reduced]
}

// Reveal style helper. With reduced motion this is a no-op.
export const rise = (active, delay = 0, reduced = false) =>
  reduced
    ? {}
    : {
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.85s cubic-bezier(0.22,0.61,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,0.61,0.36,1) ${delay}ms`,
      }
