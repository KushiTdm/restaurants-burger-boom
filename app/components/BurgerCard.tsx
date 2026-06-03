'use client'

import Image from 'next/image'

type Props = {
  nom: string
  description: string
  prix: string
  badge: string
  image: string
}

export default function BurgerCard({ nom, description, prix, badge, image }: Props) {
  return (
    <article className="burger-card group flex flex-col h-full">
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image
          src={image}
          alt={nom}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 inline-block bg-white/95 text-sombre text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow">
          {badge}
        </span>
      </div>
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <h3 className="font-oswald font-bold text-sombre text-lg sm:text-xl uppercase mb-2 leading-tight">
          {nom}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bebas text-rouge text-3xl leading-none">{prix}</span>
          <a href="/commande" className="btn-rouge !text-sm !px-5 !py-2.5">
            Commander
          </a>
        </div>
      </div>
    </article>
  )
}
