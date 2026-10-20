'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from '../lib/gsap'

// Ordre du haut vers le bas. w = largeur en fraction de la largeur du conteneur, cy = centre vertical
// de la couche dans la photo du burger assemblé (px, repère de la photo détourée 808×639).
const LAYERS = [
  { key: 'bun-top', alt: 'Chapeau de pain sésame', w: 0.66, tilt: -4, cy: 100, nat: [673, 266] },
  { key: 'lettuce', alt: 'Salade', w: 0.78, tilt: 3, cy: 240, nat: [899, 327] },
  { key: 'tomato', alt: 'Tomates', w: 0.63, tilt: -2, cy: 285, nat: [646, 129] },
  { key: 'onion', alt: 'Oignons rouges', w: 0.65, tilt: 4, cy: 325, nat: [757, 187] },
  { key: 'cheese', alt: 'Fromage fondu', w: 0.62, tilt: -3, cy: 395, nat: [704, 316] },
  { key: 'steak', alt: 'Steak grillé', w: 0.69, tilt: 2, cy: 430, nat: [820, 401] },
  { key: 'bacon', alt: 'Bacon croustillant', w: 0.79, tilt: -3, cy: 520, nat: [852, 331] },
  { key: 'bun-bottom', alt: 'Fond de pain toasté', w: 0.66, tilt: 3, cy: 560, nat: [816, 364] },
] as const

// Photo du burger assemblé : 808×639, affichée à 80 % de la largeur du conteneur.
const PHOTO_W = 0.8
const PHOTO_RATIO = 639 / 808

// Hauteur du conteneur en unités de largeur (1 = largeur du conteneur).
const HC = 1.7
const N = LAYERS.length

// Centres verticaux (depuis le haut, en unités de largeur) : assemblé et éclaté.
const photoTop = (HC - PHOTO_W * PHOTO_RATIO) / 2
const { assembled, exploded } = (() => {
  const h = LAYERS.map((l) => (l.w * l.nat[1]) / l.nat[0])
  const assembled = LAYERS.map((l) => photoTop + (l.cy * PHOTO_W) / 808)

  // Éclaté : centres répartis sur toute la hauteur
  const margin = 0.03
  const first = margin + h[0] / 2
  const last = HC - margin - h[N - 1] / 2
  const exploded = LAYERS.map((_, i) => first + ((last - first) * i) / (N - 1))
  return { assembled, exploded }
})()

type Proxy = { p: number; f: number }

// Rang depuis les extrémités : 0 = pains (haut/bas), 3 = couches centrales
const RANK = LAYERS.map((_, i) => Math.min(i, N - 1 - i))
const MAX_RANK = Math.max(...RANK)

// Timings (s) : ouverture 0.7, décalage entre couches 0.09, pause burger ouvert 1.1
const OPEN = 0.7
const STAGGER = 0.09
const HOLD = 1.1

// Diagonale à l'ouverture : amplitude totale (fraction de la largeur) répartie de façon symétrique
// (le haut part vers la droite, le bas vers la gauche) → aucune couche ne sort du cadre. DIAG_DIR = -1 pour inverser.
const DIAG = 0.26
const DIAG_DIR = 1

// Ouverture « accordéon » : les extrémités partent d'abord, la vague gagne le centre.
// UNE SEULE timeline : la fermeture est son reverse(), donc le chemin retracé est strictement identique
// (mêmes positions, même vague, même vitesse) → aucun écart visible au retour sur la photo.
const buildOpenTimeline = (proxies: Proxy[]) => {
  const tl = gsap.timeline({ paused: true })
  proxies.forEach((px, i) => {
    tl.to(px, { p: 1, duration: OPEN, ease: 'power3.inOut' }, RANK[i] * STAGGER)
  })
  return tl
}

