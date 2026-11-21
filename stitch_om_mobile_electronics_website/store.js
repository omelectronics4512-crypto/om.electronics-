/* =========================================================================
   OM MOBILE & ELECTRONICS (Branch No. 4, Dhanore, Pune)
   Centralized Hybrid Store Engine (Supabase Cloud + LocalStorage Fallback)
   ========================================================================= */

const OM_STORAGE_KEY = 'om_mobile_store_products_v1';
const OM_SUPABASE_CONFIG_KEY = 'om_mobile_supabase_config_v1';

// Default Supabase Cloud credentials (can also be entered dynamically in the Admin UI)
let OM_SUPABASE_CONFIG = {
  url: '', // e.g. 'https://your-project.supabase.co'
  anonKey: '', // e.g. 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  tableName: 'products'
};

// Initial 16 authentic sample products available to the admin for 1-click restore/demo
const OM_SAMPLE_PRODUCTS = [
      // 1. SMARTPHONES
      {
        id: "apple-iphone-15",
        name: "Apple iPhone 15",
        category: "smartphones",
        brand: "Apple",
        price: 69900,
        originalPrice: 79900,
        emiPerMonth: 2912,
        rating: 4.9,
        reviews: 142,
        tag: "Bestseller",
        tagColor: "bg-primary text-white",
        stockStatus: "In Stock at Dhanore & Alandi",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYEN-LXNFg3e1vo-HmSM3AVUBHvKpvE0jPrA7dYRkRnLH5_pVPnYimT2-6B_H0j590Rk-EcWKm3SCabEcnYCctpKWB5OiuMG4efrpePglxrG_nwGYflgo6wUyYjP9jlIMMzF_BI8dA1EtGGHwmDeiCSqbOFckhbpC_wgCzQaap8-3WnbaSMgSQGWq4AGqlX_Srm-D_Mg-F6S4y7k4lssA0wpWZlk0ck_7-nfCnfldwqvGUolNxJidoZw",
        description: "Dynamic Island, 48MP main camera with 2x Telephoto, A16 Bionic chip, USB-C connectivity, and aerospace-grade aluminum chassis.",
        specs: {
          "Display": "6.1-inch Super Retina XDR OLED",
          "Processor": "A16 Bionic chip (6-core CPU)",
          "Camera": "48MP Main + 12MP Ultra Wide",
          "Battery": "All-Day Video Playback (up to 20h)",
          "Storage": "128GB / 256GB / 512GB",
          "Warranty": "1-Year Official Apple India"
        },
        colors: ["Black", "Blue", "Pink", "Green"]
      },
      {
        id: "vivo-v60e-5g",
        name: "vivo V60e 5G (Live Demo Available)",
        category: "smartphones",
        brand: "Vivo",
        price: 28999,
        originalPrice: 33999,
        emiPerMonth: 1208,
        rating: 4.8,
        reviews: 98,
        tag: "In-Store Favorite",
        tagColor: "bg-secondary text-white",
        stockStatus: "In Stock - Sealed Box",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPzk-PqfUBAUuavxLEJDXYSzYdwklNUR4-23N7GYHQmK-qqKtHnm69Df3vo1dIiBKDUerWnZQ_hCm4C0-xpKRG39_2O9b1DXL0JaN6_BKUH5uTjhAwoIwoiwAWmy3ExwhzZV9zC3I51qpcgIFMfLLw6vC1Vo4yuzVxvoCzZj1zqUGRSSL2mXe9LMN6xCHr6ADFD9A3fCv3gOf33oMkMhVHeg-otzK1ovDp9E9AGa4Hm-xnH8-FMThSSg",
        description: "200MP Ultra-sensing portrait camera, AI festival wedding portrait modes, ultra-slim 3D curved 120Hz display, and 5500mAh battery with 80W FlashCharge.",
        specs: {
          "Display": "6.77-inch 120Hz 3D Curved AMOLED",
          "Processor": "MediaTek Dimensity 7300 5G",
          "Camera": "200MP OIS + 8MP Wide + Aura Light",
          "Battery": "5500mAh + 80W FlashCharge",
          "Storage": "8GB RAM + 256GB Storage",
          "Warranty": "1-Year vivo India Official"
        },
        colors: ["Noble Gold", "Elite Purple"]
      },
      {
        id: "samsung-galaxy-s24",
        name: "Samsung Galaxy S24 5G",
        category: "smartphones",
        brand: "Samsung",
        price: 74999,
        originalPrice: 82999,
        emiPerMonth: 3124,
        rating: 4.9,
        reviews: 77,
        tag: "Galaxy AI",
        tagColor: "bg-primary text-white",
        stockStatus: "In Stock at Dhanore",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYEN-LXNFg3e1vo-HmSM3AVUBHvKpvE0jPrA7dYRkRnLH5_pVPnYimT2-6B_H0j590Rk-EcWKm3SCabEcnYCctpKWB5OiuMG4efrpePglxrG_nwGYflgo6wUyYjP9jlIMMzF_BI8dA1EtGGHwmDeiCSqbOFckhbpC_wgCzQaap8-3WnbaSMgSQGWq4AGqlX_Srm-D_Mg-F6S4y7k4lssA0wpWZlk0ck_7-nfCnfldwqvGUolNxJidoZw",
        description: "Galaxy AI Circle to Search, Live Call Translation, Armor Aluminum 2.0 chassis, ProVisual camera engine, and 7 years of OS upgrades.",
        specs: {
          "Display": "6.2-inch Dynamic AMOLED 2X 120Hz",
          "Processor": "Exynos 2400 Deca-Core 4nm",
          "Camera": "50MP Dual Pixel + 12MP Ultra-wide + 10MP Tele",
          "Battery": "4000mAh Super Fast Charging",
          "Storage": "8GB RAM + 256GB Storage",
          "Warranty": "1-Year Samsung India"
        },
        colors: ["Onyx Black", "Marble Gray", "Amber Yellow"]
      },
      {
        id: "oneplus-12r-5g",
        name: "OnePlus 12R 5G",
        category: "smartphones",
        brand: "OnePlus",
        price: 39999,
        originalPrice: 42999,
        emiPerMonth: 1666,
        rating: 4.8,
        reviews: 84,
        tag: "Performance Leader",
        tagColor: "bg-red-600 text-white",
        stockStatus: "In Stock - Ready to Ship",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYEN-LXNFg3e1vo-HmSM3AVUBHvKpvE0jPrA7dYRkRnLH5_pVPnYimT2-6B_H0j590Rk-EcWKm3SCabEcnYCctpKWB5OiuMG4efrpePglxrG_nwGYflgo6wUyYjP9jlIMMzF_BI8dA1EtGGHwmDeiCSqbOFckhbpC_wgCzQaap8-3WnbaSMgSQGWq4AGqlX_Srm-D_Mg-F6S4y7k4lssA0wpWZlk0ck_7-nfCnfldwqvGUolNxJidoZw",
        description: "Qualcomm Snapdragon 8 Gen 2, 4th Gen LTPO 120Hz ProXDR display, largest 5500mAh battery in OnePlus history with 100W SUPERVOOC adapter in box.",
        specs: {
          "Display": "6.78-inch 1.5K LTPO4 AMOLED 120Hz",
          "Processor": "Snapdragon 8 Gen 2 (4nm)",
          "Camera": "50MP Sony IMX890 OIS",
          "Battery": "5500mAh + 100W SUPERVOOC",
          "Storage": "16GB LPDDR5X + 256GB UFS 3.1",
          "Warranty": "1-Year OnePlus India"
        },
        colors: ["Cool Blue", "Iron Gray"]
      },
      {
        id: "redmi-note-13-pro-plus",
        name: "Xiaomi Redmi Note 13 Pro+ 5G",
        category: "smartphones",
        brand: "Xiaomi",
        price: 31999,
        originalPrice: 35999,
        emiPerMonth: 1333,
        rating: 4.7,
        reviews: 62,
        tag: "200MP OIS",
        tagColor: "bg-amber-600 text-white",
        stockStatus: "In Stock at Dhanore",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYEN-LXNFg3e1vo-HmSM3AVUBHvKpvE0jPrA7dYRkRnLH5_pVPnYimT2-6B_H0j590Rk-EcWKm3SCabEcnYCctpKWB5OiuMG4efrpePglxrG_nwGYflgo6wUyYjP9jlIMMzF_BI8dA1EtGGHwmDeiCSqbOFckhbpC_wgCzQaap8-3WnbaSMgSQGWq4AGqlX_Srm-D_Mg-F6S4y7k4lssA0wpWZlk0ck_7-nfCnfldwqvGUolNxJidoZw",
        description: "200MP OIS camera, IP68 water and dust resistance, 3D curved 1.5K 120Hz AMOLED, and blazing 120W HyperCharge.",
        specs: {
          "Display": "6.67-inch 1.5K Curved AMOLED 120Hz",
          "Processor": "MediaTek Dimensity 7200-Ultra",
          "Camera": "200MP ISOCELL HP3 OIS",
          "Battery": "5000mAh + 120W HyperCharge",
          "Storage": "8GB / 256GB",
          "Warranty": "1-Year Xiaomi Official"
        },
        colors: ["Fusion Purple", "Fusion Black", "Fusion White"]
      },

      // 2. LAPTOPS & COMPUTING
      {
        id: "samsung-galaxy-book-ultra",
        name: "Samsung Galaxy Book Pro Ultra Slim",
        category: "laptops",
        brand: "Samsung",
        price: 54990,
        originalPrice: 68990,
        emiPerMonth: 2299,
        rating: 4.9,
        reviews: 43,
        tag: "Free Backpack Kit",
        tagColor: "bg-secondary text-white",
        stockStatus: "In Stock - Sealed Pack",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCf_YrIHDrGiujmWwSVobMfmko3heBjnH-x_lm2EwoTklRzMQAt8LW-kbOIKerjmtFLpucA9LrDN_PahWZl9OsOWZYMw1MQPP1R4_EvZQuUlXAgruvK-wYBq8YMVpOCjNI3SH9hZ1bO9r3SRIAxomhEbqUIx5xiMJqn7tIDNFhFEfkkNhouCd2jGCYwUhX8R74ACQm7uqGm7CPPrKDy8yU5Wu79AfZKmdpdbiHZHbPF5Rf3lgkBbW-A_w",
        description: "Ultra-slim, all-metal lightweight aluminum chassis. Vibrant AMOLED display, long-lasting battery, and seamless Galaxy Phone ecosystem sync.",
        specs: {
          "Display": "15.6-inch Full HD AMOLED Eye-Care",
          "Processor": "Intel Core i5 13th Gen (10-Core)",
          "RAM / Storage": "16GB LPDDR5 + 512GB NVMe SSD",
          "Graphics": "Intel Iris Xe Graphics",
          "Battery": "Up to 16h battery + 65W Type-C",
          "OS": "Windows 11 Home + MS Office 2021"
        },
        colors: ["Mystic Silver", "Mystic Navy"]
      },
      {
        id: "modern-ultrabook-studio",
        name: "Modern Ultrabook Studio 15",
        category: "laptops",
        brand: "HP",
        price: 48500,
        originalPrice: 58000,
        emiPerMonth: 1999,
        rating: 4.8,
        reviews: 51,
        tag: "Student Special",
        tagColor: "bg-primary text-white",
        stockStatus: "In Stock at Dhanore",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4_z5UhnA8N9gTQRyCUUd2RkxCOpjykqCaduY7hcFBSYtCTlUmfy9X4jariuTPjzEna6CPhjz066hycQBgsqwXRulVIMbTRh5ljWMjx8sDlBxr-jlkPCngAkjAl7SNSn4221cpubAtaxhx2mAY-wi2mxQu70ggAP4MaUqt32M8kM3FvU0fmcLDnAU0iHKiJyDpatvgU4Fl1Qlfd-woaZVvwIxL4iGAGGxF01wU5mVcqa_pgmwAxMsinA",
        description: "Dual-screen workflow ready with vibrant high-res anti-glare display. Ideal for coding, college assignments, and multitasking on easy EMI.",
        specs: {
          "Display": "15.6-inch FHD IPS Micro-edge Anti-glare",
          "Processor": "AMD Ryzen 7 5700U (8 Cores, 16 Threads)",
          "RAM / Storage": "16GB DDR4 + 1TB PCIe NVMe SSD",
          "Graphics": "AMD Radeon Graphics",
          "Battery": "Fast Charge (50% in 45 mins)",
          "OS": "Windows 11 Home + MS Office Student"
        },
        colors: ["Natural Silver", "Space Gray"]
      },
      {
        id: "business-developer-edition",
        name: "Business & Developer Edition Laptop",
        category: "laptops",
        brand: "Dell",
        price: 59990,
        originalPrice: 72000,
        emiPerMonth: 2499,
        rating: 4.9,
        reviews: 38,
        tag: "Pro Series",
        tagColor: "bg-tertiary text-white",
        stockStatus: "In Stock - Dhanore Branch",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiO_BCZCgOHIfsYOhhJoqVPrs1YHnxwQppBOdarxxtkEY__B8lm1IJ9H2pO7sCpGWSlcQttEUakyhY91ZBRE1YO5GJtoBQVOBIjFxQhRF2gqpghACuizdEDwj29CMOInURlnwLtaVfiWXVjiabgLr7E2fQS7xR-IvCexmxjHvxvZLax4zjB3uw2e14NxhKRTmA8dJXD3d01oYGyxFSgVYilsNa-HBarERfssCYW7SANKkHwiqfNgaGOQ",
        description: "Precision tactile backlit keyboard and advanced dual-fan thermal cooling designed for extended coding, CAD, and heavy office productivity.",
        specs: {
          "Display": "15.6-inch 120Hz FHD WVA Display",
          "Processor": "Intel Core i7 13th Gen",
          "RAM / Storage": "16GB DDR5 + 512GB NVMe SSD (Expandable)",
          "Graphics": "Intel Iris Xe Graphics",
          "Keyboard": "Backlit Spill-Resistant Deck",
          "Warranty": "1-Year On-Site Dell Brand Warranty"
        },
        colors: ["Carbon Black", "Platinum Silver"]
      },

      // 3. AUDIO & WEARABLES
      {
        id: "boat-wave-aura-watch",
        name: "boAt Wave Aura Smartwatch",
        category: "wearables",
        brand: "boAt",
        price: 1799,
        originalPrice: 4999,
        emiPerMonth: 0,
        rating: 4.7,
        reviews: 210,
        tag: "Bestseller",
        tagColor: "bg-primary text-white",
        stockStatus: "Ready in Stock",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNKzZnp40yfYaRyzsyzfxlq_Ugm48bP6fFR50NK2I6zkXnOYhN5ZRemJnLYqp5mO_7rw4kHh5RbiuTnBPes_NtbX_8_0ctDYRNR5AdDt5I4J7ulCu1Lr77mt7iYA2NwM-h2j7dywh4ibNglUYwXAvv3FmWMeVRuweN0RqHInlEKVdJ4xIxwvnfQfBZiS80H9leOaFP9lJr_qmbBOcov4tmXLRGcB91lY-pF5rrlqPtueHDRbkWQpcO4w",
        description: "1.83-inch HD screen, advanced Bluetooth calling with premium dialpad, 100+ sports modes, 24/7 heart rate & SpO2 tracking.",
        specs: {
          "Display": "1.83\" HD Bright Screen",
          "Calling": "Bluetooth HD Calling & Mic",
          "Battery": "Up to 7 Days Normal Use",
          "Waterproof": "IP68 Sweat & Water Resistance",
          "Warranty": "1-Year boAt Official Warranty"
        },
        colors: ["Active Black", "Cherry Blossom", "Deep Blue"]
      },
      {
        id: "boat-lunar-discovery-watch",
        name: "boAt Lunar Discovery Watch",
        category: "wearables",
        brand: "boAt",
        price: 2499,
        originalPrice: 6499,
        emiPerMonth: 0,
        rating: 4.8,
        reviews: 95,
        tag: "Turn-by-Turn GPS",
        tagColor: "bg-secondary text-white",
        stockStatus: "In Stock at Store",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtd48jNgpJvWDv6Bn7XSE2ZNyBaPl7zzHOTiSHpgvU0jDt2ekxmGfpSZu6ONMUa4CsAqRJb0RLZVz7hfRG_KxtkkbgPmDD4eQ3iVV8AXbcXytztj8jhtTErih4_J4olXxZhKO_Pk8xhVWchuZDj7_-L4StD9YLFXEh1IsFmFQ-IHkO-zYEbdFFsDy7yNuIBEnZYwkvzn_OpskVp2MWgGJjqb7SEACiAsq7Aw7783bfRPrSU4XxQXMXGg",
        description: "Turn-by-turn map navigation alerts on wrist, 1.39-inch HD display, smart health metrics and emergency SOS calling.",
        specs: {
          "Display": "1.39\" Round HD Display",
          "Navigation": "Turn-by-Turn Map Guidance",
          "Calling": "Single-chip BT 5.3 Calling",
          "Battery": "Up to 7 Days Battery Life",
          "Warranty": "1-Year Brand Warranty"
        },
        colors: ["Metallic Black", "Brown Leather", "Sport Silicone"]
      },
      {
        id: "boat-rockerz-480-headphones",
        name: "boAt Rockerz 480 Wireless RGB",
        category: "audio",
        brand: "boAt",
        price: 1999,
        originalPrice: 3999,
        emiPerMonth: 0,
        rating: 4.8,
        reviews: 130,
        tag: "RGB Bass",
        tagColor: "bg-tertiary text-white",
        stockStatus: "Brand Sealed Pack",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqMoQzwUP3sLmwCP2hpOaPXssQh9mttwxNhYbGtp4S66tFLUdX8OskVPeIQ3BgaHxbMob1lM_n7WO_ZcsWUhILqbIwBQ6qoGCJ7o5lbfIwn8Yz52QWejTxKsX4U3RWXl7iPvzskXBQY4AR0KXS3_pB3PQvuXQP9fjkezDzXS0NEJfHIxi61infRm_b1SyN8rNpE3Zzu_HaouAmTImxALcMbC69LcxqZHqGgcQ0_p0fW91-c7ixcIUZyA",
        description: "Dynamic RGB breathing lights, 40mm drivers with boAt Signature Sound, low latency BEAST mode for gaming, and 60 hours massive playback.",
        specs: {
          "Drivers": "40mm Deep Bass Drivers",
          "Playtime": "Up to 60 Hours Nonstop",
          "Lighting": "Breathing RGB LEDs",
          "Fast Charge": "10 min charge = 10 hrs playback",
          "Warranty": "1-Year boAt Official Warranty"
        },
        colors: ["Midnight Black", "Raging Red"]
      },
      {
        id: "oneplus-bullets-z2",
        name: "OnePlus Bullets Wireless Z2",
        category: "audio",
        brand: "OnePlus",
        price: 1699,
        originalPrice: 2299,
        emiPerMonth: 0,
        rating: 4.9,
        reviews: 310,
        tag: "Customer Favorite",
        tagColor: "bg-primary text-white",
        stockStatus: "In Stock - Sealed",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAE6RkaNxHfEkGsG-Zq9kLbdqR6qbFk0tftK4NL91XbIsJXgPzq4_3PYm1RuDkdShalYeGBdDZw1Ww7f5l-opg2KX5ZHJwq8at-BAKKuWQ7nG8Dk3g1Q_du16OiNBLR9RlU0X-SMOuSKQ4G1I_2Aa4hLeGDc1gLfdKvr8pLUqmvZGU4XQc0LRDeIPoXpW097-bak_bTEWc5hMyicA4pb73FY-8Uxc59Iljsqsq59GEMHIlUvxTDUccw2g",
        description: "12.4mm massive bass drivers for bombastic sound, 30 hours battery life, anti-distortion audio tech, and 10 minutes quick charge for 20 hours playback.",
        specs: {
          "Drivers": "12.4mm Bass Drivers",
          "Battery": "30 Hours Total Playback",
          "Fast Charge": "10 Mins = 20 Hours",
          "Water Resistance": "IP55 Sweat & Water Resistant",
          "Warranty": "1-Year OnePlus India"
        },
        colors: ["Magico Black", "Acoustic Red", "Beam Blue"]
      },

      // 4. ACCESSORIES & CHARGERS
      {
        id: "oneplus-80w-supervooc-adapter",
        name: "OnePlus 80W SUPERVOOC Adapter",
        category: "accessories",
        brand: "OnePlus",
        price: 2499,
        originalPrice: 2999,
        emiPerMonth: 0,
        rating: 4.9,
        reviews: 88,
        tag: "Original Accessory",
        tagColor: "bg-primary text-white",
        stockStatus: "In Stock at Dhanore",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAFQ5hDlEU5CA1xB6VcTb315F2D51TbjP6B-kpx5Ezl7CbjCjglfgONVV6eYbnFPZ3DVygfHeENemU5qzQ-2cfGTpkTx4v5kbflnfd9bb6bGe5zQknZRIRm0PWd4JHzKKf0RDMqb45f2YUxvS2HCwBn_VOtBcZ9P_bUzfd9gW1bt6mTdJi9iEX-ABXZG0JicmeHOke2rOCFtdbSjdzz0yoXOtxkNgLBCMxsapS8vZDKmmzQafM_M-kng",
        description: "Official 80W flash power adapter for OnePlus, Oppo and Realme devices. Built-in thermal multi-protection circuits to keep phone cool while charging.",
        specs: {
          "Power": "80W Flash Charge Output",
          "Ports": "USB Type-A with Flash Protocol",
          "Protection": "Overheat, Surge & Short-circuit Guard",
          "Compatibility": "OnePlus 12, 11, Nord, 10 Series",
          "Warranty": "6-Month Brand Sealed Guarantee"
        },
        colors: ["White"]
      },
      {
        id: "boat-energyshroom-powerbank",
        name: "boAt EnergyShroom 20,000mAh Powerbank",
        category: "accessories",
        brand: "boAt",
        price: 1699,
        originalPrice: 3499,
        emiPerMonth: 0,
        rating: 4.8,
        reviews: 145,
        tag: "22.5W Fast Charge",
        tagColor: "bg-tertiary text-white",
        stockStatus: "Ready in Stock",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8UrIpC9PDRRcJuwPjoq9bEElJWwAj5CjtEzmXhtZkzj2o6oSMaBiiRf-8d3gTAcY0tf1x8K8G0uqEIIZOTLVnvJtTLXMCHMivbOGTsIpBrAl9S4e5W4sRmsk85kTWvIW4IwUeBUoRKiTd4qzR0WILQdolwWH8QqkqRn6egsy1tJwVqbKj0CV3RghIJE9E8-7bU8MjA0gRWtd-p1PILIHXsZNEnU9Nki8j6kSMaZuzGlrAv352D7X0ug",
        description: "20,000mAh high-density lithium polymer battery, 22.5W two-way fast charging, triple output ports (charge 3 devices simultaneously), metal casing.",
        specs: {
          "Capacity": "20,000 mAh High-Density",
          "Output": "22.5W Quick Charge 3.0 & PD",
          "Ports": "2x USB-A + 1x Type-C In/Out",
          "Build": "Aluminum Alloy Ergonomic Shell",
          "Warranty": "1-Year boAt Official Warranty"
        },
        colors: ["Carbon Black", "Space Steel"]
      },

      // 5. TV & HOME APPLIANCES
      {
        id: "samsung-55-crystal-4k",
        name: "Samsung 55\" Crystal 4K UHD Smart TV",
        category: "tv-appliances",
        brand: "Samsung",
        price: 44990,
        originalPrice: 62900,
        emiPerMonth: 1874,
        rating: 4.9,
        reviews: 49,
        tag: "4K Cinema",
        tagColor: "bg-primary text-white",
        stockStatus: "Dhanore Display Unit Ready",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUzoaOnkR2uywaR6oAASK8zBgqvFUOPQrzAMzcG0ep-ob1DLIXj9dSUA7npurEyT4gQLTlOeaS8xL57KETI17rCYZIiIOZ7V1yGeUOEF6aQpLb6GM9fmMCjGz6EAK3eD1oe5nrPdH_et49PKfDt_tCP77aLzPqilS6mwVso2Z46TdAR3Vmp5KzoTB78m9euzw1SblMGKyG5mACD-minhbaSzzhP4puq3YkILG4yOnjIhx1xzCQUA5CXQ",
        description: "PurColor crystal display with billion true colors, Q-Symphony sound sync with soundbars, bezel-less design, and pre-loaded Netflix, Prime Video, YouTube.",
        specs: {
          "Screen Size": "55-inch Crystal UHD 4K (3840 x 2160)",
          "Audio": "20W Dolby Digital Plus + OTS Lite",
          "Smart OS": "Tizen Smart TV with Alexa / Bixby",
          "Connectivity": "3x HDMI + 1x USB + eARC + WiFi",
          "Warranty": "1-Year Comprehensive + 1-Yr Additional on Panel"
        },
        colors: ["Titan Gray Bezel"]
      },
      {
        id: "bajaj-bldc-energy-fan",
        name: "Bajaj BLDC Energy-Saving Ceiling Fan",
        category: "tv-appliances",
        brand: "Bajaj",
        price: 3299,
        originalPrice: 4899,
        emiPerMonth: 0,
        rating: 4.7,
        reviews: 64,
        tag: "Save 65% Power",
        tagColor: "bg-secondary text-white",
        stockStatus: "In Stock at Dhanore",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUzoaOnkR2uywaR6oAASK8zBgqvFUOPQrzAMzcG0ep-ob1DLIXj9dSUA7npurEyT4gQLTlOeaS8xL57KETI17rCYZIiIOZ7V1yGeUOEF6aQpLb6GM9fmMCjGz6EAK3eD1oe5nrPdH_et49PKfDt_tCP77aLzPqilS6mwVso2Z46TdAR3Vmp5KzoTB78m9euzw1SblMGKyG5mACD-minhbaSzzhP4puq3YkILG4yOnjIhx1xzCQUA5CXQ",
        description: "Ultra-quiet brushless BLDC motor saves up to 65% electricity on your monthly MSEB bill. Smart RF remote control with timer and boost modes.",
        specs: {
          "Motor": "28W Inverter BLDC Technology",
          "Sweep": "1200 mm High-Airflow Aerodynamic Blades",
          "Control": "Point-Anywhere RF Remote Control",
          "Power Saving": "5-Star BEE Energy Rating",
          "Warranty": "2-Year Bajaj On-Site Guarantee"
        },
        colors: ["Opal White", "Smoke Brown"]
      }
    ];

