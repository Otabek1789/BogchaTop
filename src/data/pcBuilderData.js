// NexusGaming - PC Builder Components & Benchmarks

export const pcBuilderCategories = [
  { id: 'cpu', name: 'Protsessor (CPU)', icon: 'Cpu', required: true },
  { id: 'gpu', name: 'Videokarta (GPU)', icon: 'Monitor', required: true },
  { id: 'motherboard', name: 'Ona plata (Motherboard)', icon: 'Layers', required: true },
  { id: 'ram', name: 'Operativ xotira (RAM)', icon: 'Server', required: true },
  { id: 'storage', name: 'SSD Disk (Storage)', icon: 'HardDrive', required: true },
  { id: 'cooler', name: 'Sovutish tizimi (Cooler)', icon: 'Wind', required: true },
  { id: 'psu', name: 'Quvvat bloki (PSU)', icon: 'Zap', required: true },
  { id: 'case', name: 'Korpus (Gaming Case)', icon: 'Box', required: true }
];

export const pcComponents = {
  cpu: [
    {
      id: 'cpu-1',
      name: 'AMD Ryzen 7 7800X3D (4.2GHz - 5.0GHz)',
      brand: 'AMD',
      price: 5400000,
      socket: 'AM5',
      tdp: 120,
      cores: '8 yadro / 16 oqim',
      cache: '104MB 3D V-Cache',
      perfScore: 98,
      badge: 'GEYMERLAR TANLOVI #1',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80',
      description: 'Dunyoning eng yaxshi o\'yin protsessori. Katta 3D V-Cache xotirasi tufayli CS2 va shooterlarda eng yuqori FPS beradi.'
    },
    {
      id: 'cpu-2',
      name: 'Intel Core i9-14900K (6.0GHz Boost)',
      brand: 'Intel',
      price: 7800000,
      socket: 'LGA1700',
      tdp: 253,
      cores: '24 yadro (8P + 16E) / 32 oqim',
      cache: '36MB Intel Smart Cache',
      perfScore: 100,
      badge: 'FLAGSHIP MONSTER',
      image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&auto=format&fit=crop&q=80',
      description: 'O\'ta yuqori 6.0 GHz chastotali monster protsessor. O\'yinlar, 4K rendering va striming uchun eng qudratli yechim.'
    },
    {
      id: 'cpu-3',
      name: 'Intel Core i7-14700K (5.6GHz Boost)',
      brand: 'Intel',
      price: 5600000,
      socket: 'LGA1700',
      tdp: 220,
      cores: '20 yadro (8P + 12E) / 28 oqim',
      cache: '33MB Cache',
      perfScore: 92,
      badge: 'TOP BALANS',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80',
      description: 'Narx va unumdorlikning eng mukammal mutanosibligi. Har qanday zamonaviy videokartani to\'liq quvvatda ochib beradi.'
    },
    {
      id: 'cpu-4',
      name: 'AMD Ryzen 5 7600X (4.7GHz - 5.3GHz)',
      brand: 'AMD',
      price: 2900000,
      socket: 'AM5',
      tdp: 105,
      cores: '6 yadro / 12 oqim',
      cache: '38MB Cache',
      perfScore: 78,
      badge: 'OPTIMAL BYUDJET',
      image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&auto=format&fit=crop&q=80',
      description: 'Arzon byudjetda 2K gaming va eSports o\'yinlar uchun ajoyib Zen 4 protsessori.'
    }
  ],

  gpu: [
    {
      id: 'gpu-1',
      name: 'NVIDIA GeForce RTX 4090 24GB ASUS ROG Strix OC',
      brand: 'NVIDIA / ASUS',
      price: 28500000,
      tdp: 450,
      vram: '24GB GDDR6X',
      perfScore: 100,
      badge: 'DUNYONING ENG KUCHLISI',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80',
      description: 'Haqiqiy 4K Ultra Ray Tracing chempioni. DLSS 3.5 va Frame Generation bilan istalgan o\'yinda 120+ FPS kafolatlangan.'
    },
    {
      id: 'gpu-2',
      name: 'NVIDIA GeForce RTX 4080 Super 16GB MSI Gaming X Slim',
      brand: 'NVIDIA / MSI',
      price: 16800000,
      tdp: 320,
      vram: '16GB GDDR6X',
      perfScore: 88,
      badge: 'TOP 4K GAMING',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      description: '4K rezolyutsiyada mukammal silliq geympley va maksimal nurlar izlanishi (Full Ray Tracing).'
    },
    {
      id: 'gpu-3',
      name: 'NVIDIA GeForce RTX 4070 Ti Super 16GB Gigabyte Gaming OC',
      brand: 'NVIDIA / Gigabyte',
      price: 12500000,
      tdp: 285,
      vram: '16GB GDDR6X',
      perfScore: 78,
      badge: '2K 240FPS TAVSIYA',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80',
      description: 'Kiber-sportchilar va 1440p yuqori kadrli o\'yinlar uchun eng mashhur videokarta.'
    },
    {
      id: 'gpu-4',
      name: 'AMD Radeon RX 7900 XTX 24GB Sapphire Nitro+',
      brand: 'AMD / Sapphire',
      price: 15200000,
      tdp: 355,
      vram: '24GB GDDR6',
      perfScore: 86,
      badge: '24GB MEGA VRAM',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      description: 'Katta hajmdagi 24GB video xotira, DisplayPort 2.1 va toza raster grafikada aqlbovar qilmas tezlik.'
    },
    {
      id: 'gpu-5',
      name: 'NVIDIA GeForce RTX 4060 Ti 16GB Palit JetStream',
      brand: 'NVIDIA / Palit',
      price: 6400000,
      tdp: 165,
      vram: '16GB GDDR6',
      perfScore: 56,
      badge: 'BYUDJET CHEMPIONI',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80',
      description: '1080p va 1440p o\'yinlar uchun 16GB katta xotirali hamyonbop DLSS 3 qo\'llab-quvvatlovchi karta.'
    }
  ],

  motherboard: [
    {
      id: 'mb-1',
      name: 'ASUS ROG Maximus Z790 Dark Hero',
      brand: 'ASUS ROG',
      price: 7900000,
      socket: 'LGA1700',
      ramType: 'DDR5',
      tdp: 45,
      badge: 'PREMIUM OVERCLOCK',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      description: 'Intel 13/14-avlod uchun eng yuqori darajadagi flagman ona plata. PCIe 5.0, WiFi 7 va 20+1 fazali quvvat zanjiri.'
    },
    {
      id: 'mb-2',
      name: 'MSI MAG B650 Tomahawk WiFi',
      brand: 'MSI',
      price: 3200000,
      socket: 'AM5',
      ramType: 'DDR5',
      tdp: 35,
      badge: 'ENG MASHHUR AM5',
      image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&auto=format&fit=crop&q=80',
      description: 'AMD Ryzen 7000/8000 seriyalari uchun sovuq radiatorlar, kuchli quvvat tizimi va barqaror WiFi 6E.'
    },
    {
      id: 'mb-3',
      name: 'ASUS TUF Gaming B760-PLUS WiFi DDR5',
      brand: 'ASUS TUF',
      price: 2650000,
      socket: 'LGA1700',
      ramType: 'DDR5',
      tdp: 30,
      badge: 'ISHLAB CHIQARUVCHI TANLOVI',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      description: 'Harbiy darajadagi mustahkam komponentlar, Intel 14-avlod bilan to\'liq muvofiqlik.'
    },
    {
      id: 'mb-4',
      name: 'GIGABYTE X670E AORUS Master AM5',
      brand: 'Gigabyte',
      price: 6800000,
      socket: 'AM5',
      ramType: 'DDR5',
      tdp: 45,
      badge: 'AM5 TOP TIER',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      description: 'PCIe 5.0 M.2 va GPU slotlari, 4 ta M.2 disk uyasi va ekstremal sovitish radiatorlari.'
    }
  ],

  ram: [
    {
      id: 'ram-1',
      name: 'Corsair Dominator Titanium 32GB (2x16GB) DDR5 6000MHz RGB',
      brand: 'Corsair',
      price: 2450000,
      capacity: '32GB (2x16GB)',
      speed: '6000 MHz CL30',
      tdp: 15,
      badge: 'ELITA XOTIRA',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&auto=format&fit=crop&q=80',
      description: 'Eksklyuziv alyuminiy korpus, yuqori tezlik va iCUE RGB yoritgich.'
    },
    {
      id: 'ram-2',
      name: 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5 6400MHz',
      brand: 'G.Skill',
      price: 3900000,
      capacity: '64GB (2x32GB)',
      speed: '6400 MHz CL32',
      tdp: 20,
      badge: 'MAX SUSPENSION',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&auto=format&fit=crop&q=80',
      description: 'Katta hajmli 64GB xotira, 4K video montaj va og\'ir o\'yinlarni bir vaqtda ochish uchun mo\'ljallangan.'
    },
    {
      id: 'ram-3',
      name: 'Kingston Fury Beast RGB 32GB (2x16GB) DDR5 5600MHz',
      brand: 'Kingston',
      price: 1650000,
      capacity: '32GB (2x16GB)',
      speed: '5600 MHz CL36',
      tdp: 15,
      badge: 'ENG KO\'P SOTILGAN',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&auto=format&fit=crop&q=80',
      description: 'Ishonchli va chiroyli RGB yoritishga ega barqaror operativ xotira.'
    }
  ],

  storage: [
    {
      id: 'ssd-1',
      name: 'Samsung 990 PRO 2TB NVMe M.2 Gen4 (7450 MB/s)',
      brand: 'Samsung',
      price: 2550000,
      capacity: '2TB',
      speed: '7450 MB/s Read / 6900 MB/s Write',
      tdp: 10,
      badge: 'CHINIKKAN TEZLIK',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80',
      description: 'O\'yinlar soniyalarda yuklanadi. Eng ishonchli Samsung V-NAND xotira chiplari.'
    },
    {
      id: 'ssd-2',
      name: 'Kingston KC3000 1TB NVMe M.2 Gen4 (7000 MB/s)',
      brand: 'Kingston',
      price: 1350000,
      capacity: '1TB',
      speed: '7000 MB/s Read / 6000 MB/s Write',
      tdp: 8,
      badge: 'TEZKOR VA ARZON',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80',
      description: 'Geymerlar uchun yetarli hajm va ajoyib 7000 MB/s tezlik.'
    },
    {
      id: 'ssd-3',
      name: 'Crucial T700 2TB PCIe Gen5 (12400 MB/s)',
      brand: 'Crucial',
      price: 4100000,
      capacity: '2TB',
      speed: '12400 MB/s Read / 11800 MB/s Write',
      tdp: 12,
      badge: 'GEN5 KOSMIK TEZLIK',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80',
      description: 'Beshinchi avlod PCIe Gen5. Hozirgi kunda mavjud eng tezkor drayver.'
    }
  ],

  cooler: [
    {
      id: 'cooler-1',
      name: 'NZXT Kraken Elite 360 RGB LCD Suyuqlik Sovutgich',
      brand: 'NZXT',
      price: 3650000,
      type: 'AIO 360mm Suyuqlik',
      tdp: 25,
      badge: 'LCD DISPLEYLI TOP',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&auto=format&fit=crop&q=80',
      description: 'Nasos ustidagi 2.36 dyuymli LCD ekranga xohlagan GIF yoki haroratni chiqarish mumkin. 360mm radiator eng issiq protsessorni ham muzdek ushlaydi.'
    },
    {
      id: 'cooler-2',
      name: 'DeepCool LT720 360mm High-Performance AIO',
      brand: 'DeepCool',
      price: 1850000,
      type: 'AIO 360mm Suyuqlik',
      tdp: 20,
      badge: 'TOP SOVUTISH',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&auto=format&fit=crop&q=80',
      description: '300W+ issiqlikni oson tarqatuvchi kuchli nasos va cheksiz oyna (Infinity Mirror) dizayni.'
    },
    {
      id: 'cooler-3',
      name: 'DeepCool AK620 Digital Havo Sovutgichi',
      brand: 'DeepCool',
      price: 950000,
      type: 'Ikki qavatli Havo minora',
      tdp: 10,
      badge: 'ENG ISHONCHLI HAVO',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&auto=format&fit=crop&q=80',
      description: 'Haqiqiy raqamli harorat ko\'rsatkichi bilan jihozlangan shovqinsiz havo sovutgichi.'
    }
  ],

  psu: [
    {
      id: 'psu-1',
      name: 'Corsair RM1000x 1000W 80+ Gold To\'liq Modulli',
      brand: 'Corsair',
      price: 2750000,
      wattage: 1000,
      rating: '80 PLUS Gold',
      badge: 'RTX 4090 UCHUN SHART',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80',
      description: 'Yapon kondensatorlari, 10 yil rasmiy kafolat, PCIe 5.0 12VHPWR kabeli bilan jihozlangan.'
    },
    {
      id: 'psu-2',
      name: 'Seasonic Focus GX-850 850W 80+ Gold',
      brand: 'Seasonic',
      price: 2150000,
      wattage: 850,
      rating: '80 PLUS Gold',
      badge: 'LEGENDAR SIFAT',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80',
      description: 'Dunyodagi eng ishonchli quvvat bloki brendi. Jim va tejamkor.'
    },
    {
      id: 'psu-3',
      name: 'DeepCool PQ750M 750W 80+ Gold Modulli',
      brand: 'DeepCool',
      price: 1350000,
      wattage: 750,
      rating: '80 PLUS Gold',
      badge: 'BYUDJET 750W',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80',
      description: 'RTX 4070 / 4070 Ti tizimlari uchun to\'liq yetarli sifatli quvvat manbai.'
    }
  ],

  case: [
    {
      id: 'case-1',
      name: 'Lian Li O11 Dynamic EVO RGB Akvarium Korpus',
      brand: 'Lian Li',
      price: 2850000,
      type: 'Dual-Chamber Mid Tower',
      badge: 'SHOWCASE AKVARIUM',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&auto=format&fit=crop&q=80',
      description: 'Panoramali shisha panellar, o\'rnatilgan RGB chiziqlar va ajoyib havo aylanishi.'
    },
    {
      id: 'case-2',
      name: 'NZXT H9 Flow Dual-Chamber Tempered Glass',
      brand: 'NZXT',
      price: 2600000,
      type: 'Dual-Chamber High Airflow',
      badge: 'MINIMALIST SHOH',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&auto=format&fit=crop&q=80',
      description: 'Ustunlarsiz shisha burchak, 10 tagacha kuler o\'rnatish imkoniyati.'
    },
    {
      id: 'case-3',
      name: 'Montech King 95 Pro Curved Glass (6 ta ARGB kuler)',
      brand: 'Montech',
      price: 1950000,
      type: 'Curved Tempered Glass',
      badge: 'TOP SOVRINLI QIYMAT',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&auto=format&fit=crop&q=80',
      description: 'Egilgan panoramik oyna va jamlanmada 6 ta yoritgichli ARGB kulerlar bilan keladi.'
    }
  ]
};

// Benchmark FPS estimation algorithm based on selected CPU & GPU
export function calculateBenchmarkFPS(cpu, gpu) {
  const cpuScore = cpu ? cpu.perfScore : 40;
  const gpuScore = gpu ? gpu.perfScore : 30;

  // Composite gaming index (0 to 100)
  const powerIndex = (gpuScore * 0.7) + (cpuScore * 0.3);

  // FPS calculations across iconic games
  const cs2 = Math.round(180 + (powerIndex * 3.8)); // 220 to 560 FPS
  const cyberpunk4k = Math.round(25 + (powerIndex * 0.95)); // 30 to 120 FPS Ray Tracing
  const gtaV4k = Math.round(55 + (powerIndex * 1.3)); // 70 to 185 FPS
  const dota2 = Math.round(150 + (powerIndex * 2.5)); // 180 to 400 FPS

  return {
    powerIndex: Math.round(powerIndex),
    cs2,
    cyberpunk4k,
    gtaV4k,
    dota2,
    verdict: powerIndex >= 90 ? 'ULTRA 4K MONSTER 🚀' : powerIndex >= 75 ? '2K 240FPS COMPETITIVE ⚡' : 'SMOOTH 1080P GAMING 🎮'
  };
}
