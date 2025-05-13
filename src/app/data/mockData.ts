import { Category, Product } from '../types/product'

export const categories: Category[] = [
  {
    id: 'c1',
    name: 'Elektronik',
    slug: 'elektronik',
    description: 'En yeni elektronik ürünler',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&auto=format&fit=crop&q=60',
    productCount: 6
  },
  {
    id: 'c2',
    name: 'Bilgisayar',
    slug: 'bilgisayar',
    description: 'Güçlü bilgisayarlar ve aksesuarlar',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60',
    productCount: 5
  },
  {
    id: 'c3',
    name: 'Telefon',
    slug: 'telefon',
    description: 'Akıllı telefonlar ve aksesuarlar',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=60',
    productCount: 4
  },
  {
    id: 'c4',
    name: 'Tablet',
    slug: 'tablet',
    description: 'Tabletler ve aksesuarlar',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=60',
    productCount: 3
  },
  {
    id: 'c5',
    name: 'Fotoğraf & Video',
    slug: 'fotograf-video',
    description: 'Profesyonel fotoğraf ve video ekipmanları',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60',
    productCount: 4
  },
  {
    id: 'c6',
    name: 'Gaming',
    slug: 'gaming',
    description: 'Oyun konsolları ve aksesuarları',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60',
    productCount: 3
  }
]

export const products: Product[] = [
  {
    id: 'p1',
    name: 'iPhone 14 Pro',
    description: 'Apple iPhone 14 Pro 256GB, Uzay Siyahı',
    price: 49999,
    salePrice: 47999,
    image: 'https://images.unsplash.com/photo-1678652197831-2d1801b5d793?w=800&auto=format&fit=crop&q=60',
    categoryId: 'c3',
    stock: 50,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p2',
    name: 'MacBook Pro M2',
    description: 'Apple MacBook Pro 14" M2 Pro, 16GB RAM, 512GB SSD',
    price: 69999,
    salePrice: 64999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60',
    categoryId: 'c2',
    stock: 30,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p3',
    name: 'iPad Pro',
    description: 'Apple iPad Pro 12.9" M2, 256GB, Wi-Fi',
    price: 39999,
    salePrice: 37999,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=60',
    categoryId: 'c4',
    stock: 25,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p4',
    name: 'AirPods Pro',
    description: 'Apple AirPods Pro 2. Nesil',
    price: 7999,
    salePrice: 6999,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=60',
    categoryId: 'c1',
    stock: 100,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p5',
    name: 'Samsung Galaxy S23 Ultra',
    description: 'Samsung Galaxy S23 Ultra 256GB, Siyah',
    price: 44999,
    salePrice: 42999,
    image: 'https://images.unsplash.com/photo-1678775702101-9ed9a8c0c9e3?w=800&auto=format&fit=crop&q=60',
    categoryId: 'c3',
    stock: 40,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p6',
    name: 'Dell XPS 15',
    description: 'Dell XPS 15 15.6" 4K UHD, Intel i9, 32GB RAM, 1TB SSD',
    price: 59999,
    salePrice: 54999,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=60',
    categoryId: 'c2',
    stock: 20,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p7',
    name: 'Sony WH-1000XM5',
    description: 'Sony WH-1000XM5 Kablosuz Gürültü Önleyici Kulaklık',
    price: 12999,
    salePrice: 11999,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=60',
    categoryId: 'c1',
    stock: 60,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p8',
    name: 'Samsung Galaxy Tab S9 Ultra',
    description: 'Samsung Galaxy Tab S9 Ultra 14.6" 256GB, Wi-Fi',
    price: 34999,
    salePrice: 32999,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=60',
    categoryId: 'c4',
    stock: 35,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p9',
    name: 'Apple Watch Series 9',
    description: 'Apple Watch Series 9 GPS + Cellular, 45mm',
    price: 15999,
    salePrice: 14999,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=60',
    categoryId: 'c1',
    stock: 75,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p10',
    name: 'Microsoft Surface Laptop Studio',
    description: 'Microsoft Surface Laptop Studio 14.4" Intel i7, 32GB RAM, 1TB SSD',
    price: 54999,
    salePrice: 49999,
    image: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=800&auto=format&fit=crop&q=60',
    categoryId: 'c2',
    stock: 15,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p11',
    name: 'Canon EOS R5',
    description: 'Canon EOS R5 Full Frame Mirrorless Kamera',
    price: 89999,
    salePrice: 84999,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60',
    categoryId: 'c5',
    stock: 10,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p12',
    name: 'Sony A7IV',
    description: 'Sony Alpha A7IV Full Frame Mirrorless Kamera',
    price: 79999,
    salePrice: 74999,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60',
    categoryId: 'c5',
    stock: 15,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p13',
    name: 'DJI Mavic 3 Pro',
    description: 'DJI Mavic 3 Pro Drone',
    price: 69999,
    salePrice: 64999,
    image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&auto=format&fit=crop&q=60',
    categoryId: 'c5',
    stock: 8,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p14',
    name: 'GoPro Hero 11 Black',
    description: 'GoPro Hero 11 Black Aksiyon Kamerası',
    price: 12999,
    salePrice: 11999,
    image: 'https://images.unsplash.com/photo-1575738230514-d5b47cd89be7?w=800&auto=format&fit=crop&q=60',
    categoryId: 'c5',
    stock: 25,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p15',
    name: 'PlayStation 5',
    description: 'Sony PlayStation 5 Digital Edition',
    price: 14999,
    salePrice: 13999,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=60',
    categoryId: 'c6',
    stock: 20,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p16',
    name: 'Xbox Series X',
    description: 'Microsoft Xbox Series X',
    price: 15999,
    salePrice: 14999,
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&auto=format&fit=crop&q=60',
    categoryId: 'c6',
    stock: 18,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'p17',
    name: 'Nintendo Switch OLED',
    description: 'Nintendo Switch OLED Model',
    price: 9999,
    salePrice: 8999,
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&auto=format&fit=crop&q=60',
    categoryId: 'c6',
    stock: 30,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
] 