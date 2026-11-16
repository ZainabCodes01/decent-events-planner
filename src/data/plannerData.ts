export type ShowcaseCategory =
  | 'All'
  | 'Baraat & Walima'
  | 'Nikkah & Mehndi'
  | 'Gala & Qawwali'
  | 'Interior & Doors';

export type MoodThemeId = 'emerald' | 'burgundy' | 'midnight' | 'ivory';

export interface MoodThemeOption {
  id: MoodThemeId;
  name: string;
  subtitle: string;
  primary: string;
  accent: string;
  canvas: string;
  swatches: string[];
}

export interface ShowcaseProject {
  id: string;
  title: string;
  category: Exclude<ShowcaseCategory, 'All'>;
  location: string;
  year: string;
  scale: string;
  image: string;
  summary: string;
  trend2026: string;
  materials: string[];
  palette: { name: string; hex: string }[];
  featured?: boolean;
}

export interface InteractiveHotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  label: string;
  detail: string;
  material: string;
  addonPrice: string;
}

export interface StudioScene {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  hotspots: InteractiveHotspot[];
}

export interface ServiceItem {
  number: string;
  id: string;
  title: string;
  tagline: string;
  description: string;
  trendNote: string;
  deliverables: string[];
  turnaround: string;
  startingEstimate: string;
}

export interface ClientReview {
  id: string;
  name: string;
  role: string;
  city: string;
  service: string;
  rating: number;
  date: string;
  quote: string;
  outcome: string;
}

export const BUSINESS_INFO = {
  name: 'Decent Events Planner',
  category: 'Interior Designer & Event Architect',
  hours: 'Open 24 Hours',
  phoneDisplay: '0309 5908032',
  phoneHref: 'tel:+923095908032',
  whatsappNumber: '923095908032',
  whatsappBase: 'https://wa.me/923095908032',
  address: 'Pusrur by pass, near Alrazzaq Marquee, Sialkot, Lahore, 51480',
  serviceArea: 'Serves Lahore, Sialkot, Pasrur & nearby areas',
  mapsQueryUrl:
    'https://www.google.com/maps/search/?api=1&query=Pusrur+by+pass+near+Alrazzaq+Marquee+Sialkot+51480',
};

export const MOOD_THEMES: MoodThemeOption[] = [
  {
    id: 'emerald',
    name: 'Royal Emerald & Champagne',
    subtitle: 'Signature 2026 Baraat & Marquee Palette',
    primary: '#0C231E',
    accent: '#DFBA6F',
    canvas: '#F7F4EE',
    swatches: ['#0C231E', '#173B33', '#DFBA6F', '#F7F4EE'],
  },
  {
    id: 'burgundy',
    name: 'Velvet Burgundy & Brass',
    subtitle: 'Qawwali Nights & Heritage Mehndi',
    primary: '#2D0F18',
    accent: '#E6C37A',
    canvas: '#F8F4F2',
    swatches: ['#2D0F18', '#5E1E30', '#E6C37A', '#F8F4F2'],
  },
  {
    id: 'midnight',
    name: 'Midnight Sapphire & Pearl',
    subtitle: 'Glasshouse Walima & Corporate Gala',
    primary: '#10192B',
    accent: '#E0BE78',
    canvas: '#F4F6F9',
    swatches: ['#10192B', '#233554', '#E0BE78', '#F4F6F9'],
  },
  {
    id: 'ivory',
    name: 'Alabaster Silk & Walnut',
    subtitle: 'Golden Hour Nikkah & Home Staging',
    primary: '#27221D',
    accent: '#D8B268',
    canvas: '#FAF8F4',
    swatches: ['#27221D', '#6C543E', '#D8B268', '#FAF8F4'],
  },
];

