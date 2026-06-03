const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const heroBurger = u('photo-1568901346375-23c9450c58cd', 1200)
export const heroBackdrop = u('photo-1571091718767-18b5b1457add', 1600)

export const burgerImages: Record<string, string> = {
  'Le BoomBoom Classic': u('photo-1568901346375-23c9450c58cd'),
  'Le Volcanique': u('photo-1550317138-10000687a72b'),
  'Le Champignon Forestier': u('photo-1606131731446-5568d87113aa'),
  'Le BBQ Fumé': u('photo-1551782450-a2132b4ba21d'),
  'Le Croque Monsieur Burger': u('photo-1550317138-10000687a72b'),
  'Le Double Cheese': u('photo-1572802419224-296b0aeee0d9'),
  'Le Végétarien Boom': u('photo-1525059696034-4967a8e1dca2'),
  'Le Poulet Croustillant': u('photo-1606755962773-d324e0a13086'),

  'Frites Maison': u('photo-1573080496219-bb080dd4f877'),
  'Frites au Fromage': u('photo-1639024471283-03518883512d'),
  'Onion Rings': u('photo-1639024471283-03518883512d'),
  'Coleslaw Maison': u('photo-1625938145744-533adea71c3a'),
  'Nuggets × 6': u('photo-1562967914-608f82629710'),
  "Mac'n'Cheese": u('photo-1543352634-99a5d50ae78e'),

  'Coca-Cola 33cl': u('photo-1581636625402-29b2a704ef13'),
  'Limonade Maison': u('photo-1556679343-c7306c1976bc'),
  'Milk-Shake Vanille': u('photo-1572490122747-3968b75cc699'),
  'Milk-Shake Chocolat': u('photo-1572490122747-3968b75cc699'),
  "Jus d'Orange Pressé": u('photo-1613478223719-2ab802602423'),
  'Eau Minérale 50cl': u('photo-1559839734-2b71ea197ec2'),
  'Bière Pression 25cl': u('photo-1608270586620-248524c67de9'),

  'Sundae Chocolat': u('photo-1563805042-7684c019e1cb'),
  'Brownie Chaud': u('photo-1606313564200-e75d5e30476c'),
  'Cheesecake New-Yorkais': u('photo-1533134242443-d4fd215305ad'),
  'Cookie Géant': u('photo-1499636136210-6f4ee915583e'),
}

export const getImage = (name: string, fallback?: string) =>
  burgerImages[name] || fallback || u('photo-1568901346375-23c9450c58cd')

export const sectionBackdrops = {
  promos: u('photo-1550547660-d9450f859349', 1600),
  locations: u('photo-1517248135467-4c7edcad34c4', 1600),
  app: u('photo-1571091718767-18b5b1457add', 1600),
}