/* =========================================================================
   SUPABASE CLIENT CONFIGURATION & STATE
   ========================================================================= */
let supabaseClient = null;

function getSupabaseConfig() {
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(OM_SUPABASE_CONFIG_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.url && parsed.anonKey) return parsed;
      }
    }
  } catch (e) {}
  return OM_SUPABASE_CONFIG;
}

function saveSupabaseConfig(cfg) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(OM_SUPABASE_CONFIG_KEY, JSON.stringify(cfg));
    }
    OM_SUPABASE_CONFIG = cfg;
    initSupabaseClient();
    return true;
  } catch (e) {
    console.error('Error saving Supabase config:', e);
    return false;
  }
}

function clearSupabaseConfig() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(OM_SUPABASE_CONFIG_KEY);
    }
    OM_SUPABASE_CONFIG = { url: '', anonKey: '', tableName: 'products' };
    supabaseClient = null;
    return true;
  } catch (e) {
    return false;
  }
}

function initSupabaseClient() {
  const config = getSupabaseConfig();
  if (config.url && config.anonKey && typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
    try {
      supabaseClient = window.supabase.createClient(config.url, config.anonKey);
      return supabaseClient;
    } catch (e) {
      console.warn('Supabase initialization failed:', e);
    }
  }
  supabaseClient = null;
  return null;
}

