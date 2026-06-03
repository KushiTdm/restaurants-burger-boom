import Image from 'next/image'
import Reveal from '../components/Reveal'
import { getImage } from '../lib/images'

const menuData = {
  burgers: [
    { nom: 'Le BoomBoom Classic', prix: '13 €', desc: 'Steak 180g, cheddar fondu, salade iceberg, tomate, oignon rouge, cornichons, sauce BoomBoom maison', badge: '⭐' },
    { nom: 'Le Volcanique', prix: '15 €', desc: 'Double steak 2×120g, jalapeños frais, cheddar épicé, sauce inferno, coleslaw maison, pain brioche sésame', badge: '🔥' },
    { nom: 'Le Champignon Forestier', prix: '14 €', desc: 'Steak 180g, champignons poêlés, brie fondant, roquette fraîche, mayo à la truffe, oignons caramélisés', badge: '🍄' },
    { nom: 'Le BBQ Fumé', prix: '14 €', desc: 'Steak 200g, bacon croustillant, oignons caramélisés, sauce barbecue fumée, cheddar, coleslaw', badge: '🥓' },
    { nom: 'Le Croque Monsieur Burger', prix: '13 €', desc: 'Steak 160g, jambon blanc, emmental fondu, béchamel légère, pain de mie grillé, cornichons', badge: '🇫🇷' },
    { nom: 'Le Double Cheese', prix: '16 €', desc: 'Double steak 2×150g, double cheddar, moutarde, oignons, cornichons — le classique américain', badge: '🧀' },
    { nom: 'Le Végétarien Boom', prix: '12 €', desc: 'Galette de légumes maison, cheddar végétalien fondu, avocat, tomate, roquette, sauce verte', badge: '🌿' },
    { nom: 'Le Poulet Croustillant', prix: '13 €', desc: 'Escalope de poulet pané maison, salade coleslaw, cornichons, sauce ranch, brioche moelleuse', badge: '🐔' },
  ],
  sides: [
    { nom: 'Frites Maison', prix: '4 €', desc: 'Frites taillées à la main, sel de Guérande, herbes fraîches' },
    { nom: 'Frites au Fromage', prix: '5 €', desc: 'Frites maison, sauce cheddar chaude, bacon émietté, ciboulette' },
    { nom: 'Onion Rings', prix: '4.50 €', desc: "Rondelles d'oignon en tempura croustillante, sauce ranch" },
    { nom: 'Coleslaw Maison', prix: '3.50 €', desc: 'Chou blanc et rouge, carottes, mayo légère, graines de sésame' },
    { nom: 'Nuggets × 6', prix: '5 €', desc: 'Nuggets de poulet fermier, sauce curry ou barbecue' },
    { nom: "Mac'n'Cheese", prix: '5.50 €', desc: 'Macaronis, sauce cheddar et gouda, chapelure dorée' },
  ],
  boissons: [
    { nom: 'Coca-Cola 33cl', prix: '3 €', desc: '' },
    { nom: 'Limonade Maison', prix: '3.50 €', desc: 'Citron frais, menthe, sirop de canne, eau gazeuse' },
    { nom: 'Milk-Shake Vanille', prix: '5 €', desc: 'Glace vanille, lait entier, crème chantilly maison' },
    { nom: 'Milk-Shake Chocolat', prix: '5 €', desc: 'Glace chocolat, lait entier, copeaux de chocolat noir' },
    { nom: "Jus d'Orange Pressé", prix: '4 €', desc: 'Oranges fraîches pressées à la commande' },
    { nom: 'Eau Minérale 50cl', prix: '2 €', desc: '' },
    { nom: 'Bière Pression 25cl', prix: '4 €', desc: 'Heineken ou Kronenbourg 1664' },
  ],
  desserts: [
    { nom: 'Sundae Chocolat', prix: '5 €', desc: 'Glace vanille, sauce chocolat chaude, chantilly, granola croustillant' },
    { nom: 'Brownie Chaud', prix: '5 €', desc: 'Brownie chocolat tiède, boule de glace vanille, sauce caramel' },
    { nom: 'Cheesecake New-Yorkais', prix: '6 €', desc: 'Cheesecake crémeux, coulis de fruits rouges, spéculoos émiettés' },
    { nom: 'Cookie Géant', prix: '3.50 €', desc: 'Cookie pur beurre, pépites de chocolat, chaud du four' },
  ],
}

const sections = [
  { key: 'burgers', label: '🍔 Burgers' },
  { key: 'sides', label: '🍟 Accompagnements' },
  { key: 'boissons', label: '🥤 Boissons' },
  { key: 'desserts', label: '🍨 Desserts' },
] as const

