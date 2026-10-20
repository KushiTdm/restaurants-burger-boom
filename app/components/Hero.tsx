'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import BurgerStack from './BurgerStack'
import ScrollFloat from './ScrollFloat'
import { BurgerLineIcon, FriesLineIcon, CupLineIcon } from './Icons'

const SELECTORS = [
  '[data-hero=badge]',
  '[data-hero=desc]',
  '[data-hero=cta] > *',
  '[data-hero=visual]',
  '[data-hero=stamp]',
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
        .from(q('[data-hero=desc]'), { y: 30, opacity: 0, duration: 0.7, ...ir }, '-=0.4')
        .from(
          q('[data-hero=cta] > *'),
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ...ir },
          '-=0.3',
        )
        .from(
          q('[data-hero=visual]'),
          { y: 70, scale: 0.9, opacity: 0, duration: 1, ease: 'power4.out', ...ir },
          '-=0.9',
        )
        .from(
          q('[data-hero=stamp]'),
          { scale: 0, rotation: -180, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(2)', ...ir },
          '-=0.4',
        )

      stTweens.push(
        gsap.to(q('[data-hero=visual]'), {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
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
      className="relative min-h-[calc(100svh-56px)] md:min-h-[calc(100svh-72px)] bg-sombre flex items-center overflow-hidden"
    >
      {/* Motif typographique : lignes de "BURGER" répétées, qui défilent doucement en sens alternés */}
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden flex flex-col justify-center select-none pointer-events-none">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className={`flex w-max whitespace-nowrap font-bebas text-creme/[0.2] leading-[0.95] text-[clamp(2rem,5.2vw,4.75rem)] ${
              i % 2 ? 'animate-marquee-right' : 'animate-marquee-left'
            }`}
          >
            {Array.from({ length: 2 }).map((__, k) => (
              <span key={k} className="pr-[0.4em]">
                {'BURGER '.repeat(14)}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Pictos décoratifs sur les bords */}
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none text-creme/25 hidden sm:block">
        <BurgerLineIcon className="absolute left-[3%] top-[14%] w-14 h-14 -rotate-12 animate-float-slow" />
        <FriesLineIcon className="absolute left-[46%] top-[8%] w-12 h-12 rotate-12 animate-float-slow" />
        <CupLineIcon className="absolute right-[3%] top-[12%] w-14 h-14 rotate-12 animate-float-slow" />
        <FriesLineIcon className="absolute left-[4%] bottom-[10%] w-14 h-14 rotate-6 animate-float-slow" />
        <BurgerLineIcon className="absolute right-[4%] bottom-[8%] w-14 h-14 rotate-12 animate-float-slow" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-6 py-8 md:py-6 grid md:grid-cols-[1.1fr_1fr] gap-6 md:gap-4 items-center">
        <div className="text-center md:text-left">
          <span
            data-hero="badge"
            className="inline-block bg-creme text-sombre text-[11px] font-black px-3 py-1.5 rounded uppercase tracking-wider mb-4"
          >
            Ouvert 7j/7 · Paris & Lyon
          </span>

          {/* Titre typographique : très gros texte crème sur fond rouge, animé lettre par lettre */}
          <h1
            data-hero="title"
            className="font-bebas text-creme uppercase leading-[0.92] text-[clamp(2.4rem,7vw,4.5rem)] md:text-[clamp(2.4rem,5.6vw,4.5rem)] mb-5"
          >
            <ScrollFloat as="span" playOnLoad effect="wave" animationDuration={1.1} delay={0.2} stagger={0.035} distance={100} stretch={1.8} ease="power3.inOut" containerClassName="block">
              Le meilleur
            </ScrollFloat>
            <ScrollFloat as="span" playOnLoad effect="wave" animationDuration={1.1} delay={0.45} stagger={0.035} distance={100} stretch={1.8} ease="power3.inOut" containerClassName="block">
              Burger
            </ScrollFloat>
            <ScrollFloat as="span" playOnLoad effect="wave" animationDuration={1.1} delay={0.7} stagger={0.035} distance={100} stretch={1.8} ease="power3.inOut" containerClassName="block" textClassName="text-jaune">
              de la ville
            </ScrollFloat>
          </h1>

          <p data-hero="desc" className="text-creme text-base mb-6 max-w-sm mx-auto md:mx-0">
            Burgers artisanaux, ingrédients frais, pains briochés maison.
          </p>
          <div data-hero="cta" className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start items-center">
            <a href="/commande?mode=livraison" className="btn-jaune text-center">Livraison</a>
            <a href="/commande?mode=a_emporter" className="btn-jaune text-center">À emporter</a>
            <a
              href="/menu"
              className="font-oswald text-creme text-sm uppercase tracking-wider underline underline-offset-4 decoration-2 hover:text-jaune transition-colors px-2 py-3"
            >
              Voir le menu →
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-end md:pr-2 lg:pr-8" data-hero="visual">
          <BurgerStack />
        </div>
      </div>
    </section>
  )
}