function isSupabaseConfigured() {
  const config = getSupabaseConfig();
  return Boolean(config.url && config.anonKey && config.url.startsWith('http'));
}

async function testSupabaseConnection(url, anonKey) {
  if (!url || !anonKey) return { ok: false, message: 'Supabase URL and Anon Key are required.' };
  if (typeof window === 'undefined' || !window.supabase) {
    return { ok: false, message: 'Supabase JS library not loaded yet.' };
  }
  try {
    const testClient = window.supabase.createClient(url, anonKey);
    const { data, error } = await testClient.from('products').select('id').limit(1);
    if (error) {
      return { ok: false, message: error.message || 'Failed to query products table' };
    }
    return { ok: true, message: 'Successfully connected to Supabase products table!' };
  } catch (err) {
    return { ok: false, message: err.message || 'Unknown network error' };
  }
}

/* =========================================================================
   DATABASE ROW TO CLIENT PRODUCT CONVERSION
   ========================================================================= */
function dbRowToProduct(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    name: row.name || 'Device',
    category: row.category || 'smartphones',
    brand: row.brand || 'Apple',
    price: Number(row.price) || 0,
    originalPrice: Number(row.original_price != null ? row.original_price : (row.originalPrice != null ? row.originalPrice : row.price)) || 0,
    emiPerMonth: Number(row.emi_per_month != null ? row.emi_per_month : (row.emiPerMonth || 0)) || 0,
    rating: Number(row.rating) || 4.8,
    reviews: Number(row.reviews) || 0,
    tag: row.tag || 'New',
    tagColor: row.tag_color || row.tagColor || 'bg-primary text-white',
    stockStatus: row.stock_status || row.stockStatus || 'In Stock at Dhanore Showroom',
    image: row.image || '',
    description: row.description || '',
    specs: (typeof row.specs === 'object' && row.specs !== null) ? row.specs : {},
    colors: Array.isArray(row.colors) ? row.colors : [],
    createdAt: row.created_at || row.createdAt || new Date().toISOString()
  };
}

