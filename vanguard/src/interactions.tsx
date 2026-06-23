import { useRef, useEffect, useState, type ReactNode, type CSSProperties } from 'react'

/* ───────────────────────── 3D Tilt card ─────────────────────────
   Mouse-driven perspective rotation. Children can use translateZ
   (e.g. Tailwind `[transform:translateZ(40px)]`) to pop out in 3D. */
export function TiltCard({
  children,
  className = '',
  max = 12,
  style,
}: {
  children: ReactNode
  className?: string
  max?: number
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  const set = (rx: number, ry: number, scale = 1) => {
    if (ref.current) {
      ref.current.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`
    }
  }

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        set((0.5 - py) * max * 2, (px - 0.5) * max * 2, 1.02)
        el.style.setProperty('--gx', `${px * 100}%`)
        el.style.setProperty('--gy', `${py * 100}%`)
      }}
      onMouseLeave={() => set(0, 0, 1)}
      className={`[transform-style:preserve-3d] ${className}`}
      style={{
        transition:
          'transform 0.3s ease-out, border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ───────────────────────── Scroll reveal ─────────────────────────
   Fades + slides children up the first time they enter the viewport. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 32,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${y}px)`,
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s cubic-bezier(.2,.8,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ───────────────────────── Count-up number ─────────────────────────
   Animates "250+", "95%", "100%", "20+" from 0 → target when in view. */
export function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const m = String(value).match(/^(\D*)(\d[\d,]*)(.*)$/)
  const prefix = m ? m[1] : ''
  const target = m ? parseInt(m[2].replace(/,/g, ''), 10) : 0
  const suffix = m ? m[3] : ''
  const [n, setN] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el || !m) return
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const dur = 1400
        const t0 = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - t0) / dur, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setN(Math.round(target * eased))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [m, target])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {m ? n.toLocaleString() : value}
      {suffix}
    </span>
  )
}