export const HERO_REEL_ITEMS = [
  {
    id: 'baraat-tunnel',
    title: 'Royal Emerald & Crystal Baraat Tunnel',
    subtitle: 'Alrazzaq Marquee & Lahore Grand Halls · 2026 Signature',
    image: '/src/assets/images/event_baraat_tunnel_2026_1794841609005.jpg',
    projectId: 'baraat-crystal-tunnel',
  },
  {
    id: 'nikkah-pergola',
    title: 'Golden Hour Glass & Organza Nikkah',
    subtitle: 'Mirrored Reflection Aisle & Pearl Florals · Daytime Trend',
    image: '/src/assets/images/event_nikkah_pergola_2026_1794841609472.jpg',
    projectId: 'nikkah-glass-pergola',
  },
  {
    id: 'qawwali-night',
    title: 'Sunken Courtyard Qawwali & Mehndi Majlis',
    subtitle: 'Pierced Brass Lanterns & Velvet Bolsters · Evening Trend',
    image: '/src/assets/images/event_qawwali_night_2026_1794841611355.jpg',
    projectId: 'qawwali-majlis-night',
  },
  {
    id: 'serpentine-gala',
    title: 'Emerald Serpentine Banquet Marquee',
    subtitle: 'Curved Dining Geometry & Calla Lily Sculptures · 2026 Gala',
    image: '/src/assets/images/event_serpentine_gala_2026_1794841611504.jpg',
    projectId: 'serpentine-emerald-gala',
  },
];