function productToDbRow(p) {
  return {
    id: String(p.id),
    name: p.name,
    category: p.category || 'smartphones',
    brand: p.brand || 'Other',
    price: Number(p.price) || 0,
    original_price: Number(p.originalPrice) || Number(p.price) || 0,
    emi_per_month: Number(p.emiPerMonth) || 0,
    rating: Number(p.rating) || 4.8,
    reviews: Number(p.reviews) || 0,
    tag: p.tag || 'New Arrival',
    tag_color: p.tagColor || 'bg-primary text-white',
    stock_status: p.stockStatus || 'In Stock',
    image: p.image || '',
    description: p.description || '',
    specs: p.specs || {},
    colors: Array.isArray(p.colors) ? p.colors : [],
    updated_at: new Date().toISOString()
  };
}


function isApiServerAvailable() {
  return typeof window !== 'undefined' && 
         (window.location.protocol === 'http:' || window.location.protocol === 'https:');
}

/* =========================================================================
   STORE CRUD & SYNC OPERATIONS
   ========================================================================= */

/**
 * Retrieve current active products from localStorage cache.
 * Defaults to [] (empty) until admin adds products or clicks load sample inventory.
 */
function getStoredProducts() {
  try {
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(OM_STORAGE_KEY);
      if (raw !== null) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read from localStorage:', e);
  }
  return [];
}

