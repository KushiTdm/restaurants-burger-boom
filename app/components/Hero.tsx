'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from '../lib/gsap'
import { heroBurger, heroBackdrop } from '../lib/images'

const SELECTORS = [
  '[data-hero=badge]',
  '[data-hero=title] > span',
  '[data-hero=desc]',
  '[data-hero=cta] > *',
  '[data-hero=visual]',
  '[data-hero=stamp]',
  '[data-hero=backdrop]',
  '[data-hero=visual-img]',
] as const

export default function Hero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!root.current) return
    const el = root.current

    let timeline: gsap.core.Timeline | null = null
    const stTweens: gsap.core.Tween[] = []
    let cancelled = false

    const clearInlineStyles = () => {
      SELECTORS.forEach((s) =>
        el.querySelectorAll(s).forEach((node) => node.removeAttribute('style')),
      )
    }

    // Make sure no stale inline styles linger from previous mounts
    clearInlineStyles()

    const tid = setTimeout(() => {
      if (cancelled || !root.current) return

      const q = (sel: string) => el.querySelectorAll(sel)
      const ir = { immediateRender: false }

      timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
      timeline
        .from(q('[data-hero=badge]'), { y: 20, opacity: 0, duration: 0.6, ...ir })
        .from(
          q('[data-hero=title] > span'),
          { y: 60, opacity: 0, duration: 0.8, stagger: 0.12, ...ir },
          '-=0.2',
        )
        .from(q('[data-hero=desc]'), { y: 30, opacity: 0, duration: 0.7, ...ir }, '-=0.4')
        .from(
          q('[data-hero=cta] > *'),
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ...ir },
          '-=0.3',
        )
        .from(
          q('[data-hero=visual]'),
          { x: 80, opacity: 0, duration: 1, ease: 'power4.out', ...ir },
          '-=0.9',
        )
        .from(
          q('[data-hero=stamp]'),
          { scale: 0, rotation: -180, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(2)', ...ir },
          '-=0.4',
        )

      stTweens.push(
        gsap.to(q('[data-hero=backdrop]'), {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        }),
        gsap.to(q('[data-hero=visual]'), {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        }),
        gsap.to(q('[data-hero=visual-img]'), {
          rotation: 8,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 1 },
        }),
      )
    }, 80)

    return () => {
      cancelled = true
      clearTimeout(tid)
      timeline?.kill()
      stTweens.forEach((t) => {
        t.scrollTrigger?.kill()
        t.kill()
      })
      // Hard-reset inline styles so a re-mount starts clean
      clearInlineStyles()
    }
  }, [])

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] bg-sombre flex items-center overflow-hidden"
    >
      <div data-hero="backdrop" className="absolute inset-0 z-0">
        <Image
          src={heroBackdrop}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sombre/80 via-sombre/70 to-sombre" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.04] z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #FFB703 0, #FFB703 2px, transparent 0, transparent 40px)',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-20 md:py-24 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        <div data-hero="content">
          <span
            data-hero="badge"
            className="inline-block bg-rouge text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-2 rounded uppercase tracking-wider mb-5 sm:mb-6"
          >
            🍔 Ouvert 7j/7 · Livraison disponible
          </span>
          <h1
            data-hero="title"
            className="font-bebas text-white text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] mb-4"
          >
            <span className="block">Le Meilleur</span>
            <span className="block text-jaune">Burger</span>
            <span className="block">de la Ville</span>
          </h1>
          <p
            data-hero="desc"
            className="text-gray-300 text-base sm:text-lg mb-7 sm:mb-8 max-w-md"
          >
            Des burgers artisanaux préparés avec des ingrédients frais, des pains briochés maison et une générosité qui vous reviendra chaque semaine.
          </p>
          <div data-hero="cta" className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a href="/commande" className="btn-jaune text-center">Commander maintenant</a>
            <a
              href="/menu"
              className="inline-block border-2 border-white/30 text-white font-oswald px-6 sm:px-8 py-3 sm:py-4 uppercase tracking-wider text-center hover:border-jaune hover:text-jaune transition-colors"
            >
              Voir le menu
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center" data-hero="visual">
          <div className="relative w-[260px] h-[260px] xs:w-[300px] xs:h-[300px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px]">
            <div className="absolute inset-0 bg-jaune/30 rounded-full blur-3xl" />
            <div
              data-hero="visual-img"
              className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-4 ring-jaune/40"
            >
              <Image
                src={heroBurger}
                alt="Burger artisanal BurgerBoom"
                fill
                priority
                sizes="(max-width: 768px) 300px, 420px"
                className="object-cover"
              />
            </div>
            <div
              data-hero="stamp"
              className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-rouge text-white font-bebas text-lg sm:text-2xl px-3 sm:px-4 py-1.5 sm:py-2 rounded rotate-12 shadow-lg"
            >
              ARTISANAL
            </div>
            <div
              data-hero="stamp"
              className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-jaune text-sombre font-bebas text-base sm:text-xl px-3 sm:px-4 py-1.5 sm:py-2 rounded -rotate-6 shadow-lg"
            >
              GÉNÉREUX
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 animate-bounce">
        <span className="text-gray-400 text-[10px] font-oswald uppercase tracking-widest">Scroll</span>
        <svg className="w-5 h-5 text-jaune" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