export const STUDIO_SCENES: StudioScene[] = [
  {
    id: 'scene-baraat',
    title: '2026 Royal Baraat Stage & Floral Tunnel',
    category: 'Marquee Interior Design',
    image: '/src/assets/images/event_baraat_tunnel_2026_1794841609005.jpg',
    description:
      'Click any architectural pin on the marquee design to inspect materials, lighting temperature, and add-on pricing.',
    hotspots: [
      {
        id: 'hs-tunnel',
        x: 24,
        y: 44,
        label: 'Arched Rose & Crystal Entry Tunnel',
        detail:
          'Dense ivory rose framing with concealed structural steel arch and warm uplighting along a velvet carpet.',
        material: 'Fresh Ivory Roses + Crystal Drops',
        addonPrice: 'PKR 145,000',
      },
      {
        id: 'hs-chandelier',
        x: 62,
        y: 18,
        label: 'Cascading Tiered Chandelier Canopy',
        detail:
          'Multi-level crystal chandeliers paired with emerald silk ceiling swags and warm 2700K pin spots.',
        material: 'K9 Crystal + Emerald Silk Draping',
        addonPrice: 'PKR 120,000',
      },
      {
        id: 'hs-stage',
        x: 73,
        y: 62,
        label: 'Emerald Velvet Sofa & Mirrored Dais',
        detail:
          'Deep jewel-toned velvet seating elevated on a dark reflective acrylic and brass-trimmed stage.',
        material: 'Royal Emerald Velvet + Mirror Platform',
        addonPrice: 'PKR 165,000',
      },
    ],
  },
  {
    id: 'scene-nikkah',
    title: '2026 Golden Hour Nikkah Pergola',
    category: 'Outdoor & Lawn Staging',
    image: '/src/assets/images/event_nikkah_pergola_2026_1794841609472.jpg',
    description:
      'Explore the trending minimalist glass-roof pergola, asymmetrical botanical arch, and mirrored reflection aisle.',
    hotspots: [
      {
        id: 'hs-pergola',
        x: 42,
        y: 26,
        label: 'Asymmetrical Rose & Brass Pergola',
        detail:
          'Brushed brass frame topped with clear acrylic sky roof and flowing pearl organza drapery.',
        material: 'Brushed Brass + Pearl Organza',
        addonPrice: 'PKR 135,000',
      },
      {
        id: 'hs-aisle',
        x: 50,
        y: 78,
        label: 'Mirrored Sky-Reflection Walkway',
        detail:
          'Tempered mirror walkway flanked by white delphinium clusters and hurricane pillar candles.',
        material: 'Reflective Acrylic + Glass Hurricanes',
        addonPrice: 'PKR 85,000',
      },
      {
        id: 'hs-seating',
        x: 16,
        y: 68,
        label: 'Sculptural Ivory Guest Lounge Chairs',
        detail:
          'Tailored cream linen seating with gold tapered legs arranged in intimate semi-circular sightlines.',
        material: 'Ivory Linen + Gold Steel Frame',
        addonPrice: 'PKR 1,400 / Guest',
      },
    ],
  },
  {
    id: 'scene-gala',
    title: '2026 Serpentine Emerald Marquee Dining',
    category: 'VIP Reception & Gala',
    image: '/src/assets/images/event_serpentine_gala_2026_1794841611504.jpg',
    description:
      'Curved communal banquet tables replacing traditional round tables, illuminated by linear warm timber ribs.',
    hotspots: [
      {
        id: 'hs-ribs',
        x: 48,
        y: 16,
        label: 'Linear Warm Cove Timber Arches',
        detail:
          'Recessed warm LED strips integrated along curved wooden marquee ribs for clean architectural rhythm.',
        material: '2700K Diffused LED + Teak Ribs',
        addonPrice: 'PKR 110,000',
      },
      {
        id: 'hs-table',
        x: 46,
        y: 72,
        label: 'S-Curved Serpentine Emerald Table',
        detail:
          'Custom modular curved dining deck dressed in matte emerald velvet cloth with brushed gold flatware.',
        material: 'Emerald Velvet Linen + Brass Vases',
        addonPrice: 'PKR 190,000',
      },
      {
        id: 'hs-florals',
        x: 50,
        y: 50,
        label: 'Minimalist Calla Lily & Amber Tapers',
        detail:
          'High-neck brass vessels filled with pure white calla lilies alternated with tall amber glass candles.',
        material: 'White Calla Lilies + Amber Glass',
        addonPrice: 'PKR 75,000',
      },
    ],
  },
];

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'baraat-crystal-tunnel',
    title: 'Royal Emerald & Crystal Baraat Tunnel',
    category: 'Baraat & Walima',
    location: 'Alrazzaq Marquee Corridor, Sialkot',
    year: '2026',
    scale: '950 Guests · Grand Marquee',
    image: '/src/assets/images/event_baraat_tunnel_2026_1794841609005.jpg',
    summary:
      'Dramatic arched ivory rose entry tunnel leading into a jewel-toned emerald and champagne marquee featuring cascading crystal chandeliers and a mirrored bridal stage.',
    trend2026: '2026 Trend: Jewel-Tone Velvet Drapery & Immersive Floral Entry Tunnels',
    materials: [
      'Ivory Garden Roses',
      'K9 Crystal Chandeliers',
      'Royal Emerald Velvet Sofa',
      'Mirrored Stage Dais',
    ],
    palette: [
      { name: 'Royal Emerald', hex: '#0C231E' },
      { name: 'Champagne Gold', hex: '#DFBA6F' },
      { name: 'Ivory Rose', hex: '#FAF8F4' },
      { name: 'Crimson Carpet', hex: '#7A1C1C' },
    ],
    featured: true,
  },
  {
    id: 'nikkah-glass-pergola',
    title: 'Golden Hour Glass & Organza Nikkah',
    category: 'Nikkah & Mehndi',
    location: 'DHA Phase 6, Lahore',
    year: '2026',
    scale: '260 Guests · Private Lawn',
    image: '/src/assets/images/event_nikkah_pergola_2026_1794841609472.jpg',
    summary:
      'Sunlit architectural Nikkah pergola framed in brushed brass and sheer pearl organza with an asymmetrical white rose installation and sky-reflective mirrored walkway.',
    trend2026: '2026 Trend: Daylight Glass Pergolas & Asymmetrical Monochromatic Florals',
    materials: [
      'Brushed Brass Frame',
      'Pearl Organza Drapery',
      'Mirrored Reflection Aisle',
      'Ivory Linen Guest Chairs',
    ],
    palette: [
      { name: 'Pearl Silk', hex: '#FAF8F5' },
      { name: 'Brushed Brass', hex: '#C69C4B' },
      { name: 'Garden Sage', hex: '#4F6346' },
      { name: 'Soft Linen', hex: '#EAE3D6' },
    ],
  },
  {
    id: 'qawwali-majlis-night',
    title: 'Sunken Courtyard Qawwali & Mehndi Majlis',
    category: 'Gala & Qawwali',
    location: 'Cantt Heritage Courtyard, Sialkot',
    year: '2026',
    scale: '380 Guests · Courtyard Majlis',
    image: '/src/assets/images/event_qawwali_night_2026_1794841611355.jpg',
    summary:
      'Intimate twilight Qawwali and Mehndi evening built around low sunken velvet bolster seating, dozens of suspended Moroccan brass lanterns, and deep crimson-marigold florals.',
    trend2026: '2026 Trend: Sunken Velvet Majlis Seating & Overhead Lantern Canopies',
    materials: [
      'Emerald & Burgundy Bolsters',
      'Pierced Brass Lanterns',
      'Warm Fairy Canopy',
      'Crimson & Marigold Plinths',
    ],
    palette: [
      { name: 'Deep Burgundy', hex: '#631D2B' },
      { name: 'Forest Velvet', hex: '#0F3128' },
      { name: 'Lantern Amber', hex: '#E39B35' },
      { name: 'Sandstone', hex: '#C8B092' },
    ],
  },
  {
    id: 'serpentine-emerald-gala',
    title: 'Emerald Serpentine Banquet Marquee',
    category: 'Gala & Qawwali',
    location: 'Gulberg, Lahore',
    year: '2026',
    scale: '500 Guests · Glass & Timber Pavilion',
    image: '/src/assets/images/event_serpentine_gala_2026_1794841611504.jpg',
    summary:
      'Flowing S-curved serpentine banquet tables dressed in deep emerald linen with gold flatware, tall white calla lily cylinders, and warm LED-lit timber arches.',
    trend2026: '2026 Trend: Serpentine Curved Banquet Tables & Warm Architectural Ribs',
    materials: [
      'Modular Serpentine Decks',
      'Matte Emerald Table Linen',
      'Brushed Gold Flatware',
      'Amber Glass Taper Holders',
    ],
    palette: [
      { name: 'Emerald Linen', hex: '#0D3B2E' },
      { name: 'Burnished Gold', hex: '#C89D49' },
      { name: 'Calla White', hex: '#FBFBF9' },
      { name: 'Amber Glow', hex: '#D48A3B' },
    ],
  },
  {
    id: 'alrazzaq-grand-marquee',
    title: 'Alrazzaq Floral Cloud & Marble Walkway',
    category: 'Baraat & Walima',
    location: 'Pusrur Bypass, Sialkot',
    year: '2026',
    scale: '850 Guests · 14,000 sq. ft.',
    image: '/src/assets/images/hero_marquee_grand_1794840913643.jpg',
    summary:
      'Suspended sculptural white floral cloud framed by recessed warm cove lighting, geometric brass stage screens, and a polished nero marble bridal runway.',
    trend2026: '2026 Trend: Suspended Botanical Clouds & Reflective Stone Aisles',
    materials: [
      'Brushed Brass Lattice',
      'Ivory Voile Draping',
      'Reflective Nero Marble Walkway',
      '2700K Cove LEDs',
    ],
    palette: [
      { name: 'Warm Limestone', hex: '#F3EFEA' },
      { name: 'Burnished Brass', hex: '#B58E46' },
      { name: 'Obsidian Stone', hex: '#1B1A18' },
      { name: 'Ivory Blossom', hex: '#FAF8F5' },
    ],
  },
  {
    id: 'sialkot-courtyard-mehndi',
    title: 'Twilight Timber & Marigold Courtyard',
    category: 'Nikkah & Mehndi',
    location: 'Model Town, Sialkot',
    year: '2026',
    scale: '420 Guests · Open Courtyard',
    image: '/src/assets/images/event_mehndi_courtyard_1794840914737.jpg',
    summary:
      'Refined Mehndi pavilion featuring solid walnut-toned arched frames, cascading fresh marigold and jasmine garlands, and warm velvet sofa lounges.',
    trend2026: '2026 Trend: Clean Timber Arches Replacing Neon Mehndi Backdrops',
    materials: [
      'Turned Timber Arches',
      'Fresh Marigold & Jasmine',
      'Velvet Lounge Seating',
      'Pierced Brass Lanterns',
    ],
    palette: [
      { name: 'Saffron Marigold', hex: '#D97706' },
      { name: 'Terracotta Velvet', hex: '#8F3E28' },
      { name: 'Teak Frame', hex: '#5C3A21' },
      { name: 'Jasmine White', hex: '#F9F7F2' },
    ],
  },
  {
    id: 'lahore-glasshouse-walima',
    title: 'Glasshouse Orchid & Mirror Walima',
    category: 'Baraat & Walima',
    location: 'Bedian Road, Lahore',
    year: '2026',
    scale: '600 Guests · Glass Pavilion',
    image: '/src/assets/images/event_walima_reception_1794840915407.jpg',
    summary:
      'Long monolithic stone and mirrored banquet tables styled with cascading white phalaenopsis orchids, crystal taper holders, and soft champagne ceiling swags.',
    trend2026: '2026 Trend: Starlight Glass Pavilions & Cascading White Orchids',
    materials: [
      'Mirrored Banquet Tops',
      'Honed Basalt Tables',
      'Phalaenopsis Orchids',
      'Champagne Silk Swags',
    ],
    palette: [
      { name: 'Champagne Silk', hex: '#E6D8C5' },
      { name: 'Charcoal Stone', hex: '#2D2C2A' },
      { name: 'Orchid White', hex: '#FFFFFF' },
      { name: 'Candle Amber', hex: '#D4A359' },
    ],
  },
  {
    id: 'walnut-brass-door-foyer',
    title: 'Walnut & Brass Inlay Grand Foyer',
    category: 'Interior & Doors',
    location: 'DHA Phase 6, Lahore',
    year: '2026',
    scale: '2 Kanal Residence · Entry & Flooring',
    image: '/src/assets/images/interior_custom_door_living_1794840916344.jpg',
    summary:
      'Custom 10-foot solid walnut double doors inlaid with architectural brass linework, paired with large-format honed travertine flooring and commissioned abstract art.',
    trend2026: '2026 Trend: Architectural Brass-Inlay Doors & Seamless Travertine',
    materials: [
      'Seasoned American Walnut',
      'Brushed Brass Inlay',
      'Honed Travertine Slabs',
      'Commissioned Canvas Art',
    ],
    palette: [
      { name: 'Walnut Grain', hex: '#5A3D2B' },
      { name: 'Honed Travertine', hex: '#E8DFD1' },
      { name: 'Cobalt Accent', hex: '#2B5B84' },
      { name: 'Limewash Plaster', hex: '#F4F1EA' },
    ],
  },
  {
    id: 'cantt-salon-home-staging',
    title: 'Sunlit Herringbone & Travertine Salon',
    category: 'Interior & Doors',
    location: 'Cantt, Sialkot',
    year: '2026',
    scale: '1 Kanal Residence · Full Staging',
    image: '/src/assets/images/interior_home_staging_1794840916846.jpg',
    summary:
      'Full interior decorating and home staging featuring engineered herringbone oak flooring, sculptural bouclé seating, monolithic travertine plinth table, and gallery wall.',
    trend2026: '2026 Trend: Quiet Luxury Tactile Neutrals & Curated Gallery Walls',
    materials: [
      'Herringbone Oak Flooring',
      'Bouclé Upholstery',
      'Solid Travertine Plinth',
      'Artisanal Stoneware',
    ],
    palette: [
      { name: 'Warm Bouclé', hex: '#F2EDE4' },
      { name: 'Natural White Oak', hex: '#C49E71' },
      { name: 'Travertine Cream', hex: '#DFD3C3' },
      { name: 'Bronze Sculpture', hex: '#4A3F35' },
    ],
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    number: '01',
    id: 'marquee-interior-design',
    title: 'Marquee Interior Design',
    tagline: 'Architectural transformation of wedding & corporate marquees',
    description:
      'Complete structural styling inside grand marquees—from acoustic pleated ceiling drapes and suspended botanical installations to custom stage architecture, floral tunnels, and programmable ambient lighting.',
    trendNote:
      '2026 Shift: Moving away from cluttered neon trussing toward jewel-toned velvet swags, warm 2700K linear cove lighting, and sculptural floral clouds.',
    deliverables: [
      'Full 3D spatial layout & seating flow plan',
      'Custom stage backdrop fabrication & brass/wood joinery',
      'Suspended floral & crystal chandelier rigging',
      '24-hour on-site setup supervision across Lahore & Sialkot',
    ],
    turnaround: '7 – 21 Days Pre-Event',
    startingEstimate: 'From PKR 350,000',
  },
  {
    number: '02',
    id: 'interior-decorating',
    title: 'Interior Decorating',
    tagline: 'Cohesive spatial styling for residences, lounges & executive offices',
    description:
      'End-to-end residential and commercial decorating that balances Pakistani hospitality warmth with 2026 architectural restraint—custom furniture layouts, wall finishes, soft furnishings, and lighting layering.',
    trendNote:
      '2026 Shift: Limewash plaster walls, curved low-profile seating, and concealed architectural lighting replacing heavy ornate false ceilings.',
    deliverables: [
      'Room-by-room mood boards & material sample box',
      'Custom furniture & drapery sourcing',
      'Layered task, accent & ambient lighting plan',
      'Final styling & installation walk-through',
    ],
    turnaround: '3 – 6 Weeks',
    startingEstimate: 'From PKR 280,000',
  },
  {
    number: '03',
    id: 'custom-art-selection',
    title: 'Custom Art Selection',
    tagline: 'Curated original canvases, calligraphy & sculptural wall reliefs',
    description:
      'Tailored art sourcing and commissioning calibrated to your room proportions, natural daylight, and surface tones—spanning contemporary abstracts, textured plaster reliefs, and modern Islamic calligraphy.',
    trendNote:
      '2026 Shift: Oversized monochromatic textured canvases and patinated brass wall sculptures placed as single focal anchors rather than busy multi-frame grids.',
    deliverables: [
      'Wall proportion & lighting assessment',
      'Bespoke artist commissioning & palette matching',
      'Museum-grade framing & brass picture lighting',
      'Precision laser-leveled installation',
    ],
    turnaround: '10 – 18 Days',
    startingEstimate: 'From PKR 65,000',
  },
  {
    number: '04',
    id: 'door-design',
    title: 'Door Design',
    tagline: 'Bespoke solid wood, brass-inlay & architectural pivot doors',
    description:
      'Statement entrance and interior doors engineered from seasoned solid walnut, ash, and teak—detailed with brushed brass inlays, fluted millwork, concealed hinges, and architectural hardware.',
    trendNote:
      '2026 Shift: Full-height 9ft to 11ft flush and geometric brass-inlaid double doors that turn thresholds into sculptural focal points.',
    deliverables: [
      'Custom elevation CAD drawings & hardware spec',
      'Seasoned timber selection & moisture treatment',
      'CNC brass inlay & matte hand-rubbed lacquer finish',
      'Precision frame fitting & soft-close hardware',
    ],
    turnaround: '2 – 4 Weeks',
    startingEstimate: 'From PKR 95,000 / Door',
  },
  {
    number: '05',
    id: 'flooring-selection',
    title: 'Flooring Selection',
    tagline: 'Travertine, porcelain slabs, herringbone oak & marble inlays',
    description:
      'Expert material curation and layout planning for luxury flooring across living salons, foyers, and event halls—matching slip resistance, veining direction, and acoustic warmth to your space.',
    trendNote:
      '2026 Shift: Matte honed travertine, seamless large-format porcelain slabs, and warm European herringbone oak replacing high-gloss busy tiles.',
    deliverables: [
      'Subfloor inspection & pattern layout drawing',
      'Direct showroom sampling (marble, porcelain, engineered wood)',
      'Border & brass-strip transition detailing',
      'Grouting color match & sealer specification',
    ],
    turnaround: '1 – 3 Weeks',
    startingEstimate: 'Consultation & Supply Quoted by Sq. Ft.',
  },
  {
    number: '06',
    id: 'home-decor-selection',
    title: 'Home Decor Selection',
    tagline: 'Curated ceramics, brass accents, mirrors & textile layering',
    description:
      'Finishing layers that give a house its soul—hand-thrown ceramic vessels, travertine trays, sculptural table lamps, linen runners, and heirloom-grade console vignettes sourced and placed on site.',
    trendNote:
      '2026 Shift: Fewer, larger artisanal objects with raw stone and ceramic textures instead of cluttered small trinkets.',
    deliverables: [
      'Console, dining & coffee table styling blueprints',
      'Curated sourcing of vessels, mirrors & lighting objects',
      'Seasonal floral & botanical stem arrangements',
      'White-glove on-site placement',
    ],
    turnaround: '4 – 10 Days',
    startingEstimate: 'From PKR 85,000',
  },
  {
    number: '07',
    id: 'home-staging',
    title: 'Home Staging',
    tagline: 'Turnkey residence preparation for weddings, move-ins & property sales',
    description:
      'Rapid, high-impact staging for family homes hosting Baraat/Mayoun gatherings, newly built Kanal residences, or premium real estate listings requiring editorial visual appeal.',
    trendNote:
      '2026 Shift: "Wedding-at-Home" architectural courtyard and drawing-room staging that looks effortless both in person and in 4K cinema reels.',
    deliverables: [
      'Furniture rental or existing piece re-orchestration',
      'Lighting & floral vignette installation',
      'Entryway & facade welcome styling',
      'Rapid setup & post-event strike available 24/7',
    ],
    turnaround: '24 – 72 Hours',
    startingEstimate: 'From PKR 140,000',
  },
];