/**
 * Persist products array to localStorage and notify all open tabs/listeners.
 */
function saveStoredProducts(products, triggerBroadcast = true) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(OM_STORAGE_KEY, JSON.stringify(products));
    }
    if (triggerBroadcast && typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('om_products_changed', { detail: { count: products.length } }));
    }
  } catch (e) {
    console.error('Failed to save products to localStorage:', e);
  }
}

/**
 * Fetch from cloud asynchronously (SWR - Stale-While-Revalidate pattern).
 * If Supabase is connected, it updates the local cache and returns fresh data.
 */
async function fetchStoreProductsAsync() {
  if (isApiServerAvailable()) {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          saveStoredProducts(data, true);
          return data;
        }
      }
    } catch (e) {
      console.warn('API server fetch error, falling back:', e);
    }
  }

  if (!supabaseClient) initSupabaseClient();
  if (supabaseClient && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseClient
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch error, using local cache:', error.message);
        return getStoredProducts();
      }

      if (Array.isArray(data)) {
        const mapped = data.map(dbRowToProduct);
        saveStoredProducts(mapped, true);
        return mapped;
      }
    } catch (err) {
      console.warn('Network error while querying Supabase:', err);
    }
  }
  return getStoredProducts();
}

/**
 * Add a new product to store (Optimistic local update + Async cloud sync)
 */
