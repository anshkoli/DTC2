import { Category, Product, BlogItem, Coupon } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'beehive-boxes',
    name: 'Beehive Boxes',
    description: 'Traditional wood and premium Langstroth & ISI hives constructed for Indian conditions.',
    iconName: 'Archive',
    image: 'https://lh3.googleusercontent.com/d/163VFUaQ-CLmvYgbGUITRoydOAsY9pbev'
  },
  {
    id: 'flow-hives',
    name: 'Flow Hives',
    description: 'Revolutionary honey-on-tap beehive boxes with automatic flow frame structures.',
    iconName: 'Droplet',
    image: 'https://lh3.googleusercontent.com/d/1nqWzElq-sCgHDYCC5zprA9SMTmfXbh0A'
  },
  {
    id: 'observation-hives',
    name: 'Observation Hives',
    description: 'Acrylic panelled, educational beehive boxes designed for tracking bee activity safely.',
    iconName: 'Eye',
    image: 'https://lh3.googleusercontent.com/d/1TB4_U9x-_u0Y374L1Sz4Q38hXpV69R66'
  },
  {
    id: 'honey-extractors',
    name: 'Honey Extractors',
    description: 'Stainless Steel manual and electric centrifugal honey spinners. 2, 4, 6, 8, and 10 frame options.',
    iconName: 'RotateCw',
    image: 'https://lh3.googleusercontent.com/d/1N45rD8e1KnCBhcNDQUFHoUyMaJPnBGQS'
  },
  {
    id: 'beekeeping-tools',
    name: 'Beekeeping Tools',
    description: 'All basic helpers from frame holders, uncapping rollers, foundation crimpers and lifters.',
    iconName: 'Wrench',
    image: 'https://lh3.googleusercontent.com/d/1OI2shC7EJ7mMFCYnogaaW5XH0bZGtb3N'
  },
  {
    id: 'bee-feeders',
    name: 'Bee Feeders',
    description: 'Plastic feeders adapted for Apis Mellifera and Cerena Indica nutrition management.',
    iconName: 'Nut',
    image: 'https://lh3.googleusercontent.com/d/1bVIOaWQmVd3THe4fJnf6pwB0-BJGTBty'
  },
  {
    id: 'bee-frames',
    name: 'Bee Frames',
    description: 'Premium quality wooden frames and foundation wire for brood boxes.',
    iconName: 'Grid',
    image: 'https://lh3.googleusercontent.com/d/1ogg8xh53KARugkKf-cAojoHYo4n0RdTd'
  },
  {
    id: 'bee-wax-products',
    name: 'Bee Wax Products',
    description: 'Pure beeswax sheets, comb rollers, foundation mills and notebooks.',
    iconName: 'Flame',
    image: 'https://lh3.googleusercontent.com/d/19y0sv1eRs5fPpaP26w4o3Ix-WA1qcqAY'
  },
  {
    id: 'queen-rearing',
    name: 'Queen Rearing Equipment',
    description: 'Grafting tools, plastic queen cages, gates, and essential queen rearing kits.',
    iconName: 'ShieldAlert',
    image: 'https://lh3.googleusercontent.com/d/1_aPBdQLp2QK4-ieHACyG_KTqrTX9NSdR'
  },
  {
    id: 'protective-equipment',
    name: 'Protective Equipment',
    description: 'Breathable full suits, heavy cotton gloves, clear bee veils and general safety gear.',
    iconName: 'UserCheck',
    image: 'https://lh3.googleusercontent.com/d/1OvTGYgOEa9hl5-uuXyNxuDO0qHiN6tGw'
  },
  {
    id: 'honey-processing',
    name: 'Honey Processing Tools',
    description: 'Strainers, brix refractometers, storage buckets, and food-grade gates.',
    iconName: 'Thermometer',
    image: 'https://lh3.googleusercontent.com/d/1KkF2blchG_Ct8aVVGAYHzXYLyiP4694l'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'High durability beehive MS stands, pollen traps, and honeycomb box cases.',
    iconName: 'Layers',
    image: 'https://lh3.googleusercontent.com/d/1qEIweh2ldNlPhwDZ6D4VAZozMnZzbS7L'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Automatic Flow Beehive Box (7 Flow Frames)',
    price: 28000,
    originalPrice: 32000,
    description: 'Our flagship automatic beehive box crafted with sustainable natural raw wood. Built to extract authentic honey directly with a simple turn key, keeping bees entirely undisturbed.',
    category: 'flow-hives',
    specifications: {
      'Material': 'Sustainable natural cedar/pine raw wood',
      'Capacity': '7 Automatically draining Flow Frames',
      'Includes': 'Telescoping Top Cover, Inner Cover, Super Box, Queen Excluder, Deep Brood Box, Solid Bottom Board, Flow Key & Drainage Tubes',
      'Assembled': 'Partially assembled; high precision dovetail joints',
      'Eco Friendly': 'Reusable and carbon-neutral raw timber composition'
    },
    images: [
      'https://lh3.googleusercontent.com/d/1nqWzElq-sCgHDYCC5zprA9SMTmfXbh0A',
      'https://lh3.googleusercontent.com/d/1Is1NNKrZ9g-K07WsQ0slAtEQpBpbH6Vd'
    ],
    rating: 4.9,
    reviewsCount: 42,
    isBestSeller: true,
    stock: 12,
    status: 'published',
    tags: ['automatic', 'beehive', 'wood', 'premium', 'harvesting'],
    features: ['Easy turn key honey drainage', 'Zero bee disturbance during harvest', 'Waterproof telescoping top metal-shield cover', 'Double layer ventilation board design']
  },
  {
    id: 'p2',
    name: 'Automatic Flow Beehive Box (6 Flow Frames)',
    price: 16000,
    originalPrice: 19000,
    description: 'Compact flow hive configuration made of robust natural timber. Safe for Apis Mellifera operations. Features easy observation window slots on side panels.',
    category: 'flow-hives',
    specifications: {
      'Material': 'Sustainable natural cedar wood',
      'Compatible Bee': 'Apis Mellifera',
      'Includes': '6 premium flow frames, brooder box frame slots, metallic protective layer, ventilation slot'
    },
    images: ['https://lh3.googleusercontent.com/d/1Is1NNKrZ9g-K07WsQ0slAtEQpBpbH6Vd'],
    rating: 4.8,
    reviewsCount: 28,
    isBestSeller: false,
    stock: 15,
    status: 'published',
    tags: ['beehive', '6-frame', 'flow', 'mellifera'],
    features: ['Highly accessible side preview window panels', 'Includes 6 food-grade automatic imported flow frames', 'Precision dovetails prevent heat loss']
  },
  {
    id: 'p3',
    name: 'Automatic Premium Imported Flow Frames (Set of 7)',
    price: 14000,
    originalPrice: 16500,
    description: 'The primary automatic honey on tap draining structure. Just key-in to pivot internal slots and channel pure, filtered honey down to collection jars. Accepted for high volume bulk orders.',
    category: 'flow-hives',
    specifications: {
      'Single Width': '5cm / 1.97"',
      'Length': '49cm / 19.29" total width',
      'Height': '24.5cm / 9.65"',
      'Core Grid': '46cm / 18.11"',
      'MIME Type': 'Food Grade Sanitary Polypropylene (BPA Free)'
    },
    images: [
      'https://lh3.googleusercontent.com/d/1xXC8osTiHjzS6t06TIi8LFwOsRznlUtQ',
      'https://lh3.googleusercontent.com/d/1Mfo7-YBNdKNRa0Cm6EvXEHWwNZT05p_C'
    ],
    rating: 4.9,
    reviewsCount: 19,
    isBestSeller: true,
    stock: 25,
    status: 'published',
    tags: ['flow-frames', 'drain', 'honey-tab', 'imported'],
    features: ['High durability food-grade polymer', 'Comes in a complete matching set of 7 frames', 'Requires minimal cleaning and zero spin extraction']
  },
  {
    id: 'p4',
    name: 'DTC 2 Layer Beehive Box (Stingless Bees Tragona)',
    price: 3800,
    description: 'Double layer stingless bee box fabricated with seasoned natural timber customized specifically for Tragona swarm breeding and honey tap operations.',
    category: 'observation-hives',
    specifications: {
      'Capacity': '2 Tier Multi Chambered',
      'Target Bee': 'Tragona Stingless bees',
      'Material': 'Seasoned raw timber board', 
      'Features': 'Precision dovetail joints with honey flow preview gate'
    },
    images: [
      'https://lh3.googleusercontent.com/d/1TB4_U9x-_u0Y374L1Sz4Q38hXpV69R66',
      'https://lh3.googleusercontent.com/d/1px4dk4B8KvB65WA1GYvbSibswq09y3x1'
    ],
    rating: 4.7,
    reviewsCount: 14,
    stock: 6,
    status: 'published',
    tags: ['observation', 'schools', 'education', 'glass-hive'],
    features: ['Highly clear shatter-proof insulation acrylic sheets', 'Secure airflow ventilation grid on top side doors', 'Easy cleaning access doors with stainless brackets']
  },
  {
    id: 'p5',
    name: 'DTC 4 FRAMES ISI "B" Type Beehive Box (Cerena Indica)',
    price: 3200,
    description: 'Quad-frame ISI standard B-type beehive configuration calibrated for Indian Apis Cerena Indica honey extraction and breeding cycles.',
    category: 'observation-hives',
    specifications: {
      'Capacity': '4 ISI Standard frames',
      'Target Bee': 'Apis Cerena Indica (Indian Bees)',
      'Composition': 'Premium seasoned light-weight timber framing'
    },
    images: [
      'https://lh3.googleusercontent.com/d/1y-RfA-s98gTXh9wEw80cusAPeP9h8YBG',
      'https://lh3.googleusercontent.com/d/1vdzM3NYPjZ_hb9rMG3sZv-y3rIGzHbDC'
    ],
    rating: 4.9,
    reviewsCount: 9,
    stock: 4,
    status: 'published',
    tags: ['observation', 'pro-exhibit', 'teak-wood'],
    features: ['Fits 4 deep bee brooder frames', 'Integrated locking mechanisms for secure transit', 'Integrated base pedestal for desktop display stand']
  },
  {
    id: 'p6',
    name: 'DTC 30 FRAMES Langstroth Beehive Box',
    price: 7000,
    originalPrice: 8500,
    description: 'Industrial capacity triple-stacked Langstroth beehive box constructed using dense sustainable pinewood. Designed for elite, productive honey collection under rugged outdoor weather.',
    category: 'beehive-boxes',
    specifications: {
      'Type': 'Langstroth Standard',
      'Capacity': '30 Bee Frames across 3 tier boxes',
      'Dimensions': '19-7/8" L x 16-1/4" W x 9-1/2" H per deep box',
      'Included parts': 'Telescoping cover with rain shield, Inner cover, Medium super, Deep brood boxes, Bottom screen board'
    },
    images: [
      'https://lh3.googleusercontent.com/d/1oyeNzYgUIoVbKJgssaQhTvdYRG68vEbe',
      'https://lh3.googleusercontent.com/d/1jaq-qheuBbGKqPsgcv95gea9PSTeaq2T'
    ],
    rating: 4.8,
    reviewsCount: 31,
    isBestSeller: true,
    stock: 30,
    status: 'published',
    tags: ['langstroth', '30-frames', 'pinewood', 'commercial'],
    features: ['Spacious triple tier box design', 'Dovetail corners precisely machined to withstand extreme temperature shifting', 'Integrated entry controller reducer']
  },
  {
    id: 'p7',
    name: 'DTC 20 FRAMES Langstroth Beehive Box',
    price: 4500,
    description: 'Double stacked pine wood beehive box incorporating standard deep super slots. Our most popular workhorse box configuration for professional apiaries across India.',
    category: 'beehive-boxes',
    specifications: {
      'Type': 'Langstroth Double Storey',
      'Capacity': '20 Frames',
      'Brood box': '9-1/2" deep frame compatible',
      'Super box': '6-3/8" medium compatible'
    },
    images: [
      'https://lh3.googleusercontent.com/d/163VFUaQ-CLmvYgbGUITRoydOAsY9pbev',
      'https://lh3.googleusercontent.com/d/1n25MIkXsLBPT__2GQ0tZHldVAlvnO9j9',
      'https://lh3.googleusercontent.com/d/1DlFKsg80wsSfXJpHbwC28zQsKz50uUCC',
      'https://lh3.googleusercontent.com/d/1RGyhIyWip2sxYENEsiwtYTbWLHe5UU9a'
    ],
    rating: 4.7,
    reviewsCount: 54,
    isBestSeller: true,
    stock: 45,
    status: 'published',
    tags: ['box', '20-frames', 'standard', 'bestseller'],
    features: ['Crafted from durable kiln-dried pine wood', 'Heavy metal-shielded telescoping roof', 'Easy split divider slots for queen excluder']
  },
  {
    id: 'p8',
    name: 'DTC 5 FRAMES Nuc Beehive Box (Transport Box)',
    price: 2400,
    description: 'Excellent nuclear transport box built with premium dovetail joinery. Keeps swarms entirely protected and properly ventilated during long-distance transit across state borders.',
    category: 'beehive-boxes',
    specifications: {
      'Capacity': '5 standard transit frames',
      'Target Hive': 'Transport and Swarm collection',
      'Weather Proofing': 'Waterproof metal-wrapped top cover to lock rain',
      'Joinery': 'Dovetail lock corners preventing frame shifting'
    },
    images: [
      'https://lh3.googleusercontent.com/d/1FWv65pZFLXehULFXw2FtdkiwK8U0PkZC',
      'https://lh3.googleusercontent.com/d/1lDTldF9KZ1MmhOexNuYDVkEonI5ewQn8'
    ],
    rating: 4.6,
    reviewsCount: 12,
    stock: 18,
    status: 'published',
    tags: ['transport', 'nuc', '5-frame', 'joint'],
    features: ['Waterproof premium metallic roof', 'Dovetail connections ensure high structural cohesion during bumps', 'Lightweight build with robust easy-grip handles']
  },
  {
    id: 'p9',
    name: 'DTC 8 FRAMES ISI "A" Type Beehive Box (Cerena Indica)',
    price: 2200,
    description: 'DTC tailored beehive format made specifically for the Asian Honey Bee (Apis Cerena Indica). Designed after Indian Standards Institute (ISI) guidelines for optimum brood-to-honey ratios.',
    category: 'beehive-boxes',
    specifications: {
      'Standards': 'ISI "A" Type Compliant',
      'Capacity': '8 Frames optimized for Indian Bees',
      'Composition': 'Premium lightweight natural raw wood'
    },
    images: [
      'https://lh3.googleusercontent.com/d/1uY_lbBJsqGQVsJp074jpcEt-C5gKikJ1',
      'https://lh3.googleusercontent.com/d/1UQ3VYy8owCU7daFkHhkxrM0fxPpzSwvH',
      'https://lh3.googleusercontent.com/d/1Hsf97MTYJZ13QCFhLMyW4j9hs6wk7I9U',
      'https://lh3.googleusercontent.com/d/1p5zNj8W_kXmYNew1DIGa3DKyhnZ7148t'
    ],
    rating: 4.9,
    reviewsCount: 37,
    isBestSeller: true,
    stock: 50,
    status: 'published',
    tags: ['isi-a', 'indian-bees', 'cerena-indica', '8-frame'],
    features: ['Optimized internal crawl-space specifically calibrated for Apis Cerena Indica', 'Provides higher natural disease resilience', 'Excellent thermal properties for tropical summers']
  },
  {
    id: 'p10',
    name: 'DTC 15 Pcs Set Of Essential Beekeeping Tools',
    price: 8500,
    originalPrice: 10000,
    description: 'All-in-one starter kit containing every essential tool to operate a garden apiary. High-grade stainless steel components paired with durable wooden handles. Incredible discount package.',
    category: 'beekeeping-tools',
    specifications: {
      'Items': '15 individual heavy-duty tools',
      'Contents': 'Stainless Smoker, Frame Grip, Wire Embedder, Transport Cage, Feeder, Smoker Pellets pack, Bee Hive Brush, Hive Tool scraper, Queen Catcher, Marking tube'
    },
    images: [
      'https://lh3.googleusercontent.com/d/1OvTGYgOEa9hl5-uuXyNxuDO0qHiN6tGw',
      'https://lh3.googleusercontent.com/d/1aSbFI4Ghy_d7n_qHMUT1iMtpaZ27KYYH'
    ],
    rating: 4.9,
    reviewsCount: 68,
    isBestSeller: true,
    stock: 40,
    status: 'published',
    tags: ['kit', 'tools', 'beekeeping-set', 'starter'],
    features: ['Premium heavy-duty stainless smoker body with heat guard shield', 'Includes all tools for brood testing, frame holding, and hive scraping', 'Cost advantage: saves 35% compared to purchasing separate tools']
  },
  {
    id: 'p11',
    name: 'DTC Premium Quality SS Honey Extractor - 4 Frames',
    price: 6500,
    originalPrice: 7800,
    description: 'Gleaming Food Grade SS 304 centrifugal spinner equipped with manual easy-spin gears. Spun honey channels down elegantly into bottom storage buckets via the built-in bee gate.',
    category: 'honey-extractors',
    specifications: {
      'Capacity': '4 standard frames concurrently',
      'Material': 'Stainless Steel 304 anti-rust container body',
      'Automation Grade': 'Manual Hand Crank high-torque gearbox system',
      'Color': 'Sliver Chrome finishing'
    },
    images: [
      'https://lh3.googleusercontent.com/d/1N45rD8e1KnCBhcNDQUFHoUyMaJPnBGQS',
      'https://lh3.googleusercontent.com/d/1KkF2blchG_Ct8aVVGAYHzXYLyiP4694l',
      'https://lh3.googleusercontent.com/d/18MpEtO6sJe94uUTRRBsSGg_JV56s9h8Y'
    ],
    rating: 4.8,
    reviewsCount: 22,
    stock: 8,
    status: 'published',
    tags: ['honey-extractor', '4-frame', 'stainless-steel', 'centrifuge'],
    features: ['Food-grade sanitary 304 stainless steel ensures honey purity', 'High-speed manual crank with automatic return safety brake', 'Clear transparent acrylic cover tabs for view checking']
  },
  {
    id: 'p12',
    name: 'DTC Premium Quality Cotton Bee Suit + Gloves',
    price: 2200,
    description: 'Double-duty thick cotton worker jumpsuit equipped with integrated round support bee veil. Protects keepers entirely from swarming sting issues. Includes robust premium leather palm gloves.',
    category: 'protective-equipment',
    specifications: {
      'Material': 'High-density ultra-breathable heavy linen/cotton',
      'Pockets': '3 Large Hive Tool dedicated pockets',
      'Safety': 'Elastic sting-proof cuffs and ankle bands'
    },
    images: [
      'https://lh3.googleusercontent.com/d/1OI2shC7EJ7mMFCYnogaaW5XH0bZGtb3N',
      'https://lh3.googleusercontent.com/d/1889w2JUIz3V54-r8wdwCw19g20J71Mjh',
      'https://lh3.googleusercontent.com/d/1OeC2DJ18DGPYpArZf7OmJXj5Vw8avu99'
    ],
    rating: 4.8,
    reviewsCount: 46,
    stock: 35,
    status: 'published',
    tags: ['suit', 'protective', 'clothing', 'safety', 'gloves'],
    features: ['Sting-proof triple weave heavy-weight cotton composition', 'Detachable veil hood with scratchproof wire netting mesh', 'Heavy double elastic joints protect vulnerable ankle zones']
  },
  {
    id: 'p13',
    name: 'DTC Beeswax Foundation Mill with Engraved Rollers',
    price: 18500,
    originalPrice: 21000,
    description: 'Professional high precision beeswax foundation mill with engraved casting alloy rollers. Designed specifically for producing straight combs in Apis Mellifera wood hives.',
    category: 'honey-processing',
    specifications: {
      'Roller Dimensions': 'Length 254 mm X Diameter 70 mm',
      'Mesh Grade': 'Apis Mellifera premium cell pattern',
      'Composition': 'High durability aluminum cast-iron alloy with nonstick surface'
    },
    images: ['https://lh3.googleusercontent.com/d/1vjQ6XHprTygGYBevwVy4DjjWfgbEimQK'],
    rating: 4.9,
    reviewsCount: 8,
    stock: 12,
    status: 'published',
    tags: ['refractometer', 'digital', 'quality-assurance', 'moisture-check'],
    features: ['High speed instant digital readout in 2 seconds', 'Requires a single drop of honey product', 'Comes in hard padded EVA case with pipette and battery bundle']
  },
  {
    id: 'p14',
    name: 'DTC Stainless Steel Bee Hive Frame Holder with Frame Grip',
    price: 950,
    description: 'Ergonomic heavy-duty stainless steel frame lifter and holding stand. Promotes solid grasp during honey checks without causing structural frame damage.',
    category: 'beekeeping-tools',
    specifications: {
      'Length': 'Standard 13 inches handle grip',
      'Composition': '304 Grade Polished Rustless Stainless Steel',
      'Spring Lever': 'Reinforced compression spring grip'
    },
    images: [
      'https://lh3.googleusercontent.com/d/1qZ37eooV3F0rboH-tFkYExPcCTaita0Y',
      'https://lh3.googleusercontent.com/d/1KGI8nxoKGN7PCHJ5dzyOfe5G_gzuxEJM',
      'https://lh3.googleusercontent.com/d/1craMc2dKQOoBWeDKTo6NjH3A5EvDCEL6',
      'https://lh3.googleusercontent.com/d/1zPFJnKEsjpo1ReBJfgz5ossQ_34hBKTv'
    ],
    rating: 4.7,
    reviewsCount: 43,
    stock: 60,
    status: 'published',
    tags: ['smoker', 'bee-smoker', 'stainless-steel', 'safety'],
    features: ['Surrounding mesh wire heat protectant guard prevents accidental burns', 'Integrated bottom air baffle plate promotes constant smoke fuel smolder', 'Easy utility hanging hook bracket on face shield']
  },
  {
    id: 'p15',
    name: 'DTC Premium Quality pure Bee Wax Sheet (Apis Mellifera)',
    price: 35,
    description: 'Flawless natural sweet-fragrance pure beeswax foundation sheet. Helps bees construct straight, resilient honeycombs rapidly, saving energy and brood-rearing effort.',
    category: 'bee-wax-products',
    specifications: {
      'Dimensions': '16.3" L x 7.7" W',
      'Material': '100% natural organic purified amber beeswax',
      'Texture': 'Deep hexagonal honeycomb cells cell base'
    },
    images: ['https://lh3.googleusercontent.com/d/19y0sv1eRs5fPpaP26w4o3Ix-WA1qcqAY'],
    rating: 4.9,
    reviewsCount: 130,
    isBestSeller: true,
    stock: 1500,
    status: 'published',
    tags: ['wax-sheet', 'beeswax', 'foundation', 'mellifera'],
    features: ['100% pure organic beeswax with zero paraffin additives', 'Correct cell sizing inspires rapid honey cell building', 'Provides structural stability inside wood frames']
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'c1',
    code: 'SAVEBEES',
    discountType: 'percentage',
    value: 10,
    minOrderValue: 2000,
    expired: false,
    description: 'Save 10% on sustainable gear! Standard min order Rs. 2,000.'
  },
  {
    id: 'c2',
    code: 'DTCFARMER',
    discountType: 'fixed',
    value: 1500,
    minOrderValue: 15000,
    expired: false,
    description: 'Flat Rs. 1,500 off on bulk boxes and extracts above Rs. 15,000.'
  }
];

