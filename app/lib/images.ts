const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const local = (name: string) => `/images/${name}.jpg`

export const heroBurger = local('burger_boomboom_classic')
export const heroBackdrop = local('backdrop_restaurant_interior')

export const burgerImages: Record<string, string> = {
  'Le BoomBoom Classic': local('burger_boomboom_classic'),
  'Le Volcanique': local('burger_volcanique'),
  'Le Champignon Forestier': local('burger_champignon'),
  'Le BBQ Fumé': local('burger_bbq'),
  'Le Croque Monsieur Burger': local('burger_croque_monsieur'),
  'Le Double Cheese': local('burger_double_cheese'),
  'Le Végétarien Boom': local('burger_vegetarien'),
  'Le Poulet Croustillant': local('burger_poulet_croustillant'),

  'Frites Maison': u('photo-1573080496219-bb080dd4f877'),
  'Frites au Fromage': local('side_frites_fromage'),
  'Onion Rings': local('side_onion_rings'),
  'Coleslaw Maison': u('photo-1625938145744-533adea71c3a'),
  'Nuggets × 6': u('photo-1562967914-608f82629710'),
  "Mac'n'Cheese": u('photo-1543352634-99a5d50ae78e'),

  'Coca-Cola 33cl': u('photo-1581636625402-29b2a704ef13'),
  'Limonade Maison': u('photo-1556679343-c7306c1976bc'),
  'Milk-Shake Vanille': u('photo-1572490122747-3968b75cc699'),
  'Milk-Shake Chocolat': local('drink_milkshake_chocolat'),
  "Jus d'Orange Pressé": u('photo-1613478223719-2ab802602423'),
  'Eau Minérale 50cl': u('photo-1559839734-2b71ea197ec2'),
  'Bière Pression 25cl': u('photo-1608270586620-248524c67de9'),

  'Sundae Chocolat': u('photo-1563805042-7684c019e1cb'),
  'Brownie Chaud': u('photo-1606313564200-e75d5e30476c'),
  'Cheesecake New-Yorkais': u('photo-1533134242443-d4fd215305ad'),
  'Cookie Géant': u('photo-1499636136210-6f4ee915583e'),
}

export const getImage = (name: string, fallback?: string) =>
  burgerImages[name] || fallback || heroBurger

export const sectionBackdrops = {
  promos: u('photo-1550547660-d9450f859349', 1600),
  locations: u('photo-1517248135467-4c7edcad34c4', 1600),
  app: local('backdrop_restaurant_interior'),
}
