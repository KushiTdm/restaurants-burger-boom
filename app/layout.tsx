import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'
import Logo from './components/Logo'
import StickyOrderBar from './components/StickyOrderBar'
import { InstagramIcon, FacebookIcon, TiktokIcon, PinIcon, PhoneIcon, MailIcon } from './components/Icons'

export const metadata: Metadata = {
  title: 'BurgerBoom — Burgers artisanaux à Paris & Lyon | Commande en ligne',
  description:
    'BurgerBoom, burgers artisanaux généreux à Paris et Lyon : viandes sélectionnées, pains frais, frites maison. Commandez en ligne, à emporter ou en livraison.',
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'BurgerBoom',
  servesCuisine: 'Burgers',
  priceRange: '€€',
  areaServed: ['Paris', 'Lyon'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-creme-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
        <Header />
        <main>{children}</main>
        <StickyOrderBar />
        <footer className="bg-sombre text-creme pt-12 pb-24 md:pb-8 mt-12 sm:mt-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
            <div>
              <div className="mb-4"><Logo /></div>
              <p className="text-creme/70 text-sm leading-relaxed">
                Des burgers faits avec amour, des ingrédients frais du marché, des saveurs qui explosent en bouche.
              </p>
              <div className="flex gap-3 mt-5">
                <a
                  href="https://instagram.com"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-creme/15 hover:bg-creme hover:text-sombre flex items-center justify-center text-creme transition-colors"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-creme/15 hover:bg-creme hover:text-sombre flex items-center justify-center text-creme transition-colors"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://tiktok.com"
                  aria-label="TikTok"
                  className="w-10 h-10 rounded-full bg-creme/15 hover:bg-creme hover:text-sombre flex items-center justify-center text-creme transition-colors"
                >
                  <TiktokIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-oswald text-creme tracking-widest uppercase mb-4 text-sm">Horaires</h4>
              <ul className="text-creme/70 text-sm space-y-1.5">
                <li>Lundi – Jeudi : 11h30 – 23h</li>
                <li>Vendredi – Samedi : 11h30 – 00h30</li>
                <li>Dimanche : 12h – 22h</li>
              </ul>
              <h4 className="font-oswald text-creme tracking-widest uppercase mb-4 mt-6 text-sm">Navigation</h4>
              <ul className="text-creme/70 text-sm space-y-1.5">
                <li><a href="/" className="hover:text-jaune transition-colors">Accueil</a></li>
                <li><a href="/menu" className="hover:text-jaune transition-colors">Menu</a></li>
                <li><a href="/commande" className="hover:text-jaune transition-colors">Commander</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-oswald text-creme tracking-widest uppercase mb-4 text-sm">Nos adresses</h4>
              <ul className="text-creme/70 text-sm space-y-2">
                <li className="flex gap-2">
                  <PinIcon className="w-5 h-5 shrink-0 text-jaune" />
                  <span>12 Rue de Rivoli, Paris 75004</span>
                </li>
                <li className="flex gap-2">
                  <PinIcon className="w-5 h-5 shrink-0 text-jaune" />
                  <span>45 Cours Lafayette, Lyon 69003</span>
                </li>
                <li className="flex gap-2">
                  <PhoneIcon className="w-5 h-5 shrink-0 text-jaune" />
                  <a href="tel:+33142000000" className="hover:text-jaune transition-colors">+33 1 42 XX XX XX</a>
                </li>
                <li className="flex gap-2">
                  <MailIcon className="w-5 h-5 shrink-0 text-jaune" />
                  <a href="mailto:contact@burgerboom.fr" className="hover:text-jaune transition-colors">contact@burgerboom.fr</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-5 sm:px-6 mt-10 pt-6 border-t border-creme/20 text-center text-creme/70 text-xs sm:text-sm space-y-2">
            <p>© 2026 BurgerBoom — Tous droits réservés</p>
            <p className="text-creme/70">
              Site créé par{' '}
              <a
                href="https://neuraweb.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-creme hover:underline"
              >
                NeuraWeb.fr
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
