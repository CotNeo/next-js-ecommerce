import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 1,
    name: "Canon EOS R5",
    description: "45MP Full-Frame Mirrorless Camera with 8K Video",
    price: 3899.99,
    image: "/images/cameras/canon-eos-r5.jpg",
    category: "cameras",
    brand: "Canon",
    stock: 15,
    rating: 4.8,
    reviews: 128,
    features: [
      "45MP Full-Frame CMOS Sensor",
      "8K RAW Video Recording",
      "Dual Pixel CMOS AF II",
      "5-axis IBIS",
      "Weather Sealed"
    ],
    specifications: {
      sensor: "45MP Full-Frame CMOS",
      processor: "DIGIC X",
      video: "8K 30p, 4K 120p",
      connectivity: "Wi-Fi, Bluetooth, USB-C",
      battery: "LP-E6NH"
    }
  },
  {
    id: 2,
    name: "Sony A7 IV",
    description: "33MP Full-Frame Mirrorless Camera with Advanced AF",
    price: 2499.99,
    image: "/images/cameras/sony-a7iv.jpg",
    category: "cameras",
    brand: "Sony",
    stock: 20,
    rating: 4.7,
    reviews: 156,
    features: [
      "33MP Full-Frame Sensor",
      "Real-time Eye AF",
      "4K 60p Video",
      "5-axis IBIS",
      "Dual Card Slots"
    ],
    specifications: {
      sensor: "33MP Full-Frame Exmor R",
      processor: "BIONZ XR",
      video: "4K 60p, 1080p 120p",
      connectivity: "Wi-Fi, Bluetooth, USB-C",
      battery: "NP-FZ100"
    }
  },
  {
    id: 3,
    name: "Nikon Z6 II",
    description: "24.5MP Full-Frame Mirrorless Camera with Dual Processors",
    price: 1999.99,
    image: "/images/cameras/nikon-z6ii.jpg",
    category: "cameras",
    brand: "Nikon",
    stock: 12,
    rating: 4.6,
    reviews: 98,
    features: [
      "24.5MP Full-Frame Sensor",
      "Dual EXPEED 6 Processors",
      "4K 60p Video",
      "5-axis IBIS",
      "Weather Sealed"
    ],
    specifications: {
      sensor: "24.5MP Full-Frame CMOS",
      processor: "Dual EXPEED 6",
      video: "4K 60p, 1080p 120p",
      connectivity: "Wi-Fi, Bluetooth, USB-C",
      battery: "EN-EL15c"
    }
  },
  {
    id: 4,
    name: "Fujifilm X-T4",
    description: "26.1MP APS-C Mirrorless Camera with IBIS",
    price: 1699.99,
    image: "/images/cameras/fujifilm-xt4.jpg",
    category: "cameras",
    brand: "Fujifilm",
    stock: 18,
    rating: 4.8,
    reviews: 145,
    features: [
      "26.1MP APS-C Sensor",
      "5-axis IBIS",
      "4K 60p Video",
      "Classic Film Simulations",
      "Weather Sealed"
    ],
    specifications: {
      sensor: "26.1MP APS-C X-Trans CMOS 4",
      processor: "X-Processor 4",
      video: "4K 60p, 1080p 240p",
      connectivity: "Wi-Fi, Bluetooth, USB-C",
      battery: "NP-W235"
    }
  },
  {
    id: 5,
    name: "Panasonic Lumix GH6",
    description: "25.2MP Micro Four Thirds Camera with Pro Video Features",
    price: 2199.99,
    image: "/images/cameras/panasonic-gh6.jpg",
    category: "cameras",
    brand: "Panasonic",
    stock: 10,
    rating: 4.7,
    reviews: 87,
    features: [
      "25.2MP Micro Four Thirds Sensor",
      "5.7K 60p Video",
      "Dual Native ISO",
      "5-axis IBIS",
      "Weather Sealed"
    ],
    specifications: {
      sensor: "25.2MP Micro Four Thirds Live MOS",
      processor: "Venus Engine",
      video: "5.7K 60p, 4K 120p",
      connectivity: "Wi-Fi, Bluetooth, USB-C",
      battery: "DMW-BLK22"
    }
  }
]; 