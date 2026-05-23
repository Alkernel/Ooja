import { Product } from './types';

// The 11 Jumia-style Main Categories requested
export const CATEGORIES = [
  { 
    id: 'electronics', 
    name: 'Electronics', 
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=400&auto=format&fit=crop',
    icon: 'Cpu',
    description: 'High-fidelity audio peripherals, sound cannons, and intelligent digital essentials.'
  },
  { 
    id: 'phones', 
    name: 'Phones & Tablets', 
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop',
    icon: 'Smartphone',
    description: 'Flagship mobile devices, custom touch tablets, and high-performance powerware.'
  },
  { 
    id: 'fashion', 
    name: 'Fashion', 
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop',
    icon: 'Shirt',
    description: 'Atelier organic clothing caps, heavyweight hoodies, and fine merino knits.'
  },
  { 
    id: 'beauty', 
    name: 'Health & Beauty', 
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=400&auto=format&fit=crop',
    icon: 'Sparkles',
    description: 'Organic skin extracts, botanical perfumes, and restorative daily treatments.'
  },
  { 
    id: 'home-office', 
    name: 'Home & Office', 
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=400&auto=format&fit=crop',
    icon: 'Home',
    description: 'Structured workspace furniture, ergonomic lighting, and minimalist desk objects.'
  },
  { 
    id: 'gaming', 
    name: 'Gaming', 
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop',
    icon: 'Gamepad2',
    description: 'Mechanical split-layout keyboards, heavyweight trackpads, and dynamic gaming widgets.'
  },
  { 
    id: 'watches', 
    name: 'Watches', 
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop',
    icon: 'Watch',
    description: 'Hand-crafted mechanical gears, self-winding tickers, and protective wrist bands.'
  },
  { 
    id: 'groceries', 
    name: 'Groceries', 
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop',
    icon: 'ShoppingBag',
    description: 'Micro-lot single estate organic coffee roasts, ceremonial grade matcha, and herbal elixirs.'
  },
  { 
    id: 'appliances', 
    name: 'Appliances', 
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=400&auto=format&fit=crop',
    icon: 'Tv',
    description: 'Thermal siphon glass coffee makers, temperature kettles, and advanced home appliances.'
  },
  { 
    id: 'sneakers', 
    name: 'Sneakers', 
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=400&auto=format&fit=crop',
    icon: 'Footprints',
    description: 'Minimalist leather high-tops, retro running soles, and vulcanized canvas footwear.'
  },
  { 
    id: 'accessories', 
    name: 'Accessories', 
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=400&auto=format&fit=crop',
    icon: 'Sunglasses',
    description: 'Polished bio-acetate sunglasses, structured cowhide carries, and heavy cotton caps.'
  }
] as const;

