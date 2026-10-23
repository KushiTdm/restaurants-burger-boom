'use client'

import PopOutImage from './PopOutImage'

type Props = {
  nom: string
  description: string
  prix: string
  badge: string
  image: string
  cutout?: string
  base?: number
}

export default function BurgerCard({ nom, description, prix, badge, image, cutout, base }: Props) {
  return (
    <article className="burger-card group relative !overflow-visible hover:z-10 flex flex-col h-full">
      <PopOutImage
        src={image}
        cutout={cutout}
        base={base}
        alt={nom}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="aspect-square rounded-t-2xl"
        badge={
          <span className="inline-block bg-creme-50/95 text-sombre text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow">
            {badge}
          </span>
        }
      />
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <h3 className="font-oswald font-bold text-sombre text-lg sm:text-xl uppercase mb-2 leading-tight">
          {nom}
        </h3>
        <p className="text-sombre text-sm leading-relaxed mb-5 flex-1">{description}</p>
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
