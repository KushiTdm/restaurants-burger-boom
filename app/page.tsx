import Image from 'next/image'
import Hero from './components/Hero'
import BurgerCard from './components/BurgerCard'
import Reveal from './components/Reveal'
import { getImage, sectionBackdrops } from './lib/images'

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
  { titre: 'Menu du Midi', desc: 'Burger + Frites + Boisson à partir de 12€', heure: '11h30–15h', emoji: '☀️' },
  { titre: 'Happy Burger', desc: '-20% sur tous les burgers', heure: '15h–18h', emoji: '🎉' },
  { titre: 'Soirée Family', desc: '4 menus enfants achetés = 1 offert', heure: 'Vendredi soir', emoji: '👨‍👩‍👧‍👦' },
]

const locations = [
  {
    ville: 'Paris',
    adresse: '12 Rue de Rivoli, 75004',
    metro: 'Hôtel de Ville (L1, L11)',
    tel: '+33 1 42 XX XX XX',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80',
  },
  {
    ville: 'Lyon',
    adresse: '45 Cours Lafayette, 69003',
    metro: 'Part-Dieu (Tram T1, T2)',
    tel: '+33 4 78 XX XX XX',
    image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=900&q=80',
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
          <h2 className="font-bebas text-sombre text-5xl sm:text-6xl lg:text-7xl">Nos Stars du Menu</h2>
          <p className="text-gray-500 mt-3 text-sm sm:text-base">Les burgers dont nos clients sont fous</p>
        </Reveal>
        <Reveal stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {burgersBestsellers.map((b) => (
            <BurgerCard key={b.nom} {...b} image={getImage(b.nom)} />
          ))}
        </Reveal>
        <Reveal className="text-center mt-10 sm:mt-12">
          <a
            href="/menu"
            className="inline-block border-2 border-sombre text-sombre font-oswald uppercase tracking-wider px-7 sm:px-8 py-3 sm:py-4 hover:bg-sombre hover:text-white transition-colors rounded-md text-sm sm:text-base"
          >
            Tout le menu →
          </a>
        </Reveal>
      </section>

      {/* Promotions — parallax bg */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-sombre overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={sectionBackdrops.promos}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sombre via-sombre/70 to-sombre" />
        </div>
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
          <Reveal className="text-center mb-10 sm:mb-12">
            <p className="font-oswald text-jaune tracking-[0.3em] uppercase text-xs mb-2">— Promotions —</p>
            <h2 className="font-bebas text-jaune text-5xl sm:text-6xl lg:text-7xl">Offres du Moment</h2>
            <p className="text-gray-400 mt-3 text-sm sm:text-base">Tous les jours, des bonnes raisons de revenir</p>
          </Reveal>
          <Reveal stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {promos.map((promo) => (
              <div
                key={promo.titre}
                className="border border-white/10 bg-white/[0.03] backdrop-blur-sm rounded-2xl p-7 sm:p-8 text-center hover:border-jaune hover:bg-white/5 transition-all hover:-translate-y-1 duration-300"
              >
                <div className="text-5xl mb-4">{promo.emoji}</div>
                <h3 className="font-oswald text-white text-xl sm:text-2xl uppercase mb-2">{promo.titre}</h3>
                <p className="text-gray-400 text-sm mb-4">{promo.desc}</p>
                <span className="inline-block bg-rouge/20 text-rouge text-xs font-bold px-3 py-1.5 rounded-full">
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
            <span className="inline-block bg-white/20 text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">
              📱 Nouveau
            </span>
            <h2 className="font-bebas text-white text-5xl sm:text-6xl lg:text-7xl mb-4 leading-none">
              Commandez Encore<br />Plus Vite
            </h2>
            <p className="text-white/90 text-base sm:text-lg mb-8 max-w-lg mx-auto">
              Téléchargez l'appli BurgerBoom et cumulez des points fidélité. 1 point = 1 centime de réduction sur votre prochaine commande.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="#app"
                className="bg-black/40 hover:bg-black/60 text-white font-oswald uppercase tracking-wider px-6 sm:px-8 py-3 sm:py-4 rounded-xl inline-flex items-center justify-center gap-3 transition-all hover:scale-105 text-sm sm:text-base"
              >
                <span className="text-xl sm:text-2xl">🍎</span> App Store
              </a>
              <a
                href="#app"
                className="bg-black/40 hover:bg-black/60 text-white font-oswald uppercase tracking-wider px-6 sm:px-8 py-3 sm:py-4 rounded-xl inline-flex items-center justify-center gap-3 transition-all hover:scale-105 text-sm sm:text-base"
              >
                <span className="text-xl sm:text-2xl">🤖</span> Google Play
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Locations */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <Reveal className="text-center mb-10 sm:mb-12">
            <p className="font-oswald text-rouge tracking-[0.3em] uppercase text-xs mb-2">— Nos Adresses —</p>
            <h2 className="font-bebas text-sombre text-5xl sm:text-6xl lg:text-7xl">Où Nous Trouver</h2>
          </Reveal>
          <Reveal stagger className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {locations.map((loc) => (
              <div
                key={loc.ville}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 duration-300"
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
                  <h3 className="absolute bottom-4 left-5 font-bebas text-jaune text-4xl tracking-wider">
                    {loc.ville}
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-2.5 text-gray-600 text-sm">
                    <li className="flex gap-2"><span>📍</span><span>{loc.adresse}</span></li>
                    <li className="flex gap-2"><span>🚇</span><span>{loc.metro}</span></li>
                    <li className="flex gap-2"><span>📞</span><a href={`tel:${loc.tel.replace(/\s/g, '')}`} className="hover:text-rouge transition-colors">{loc.tel}</a></li>
                  </ul>
                  <div className="mt-4 pt-4 border-t text-sm text-gray-600 space-y-1">
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
