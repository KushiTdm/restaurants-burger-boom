import Image from 'next/image'
import Hero from './components/Hero'
import BurgerCard from './components/BurgerCard'
import Reveal from './components/Reveal'
import { SunIcon, PercentTagIcon, FamilyIcon, AppleIcon, GooglePlayIcon, PinIcon, PhoneIcon } from './components/Icons'
import { getImage, getCutout } from './lib/images'

const burgersBestsellers = [
  {
    nom: 'Le BoomBoom Classic',
    description: 'Steak haché 180g, cheddar fondu, salade, tomate, oignon rouge, sauce BoomBoom maison',
    prix: '13 €',
    badge: '⭐ Best-seller',
  },
  {
    nom: 'Le Volcanique',
    description: "Double steak 2×120g, jalapeños, piment d'Espelette, cheddar épicé, sauce inferno, coleslaw",
    prix: '15 €',
    badge: '🔥 Piquant',
  },
  {
    nom: 'Le Champignon Forestier',
    description: 'Steak haché, champignons poêlés, brie fondant, roquette, mayo à la truffe, oignons caramélisés',
    prix: '14 €',
    badge: '🍄 Signature',
  },
]

const promos = [
  { titre: 'Menu du Midi', desc: 'Burger + Frites + Boisson à partir de 12€', heure: '11h30–15h', Icon: SunIcon },
  { titre: 'Happy Burger', desc: '-20% sur tous les burgers', heure: '15h–18h', Icon: PercentTagIcon },
  { titre: 'Soirée Family', desc: '4 menus enfants achetés = 1 offert', heure: 'Vendredi soir', Icon: FamilyIcon },
]

const garanties = [
  { titre: 'Pains briochés maison', desc: 'Cuits chaque jour, moelleux et dorés' },
  { titre: 'Ingrédients frais', desc: 'Légumes et viandes sélectionnés au marché' },
  { titre: 'Frites taillées main', desc: 'Sel de Guérande et herbes fraîches' },
  { titre: 'Livraison ou à emporter', desc: 'Commandez en ligne, Paris et Lyon' },
]

// Avis clients : à renseigner avec de vrais avis (nom, ville, note sur 5, texte). La section n'apparaît que s'il y en a.
const avis: { nom: string; ville: string; note: number; texte: string }[] = []

