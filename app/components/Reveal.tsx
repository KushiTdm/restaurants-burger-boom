'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from '../lib/gsap'

type Props = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'span'
  delay?: number
  y?: number
  stagger?: boolean
  staggerSelector?: string
}

export default function Reveal({
  children,
  className,
  as: Tag = 'div',
  delay = 0,
  y = 40,
  stagger = false,
  staggerSelector,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    let tween: gsap.core.Tween | null = null
    let cancelled = false

    const getTargets = (): Element[] =>
      stagger
        ? (staggerSelector ? Array.from(el.querySelectorAll(staggerSelector)) : Array.from(el.children))
        : [el]

    const clearStyles = () => {
      getTargets().forEach((node) => (node as HTMLElement).removeAttribute('style'))
    }

    clearStyles()

    const tid = setTimeout(() => {
      if (cancelled || !ref.current) return
      const targets = getTargets()
      if (targets.length === 0) return

      tween = gsap.from(targets, {
        y,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay,
        stagger: stagger ? 0.12 : 0,
        immediateRender: false,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    }, 80)

    return () => {
      cancelled = true
      clearTimeout(tid)
      tween?.scrollTrigger?.kill()
      tween?.kill()
      clearStyles()
    }
  }, [delay, y, stagger, staggerSelector])

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
