'use client'

import { useState } from 'react'
import { Card } from './components/ui/Card'
import { Button } from './components/ui/Button'
import { useCart } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import { Product } from './types/product'
import { 
  ShoppingBagIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import ProductCard from './components/ProductCard'
import { products as mockProducts } from './data/mockData'

// Kategori verileri
const CATEGORIES = [
  { id: 'elektronik', name: 'Elektronik', image: '/images/electronics.jpg', count: 156 },
  { id: 'aksesuar', name: 'Aksesuar', image: '/images/electronics.jpg', count: 243 },
  { id: 'bilgisayar', name: 'Bilgisayar', image: '/images/electronics.jpg', count: 189 },
  { id: 'tablet', name: 'Tablet', image: '/images/electronics.jpg', count: 98 }
]

// Özellikler
const FEATURES = [
  {
    icon: <ShoppingBagIcon className="w-8 h-8" />,
    title: 'Kolay Alışveriş',
    description: 'Kullanıcı dostu arayüz ile hızlı ve güvenli alışveriş deneyimi'
  },
  {
    icon: <TruckIcon className="w-8 h-8" />,
    title: 'Hızlı Teslimat',
    description: 'Siparişleriniz 24 saat içinde kargoya verilir'
  },
  {
    icon: <ShieldCheckIcon className="w-8 h-8" />,
    title: 'Güvenli Ödeme',
    description: '256-bit SSL sertifikası ile güvenli ödeme işlemleri'
  }
]

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { addItem } = useCart()

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
      quantity: 1
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </Card>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              {error}
            </h2>
            <Button onClick={() => {}} variant="primary">
              Tekrar Dene
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[600px] bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                Yeni Sezon Ürünleri Keşfedin
              </h1>
              <p className="text-lg md:text-xl mb-6 md:mb-8">
                En yeni ürünlerimiz ve özel indirimlerle alışverişin keyfini çıkarın.
              </p>
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRightIcon className="w-5 h-5" />}
                onClick={() => window.location.href = '/products'}
                className="w-full md:w-auto"
              >
                Alışverişe Başla
              </Button>
            </div>
          </div>
        </section>
        
        {/* Kategoriler */}
        <section className="py-8 md:py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
              Popüler Kategoriler
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {CATEGORIES.map((category) => (
                <Card 
                  key={category.id} 
                  className="overflow-hidden"
                  hover={true}
                >
                  <Link href={`/products?category=${category.id}`}>
                    <div className="relative h-32 md:h-48">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                        <h3 className="text-lg md:text-xl font-semibold mb-2">
                          {category.name}
                        </h3>
                        <p className="text-sm md:text-base">
                          {category.count} Ürün
                        </p>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Öne Çıkan Ürünler */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Öne Çıkan Ürünler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Özellikler */}
        <section className="py-8 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {FEATURES.map((feature, index) => (
                <Card 
                  key={index} 
                  className="text-center p-4 md:p-6"
                  hover={true}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
