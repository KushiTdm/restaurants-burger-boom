'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from '../lib/gsap'

// Photo de burger + calque détouré (même cadrage, superposé pixel pour pixel).
// Au survol de la carte, le burger "sort" de la photo : il grandit depuis sa base et passe
// au-dessus du bord haut, le fond s'assombrit, une ombre se pose dessous. Le retour est le
// reverse() de la même timeline (chemin strictement inverse).
// Pendant le survol, parallaxe à deux profondeurs (méthode du skill webgl-parallax-hero) :
// le fond et le burger glissent en sens opposés, le burger plus fort car plus proche. Pas de rotation.

type Props = {
  src: string
  cutout?: string
  base?: number // base du burger dans la photo (part de la hauteur), mesurée par scripts/cut-burger-layers.py
  alt: string
  sizes: string
  className?: string // classes du cadre (taille, arrondis)
  badge?: React.ReactNode
}

// Le burger grandit depuis sa base, qui reste posée : il recouvre entièrement celui de la photo
// (aucun second pain visible dessous) et passe au-dessus du bord haut du cadre.
const POP_SCALE = 1.2
// Amplitude de la parallaxe au bord de la carte, en px : fond (loin) et burger (près).
// Horizontale seulement pour le burger : un écart vertical ferait réapparaître la base de la photo.
const SWAY_FAR = 5
const SWAY_NEAR = 9

export default function PopOutImage({ src, cutout, base = 0.8, alt, sizes, className = '', badge }: Props) {
  const frame = useRef<HTMLDivElement>(null)
  const bg = useRef<HTMLDivElement>(null)
  const scrim = useRef<HTMLDivElement>(null)
  const shadow = useRef<HTMLDivElement>(null)
  const pop = useRef<HTMLDivElement>(null)
  const sway = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frameEl = frame.current
    if (!cutout || !frameEl || !pop.current || !sway.current || !bg.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const card = (frameEl.closest('article') as HTMLElement | null) ?? frameEl

    const tl = gsap
      .timeline({ paused: true, defaults: { duration: 0.55, ease: 'back.out(1.6)' } })
      // Au repos le calque est masqué (la photo montre le même burger, pixel pour pixel) : il apparaît
      // instantanément au début du survol, donc rien ne dépasse du cadre tant que la carte est au repos.
      .to(sway.current, { autoAlpha: 1, duration: 0.08, ease: 'none' }, 0)
      .to(pop.current, { scale: POP_SCALE, force3D: true }, 0)
      .to(scrim.current, { opacity: 1, ease: 'power2.out' }, 0)
      .to(shadow.current, { opacity: 1, scaleX: 1, ease: 'power2.out' }, 0.05)

    const nearX = gsap.quickTo(sway.current, 'x', { duration: 0.5, ease: 'power3.out' })
    const farX = gsap.quickTo(bg.current, 'x', { duration: 0.6, ease: 'power3.out' })
    const farY = gsap.quickTo(bg.current, 'y', { duration: 0.6, ease: 'power3.out' })
    const swayTo = (nx: number, ny: number) => {
      nearX(nx * SWAY_NEAR)
      farX(-nx * SWAY_FAR)
      farY(-ny * SWAY_FAR * 0.5)
    }

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      tl.play()
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const r = frameEl.getBoundingClientRect()
      swayTo(
        gsap.utils.clamp(-1, 1, ((e.clientX - r.left) / r.width) * 2 - 1),
        gsap.utils.clamp(-1, 1, ((e.clientY - r.top) / r.height) * 2 - 1),
      )
    }
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      tl.reverse()
      swayTo(0, 0)
    }
    card.addEventListener('pointerenter', onEnter)
    card.addEventListener('pointermove', onMove)
    card.addEventListener('pointerleave', onLeave)

    // Tactile (pas de survol) : le burger sort quand la carte est bien visible, rentre quand elle sort
    let io: IntersectionObserver | null = null
    // ?pop=touch force ce mode sur desktop pour le tester (comme les flags de debug du skill)
    const forceTouch = new URLSearchParams(window.location.search).get('pop') === 'touch'
    if (forceTouch || !window.matchMedia('(hover: hover)').matches) {
      io = new IntersectionObserver(([en]) => (en.isIntersecting ? tl.play() : tl.reverse()), {
        rootMargin: '-35% 0px -35% 0px',
      })
      io.observe(frameEl)
    }

    return () => {
      card.removeEventListener('pointerenter', onEnter)
      card.removeEventListener('pointermove', onMove)
      card.removeEventListener('pointerleave', onLeave)
      io?.disconnect()
      tl.kill()
    }
  }, [cutout])

  return (
    <div ref={frame} className={`relative ${className}`}>
      {/* Photo (fond), coupée au cadre */}
      <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
        <div ref={bg} className={`absolute -inset-3 ${cutout ? '' : 'group-hover:scale-110 transition-transform duration-500'}`}>
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {cutout && <div ref={scrim} className="absolute inset-0 bg-black/50 opacity-0 pointer-events-none" />}
      </div>

      {/* Burger détouré : déborde du cadre au survol */}
      {cutout && (
        <div ref={sway} className="absolute -inset-3 pointer-events-none z-10 invisible opacity-0">
          <div
            ref={shadow}
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 w-[46%] h-[9%] rounded-[50%] opacity-0 scale-x-75"
            style={{ top: `${(base - 0.05) * 100}%`, background: 'radial-gradient(closest-side, rgba(0,0,0,0.55), transparent)' }}
          />
          <div ref={pop} className="absolute inset-0 will-change-transform" style={{ transformOrigin: `50% ${base * 100}%` }}>
            <Image src={cutout} alt="" fill sizes={sizes} className="object-cover drop-shadow-[0_18px_22px_rgba(0,0,0,0.45)]" />
          </div>
        </div>
      )}

      {badge && <div className="absolute top-3 left-3 z-20">{badge}</div>}
    </div>
  )
}
