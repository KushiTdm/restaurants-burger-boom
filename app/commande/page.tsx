'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getImage } from '../lib/images'

type Item = { id: number; nom: string; prix: number; emoji: string; categorie: string }

const menuItems: Item[] = [
  { id: 1, nom: 'Le BoomBoom Classic', prix: 13, emoji: '🍔', categorie: 'Burgers' },
  { id: 2, nom: 'Le Volcanique', prix: 15, emoji: '🔥', categorie: 'Burgers' },
  { id: 3, nom: 'Le Champignon Forestier', prix: 14, emoji: '🍄', categorie: 'Burgers' },
  { id: 4, nom: 'Le BBQ Fumé', prix: 14, emoji: '🥓', categorie: 'Burgers' },
  { id: 5, nom: 'Le Végétarien Boom', prix: 12, emoji: '🌿', categorie: 'Burgers' },
  { id: 6, nom: 'Frites Maison', prix: 4, emoji: '🍟', categorie: 'Sides' },
  { id: 7, nom: 'Onion Rings', prix: 4.50, emoji: '🧅', categorie: 'Sides' },
  { id: 8, nom: 'Nuggets × 6', prix: 5, emoji: '🐔', categorie: 'Sides' },
  { id: 9, nom: 'Coca-Cola 33cl', prix: 3, emoji: '🥤', categorie: 'Boissons' },
  { id: 10, nom: 'Milk-Shake Vanille', prix: 5, emoji: '🍦', categorie: 'Boissons' },
  { id: 11, nom: 'Milk-Shake Chocolat', prix: 5, emoji: '🍫', categorie: 'Boissons' },
  { id: 12, nom: 'Brownie Chaud', prix: 5, emoji: '🍩', categorie: 'Desserts' },
  { id: 13, nom: 'Sundae Chocolat', prix: 5, emoji: '🍨', categorie: 'Desserts' },
]

const categories = ['Burgers', 'Sides', 'Boissons', 'Desserts'] as const

