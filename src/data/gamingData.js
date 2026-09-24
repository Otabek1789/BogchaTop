// NexusGaming - Gaming Store Mock Data

export const categories = [
  { id: 'all', nameUz: 'Barchasi', nameRu: 'Всe', nameEn: 'All', icon: 'Gamepad2' },
  { id: 'pc_laptops', nameUz: 'Gaming PC & Noutbuklar', nameRu: 'Игровые ПК и Ноутбуки', nameEn: 'Gaming PCs & Laptops', icon: 'Laptop' },
  { id: 'consoles', nameUz: 'Konsollar & Aksessuarlar', nameRu: 'Консоли и Аксессуары', nameEn: 'Consoles & Gear', icon: 'Gamepad' },
  { id: 'peripherals', nameUz: 'Periferiya & Jihozlar', nameRu: 'Периферия', nameEn: 'Peripherals', icon: 'Headphones' },
  { id: 'games', nameUz: 'O\'yinlar & Kalitlar', nameRu: 'Игры и Ключи', nameEn: 'Games & Keys', icon: 'Disc' },
  { id: 'monitors', nameUz: 'Monitorlar & Kreslolar', nameRu: 'Мониторы и Кресла', nameEn: 'Monitors & Chairs', icon: 'Monitor' }
];

export const brands = [
  'Sony PlayStation', 'Microsoft Xbox', 'Nintendo', 'ASUS ROG', 'MSI', 
  'Razer', 'Logitech G', 'SteelSeries', 'HyperX', 'Samsung'
];

