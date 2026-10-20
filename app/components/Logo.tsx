import React from 'react'

interface LogoProps {
  className?: string
  tagline?: boolean
}

// Logo BurgerBoom : burger "melt" (pain, sauce qui coule, pain) + wordmark Archivo extra-large.
export default function Logo({ className = '', tagline = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="36" height="36" viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
        {/* pain du dessus */}
        <path d="M8 27C8 14 18 7 32 7s24 7 24 20z" fill="#FF8732" />
        <g fill="#F5EBDC">
          <ellipse cx="22" cy="17" rx="2" ry="1.2" transform="rotate(-25 22 17)" />
          <ellipse cx="32" cy="13" rx="2" ry="1.2" />
          <ellipse cx="42" cy="17" rx="2" ry="1.2" transform="rotate(25 42 17)" />
          <ellipse cx="36" cy="21" rx="2" ry="1.2" transform="rotate(10 36 21)" />
        </g>
        {/* steak + sauce qui coule */}
        <rect x="6" y="29" width="52" height="8" rx="4" fill="#F5EBDC" />
        <path
          d="M6 38c6-4 10 2 16-1s9 3 16 0 8-3 14 0v3c0 3-3 3-3 6 0 3-4 3-4 0 0-2-2-3-3-2-2 2-1 6-4 6s-3-4-3-6c0-1-2-2-3-1-3 3-3 6-6 6s-3-5-3-6-3-2-4 0c-1 2-1 5-4 5s-3-4-3-6c0-1-4-2-5-1z"
          fill="#FF8732"
        />
        {/* pain du dessous */}
        <path d="M8 52h48c0 6-8 8-24 8S8 58 8 52z" fill="#FF8732" />
      </svg>
      <span className="leading-none">
        <span className="font-bebas text-creme text-lg sm:text-xl block leading-none whitespace-nowrap -skew-x-6">
          Burger <span className="text-jaune">Boom</span>
        </span>
        {tagline && (
          <span className="hidden lg:block text-[9px] text-creme/60 font-oswald !font-bold tracking-widest uppercase mt-1">
            Artisanal · Généreux · Savoureux
          </span>
        )}
      </span>
    </span>
  )
}