export const PRODUCTS: Product[] = [
  // FASHION CATEGORY
  {
    id: 'ooja-001',
    name: 'Noir Heavyweight Hooded Jacket',
    price: 185,
    category: 'fashion',
    description: 'An exceptional double-faced heavyweight fleece hooded jacket in archival pitch black. Engineered with relaxed drop-shoulder tailoring, a structured double-layer hood, and deep set-in welt pockets. Crafted with clean raw edge accents and custom steel zippers.',
    images: [
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    specs: [
      '100% Organic Cotton Heavyweight Fleece (450 GSM)',
      'Pre-shrunk for an optimal structured silhouette',
      'Dual-zipper hardware with gunmetal matte finish',
      'Handcrafted and pigment-dyed in small batches'
    ],
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    stock: 14
  },
  {
    id: 'ooja-jacket-02',
    name: 'Overland Technical Shelter Jacket',
    price: 215,
    category: 'fashion',
    description: 'A lightweight laminated rain shell designed for superior windbreaker resistance and extreme versatility. Engineered with fully breathable sealed seams, waterproof zip closures, and subtle reflective accents.',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    specs: [
      'High-density Gore-Tex grade nylon membrane',
      'Adjustable performance hoods and wrist closures',
      'Waterproof heat-sealed zipper seams with lock pullers'
    ],
    rating: 4.8,
    reviewsCount: 78,
    inStock: true,
    stock: 9
  },
  {
    id: 'ooja-002',
    name: 'Archival Essential Tee',
    price: 65,
    category: 'fashion',
    description: 'The ultimate luxury base layer. Features an elegant slightly high bound collar, custom midweight structure, and seamless blind-stitched hems. Pure optic white cotton with an exceptionally smooth, cold-to-the-touch finish.',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    specs: [
      '100% Long-staple Supima Cotton (240 GSM)',
      'Tight-knit 2-ply jersey weave',
      'Ribbed mock neck profile holds its form',
      'Made in Portugal'
    ],
    rating: 4.8,
    reviewsCount: 289,
    inStock: true,
    stock: 35
  },
  {
    id: 'ooja-tee-02',
    name: 'Raw-Edge Heavyweight Tee',
    price: 75,
    category: 'fashion',
    description: 'A vintage-wash mineral-style heavyweight tee featuring raw-edge collar detailing and relaxed dropped shoulder sleeve bands. Crafted from custom-treated loopwheel ring-spun cotton canvas jersey.',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    specs: [
      '100% Cotton Heavy loopwheel jersey (320 GSM)',
      'Mineral stonewashed treatment for high texturization',
      'Double-line lock stitching prevents unwanted fraying'
    ],
    rating: 4.7,
    reviewsCount: 104,
    inStock: true,
    stock: 22
  },
  {
    id: 'ooja-006',
    name: 'Mono Ribbed Merino Sweater',
    price: 195,
    category: 'fashion',
    description: 'Knitted meticulously with 100% fine merino wool yarn. Employs a heavy half-cardigan stitch pattern for supreme depth and weight. Features clean-finished dropped shoulders and an elegantly structured mock collar profile.',
    images: [
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    specs: [
      '100% Ultra-fine Extra-washed Merino Wool',
      'Medium knit structure providing natural breathability',
      'Subdued cuffs and elastic ribbing edges',
      'Cold hand wash or specialty cleaning'
    ],
    rating: 4.6,
    reviewsCount: 110,
    inStock: true,
    stock: 16
  },
  {
    id: 'ooja-knit-02',
    name: 'Aran Crochet Cashmere Sweater',
    price: 210,
    category: 'fashion',
    description: 'An expansive heavy structured knit sweater featuring contemporary geometric stitch bands. Crafted from supreme cashmere-blend fibers with high elastic mock neck ribs.',
    images: [
      'https://images.unsplash.com/photo-1517256064527-09c53b2d0c6b?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['M', 'L', 'XL'],
    specs: [
      '30% Premium Cashmere & 70% Extrafine Merino Wool',
      'Super chunky honeycomb visual structure stitch lines',
      'Pre-shrunk and shape-locking fiber treatments'
    ],
    rating: 4.9,
    reviewsCount: 45,
    inStock: true,
    stock: 11
  },

  // SNEAKERS CATEGORY
  {
    id: 'ooja-003',
    name: 'Stark High-top Minimalist Sneaker',
    price: 240,
    category: 'sneakers',
    description: 'A striking vulcanized high-top silhouette in chalk white and deep onyx black. Cut from full-grain vegetable-tanned calf leather. Features a customized extra-cushioned rubber cupsole, minimalist blind eyelets, and hand-waxed tonal cotton laces.',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    specs: [
      'Full-grain Italian calfskin upper',
      'Full calfskin internal lining',
      'Reinforced recycled vulcanized rubber outsole',
      'Removable gel-cushioned footbed'
    ],
    rating: 4.7,
    reviewsCount: 94,
    inStock: true,
    stock: 18
  },
  {
    id: 'ooja-foot-02',
    name: 'Onyx Leather Chelsea Boot',
    price: 280,
    category: 'sneakers', // Display under footwear/sneakers department
    description: 'A modern, ruggedly structured Chelsea boot silhouette sculpted in sleek full-grain calfskin leather. Equipped with durable pull tabs, double premium elastic side expansion panels, and sturdy welted rubber track soles.',
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['41', '42', '43', '44', '45'],
    specs: [
      'Vegetable-tanned full-grain calf leather upper',
      'Reinforced rear and front industrial pull tabs',
      'Hand-finished Goodyear welted sole design'
    ],
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
    stock: 8
  },
  {
    id: 'ooja-foot-03',
    name: 'Performance Running Eclipse Sole',
    price: 195,
    category: 'sneakers',
    description: 'A striking running/jogging shoe featuring high performance engineering. Includes a flexible woven tech mesh body, secure TPU support structures, and featherweight carbon foam soles.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['40', '41', '42', '43', '44'],
    specs: [
      'Recycled composite tech knit outer mesh casing',
      'Impact absorbing high-rebound cushioning foam layer',
      'Slip-proof textured natural rubber treads'
    ],
    rating: 4.8,
    reviewsCount: 65,
    inStock: true,
    stock: 24
  },

  // ACCESSORIES CATEGORY
  {
    id: 'ooja-004',
    name: 'Onyx Acetate Sunglasses',
    price: 135,
    category: 'accessories',
    description: 'Bold rectangular frames sculpted in monolithic block acetate. Hand-polished to a beautiful piano gloss finish. Equipped with deep dark CR-39 protective lenses that provide seamless UV protection and block glare under stark conditions.',
    images: [
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['One Size'],
    specs: [
      'Handcrafted Biodegradable Cellulose Acetate frames',
      'Hardened steel five-barrel hinges with rivet details',
      '100% UVA/UVB polarized protective lenses',
      'Includes custom black leather folding case'
    ],
    rating: 4.9,
    reviewsCount: 78,
    inStock: true,
    stock: 40
  },
  {
    id: 'ooja-eye-02',
    name: 'Linear Monolithic Square Sunglasses',
    price: 145,
    category: 'accessories',
    description: 'Stately architectural sunglasses featuring premium smoke lenses, thin raw-cut mock-tortoise acetate ears, and high-tensile stainless steel interior temples.',
    images: [
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['One Size'],
    specs: [
      'Stark-face custom horizontal geometric profile styling',
      'Full block UV polarized reflection filtration',
      'Includes micro-grained dust wipe and felt carry pouch'
    ],
    rating: 4.6,
    reviewsCount: 31,
    inStock: true,
    stock: 15
  },
  {
    id: 'ooja-005',
    name: 'Pebble Leather Structured Tote',
    price: 310,
    category: 'accessories',
    description: 'A rigorous structural layout to organize your absolute essentials. Built from black pebble-grain luxury cowhide, features a raw suede interior, dual reinforced integrated shoulder handles, and a secure internal metal clasp with a detachable zip clutch.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['Medium', 'Large'],
    specs: [
      'Premium full-grain pebble leather',
      'Hand-painted finished edges',
      'Includes independent zippered security sleeve',
      'Reinforced bottom panel stands completely upright'
    ],
    rating: 4.9,
    reviewsCount: 61,
    inStock: true,
    stock: 11
  },
  {
    id: 'ooja-bag-02',
    name: 'Onyx Leather Travel Duffel Bag',
    price: 340,
    category: 'accessories',
    description: 'An exceptional travel, weekend and gym companion. Sculpted from rich top-grain black cowhide with deep matte industrial steel hardware zippers, double hand handles, and a detachable padded webbed cross strap.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['One Size'],
    specs: [
      'Double-treated premium pebble leather shell',
      'Double leather grip loops with hand strap snaps',
      'Dampness-resistant custom canvas internal lining'
    ],
    rating: 4.9,
    reviewsCount: 52,
    inStock: true,
    stock: 7
  },
  {
    id: 'ooja-bag-03',
    name: 'Minimalist Canvas Utility Daypack',
    price: 125,
    category: 'accessories',
    description: 'A perfectly tailored six-compartment daily pack. Crafted from double-weave military-grade waterproof waxed duck canvas with a plush shock-padded tablet holster slot.',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['One Size'],
    specs: [
      '18oz water-repellent thick waxed cotton canvas fleece',
      'Reinforced comfort-padded shoulder straps with steel sliders',
      'Integrated quick-access card sleeves under outer storm flap'
    ],
    rating: 4.7,
    reviewsCount: 89,
    inStock: true,
    stock: 19
  },
  {
    id: 'ooja-008',
    name: 'Stark Low-profile Canvas Cap',
    price: 48,
    category: 'accessories',
    description: 'An understated luxury staple. Crafted from dense 12oz brushed cotton canvas featuring a structured six-panel setup, matching curved brim, and fully adjustable custom rear strap featuring a solid brass matte buckle slider.',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['One Size'],
    specs: [
      '12oz Double-weave pre-shrunk cotton canvas',
      'Pliable protective interior crown structure',
      'Intricate precision-stitched ventilation eyelets',
      'Rear self-strap completed by matte-finish slider'
    ],
    rating: 4.5,
    reviewsCount: 118,
    inStock: false,
    stock: 0
  },

  // ELECTRONICS CATEGORY
  {
    id: 'ooja-elec-01',
    name: 'Aero-Acoustic Active Noise-Cancelling Headphones',
    price: 299,
    category: 'electronics',
    description: 'Precision hybrid active feedback noise cancellation. Crafted with an sleek lightweight magnesium-alloy structural headband frame and protein memory foam earcups for unmatched acoustic sealing.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['One Size'],
    specs: [
      '40mm custom custom-engineered dynamic bio-cellulose drivers',
      'Up to 45 hours operating battery life with fast charge support',
      'Seamless multi-point Bluetooth secondary device synchronics',
      'Premium steel hardware and dense EVA storage shell'
    ],
    rating: 4.9,
    reviewsCount: 185,
    inStock: true,
    stock: 18
  },
  {
    id: 'ooja-elec-02',
    name: 'Sleek Obsidian Wireless Sound Cannon',
    price: 180,
    category: 'electronics',
    description: 'A monolithic omni-directional wireless speaker. Emits raw room-filling acoustics through custom dual acoustic tweeters and an passive low-end bottom radiator.',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['One Size'],
    specs: [
      '360-degree expansive premium acoustic sound chamber',
      'IP67 completely dust-proof and waterproof ratings',
      'Double pairing allows wireless stereo expansion setup',
      'Anodized aluminum frame with soft silicone grip handles'
    ],
    rating: 4.7,
    reviewsCount: 92,
    inStock: true,
    stock: 12
  },

  // PHONES & TABLETS CATEGORY
  {
    id: 'ooja-phone-01',
    name: 'Stark Slate Flagship Cellular Phone',
    price: 999,
    category: 'phones',
    description: 'The architectural peak of high-speed handheld computation. Built with an aerospace titanium matte housing and an ultra-sharp edge-to-edge organic screen.',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['256GB', '512GB'],
    specs: [
      'Sleek raw titanium structural sidebands',
      '120Hz custom active refresh screen display panel',
      'Triple-lens high-density optical capturing system',
      'Ultra-efficient energy retention power framework'
    ],
    rating: 4.9,
    reviewsCount: 310,
    inStock: true,
    stock: 9
  },
  {
    id: 'ooja-phone-02',
    name: 'Pro-Ink Matte Canvas Touch Tablet',
    price: 750,
    category: 'phones',
    description: 'Immersive low-glare touch canvas designed for precise digital drafting and professional office reading. Employs a texturized surface simulating luxury archival paper.',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['12.9 Inch'],
    specs: [
      'Anti-reflective matte etched composite glass face plate',
      'Custom pen support detailing high tracking frequencies',
      'Super-thin 5.2mm structural alloy frame build styling',
      'Equipped with 4 surround speakers tuned in studio'
    ],
    rating: 4.8,
    reviewsCount: 145,
    inStock: true,
    stock: 14
  },

  // HEALTH & BEAUTY CATEGORY
  {
    id: 'ooja-beauty-01',
    name: 'Botanical Velvet Restorative Hydration Serum',
    price: 85,
    category: 'beauty',
    description: 'An advanced fast-absorbing skin matrix nutrient. Formulated with organic plant-derived squalane and barrier-healing cold-extracted micro-nutrients.',
    images: [
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597481-496100c8c836?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['50ml'],
    specs: [
      '100% naturally extracted fragrance-free organic serums',
      'Replenishes elastic lipids while creating skin moisture shield',
      'Packaged in heavy sunlight-shielded frosted glass bottle',
      'Cruelty-free lab-certified and ethically farmed'
    ],
    rating: 4.8,
    reviewsCount: 215,
    inStock: true,
    stock: 45
  },
  {
    id: 'ooja-beauty-02',
    name: 'Aromatic Forest Moss Fine Parfum',
    price: 120,
    category: 'beauty',
    description: 'An earthy, evocative aroma that connects you to primordial forest environments. Details crisp high-notes of spruce, organic birch wood sap, and heavy bottom notes of wet moss and premium petrichor.',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['100ml'],
    specs: [
      'Hand-blended micro-batches in standard glass flasks',
      'Extractive essential oils provide extreme long wear profile',
      'Notes inspired by post-rain damp temperate forests'
    ],
    rating: 4.9,
    reviewsCount: 88,
    inStock: true,
    stock: 20
  },

  // HOME & OFFICE CATEGORY
  {
    id: 'ooja-007',
    name: 'Eclipse Matte Ceramic Mug',
    price: 38,
    category: 'home-office',
    description: 'An exploration of touch and functional honesty. This custom hand-thrown ceramic mug details a matte chalk-black tactile exterior matched with a crystal-clean white high-gloss interior look, designed for visual contrast and supreme temperature retention.',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['350ml'],
    specs: [
      'High-fired iron-speckled durable stoneware clay',
      'Matte charcoal texturized slip exterior glaze',
      'Food-safe lead-free premium internal coating',
      'Microwave and high-temp dishwasher compatible'
    ],
    rating: 4.9,
    reviewsCount: 204,
    inStock: true,
    stock: 35
  },
  {
    id: 'ooja-ceramic-02',
    name: 'Artisan Pour-Over Dripper Set',
    price: 65,
    category: 'home-office',
    description: 'A striking minimalist ceramic coffee extraction dripper. Details a beautiful spiral water flow interior groove, and includes a matching 450ml double-glazed stoneware pitcher basin.',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['450ml'],
    specs: [
      'Double temperature-treated coarse clay frame',
      'Helical drainage pattern channels coffee seamlessly',
      'Resistant matte charcoal styling with clean grip loop'
    ],
    rating: 4.9,
    reviewsCount: 92,
    inStock: true,
    stock: 25
  },
  {
    id: 'ooja-home-01',
    name: 'Structured Studio task lamp',
    price: 165,
    category: 'home-office',
    description: 'A modern desktop balancing lamp featuring surgical precision pivot hinges and custom integrated premium flicker-free frosted array LEDs.',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['Classic Desk'],
    specs: [
      'Anodized industrial bead-blasted aluminum segments',
      'Continuous sliding dial for fluid light temperature settings',
      'Heavy weighted steel base prevents any tip-over hazards'
    ],
    rating: 4.7,
    reviewsCount: 54,
    inStock: true,
    stock: 15
  },

  // GAMING CATEGORY
  {
    id: 'ooja-game-01',
    name: 'Tactile Split-Layout Mechanical Keyboard',
    price: 210,
    category: 'gaming',
    description: 'Ergonomic split mechanic configuration designed to prevent forearm pronation. Loaded with custom tactile quiet copper switches and hand-finished dark walnut wooden side panels.',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['US ANSI'],
    specs: [
      'Individual ortholinear key tracking channels',
      'Hot-swappable 5-pin key control socket board',
      'Grained custom double-shot thick PBT keycap legends',
      'Equipped with custom high-speed braided cotton USB cord'
    ],
    rating: 4.9,
    reviewsCount: 88,
    inStock: true,
    stock: 15
  },
  {
    id: 'ooja-game-02',
    name: 'Hyper-Sensing Matte Glass Glide Trackpad',
    price: 95,
    category: 'gaming',
    description: 'A continuous, super-smooth micro-etched glass interface for seamless gestures and custom macro bindings. Outfitted with high tracking sensitivity click sensors.',
    images: [
      'https://images.unsplash.com/photo-1541140111813-8222e9d90981?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['One Size'],
    specs: [
      'Acid-etched frosted premium soda-lime glass cover',
      'Adjustable haptic motors simulate physical clicks',
      'Ultra-low design maintains resting wrist comfort angles'
    ],
    rating: 4.6,
    reviewsCount: 42,
    inStock: true,
    stock: 32
  },

  // WATCHES CATEGORY
  {
    id: 'ooja-watch-01',
    name: 'Chronograph self-winding Mechanical Watch',
    price: 450,
    category: 'watches',
    description: 'A mechanical powerhouse of self-winding gear computation. Features high anti-scratch sapphire crystal backing exposing complex brass ticks and 28 internal friction-reducing synthetic jewel gears.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['40mm'],
    specs: [
      'Custom brushed 316L medical-grade stainless steel body',
      'Waterproof sealing certified up to 50 meters depth indices',
      'Crafted with top-grain black horween leather wrist strap'
    ],
    rating: 4.9,
    reviewsCount: 74,
    inStock: true,
    stock: 5
  },
  {
    id: 'ooja-watch-02',
    name: 'Minimalist Titanium Case Quartz Ticker',
    price: 190,
    category: 'watches',
    description: 'An understated exercise in pure legibility. Sculpted in deep bead-blasted grey titanium casing with a clean sans-serif dial design and continuous ticking motion.',
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['38mm'],
    specs: [
      'Extremely lightweight titanium structural case weighing 32g',
      'High-grade Swiss-made quartz crystal movement oscillator',
      'Hypoallergenic flexible grey nylon webbed military-style band'
    ],
    rating: 4.8,
    reviewsCount: 57,
    inStock: true,
    stock: 18
  },

  // GROCERIES CATEGORY
  {
    id: 'ooja-groc-01',
    name: 'Micro-Lot Single Estate Roasted Coffee Beans',
    price: 32,
    category: 'groceries',
    description: 'Freshly roasted whole-bean coffee, shade-grown at high elevations. Offers layered honey aromas, bright stone-fruit acidity, and a luxurious velvet chocolate finish.',
    images: [
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['250g Bag'],
    specs: [
      '100% Arabica Geisha grade estate beans from Ethiopia',
      'Medium light roast designed for clean drip extraction',
      'Packaged in triple-layered airtight valves with roast dates'
    ],
    rating: 4.9,
    reviewsCount: 312,
    inStock: true,
    stock: 75
  },
  {
    id: 'ooja-groc-02',
    name: 'Ceremonial Grade Stone-Ground Matcha Tin',
    price: 45,
    category: 'groceries',
    description: 'Hand-picked first-harvest shade-grown green tea leaves, stone-ground into an exceptionally fine energetic jade powder. Direct source from Uji, Japan.',
    images: [
      'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['40g Tin'],
    specs: [
      'Directly imported pure single-origin stoneground Matcha',
      'Vivid green chlorophyll tint indicating intense freshness',
      'Rich in natural L-theanine creating smooth focused energy'
    ],
    rating: 4.8,
    reviewsCount: 112,
    inStock: true,
    stock: 60
  },

  // APPLIANCES CATEGORY
  {
    id: 'ooja-app-01',
    name: 'Thermal Siphon Glass Drip Espresso Station',
    price: 380,
    category: 'appliances',
    description: 'A striking structural vacuum extraction coffee maker that relies on vapor pressure to process boiling water through ground espresso. Beautiful visual brewing science.',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['Stand Set'],
    specs: [
      'Heat-resistant borosilicate thick glass expansion flasks',
      'Sturdy polished brass structural balancing frame holder',
      'Premium reusable organic cotton fiber filtration pad'
    ],
    rating: 4.9,
    reviewsCount: 46,
    inStock: true,
    stock: 8
  },
  {
    id: 'ooja-app-02',
    name: 'Smart Temp-Controlled Siphon Water Kettle',
    price: 110,
    category: 'appliances',
    description: 'A high-performance slender pour-over kettle equipped with micro-degree target temperature holding and custom double-wall insulation.',
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['0.9 Liter'],
    specs: [
      'Precise long goose-neck spout for control of flow-rate',
      'Maintains target heat settings dynamically for 60 minutes',
      'Interactive LED base with real-time temperature telemetry'
    ],
    rating: 4.8,
    reviewsCount: 81,
    inStock: true,
    stock: 22
  },

  // ADDED TO INTEGRATE SKETCH SUB-CATEGORIES DIRECTLY
  {
    id: 'ooja-tv-01',
    name: 'Onyx HDR 55" OLED SmartTV',
    price: 899,
    category: 'electronics',
    description: 'An immersive ultra-thin OLED television boasting crystal-clear display, high-fidelity HDR integration, and customized smart streaming features.',
    images: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['55 Inch', '65 Inch'],
    specs: [
      'OLED Self-lit pixel layout with infinite contrast ratios',
      'Dolby Vision & Atmos spatial integration audio support',
      'Ultra-thin 4.8mm panel profiles with seamless mount systems'
    ],
    rating: 4.9,
    reviewsCount: 64,
    inStock: true,
    stock: 12
  },
  {
    id: 'ooja-sound-01',
    name: 'Symphony Studio Soundbar & Home Theatre Subwoofer',
    price: 349,
    category: 'electronics',
    description: 'An exceptional home audio power station complete with wireless floor subwoofer, 7.1 linear channel speakers, and immersive spatial surround sound.',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['7.1 Setup'],
    specs: [
      'High power 450W output driving deep structural responses',
      'Seamless Bluetooth 5.2 and HDMI eARC connection modules',
      'Auto-calibrating room acoustic adjustment sensors'
    ],
    rating: 4.8,
    reviewsCount: 42,
    inStock: true,
    stock: 7
  },
  {
    id: 'ooja-phone-03',
    name: 'Nostalgia Classic 3G Basic Phone',
    price: 45,
    category: 'phones',
    description: 'A rugged retro keypad phone designed with a built-in vintage snake game, extraordinary 14-day battery reserve, and continuous cellular reliability.',
    images: [
      'https://images.unsplash.com/photo-1565849531158-bda9647aa523?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['Standard Dual SIM'],
    specs: [
      'Heavyweight drop-resistant premium polycarbonate housing',
      'Legendary durable classic keypad with dedicated tactile dome switches',
      'Long-lasting removable 1500mAh lithium powerpack'
    ],
    rating: 4.7,
    reviewsCount: 195,
    inStock: true,
    stock: 24
  },
  {
    id: 'ooja-jewel-01',
    name: 'Atelier 18K Solid Gold Minimalist Band',
    price: 295,
    category: 'fashion',
    description: 'A hand-burnished solid gold jewelry piece with a timeless satin dome look, polished comfort fit, and engraved internal signature.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['Size 6', 'Size 7', 'Size 8'],
    specs: [
      '18K Pure Yellow Gold Alloy',
      'Hand-polished seamless circular profile',
      'Micro-engraved branding mark'
    ],
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
    stock: 5
  }
];