export default function MenuPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-sombre py-14 sm:py-16 lg:py-20 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1600&q=80"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sombre/80 via-sombre/70 to-sombre" />
        </div>
        <div className="relative max-w-5xl mx-auto px-5 sm:px-6">
          <p className="font-oswald text-jaune tracking-[0.3em] uppercase text-xs mb-3">— La Carte —</p>
          <h1 className="font-bebas text-jaune text-6xl sm:text-7xl lg:text-9xl leading-none">Notre Menu</h1>
          <p className="text-gray-300 mt-4 font-oswald tracking-wider uppercase text-xs sm:text-sm">
            Fait maison · Ingrédients frais · Généreux
          </p>
        </div>
      </section>

      {/* Sticky nav */}
      <nav className="sticky top-[60px] md:top-[76px] z-30 bg-white/95 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-5xl mx-auto flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar px-5 sm:px-6 py-3 sm:py-4">
          {sections.map((s) => (
            <a
              key={s.key}
              href={`#${s.key}`}
              className="font-oswald uppercase tracking-wider text-xs sm:text-sm text-gray-500 hover:text-rouge whitespace-nowrap transition-colors flex-shrink-0"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-5 sm:px-6 py-12 sm:py-16">
        {/* Burgers */}
        <section id="burgers" className="mb-16 sm:mb-20 scroll-mt-32">
          <Reveal>
            <h2 className="font-bebas text-sombre text-5xl sm:text-6xl mb-2">🍔 Burgers</h2>
            <p className="text-gray-500 text-sm mb-6 sm:mb-8">
              Pain brioche fait maison · Viande 100% bœuf charolais · Légumes frais
            </p>
          </Reveal>
          <Reveal stagger className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {menuData.burgers.map((item) => (
              <article
                key={item.nom}
                className="burger-card flex gap-4 p-3 sm:p-4 items-center"
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden">
                  <Image
                    src={getImage(item.nom)}
                    alt={item.nom}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                  <span className="absolute top-1 left-1 bg-white/90 text-base w-7 h-7 flex items-center justify-center rounded-full">
                    {item.badge}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="font-oswald text-sombre text-sm sm:text-base uppercase leading-tight">
                      {item.nom}
                    </h3>
                    <span className="font-bebas text-rouge text-xl sm:text-2xl leading-none flex-shrink-0">
                      {item.prix}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{item.desc}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </section>

        {/* Sides */}
        <section id="sides" className="mb-16 sm:mb-20 scroll-mt-32">
          <Reveal>
            <h2 className="font-bebas text-sombre text-5xl sm:text-6xl mb-6 sm:mb-8">🍟 Accompagnements</h2>
          </Reveal>
          <Reveal stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {menuData.sides.map((item) => (
              <article
                key={item.nom}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all hover:-translate-y-1 duration-300"
              >
                <div className="relative h-32 sm:h-36">
                  <Image
                    src={getImage(item.nom)}
                    alt={item.nom}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="font-oswald text-sombre uppercase text-sm sm:text-base leading-tight">
                      {item.nom}
                    </h3>
                    <span className="font-bebas text-jaune-dark text-xl sm:text-2xl leading-none flex-shrink-0">
                      {item.prix}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </section>

        {/* Boissons */}
        <section id="boissons" className="mb-16 sm:mb-20 scroll-mt-32">
          <Reveal>
            <h2 className="font-bebas text-sombre text-5xl sm:text-6xl mb-6 sm:mb-8">🥤 Boissons</h2>
          </Reveal>
          <Reveal stagger className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {menuData.boissons.map((item) => (
              <article
                key={item.nom}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={getImage(item.nom)}
                    alt={item.nom}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center gap-2">
                    <span className="font-oswald text-sombre uppercase text-sm sm:text-base">
                      {item.nom}
                    </span>
                    <span className="font-bebas text-rouge text-xl sm:text-2xl leading-none flex-shrink-0">
                      {item.prix}
                    </span>
                  </div>
                  {item.desc && (
                    <p className="text-gray-400 text-xs mt-0.5 line-clamp-2">{item.desc}</p>
                  )}
                </div>
              </article>
            ))}
          </Reveal>
        </section>

        {/* Desserts */}
        <section id="desserts" className="mb-12 sm:mb-16 scroll-mt-32">
          <Reveal>
            <h2 className="font-bebas text-sombre text-5xl sm:text-6xl mb-6 sm:mb-8">🍨 Desserts</h2>
          </Reveal>
          <Reveal stagger className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {menuData.desserts.map((item) => (
              <article key={item.nom} className="burger-card overflow-hidden">
                <div className="relative h-36 sm:h-40">
                  <Image
                    src={getImage(item.nom)}
                    alt={item.nom}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="font-oswald text-sombre uppercase text-base sm:text-lg leading-tight">
                      {item.nom}
                    </h3>
                    <span className="font-bebas text-rouge text-xl sm:text-2xl leading-none flex-shrink-0">
                      {item.prix}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </section>

        {/* CTA */}
        <Reveal className="relative overflow-hidden bg-gradient-to-br from-sombre to-rouge-dark rounded-2xl p-8 sm:p-12 text-center">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1200&q=80"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="relative">
            <h2 className="font-bebas text-jaune text-4xl sm:text-5xl mb-3">Prêt à Commander ?</h2>
            <p className="text-gray-300 mb-6 text-sm sm:text-base">
              Commandez en ligne, récupérez en 15 min ou faites-vous livrer !
            </p>
            <a href="/commande" className="btn-jaune inline-block">
              Commander maintenant
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