async function addStoreProductAsync(product) {
  const current = getStoredProducts();
  const id = product.id || 'om-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
  const newProduct = {
    ...product,
    id: id,
    createdAt: new Date().toISOString()
  };
  current.unshift(newProduct);
  saveStoredProducts(current, true);

  if (isApiServerAvailable()) {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (res.ok) {
        const created = await res.json();
        return created;
      }
    } catch (e) {
      console.warn('API server insert error:', e);
    }
  }

  if (!supabaseClient) initSupabaseClient();
  if (supabaseClient && isSupabaseConfigured()) {
    try {
      const { error } = await supabaseClient
        .from('products')
        .insert([productToDbRow(newProduct)]);
      if (error) console.error('Supabase insert failed:', error.message);
    } catch (e) {
      console.error('Supabase insert exception:', e);
    }
  }
  return newProduct;
}

function addStoreProduct(product) {
  return addStoreProductAsync(product);
}

/**
 * Update an existing product by id (Optimistic local update + Async cloud sync)
 */
async function updateStoreProductAsync(id, updatedFields) {
  const current = getStoredProducts();
  const idx = current.findIndex(p => p.id === id);
  if (idx !== -1) {
    current[idx] = { ...current[idx], ...updatedFields, updatedAt: new Date().toISOString() };
    saveStoredProducts(current, true);

    if (isApiServerAvailable()) {
      try {
        const res = await fetch('/api/products/' + encodeURIComponent(id), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(current[idx])
        });
        if (res.ok) {
          const updated = await res.json();
          return updated;
        }
      } catch (e) {
        console.warn('API server update error:', e);
      }
    }

    if (!supabaseClient) initSupabaseClient();
    if (supabaseClient && isSupabaseConfigured()) {
      try {
        const { error } = await supabaseClient
          .from('products')
          .update(productToDbRow(current[idx]))
          .eq('id', id);
        if (error) console.error('Supabase update failed:', error.message);
      } catch (e) {
        console.error('Supabase update exception:', e);
      }
    }
    return current[idx];
  }
  return null;
}