export const EDUCATIONAL_BLOGS: BlogItem[] = [
  {
    id: 'b1',
    title: 'Beginners Guide to Sustainable Indian Beekeeping',
    excerpt: 'How to setup your first organic apiary utilizing ISI standard boxes, supporting native pollinator populations safely.',
    content: `Beekeeping in India is an ancient, highly rewarding craft that bridges agriculture, ecosystem health, and sustainable farmer livelihoods. As pollinators responsible for over 60% of regional crops, honey bees are the unsung heroes of our countryside. This guide covers the absolute essentials of starting with a single or double hive box setup under Indian conditions.

### Selecting Your Bee Species
In India, we primarily work with:
1. **Apis Cerena Indica** (The Indian Honey Bee): Extremely gentle, well-adapted to local tropical weather, moderate swarming instincts. Fits perfectly in **ISI "A" Type 8-frame boxes**.
2. **Apis Mellifera** (The European Honey Bee): High volume honey producers, larger colony structures, thrives in **Langstroth Standard 10, 20, or 30 Frame boxes**.

### Essential Equipment Checklist
Before ordering your bees, assemble the following essentials:
- **Veil and suit protective gear**: A high-density linen suit is crucial for confidence during your first checks.
- **Directional Smoker**: Calms bees instantly by trigger-signalling standard tree fire instincts.
- **Stainless Hive Tool**: Use this pry bar to leverage frames stuck with natural propolis.
- **Pure Beeswax Foundation Sheets**: Saves bee energy by giving them pre-formed guide cells.

### Location is Key
Position your hive boxes in a semi-shaded area with morning sunlight, facing east or south-east. Ensure a clean source of water is nearby and plentiful floral forage is within a 1.5km flight radius. Care for your bees, and they will care for you and the planet!`,
    coverImage: 'https://lh3.googleusercontent.com/d/1nqWzElq-sCgHDYCC5zprA9SMTmfXbh0A',
    author: 'Yogesh Dawkhar',
    date: 'June 05, 2026',
    readTime: '6 mins read',
    tags: ['Beekeeping Guides', 'Sustainable Agriculture'],
    commentsCount: 12
  },
  {
    id: 'b2',
    title: 'Pollinator Conservation: Saving Our Ecosystem',
    excerpt: 'Explore how simple organic farming practices and community garden hives play a direct role in maintaining global plant biodiversity.',
    content: `With honey bees performing a substantial chunk of pollination work, their health is linked directly to human survival. Pesticide overuse and deforestation have drastically reduced wild bee swarms. By setting up observation hives or chemical-free apiaries, we actively contribute to maintaining rich global plant biodiversity.

### The Power of Pollinators
Bees and insects transfer pollen grains between flowers, fertilizing plants to yield fruits, nuts, grains, and vegetables. Without pollinators, our diet would be restricted to wind-pollinated crops like rice and wheat, erasing vibrant colors, vitamins, and critical nutrition from humanity's plates.

### Actions You Can Take Today
1. **Plant Bee-Friendly Gardens**: Choose native blooming flowers like marigold, mustard, neem, and sweet basil.
2. **Setup Urban Backyard Hives**: Start with a gentle 8-frame colony using native Cerena Indica bees to support city tree pollination.
3. **Transition to Bio-Organic Pest Control**: Avoid synthetic chemicals. Use neem-oil sprays or garlic-pepper deterrents that keep bees safe.

DTC operates on the foundational motto: **"Care for Planet and People"**. Every box checked, and every community apiary planted is another small victory for our climate.`,
    coverImage: 'https://lh3.googleusercontent.com/d/1Is1NNKrZ9g-K07WsQ0slAtEQpBpbH6Vd',
    author: 'Yogesh Dawkhar',
    date: 'May 18, 2026',
    readTime: '4 mins read',
    tags: ['Pollinator Conservation', 'Bee Farming'],
    commentsCount: 8
  }
];