export const INITIAL_REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    name: 'Hamza & Mahnoor Tariq',
    role: 'Baraat & Walima · 850 Guests',
    city: 'Sialkot (Near Alrazzaq Marquee)',
    service: 'Marquee Interior Design',
    rating: 5,
    date: 'October 2026',
    quote:
      'The emerald velvet stage and ivory rose entry tunnel made our guests feel like they stepped into a royal palace. Their team stayed on-site until 3 AM perfecting every chandelier and table setting.',
    outcome: 'Full 14,000 sq. ft. marquee delivered 6 hours ahead of Baraat arrival.',
  },
  {
    id: 'rev-2',
    name: 'Ayesha Kamran',
    role: 'Homeowner · 2 Kanal Residence',
    city: 'DHA Phase 6, Lahore',
    service: 'Door Design & Flooring Selection',
    rating: 5,
    date: 'September 2026',
    quote:
      'From our 10-foot walnut and brass inlay main doors to the honed travertine slabs and custom living room art, their eye for proportion is unmatched. Everything looks straight out of an architecture magazine.',
    outcome: 'Custom door fabrication & complete ground-floor staging completed in 24 days.',
  },
  {
    id: 'rev-3',
    name: 'Dr. Usman Cheema',
    role: 'Qawwali Night & Home Staging',
    city: 'Cantt, Sialkot',
    service: 'Home Staging',
    rating: 5,
    date: 'August 2026',
    quote:
      'We hosted a sunken courtyard Qawwali night at home on short notice. Because Decent Events Planner operates 24 hours, they installed brass lanterns, velvet bolsters, and floral plinths seamlessly.',
    outcome: '48-hour turnkey home staging & courtyard lighting for 280 family guests.',
  },
];