function updateStoreProduct(id, updatedFields) {
  return updateStoreProductAsync(id, updatedFields);
}

/**
 * Delete a product by id (Optimistic local update + Async cloud sync)
 */
async function deleteStoreProductAsync(id) {
  let current = getStoredProducts();
  const initialLen = current.length;
  current = current.filter(p => p.id !== id);
  if (current.length !== initialLen) {
    saveStoredProducts(current, true);

    if (isApiServerAvailable()) {
      try {
        const res = await fetch('/api/products/' + encodeURIComponent(id), {
          method: 'DELETE'
        });
        if (res.ok) return true;
      } catch (e) {
        console.warn('API server delete error:', e);
      }
    }

    if (!supabaseClient) initSupabaseClient();
    if (supabaseClient && isSupabaseConfigured()) {
      try {
        const { error } = await supabaseClient
          .from('products')
          .delete()
          .eq('id', id);
        if (error) console.error('Supabase delete failed:', error.message);
      } catch (e) {
        console.error('Supabase delete exception:', e);
      }
    }
    return true;
  }
  return false;
}

function deleteStoreProduct(id) {
  return deleteStoreProductAsync(id);
}

/**
 * Populate store with the official 16 sample products (for admin quick-start)
 */
async function loadSampleStoreProductsAsync() {
  saveStoredProducts(OM_SAMPLE_PRODUCTS, true);

  if (isApiServerAvailable()) {
    try {
      const res = await fetch('/api/products/sample', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        saveStoredProducts(data.products || OM_SAMPLE_PRODUCTS, true);
        return data.products || OM_SAMPLE_PRODUCTS;
      }
    } catch (e) {
      console.warn('API server load sample error:', e);
    }
  }

  if (!supabaseClient) initSupabaseClient();
  if (supabaseClient && isSupabaseConfigured()) {
    try {
      const rows = OM_SAMPLE_PRODUCTS.map(productToDbRow);
      const { error } = await supabaseClient
        .from('products')
        .upsert(rows);
      if (error) console.error('Supabase upsert sample failed:', error.message);
    } catch (e) {
      console.error('Supabase upsert exception:', e);
    }
  }
  return OM_SAMPLE_PRODUCTS;
}