export default function BurgerStack() {
  const stage = useRef<HTMLDivElement>(null)
  const shadow = useRef<HTMLDivElement>(null)
  const photo = useRef<HTMLDivElement>(null)
  const layersWrap = useRef<HTMLDivElement>(null)
  const layerEls = useRef<(HTMLDivElement | null)[]>([])
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    const stageEl = stage.current
    if (!stageEl) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const proxies: Proxy[] = LAYERS.map(() => ({ p: 0, f: 0 }))
    let W = stageEl.clientWidth
    const openTl = buildOpenTimeline(proxies)
    let hold: gsap.core.Tween | null = null
    let autoReverse = false
    let dragging = false

    const render = () => {
      let sum = 0
      let maxAbs = 0
      proxies.forEach((px, i) => {
        const el = layerEls.current[i]
        if (!el) return
        const k = Math.min(Math.abs(px.p), 1) // le flottement s'éteint au repos : les calques retombent pile sur la photo
        const amp = W * 0.012 * k
        gsap.set(el, {
          xPercent: -50, // centre horizontal (remplace le translateX CSS, que gsap.set écraserait)
          x: px.p * (0.5 - i / (N - 1)) * DIAG * DIAG_DIR * W,
          y: px.p * (exploded[i] - assembled[i]) * W + px.f * amp,
          rotation: px.p * LAYERS[i].tilt + px.f * k * 2,
        })
        sum += px.p
        maxAbs = Math.max(maxAbs, Math.abs(px.p))
      })
      // Photo ↔ calques : le fondu suit l'écartement, donc l'aller et le retour sont symétriques
      const o = 1 - gsap.utils.clamp(0, 1, maxAbs / 0.25)
      const smooth = o * o * (3 - 2 * o)
      if (photo.current) photo.current.style.opacity = String(smooth)
      if (layersWrap.current) layersWrap.current.style.opacity = smooth > 0.999 ? '0' : '1'
      if (shadow.current) {
        const avg = Math.min(Math.max(sum / N, 0), 1)
        gsap.set(shadow.current, { scaleX: 1 - avg * 0.25, opacity: 0.12 + avg * 0.2 })
      }
    }

    const ctx = gsap.context(() => {
      render()
      if (reduced) return

      // Lévitation : chaque couche flotte à son rythme
      proxies.forEach((px) => {
        px.f = gsap.utils.random(-1, 1)
        gsap.fromTo(
          px,
          { f: -1 },
          {
            f: 1,
            duration: gsap.utils.random(2.2, 3.4),
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: -gsap.utils.random(0, 2),
          },
        )
      })

      // Intro : burger droit, puis ouverture en diagonale, pause, retour strictement inverse
      play(0.9)
    }, stageEl)

    // Le ticker ne tourne que lorsque le burger est visible
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) gsap.ticker.add(render)
      else gsap.ticker.remove(render)
    })
    io.observe(stageEl)

    const ro = new ResizeObserver(() => {
      W = stageEl.clientWidth
      render()
    })
    ro.observe(stageEl)

    // Cycle auto : ouverture, pause, puis reverse() de la même timeline
    openTl.eventCallback('onComplete', () => {
      if (autoReverse) hold = gsap.delayedCall(HOLD, () => openTl.reverse())
    })
    function play(delay = 0) {
      hold?.kill()
      gsap.killTweensOf(openTl)
      autoReverse = true
      // Repart de la position actuelle (jamais de retour à zéro) : on finit d'ouvrir, puis pause et reverse() via onComplete
      hold = gsap.delayedCall(delay, () => {
        if (openTl.progress() >= 1) hold = gsap.delayedCall(HOLD, () => openTl.reverse())
        else openTl.play()
      })
    }
    const takeControl = () => {
      hold?.kill()
      autoReverse = false
      gsap.killTweensOf(openTl)
      openTl.pause()
    }
    // Position pilotée directement (glisse / survol) : on avance la même timeline, jamais d'autre chemin
    const seek = (progress: number, duration: number) =>
      gsap.to(openTl, { progress, duration, ease: 'power3.out', overwrite: true })
    const settle = () => {
      gsap.killTweensOf(openTl)
      openTl.reverse()
    }
    let startY = 0
    let moved = false
    const replay = () => play(0)

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      takeControl()
      dragging = true
      moved = false
      startY = e.clientY
      stageEl.setPointerCapture(e.pointerId)
      stageEl.style.cursor = 'grabbing'
      setTouched(true)
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      const dy = Math.abs(e.clientY - startY)
      if (dy > 6) moved = true
      seek(Math.min(dy / (W * HC * 0.4), 1), 0.15)
    }
    const onUp = () => {
      if (!dragging) return
      dragging = false
      stageEl.style.cursor = ''
      if (!moved) {
        replay()
        return
      }
      settle()
    }
    // Sur tactile (pas de glisse), un tap rejoue l'éclatement
    const onTouchTap = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        setTouched(true)
        replay()
      }
    }

    // Souris : l'effleurer entrouvre le burger, le quitter le referme
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || dragging || (autoReverse && openTl.isActive())) return
      takeControl()
      seek(0.4, 0.5)
    }
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || dragging || autoReverse) return
      settle()
    }

    // Tilt 3D léger qui suit le curseur (souris uniquement)
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const rotY = gsap.quickTo(stageEl, 'rotationY', { duration: 0.6, ease: 'power3.out' })
    const rotX = gsap.quickTo(stageEl, 'rotationX', { duration: 0.6, ease: 'power3.out' })
    gsap.set(stageEl, { transformPerspective: 900 })
    const onWindowMove = (e: PointerEvent) => {
      const r = stageEl.getBoundingClientRect()
      const nx = gsap.utils.clamp(-1, 1, (e.clientX - (r.left + r.width / 2)) / window.innerWidth)
      const ny = gsap.utils.clamp(-1, 1, (e.clientY - (r.top + r.height / 2)) / window.innerHeight)
      rotY(nx * 8)
      rotX(-ny * 6)
    }
    if (!reduced && fine) window.addEventListener('pointermove', onWindowMove, { passive: true })

    if (!reduced) {
      stageEl.addEventListener('pointerenter', onEnter)
      stageEl.addEventListener('pointerleave', onLeave)
      stageEl.addEventListener('pointerdown', onDown)
      stageEl.addEventListener('pointermove', onMove)
      stageEl.addEventListener('pointerup', onUp)
      stageEl.addEventListener('pointercancel', onUp)
      stageEl.addEventListener('pointerup', onTouchTap)
    }

    return () => {
      io.disconnect()
      ro.disconnect()
      gsap.ticker.remove(render)
      hold?.kill()
      openTl.kill()
      ctx.revert()
      window.removeEventListener('pointermove', onWindowMove)
      stageEl.removeEventListener('pointerenter', onEnter)
      stageEl.removeEventListener('pointerleave', onLeave)
      stageEl.removeEventListener('pointerdown', onDown)
      stageEl.removeEventListener('pointermove', onMove)
      stageEl.removeEventListener('pointerup', onUp)
      stageEl.removeEventListener('pointercancel', onUp)
      stageEl.removeEventListener('pointerup', onTouchTap)
    }
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div
        ref={stage}
        role="img"
        aria-label="Burger artisanal BurgerBoom en vue éclatée"
        className="relative w-[240px] xs:w-[270px] sm:w-[310px] md:w-[330px] lg:w-[360px] max-w-[46svh] cursor-grab select-none touch-pan-y"
        style={{ aspectRatio: `1 / ${HC}` }}
      >
        <div className="absolute inset-x-[10%] top-1/4 bottom-1/4 bg-jaune/25 rounded-full blur-3xl pointer-events-none" />
        <div
          ref={shadow}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[60%] h-[4%] rounded-[50%] bg-black blur-xl pointer-events-none"
        />

        <div
          ref={photo}
          className="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          style={{
            width: `${PHOTO_W * 100}%`,
            top: `${(photoTop / HC) * 100}%`,
          }}
        >
          <Image
            src="/images/burger/photo.webp"
            alt="Burger artisanal BurgerBoom"
            width={808}
            height={639}
            priority
            sizes="(max-width: 768px) 240px, 360px"
            draggable={false}
            className="w-full h-auto drop-shadow-[0_14px_18px_rgba(0,0,0,0.5)]"
          />
        </div>

        <div ref={layersWrap} className="absolute inset-0 opacity-0">
        {LAYERS.map((l, i) => (
          <div
            key={l.key}
            ref={(el) => {
              layerEls.current[i] = el
            }}
            className="absolute left-1/2 will-change-transform pointer-events-none"
            style={{
              width: `${l.w * 100}%`,
              top: `${((assembled[i] - (l.w * l.nat[1]) / l.nat[0] / 2) / HC) * 100}%`,
              zIndex: LAYERS[i].key === 'lettuce' ? N + 1 : N - i,
            }}
          >
            <Image
              src={`/images/burger/${l.key}.webp`}
              alt={l.alt}
              width={l.nat[0]}
              height={l.nat[1]}
              priority
              sizes="(max-width: 768px) 240px, 360px"
              draggable={false}
              className="w-full h-auto drop-shadow-[0_10px_14px_rgba(0,0,0,0.45)]"
            />
          </div>
        ))}
        </div>

      </div>

      <p
        className={`mt-3 text-creme/70 text-[10px] font-oswald uppercase tracking-widest transition-opacity duration-500 ${
          touched ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="hidden md:inline">↕ Étirez le burger avec la souris</span>
        <span className="md:hidden">Touchez le burger</span>
      </p>
    </div>
  )
}
