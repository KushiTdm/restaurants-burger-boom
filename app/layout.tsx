import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'

export const metadata: Metadata = {
  title: 'BurgerBoom 🍔 — Les Meilleurs Burgers Artisanaux',
  description:
    'Burgers artisanaux, généreux et savoureux. Commandez en ligne ou venez nous rendre visite à Paris ou Lyon.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-white">
        <Header />
        <main>{children}</main>
        <footer className="bg-sombre text-white pt-12 pb-8 mt-12 sm:mt-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🍔</span>
                <span className="font-bebas text-jaune text-3xl">BurgerBoom</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Des burgers faits avec amour, des ingrédients frais du marché, des saveurs qui explosent en bouche.
              </p>
              <div className="flex gap-3 mt-5">
                <a
                  href="https://instagram.com"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-jaune hover:text-sombre flex items-center justify-center text-white transition-colors"
                >
                  📷
                </a>
                <a
                  href="https://facebook.com"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-jaune hover:text-sombre flex items-center justify-center text-white transition-colors"
                >
                  👍
                </a>
                <a
                  href="https://tiktok.com"
                  aria-label="TikTok"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-jaune hover:text-sombre flex items-center justify-center text-white transition-colors"
                >
                  🎵
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-oswald text-jaune tracking-widest uppercase mb-4 text-sm">Horaires</h4>
              <ul className="text-gray-400 text-sm space-y-1.5">
                <li>Lundi – Jeudi : 11h30 – 23h</li>
                <li>Vendredi – Samedi : 11h30 – 00h30</li>
                <li>Dimanche : 12h – 22h</li>
              </ul>
              <h4 className="font-oswald text-jaune tracking-widest uppercase mb-4 mt-6 text-sm">Navigation</h4>
              <ul className="text-gray-400 text-sm space-y-1.5">
                <li><a href="/" className="hover:text-jaune transition-colors">Accueil</a></li>
                <li><a href="/menu" className="hover:text-jaune transition-colors">Menu</a></li>
                <li><a href="/commande" className="hover:text-jaune transition-colors">Commander</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-oswald text-jaune tracking-widest uppercase mb-4 text-sm">Nos adresses</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li className="flex gap-2">
                  <span>📍</span>
                  <span>12 Rue de Rivoli, Paris 75004</span>
                </li>
                <li className="flex gap-2">
                  <span>📍</span>
                  <span>45 Cours Lafayette, Lyon 69003</span>
                </li>
                <li className="flex gap-2">
                  <span>📞</span>
                  <a href="tel:+33142000000" className="hover:text-jaune transition-colors">+33 1 42 XX XX XX</a>
                </li>
                <li className="flex gap-2">
                  <span>✉️</span>
                  <a href="mailto:contact@burgerboom.fr" className="hover:text-jaune transition-colors">contact@burgerboom.fr</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-5 sm:px-6 mt-10 pt-6 border-t border-white/10 text-center text-gray-500 text-xs sm:text-sm space-y-2">
            <p>© 2026 BurgerBoom — Tous droits réservés 🔥</p>
            <p className="text-gray-600">
              Conçu &amp; développé par{' '}
              <a
                href="https://neuraweb.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-jaune hover:underline"
              >
                NeuraWeb
              </a>
              {' '}— agence web, automatisation &amp; intégration IA
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
