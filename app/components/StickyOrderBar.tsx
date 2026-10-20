'use client'

import { usePathname } from 'next/navigation'

// Bouton "Commander" collé en bas sur mobile (masqué sur la page de commande, qui a son propre panier).
export default function StickyOrderBar() {
  const pathname = usePathname()
  if (pathname.startsWith('/commande')) return null
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-sombre via-sombre/90 to-transparent pointer-events-none">
      <a href="/commande" className="btn-jaune pointer-events-auto block w-full text-center !py-3.5 shadow-xl shadow-black/30">
        Commander
      </a>
    </div>
  )
}