export default function CommandePage() {
  const [panier, setPanier] = useState<Record<number, number>>({})
  const [mode, setMode] = useState<'sur_place' | 'a_emporter' | 'livraison'>('a_emporter')
  const [commande, setCommande] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const ajouter = (id: number) => setPanier((p) => ({ ...p, [id]: (p[id] || 0) + 1 }))
  const retirer = (id: number) =>
    setPanier((p) => {
      const n = { ...p }
      if ((n[id] || 0) > 1) n[id]--
      else delete n[id]
      return n
    })

  const total = Object.entries(panier).reduce((acc, [id, qty]) => {
    const item = menuItems.find((i) => i.id === Number(id))
    return acc + (item ? item.prix * qty : 0)
  }, 0)

  const panierItems = Object.entries(panier)
    .map(([id, qty]) => ({ item: menuItems.find((i) => i.id === Number(id))!, qty }))
    .filter((x) => x.item)

  const itemCount = Object.values(panier).reduce((a, b) => a + b, 0)
  const totalFinal = total + (mode === 'livraison' ? 2 : 0)

  if (commande) {
    return (
      <div className="min-h-[80vh] bg-sombre flex items-center justify-center">
        <div className="text-center max-w-md px-5 sm:px-6 py-16 sm:py-20">
          <div className="text-7xl sm:text-8xl mb-6 animate-bounce">🎉</div>
          <h1 className="font-bebas text-jaune text-5xl sm:text-6xl mb-4">Boom !</h1>
          <p className="text-white text-base sm:text-lg mb-2">Ta commande est en préparation !</p>
          <p className="text-gray-400 text-sm mb-8">
            {mode === 'livraison' ? 'Livraison estimée : 30–45 min' : 'Prête dans : 15–20 min'}
          </p>
          <div className="bg-white/10 rounded-xl p-5 sm:p-6 text-left mb-8">
            {panierItems.map(({ item, qty }) => (
              <div key={item.id} className="flex justify-between py-2 text-sm border-b border-white/10 last:border-0">
                <span className="text-white">{item.emoji} {qty}× {item.nom}</span>
                <span className="text-jaune font-bold whitespace-nowrap ml-2">{(item.prix * qty).toFixed(2)} €</span>
              </div>
            ))}
            <div className="flex justify-between pt-4 font-bold text-jaune text-lg">
              <span>Total</span>
              <span>{totalFinal.toFixed(2)} €</span>
            </div>
          </div>
          <button
            onClick={() => {
              setPanier({})
              setCommande(false)
            }}
            className="btn-jaune w-full"
          >
            Nouvelle commande
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-28 lg:pb-0">
      {/* Hero */}
      <section className="relative bg-sombre py-10 sm:py-12 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1600&q=80"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sombre/80 to-sombre" />
        </div>
        <div className="relative">
          <h1 className="font-bebas text-jaune text-5xl sm:text-6xl lg:text-7xl">Commander</h1>
          <p className="text-gray-300 mt-2 font-oswald uppercase tracking-wider text-xs sm:text-sm">
            Rapide · Délicieux · Généreux
          </p>
        </div>
      </section>

      {/* Mode picker */}
      <div className="bg-gray-50 py-5 sm:py-6 border-b">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 flex flex-col sm:flex-row gap-3 justify-center">
          {[
            { key: 'a_emporter', label: '🛍️ À emporter', desc: 'Prêt en 15 min' },
            { key: 'sur_place', label: '🪑 Sur place', desc: 'Commande en salle' },
            { key: 'livraison', label: '🚴 Livraison', desc: '30–45 min · +2 €' },
          ].map((m) => (
            <button
              key={m.key}
              onClick={() => setMode(m.key as typeof mode)}
              className={`flex-1 sm:max-w-xs py-3 sm:py-4 px-5 sm:px-6 rounded-xl text-center transition-all border-2 ${
                mode === m.key
                  ? 'bg-rouge border-rouge text-white shadow-lg shadow-rouge/30'
                  : 'bg-white border-gray-200 hover:border-rouge text-gray-600'
              }`}
            >
              <div className="font-oswald uppercase tracking-wider text-sm sm:text-base">{m.label}</div>
              <div className="text-xs mt-1 opacity-70">{m.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-6 py-8 sm:py-10 grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Menu items */}
        <div className="lg:col-span-2 space-y-10 sm:space-y-12">
          {categories.map((cat) => (
            <section key={cat}>
              <h2 className="font-bebas text-sombre text-3xl sm:text-4xl mb-4">{cat}</h2>
              <div className="grid gap-3">
                {menuItems.filter((i) => i.categorie === cat).map((item) => (
                  <article
                    key={item.id}
                    className="burger-card p-3 sm:p-4 flex items-center gap-3 sm:gap-4"
                  >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden">
                      <Image
                        src={getImage(item.nom)}
                        alt={item.nom}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-oswald text-sombre uppercase text-sm sm:text-base leading-tight">
                        {item.nom}
                      </h3>
                      <p className="font-bebas text-rouge text-xl sm:text-2xl leading-none mt-1">
                        {item.prix.toFixed(2)} €
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {panier[item.id] ? (
                        <>
                          <button
                            onClick={() => retirer(item.id)}
                            aria-label={`Retirer ${item.nom}`}
                            className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 hover:bg-rouge hover:text-white transition-colors text-lg"
                          >
                            −
                          </button>
                          <span className="font-bold text-sombre w-5 text-center">{panier[item.id]}</span>
                          <button
                            onClick={() => ajouter(item.id)}
                            aria-label={`Ajouter ${item.nom}`}
                            className="w-9 h-9 bg-rouge rounded-full flex items-center justify-center font-bold text-white hover:bg-rouge-dark transition-colors text-lg"
                          >
                            +
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => ajouter(item.id)}
                          className="btn-rouge !text-xs sm:!text-sm !px-4 sm:!px-5 !py-2 sm:!py-2.5"
                        >
                          Ajouter
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Panier — desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="bg-sombre rounded-2xl p-6 sticky top-24 shadow-xl">
            <h2 className="font-bebas text-jaune text-2xl sm:text-3xl mb-6 flex items-center gap-3">
              Mon Panier
              {itemCount > 0 && (
                <span className="text-sm bg-rouge text-white font-oswald px-2 py-0.5 rounded">
                  {itemCount}
                </span>
              )}
            </h2>
            <PanierContent
              panierItems={panierItems}
              mode={mode}
              total={total}
              totalFinal={totalFinal}
              onValidate={() => setCommande(true)}
            />
          </div>
        </aside>
      </div>

      {/* Mobile sticky cart bar */}
      {itemCount > 0 && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-sombre border-t border-white/10 shadow-2xl">
          <button
            onClick={() => setDrawerOpen(true)}
            className="w-full p-4 flex items-center justify-between gap-4 text-left"
            aria-label="Ouvrir le panier"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="text-3xl">🛒</span>
                <span className="absolute -top-1 -right-2 bg-rouge text-white text-[10px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
                  {itemCount}
                </span>
              </div>
              <div>
                <p className="font-oswald text-jaune text-sm uppercase tracking-wider">Mon panier</p>
                <p className="text-white text-xs">{itemCount} article{itemCount > 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="bg-jaune text-sombre font-bebas text-xl px-5 py-2 rounded-md">
              {totalFinal.toFixed(2)} €
            </div>
          </button>
        </div>
      )}

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative bg-sombre w-full rounded-t-3xl p-5 sm:p-6 max-h-[85vh] overflow-y-auto animate-[slideUp_0.3s_ease-out]">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bebas text-jaune text-3xl">Mon Panier</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-white p-2 -mr-2"
                aria-label="Fermer le panier"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <PanierContent
              panierItems={panierItems}
              mode={mode}
              total={total}
              totalFinal={totalFinal}
              onValidate={() => {
                setDrawerOpen(false)
                setCommande(true)
              }}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

function PanierContent({
  panierItems,
  mode,
  total,
  totalFinal,
  onValidate,
}: {
  panierItems: { item: Item; qty: number }[]
  mode: 'sur_place' | 'a_emporter' | 'livraison'
  total: number
  totalFinal: number
  onValidate: () => void
}) {
  if (panierItems.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <div className="text-5xl mb-3">🛒</div>
        <p className="text-sm font-oswald uppercase tracking-wider">Panier vide</p>
        <p className="text-xs mt-2">Ajoute des burgers à ta commande !</p>
      </div>
    )
  }
  return (
    <>
      <div className="space-y-3 mb-6">
        {panierItems.map(({ item, qty }) => (
          <div key={item.id} className="flex justify-between text-sm gap-2">
            <span className="text-gray-300 truncate">{item.emoji} {qty}× {item.nom}</span>
            <span className="font-bold text-jaune whitespace-nowrap">
              {(item.prix * qty).toFixed(2)} €
            </span>
          </div>
        ))}
      </div>
      <div className="space-y-2 mb-4 text-sm text-gray-400">
        <div className="flex justify-between">
          <span>Sous-total</span>
          <span>{total.toFixed(2)} €</span>
        </div>
        {mode === 'livraison' && (
          <div className="flex justify-between">
            <span>Livraison</span>
            <span>2.00 €</span>
          </div>
        )}
      </div>
      <div className="border-t border-white/10 pt-4 mb-6 flex justify-between font-bebas text-jaune text-2xl">
        <span>Total</span>
        <span>{totalFinal.toFixed(2)} €</span>
      </div>
      <button
        onClick={onValidate}
        className="w-full btn-jaune text-center font-bebas !text-xl"
      >
        Valider · {totalFinal.toFixed(2)} €
      </button>
    </>
  )
}