function loadSampleStoreProducts() {
  return loadSampleStoreProductsAsync();
}

/**
 * Clear all products from store
 */
async function clearAllStoreProductsAsync() {
  saveStoredProducts([], true);

  if (isApiServerAvailable()) {
    try {
      const res = await fetch('/api/products/clear', { method: 'POST' });
      if (res.ok) {
        saveStoredProducts([], true);
        return [];
      }
    } catch (e) {
      console.warn('API server clear error:', e);
    }
  }

  if (!supabaseClient) initSupabaseClient();
  if (supabaseClient && isSupabaseConfigured()) {
    try {
      const { error } = await supabaseClient
        .from('products')
        .delete()
        .neq('id', '___non_existent___');
      if (error) console.error('Supabase clear failed:', error.message);
    } catch (e) {
      console.error('Supabase clear exception:', e);
    }
  }
  return [];
}

function clearAllStoreProducts() {
  return clearAllStoreProductsAsync();
}

/**
 * Subscribe to Supabase Realtime changes
 */
function subscribeToStoreRealtime(onFreshDataCallback) {
  if (!supabaseClient) initSupabaseClient();
  if (supabaseClient && isSupabaseConfigured()) {
    try {
      const channel = supabaseClient
        .channel('om-products-live-channel')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'products' },
          async (payload) => {
            console.log('Realtime database update detected:', payload.eventType);
            const fresh = await fetchStoreProductsAsync();
            if (typeof onFreshDataCallback === 'function') {
              onFreshDataCallback(fresh);
            }
          }
        )
        .subscribe((status) => {
          console.log('Supabase Realtime subscription status:', status);
        });
      return channel;
    } catch (e) {
      console.warn('Real-time subscription failed:', e);
    }
  }
  return null;
}

// Auto-initialize client on load
if (typeof window !== 'undefined') {
  initSupabaseClient();
}

// Global window and module exports
if (typeof window !== 'undefined') {
  window.OM_STORAGE_KEY = OM_STORAGE_KEY;
  window.OM_SUPABASE_CONFIG_KEY = OM_SUPABASE_CONFIG_KEY;
  window.OM_SAMPLE_PRODUCTS = OM_SAMPLE_PRODUCTS;
  window.getSupabaseConfig = getSupabaseConfig;
  window.saveSupabaseConfig = saveSupabaseConfig;
  window.clearSupabaseConfig = clearSupabaseConfig;
  window.initSupabaseClient = initSupabaseClient;
  window.isSupabaseConfigured = isSupabaseConfigured;
  window.testSupabaseConnection = testSupabaseConnection;
  window.getStoredProducts = getStoredProducts;
  window.saveStoredProducts = saveStoredProducts;
  window.fetchStoreProductsAsync = fetchStoreProductsAsync;
  window.addStoreProduct = addStoreProduct;
  window.addStoreProductAsync = addStoreProductAsync;
  window.updateStoreProduct = updateStoreProduct;
  window.updateStoreProductAsync = updateStoreProductAsync;
  window.deleteStoreProduct = deleteStoreProduct;
  window.deleteStoreProductAsync = deleteStoreProductAsync;
  window.loadSampleStoreProducts = loadSampleStoreProducts;
  window.loadSampleStoreProductsAsync = loadSampleStoreProductsAsync;
  window.clearAllStoreProducts = clearAllStoreProducts;
  window.clearAllStoreProductsAsync = clearAllStoreProductsAsync;
  window.subscribeToStoreRealtime = subscribeToStoreRealtime;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    OM_STORAGE_KEY,
    OM_SUPABASE_CONFIG_KEY,
    OM_SAMPLE_PRODUCTS,
    getSupabaseConfig,
    saveSupabaseConfig,
    clearSupabaseConfig,
    initSupabaseClient,
    isSupabaseConfigured,
    testSupabaseConnection,
    getStoredProducts,
    saveStoredProducts,
    fetchStoreProductsAsync,
    addStoreProduct,
    addStoreProductAsync,
    updateStoreProduct,
    updateStoreProductAsync,
    deleteStoreProduct,
    deleteStoreProductAsync,
    loadSampleStoreProducts,
    loadSampleStoreProductsAsync,
    clearAllStoreProducts,
    clearAllStoreProductsAsync,
    subscribeToStoreRealtime
  };
}