export const initialProducts = [
  {
    id: 'prod-1',
    name: 'Sony PlayStation 5 Pro 2TB Digital Edition',
    brand: 'Sony PlayStation',
    category: 'consoles',
    price: 9800000,
    oldPrice: 10900000,
    rating: 4.9,
    reviewsCount: 38,
    stock: 14,
    badge: 'HOT DEAL',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Yangi PlayStation 5 Pro eng so\'nggi PSSR (PlayStation Spectral Super Resolution) sun\'iy intellektli masshtablash, 4K 60/120 FPS qo\'llab-quvvatlash va 2TB SSD xotira bilan jihozlangan. Kuchaytirilgan nurlar izi (Ray Tracing) va DualSense simsiz geympadi bilan unutilmas tajriba bering.',
    specs: {
      'Protsessor': 'Custom 8-core AMD Zen 2, 3.85 GHz',
      'Grafika': 'RDNA GPU (67% tezroq hisoblash)',
      'Xotira': '16GB GDDR6 + 2GB DDR5',
      'Ichki disk': '2TB Ultra-fast NVMe SSD',
      'Rezolyutsiya': '4K @ 120Hz, 8K qo\'llab-quvvatlash',
      'Kafolat': '12 oy rasmiy kafolat'
    },
    featured: true,
    bestseller: true
  },
  {
    id: 'prod-2',
    name: 'ASUS ROG Strix SCAR 18 (2025) RTX 4090',
    brand: 'ASUS ROG',
    category: 'pc_laptops',
    price: 42500000,
    oldPrice: 46000000,
    rating: 5.0,
    reviewsCount: 22,
    stock: 5,
    badge: 'FLAGSHIP',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Eng kuchli flagman gaming noutbuk: Intel Core i9-14900HX protsessor va 175W quvvatdagi NVIDIA GeForce RTX 4090 16GB videokarta. 18 dyuymli 2.5K ROG Nebula HDR Mini LED 240Hz displey har qanday o\'yinda eng yuqori kadrlarni taqdim etadi.',
    specs: {
      'Protsessor': 'Intel Core i9-14900HX (24 yadro)',
      'Videokarta': 'NVIDIA GeForce RTX 4090 16GB GDDR6 (175W)',
      'Operativ xotira': '64GB DDR5 5600MHz',
      'Doimiy xotira': '2TB PCIe 4.0 NVMe M.2 SSD',
      'Ekran': '18" QHD+ 240Hz Mini-LED (1100 nits)',
      'Sovutish tizimi': 'ROG Intelligent Cooling, Tri-Fan'
    },
    featured: true,
    bestseller: true
  },
  {
    id: 'prod-3',
    name: 'Razer Viper V3 Pro Ultra-lightweight Wireless Mouse',
    brand: 'Razer',
    category: 'peripherals',
    price: 1950000,
    oldPrice: 2250000,
    rating: 4.8,
    reviewsCount: 45,
    stock: 28,
    badge: 'ESPORTS',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Dunyo kiber-sportchilarining birinchi raqamli tanlovi. Og\'irligi atigi 54 gramm! Razer Focus Pro 35K 2-avlod optik sensori, haqiqiy 8000Hz HyperPolling tezligi va 95 soatgacha to\'xtovsiz batareya quvvati.',
    specs: {
      'Sensor': 'Focus Pro 35K Optical Sensor Gen-2',
      'Maksimal DPI': '35,000 DPI',
      'Ovoz berish chastotasi': '8000 Hz HyperPolling',
      'Og\'irligi': '54 gramm (Ultra yengil)',
      'Batareya': '95 soat uzluksiz o\'yin',
      'Ulanish': 'Razer HyperSpeed Wireless / USB Type-C'
    },
    featured: true,
    bestseller: false
  },
  {
    id: 'prod-4',
    name: 'Logitech G PRO X 60 LIGHTSPEED Wireless Keyboard',
    brand: 'Logitech G',
    category: 'peripherals',
    price: 2450000,
    oldPrice: 2800000,
    rating: 4.9,
    reviewsCount: 19,
    stock: 12,
    badge: 'NEW',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541140532154-b024d705b909?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Ixcham 60% formatdagi professional optik gaming klaviatura. Keycontrol texnologiyasi har bir tugmaga 15 tagacha amalni biriktirish imkonini beradi. GX Optical Linear svitchlar bilan chaqmoqdek tez javob bering.',
    specs: {
      'Format': '60% Compact Esports layout',
      'Svitchlar': 'GX Optical Linear (Lazer tezligi)',
      'Tugmalar': 'Dual-shot PBT keycaps',
      'Ulanish': 'LIGHTSPEED 2.4GHz / Bluetooth / USB-C',
      'Yoritish': 'LIGHTSYNC RGB (Har bir tugma alohida)',
      'Akkumulyator': '65 soatgacha zaryad saqlash'
    },
    featured: false,
    bestseller: true
  },
  {
    id: 'prod-5',
    name: 'Xbox Series X 1TB Robot White Special Edition',
    brand: 'Microsoft Xbox',
    category: 'consoles',
    price: 7400000,
    oldPrice: 8200000,
    rating: 4.8,
    reviewsCount: 31,
    stock: 9,
    badge: 'EXCLUSIVE',
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Haqiqiy 12 Teraflops quvvatiga ega eng kuchli Xbox konsoli. Xbox Game Pass orqali yuzlab ajoyib o\'yinlar, Quick Resume funksiyasi bilan bir nechta o\'yinlar o\'rtasida soniyalarda almashing.',
    specs: {
      'Protsessor': '8-Core AMD Zen 2 @ 3.8 GHz',
      'Grafika': '12 TFLOPS, 52 CUs @ 1.825 GHz RDNA 2',
      'Xotira': '16GB GDDR6',
      'Ichki xotira': '1TB Custom NVMe SSD',
      'Ovoz': 'Dolby Atmos va Dolby Vision Gaming',
      'Displey': 'Haqiqiy 4K va 120 FPS'
    },
    featured: true,
    bestseller: false
  },
  {
    id: 'prod-6',
    name: 'Samsung Odyssey OLED G9 49" Curved 240Hz Gaming Monitor',
    brand: 'Samsung',
    category: 'monitors',
    price: 18900000,
    oldPrice: 21500000,
    rating: 4.9,
    reviewsCount: 16,
    stock: 4,
    badge: '-12%',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80'
    ],
    description: '49 dyuymli ulkan 32:9 kavisli Dual QHD OLED displey. 0.03ms javob vaqti, 240Hz chastota, Neo Quantum Processor Pro va aqlbovar qilmas chuqur qora ranglar. O\'yin olamiga to\'liq sho\'ng\'ing.',
    specs: {
      'Diagonal': '49 dyuym (1800R egilish)',
      'Ekran paneli': 'QD-OLED (0.03ms GtG)',
      'Chastota': '240Hz yangilanish',
      'Rezolyutsiya': 'Dual QHD (5120 x 1440)',
      'Sinxronizatsiya': 'AMD FreeSync Premium Pro, G-Sync mos keluvchi',
      'Portlar': 'HDMI 2.1, Micro HDMI 2.1, DisplayPort 1.4'
    },
    featured: false,
    bestseller: true
  },
  {
    id: 'prod-7',
    name: 'Black Myth: Wukong (Deluxe Steam Key / License)',
    brand: 'Sony PlayStation',
    category: 'games',
    price: 780000,
    oldPrice: 920000,
    rating: 5.0,
    reviewsCount: 88,
    stock: 99,
    badge: 'GAME OF THE YEAR',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Xitoy mifologiyasiga asoslangan ajoyib Action-RPG o\'yini. Unreal Engine 5 da yaratilgan hayratlanarli grafika, epik janglar va qadimiy afsonaviy qudrat egasi — Maymunlar Qiroli sarguzashtlari.',
    specs: {
      'Janr': 'Action / Souls-like / RPG',
      'Platformalar': 'PC (Steam), PlayStation 5',
      'Ishlab chiqaruvchi': 'Game Science',
      'Tillar': 'Ovoz va subtitrlar (Ko\'p tilli)',
      'Yetkazib berish': 'Instant raqamli litsenziya kaliti'
    },
    featured: true,
    bestseller: true
  },
  {
    id: 'prod-8',
    name: 'SteelSeries Arctis Nova Pro Wireless Headset',
    brand: 'SteelSeries',
    category: 'peripherals',
    price: 4600000,
    oldPrice: 5200000,
    rating: 4.9,
    reviewsCount: 27,
    stock: 15,
    badge: 'HI-RES AUDIO',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Ovoz sifati bo\'yicha dunyodagi eng yaxshi gaming quloqchini. Faol shovqinni to\'sish (Active Noise Cancellation), cheksiz quvvat uchun 2 ta almashtiriladigan akkumulyator va Hi-Res Audio sertifikati.',
    specs: {
      'Drayverlar': '40 mm Neodim magnitlar',
      'Chastota diapazoni': '10 - 40,000 Hz',
      'Shovqinni so\'ndirish': '4-mikrofonli gibrid ANC',
      'Ulanish': 'Simsiz 2.4 GHz + Bluetooth 5.0 (Bir vaqtda)',
      'Batareya': 'Cheksiz (Infinity Power System, 2x batareya)'
    },
    featured: false,
    bestseller: false
  },
  {
    id: 'prod-9',
    name: 'Cyberpunk 2077: Phantom Liberty Edition',
    brand: 'Microsoft Xbox',
    category: 'games',
    price: 590000,
    oldPrice: 720000,
    rating: 4.8,
    reviewsCount: 52,
    stock: 80,
    badge: '-18%',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Night City kiberpank olamiga sayohat qiling. Idris Elba ishtirokidagi josuslik trilleri - Phantom Liberty qo\'shimchasi va to\'liq o\'yin. Ray Tracing Overdrive bilan ajoyib kiberpank tajribasi.',
    specs: {
      'Janr': 'Open World / Cyberpunk / Sci-Fi RPG',
      'Platforma': 'PC, PS5, Xbox Series X',
      'Ishlab chiqaruvchi': 'CD PROJEKT RED',
      'O\'yin hajmi': '70 GB SSD talab qilinadi'
    },
    featured: false,
    bestseller: true
  },
  {
    id: 'prod-10',
    name: 'CyberCore RTX 4090 Ultra Gaming Rig PC',
    brand: 'MSI',
    category: 'pc_laptops',
    price: 49000000,
    oldPrice: 53500000,
    rating: 5.0,
    reviewsCount: 14,
    stock: 3,
    badge: 'BEAST PC',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Kompromissiz kiber-qudrat: AMD Ryzen 9 7950X3D va MSI Suprim X GeForce RTX 4090 24GB. Lian Li Dynamic EVO RGB korpus, to\'liq suv sovutish tizimi va eng yuqori darajadagi yoritish.',
    specs: {
      'Protsessor': 'AMD Ryzen 9 7950X3D (16 yadro, 5.7 GHz)',
      'Videokarta': 'NVIDIA GeForce RTX 4090 24GB GDDR6X',
      'Ona plata': 'MSI MEG X670E ACE Wi-Fi',
      'RAM': '64GB (2x32GB) G.Skill Trident Z5 RGB DDR5 6400MHz',
      'SSD': '4TB Samsung 990 PRO NVMe PCIe 4.0',
      'Blok pitaniya': 'Corsair RM1200x Shift 1200W 80+ Gold'
    },
    featured: true,
    bestseller: true
  },
  {
    id: 'prod-11',
    name: 'Nintendo Switch OLED Model Mario Red Edition',
    brand: 'Nintendo',
    category: 'consoles',
    price: 4300000,
    oldPrice: 4800000,
    rating: 4.8,
    reviewsCount: 33,
    stock: 18,
    badge: 'SPECIAL',
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Yorqin 7 dyuymli OLED ekran bilan jihozlangan portativ o\'yin konsoli. Yo\'lda, uyda televizorda yoki do\'stlar bilan o\'ynang. Sevimli Zelda, Mario va Pokemon o\'yinlari doim siz bilan.',
    specs: {
      'Ekran': '7.0" Multi-Touch OLED (720p)',
      'Ichki xotira': '64GB (MicroSD bilan kengaytiriladi)',
      'Rejimlar': 'TV rejimi, Stol usti rejimi, Qo\'l rejimi',
      'Batareya': '4.5 - 9 soat o\'yin vaqti'
    },
    featured: false,
    bestseller: false
  },
  {
    id: 'prod-12',
    name: 'HyperX Cloud III Wireless Gaming Headset',
    brand: 'HyperX',
    category: 'peripherals',
    price: 1850000,
    oldPrice: 2150000,
    rating: 4.7,
    reviewsCount: 64,
    stock: 25,
    badge: 'POPULAR',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ],
    description: '120 soatgacha bir martalik quvvat bilan ishlovchi afsonaviy HyperX qulayligi. DTS Headphone:X Spatial Audio va yangilangan 10mm mikrofon tiniq aloqa ta\'minlaydi.',
    specs: {
      'Akkumulyator': '120 soatgacha uzluksiz ishlash',
      'Drayver': '53 mm Neodimiy burchakli drayverlar',
      'Ovoz': 'DTS Headphone:X Spatial Audio',
      'Mikrofon': '10mm shovqin bosuvchi ichki pop-filtr bilan'
    },
    featured: false,
    bestseller: true
  }
];