const locations = [
  {
    ville: 'Paris',
    adresse: '12 Rue de Rivoli, 75004',
    metro: 'Hôtel de Ville (L1, L11)',
    tel: '+33 1 42 XX XX XX',
    image: '/images/location_paris.jpg',
  },
  {
    ville: 'Lyon',
    adresse: '45 Cours Lafayette, 69003',
    metro: 'Part-Dieu (Tram T1, T2)',
    tel: '+33 4 78 XX XX XX',
    image: '/images/location_lyon.jpg',
  },
]

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Bestsellers */}
      <section className="py-16 sm:py-20 lg:py-24 max-w-6xl mx-auto px-5 sm:px-6">
        <Reveal className="text-center mb-10 sm:mb-12">
          <p className="font-oswald text-rouge tracking-[0.3em] uppercase text-xs mb-2">— Best Sellers —</p>
          <h2 className="font-bebas text-sombre text-3xl sm:text-4xl lg:text-5xl">Nos Stars du Menu</h2>
          <p className="text-sombre mt-3 text-sm sm:text-base">Les burgers dont nos clients sont fous</p>
        </Reveal>
        <Reveal stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {burgersBestsellers.map((b) => (
            <BurgerCard key={b.nom} {...b} image={getImage(b.nom)} {...getCutout(b.nom)} />
          ))}
        </Reveal>
        <Reveal className="text-center mt-10 sm:mt-12">
          <a
            href="/menu"
            className="inline-block border-2 border-sombre text-sombre font-oswald uppercase tracking-wider px-7 sm:px-8 py-3 sm:py-4 hover:bg-sombre hover:text-creme transition-colors rounded-md text-sm sm:text-base"
          >
            Tout le menu →
          </a>
        </Reveal>
      </section>

      {/* Garanties */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-16 sm:pb-20">
        <Reveal stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {garanties.map((g) => (
            <div key={g.titre} className="flex flex-col items-center text-center gap-3">
              <span className="w-11 h-11 rounded-full bg-rouge text-creme flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>
              <h3 className="font-oswald text-sombre text-sm sm:text-base uppercase leading-tight">{g.titre}</h3>
              <p className="text-sombre text-xs sm:text-sm">{g.desc}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {avis.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-16 sm:pb-20">
          <Reveal className="text-center mb-10">
            <h2 className="font-bebas text-sombre text-3xl sm:text-4xl lg:text-5xl">Ils en parlent</h2>
          </Reveal>
          <Reveal stagger className="grid md:grid-cols-3 gap-5">
            {avis.map((a) => (
              <figure key={a.nom} className="bg-creme-50 rounded-2xl p-6 shadow-md">
                <p className="text-rouge text-lg mb-2" aria-label={`${a.note} sur 5`}>
                  {'★'.repeat(a.note)}
                  {'☆'.repeat(5 - a.note)}
                </p>
                <blockquote className="text-sombre text-sm mb-4">{a.texte}</blockquote>
                <figcaption className="font-oswald text-sombre text-xs uppercase tracking-wider">
                  {a.nom} · {a.ville}
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </section>
      )}

      {/* Promotions — parallax bg */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-sombre overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
          <Reveal className="text-center mb-10 sm:mb-12">
            <p className="font-oswald text-jaune tracking-[0.3em] uppercase text-xs mb-2">— Promotions —</p>
            <h2 className="font-bebas text-jaune text-3xl sm:text-4xl lg:text-5xl">Offres du Moment</h2>
            <p className="text-creme/70 mt-3 text-sm sm:text-base">Tous les jours, des bonnes raisons de revenir</p>
          </Reveal>
          <Reveal stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {promos.map((promo) => (
              <div
                key={promo.titre}
                className="border border-creme/20 bg-white/[0.03] backdrop-blur-sm rounded-2xl p-7 sm:p-8 text-center hover:border-jaune hover:bg-white/5 transition-all hover:-translate-y-1 duration-300"
              >
                <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-creme text-sombre flex items-center justify-center">
                  <promo.Icon className="w-9 h-9" />
                </div>
                <h3 className="font-oswald text-creme text-xl sm:text-2xl uppercase mb-2">{promo.titre}</h3>
                <p className="text-creme/70 text-sm mb-4">{promo.desc}</p>
                <span className="inline-block bg-jaune text-sombre text-xs font-black px-3 py-1.5 rounded-full">
                  {promo.heure}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* App CTA */}
      <section className="py-16 sm:py-20 lg:py-24 max-w-6xl mx-auto px-5 sm:px-6">
        <Reveal className="relative overflow-hidden bg-gradient-to-br from-rouge via-rouge to-jaune-dark rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-2xl">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-jaune/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rouge/40 rounded-full blur-3xl" />
          <div className="relative">
            <span className="inline-block bg-white/20 text-creme text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Nouveau
            </span>
            <h2 className="font-bebas text-creme text-3xl sm:text-4xl lg:text-5xl mb-4 leading-none">
              Commandez Encore<br />Plus Vite
            </h2>
            <p className="text-creme text-base sm:text-lg mb-8 max-w-lg mx-auto">
              Téléchargez l'appli BurgerBoom et cumulez des points fidélité. 1 point = 1 centime de réduction sur votre prochaine commande.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="#app"
                className="bg-creme text-sombre hover:bg-jaune font-oswald uppercase tracking-wider px-6 sm:px-8 py-3 sm:py-4 rounded-xl inline-flex items-center justify-center gap-3 transition-all hover:scale-105 text-sm sm:text-base"
              >
                <AppleIcon className="w-6 h-6" /> App Store
              </a>
              <a
                href="#app"
                className="bg-creme text-sombre hover:bg-jaune font-oswald uppercase tracking-wider px-6 sm:px-8 py-3 sm:py-4 rounded-xl inline-flex items-center justify-center gap-3 transition-all hover:scale-105 text-sm sm:text-base"
              >
                <GooglePlayIcon className="w-6 h-6" /> Google Play
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Locations */}
      <section className="py-16 sm:py-20 lg:py-24 bg-creme/40">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <Reveal className="text-center mb-10 sm:mb-12">
            <p className="font-oswald text-rouge tracking-[0.3em] uppercase text-xs mb-2">— Nos Adresses —</p>
            <h2 className="font-bebas text-sombre text-3xl sm:text-4xl lg:text-5xl">Où Nous Trouver</h2>
          </Reveal>
          <Reveal stagger className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {locations.map((loc) => (
              <div
                key={loc.ville}
                className="bg-creme-50 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 duration-300"
              >
                <div className="relative h-48 sm:h-56">
                  <Image
                    src={loc.image}
                    alt={`Restaurant BurgerBoom ${loc.ville}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sombre/80 to-transparent" />
                  <h3 className="absolute bottom-4 left-5 font-bebas text-jaune text-2xl tracking-wide">
                    {loc.ville}
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-2.5 text-sombre text-sm">
                    <li className="flex gap-2"><PinIcon className="w-5 h-5 shrink-0 text-rouge" /><span>{loc.adresse}</span></li>
                    <li className="flex gap-2"><span className="w-5 h-5 shrink-0 text-rouge font-black text-xs leading-5 text-center">M</span><span>{loc.metro}</span></li>
                    <li className="flex gap-2"><PhoneIcon className="w-5 h-5 shrink-0 text-rouge" /><a href={`tel:${loc.tel.replace(/\s/g, '')}`} className="hover:text-rouge transition-colors">{loc.tel}</a></li>
                  </ul>
                  <div className="mt-4 pt-4 border-t text-sm text-sombre space-y-1">
                    <p><span className="font-semibold text-sombre">Lun–Jeu :</span> 11h30 – 23h00</p>
                    <p><span className="font-semibold text-sombre">Ven–Sam :</span> 11h30 – 00h30</p>
                    <p><span className="font-semibold text-sombre">Dimanche :</span> 12h00 – 22h00</p>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}
