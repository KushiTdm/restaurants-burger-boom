import React from 'react'

interface LogoProps {
  className?: string
  tagline?: boolean
}

// Logo BurgerBoom : burger stylisé dans une explosion + wordmark Bebas Neue.
export default function Logo({ className = '', tagline = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="44" height="44" viewBox="0 0 48 48" aria-hidden="true" className="shrink-0">
        <path
          d="M24 1l4.4 7.2 8-2.6 1.2 8.3 8.2 1.7-3.6 7.6 5.6 6.2-7.4 4 1.2 8.3-8.4-.4L24 47l-5.2-6.7-8.4.4 1.2-8.3-7.4-4 5.6-6.2-3.6-7.6 8.2-1.7 1.2-8.3 8-2.6z"
          fill="#E63946"
        />
        <path d="M13 21c0-5 5-8.5 11-8.5S35 16 35 21z" fill="#FFB703" />
        <rect x="12" y="23" width="24" height="3.2" rx="1.6" fill="#1d1d1d" />
        <path d="M13 28h22l-2.2 2.4-2.4-2.4-2.4 2.4-2.4-2.4-2.4 2.4-2.4-2.4-2.4 2.4z" fill="#FFB703" />
        <path d="M13 32.5h22c0 3-3 5-11 5s-11-2-11-5z" fill="#FB8500" />
        <g fill="#fff" opacity=".85">
          <circle cx="20" cy="17" r=".9" />
          <circle cx="25" cy="15.5" r=".9" />
          <circle cx="29.5" cy="17.5" r=".9" />
        </g>
      </svg>
      <span className="leading-none">
        <span className="font-bebas text-jaune text-2xl sm:text-3xl tracking-wider block leading-none">
          Burger<span className="text-rouge">Boom</span>
        </span>
        {tagline && (
          <span className="hidden sm:block text-[10px] text-gray-400 font-oswald tracking-widest uppercase mt-1">
            Artisanal · Généreux · Savoureux
          </span>
        )}
      </span>
    </span>
  )
}