export const initialOrders = [
  {
    id: 'ORD-9842',
    customerName: 'Javohir Toshmatov',
    customerPhone: '+998 90 123 45 67',
    customerEmail: 'javohir@gamer.uz',
    address: 'Toshkent sh., Yunusobod tumani, 14-mavze 25-uy',
    items: [
      { id: 'prod-1', name: 'Sony PlayStation 5 Pro 2TB Digital Edition', price: 9800000, quantity: 1, image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80' },
      { id: 'prod-7', name: 'Black Myth: Wukong (Deluxe Steam Key)', price: 780000, quantity: 1, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80' }
    ],
    totalAmount: 10580000,
    paymentMethod: 'Click',
    paymentStatus: 'Paid',
    status: 'Yetkazilmoqda',
    date: '2025-02-21 14:32',
    notes: 'Kuryer yetib kelganda qo\'ng\'iroq qilsin'
  },
  {
    id: 'ORD-9841',
    customerName: 'Azizbek Rahimov',
    customerPhone: '+998 97 765 43 21',
    customerEmail: 'azizbek_cs2@mail.ru',
    address: 'Samarqand sh., Registon ko\'chasi, 8-uy',
    items: [
      { id: 'prod-3', name: 'Razer Viper V3 Pro Ultra-lightweight Wireless Mouse', price: 1950000, quantity: 1, image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80' },
      { id: 'prod-4', name: 'Logitech G PRO X 60 LIGHTSPEED Wireless Keyboard', price: 2450000, quantity: 1, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80' }
    ],
    totalAmount: 4400000,
    paymentMethod: 'Payme',
    paymentStatus: 'Paid',
    status: 'Bajarildi',
    date: '2025-02-20 18:10',
    notes: 'Tez yetkazib berish iltimos'
  },
  {
    id: 'ORD-9840',
    customerName: 'Shoxrux Mirzayev',
    customerPhone: '+998 93 555 11 22',
    customerEmail: 'shoxrux@cyber.uz',
    address: 'Toshkent sh., Chilonzor 9, 12-uy 44-kvartira',
    items: [
      { id: 'prod-2', name: 'ASUS ROG Strix SCAR 18 (2025) RTX 4090', price: 42500000, quantity: 1, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80' }
    ],
    totalAmount: 42500000,
    paymentMethod: 'Naqd pul (Kuryerga)',
    paymentStatus: 'Pending',
    status: 'Yangi',
    date: '2025-02-22 09:15',
    notes: 'Kafolat qog\'ozini to\'liq rasmiylashtiring'
  }
];

export const salesStats = {
  monthlyRevenue: [
    { month: 'Sentabr', revenue: 68400000, orders: 48 },
    { month: 'Oktabr', revenue: 92100000, orders: 62 },
    { month: 'Noyabr', revenue: 145000000, orders: 94 },
    { month: 'Dekabr', revenue: 230500000, orders: 156 },
    { month: 'Yanvar', revenue: 178000000, orders: 112 },
    { month: 'Fevral', revenue: 215300000, orders: 140 }
  ],
  categoryShare: [
    { name: 'Gaming PC & Noutbuk', value: 45, color: '#00f0ff' },
    { name: 'Konsollar', value: 30, color: '#8b5cf6' },
    { name: 'Periferiya', value: 15, color: '#10b981' },
    { name: 'O\'yinlar & Kalitlar', value: 10, color: '#f59e0b' }
  ]
};
