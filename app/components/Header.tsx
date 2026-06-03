'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/menu', label: 'Menu' },
  { href: '/commande', label: 'Commander' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-sombre/95 shadow-xl' : 'bg-sombre shadow-lg'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <span className="text-3xl sm:text-4xl group-hover:rotate-12 transition-transform duration-300">🍔</span>
            <div>
              <span className="font-bebas text-jaune text-2xl sm:text-3xl tracking-wider block leading-none">BurgerBoom</span>
              <p className="hidden sm:block text-[10px] text-gray-400 font-oswald tracking-widest uppercase">Artisanal · Généreux · Savoureux</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`font-oswald transition-colors tracking-wider uppercase text-sm relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:bg-jaune after:transition-all ${
                  pathname === l.href ? 'text-jaune after:w-full' : 'text-white hover:text-jaune after:w-0 hover:after:w-full'
                }`}
              >
                {l.label}
              </a>
            ))}
            <a href="/commande" className="btn-jaune text-sm !py-3 !px-6">Commander</a>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            className="md:hidden text-jaune p-2 -mr-2 relative z-[60]"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Drawer mobile — rendered outside header so fixed-positioning targets the viewport */}
      <div
        className={`md:hidden fixed inset-0 top-[60px] z-40 bg-sombre transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col p-6 gap-2 h-full overflow-y-auto">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-bebas text-4xl py-4 border-b border-white/10 ${
                pathname === l.href ? 'text-jaune' : 'text-white'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a href="/commande" className="btn-jaune mt-6 text-center text-lg">Commander maintenant</a>
          <div className="mt-8 text-gray-400 text-sm space-y-2">
            <p>📞 <a href="tel:+33142000000" className="hover:text-jaune">+33 1 42 XX XX XX</a></p>
            <p>📍 12 Rue de Rivoli, Paris</p>
            <p>📍 45 Cours Lafayette, Lyon</p>
          </div>
        </nav>
      </div>
    </>
  )
}
