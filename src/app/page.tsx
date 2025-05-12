'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShoppingBagIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import Header from './components/Header';
import Footer from './components/Footer';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { Badge } from './components/ui/Badge';
import { useCart } from './context/CartContext';

// Örnek ürün verileri
const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    description: "En yeni iPhone modeli, A16 Bionic çip ve 48MP kamera sistemi",
    price: 49999,
    originalPrice: 54999,
    discount: 10,
    image: "/images/phone.jpg",
    rating: 4.8,
    reviews: 128
  },
  {
    id: 2,
    name: "MacBook Pro M2",
    description: "M2 çipli MacBook Pro, 14 inç Liquid Retina XDR ekran",
    price: 69999,
    image: "/images/laptop.jpg",
    rating: 4.9,
    reviews: 256
  },
  {
    id: 3,
    name: "AirPods Pro",
    description: "Aktif gürültü engelleme ve şeffaf mod özellikli kablosuz kulaklık",
    price: 7999,
    originalPrice: 8999,
    discount: 15,
    image: "/images/airpods.jpg",
    rating: 4.7,
    reviews: 512
  }
];

// Kategori verileri
const CATEGORIES = [
  { id: 1, name: "Elektronik", image: "/images/categories/electronics.jpg", count: 156 },
  { id: 2, name: "Moda", image: "/images/categories/fashion.jpg", count: 243 },
  { id: 3, name: "Ev & Yaşam", image: "/images/categories/home.jpg", count: 189 },
  { id: 4, name: "Spor", image: "/images/categories/sports.jpg", count: 98 }
];

// Özellikler
const FEATURES = [
  {
    icon: <ShoppingBagIcon className="w-8 h-8" />,
    title: "Kolay Alışveriş",
    description: "Kullanıcı dostu arayüz ile hızlı ve güvenli alışveriş deneyimi"
  },
  {
    icon: <TruckIcon className="w-8 h-8" />,
    title: "Hızlı Teslimat",
    description: "Siparişleriniz 24 saat içinde kargoya verilir"
  },
  {
    icon: <ShieldCheckIcon className="w-8 h-8" />,
    title: "Güvenli Ödeme",
    description: "256-bit SSL sertifikası ile güvenli ödeme işlemleri"
  }
];

export default function HomePage() {
  const { addItem } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[600px] bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-6">
                Yeni Sezon Ürünleri Keşfedin
              </h1>
              <p className="text-xl mb-8">
                En yeni ürünlerimiz ve özel indirimlerle alışverişin keyfini çıkarın.
              </p>
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRightIcon className="w-5 h-5" />}
                onClick={() => window.location.href = '/products'}
              >
                Alışverişe Başla
              </Button>
            </div>
          </div>
        </section>
        
        {/* Kategoriler */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Popüler Kategoriler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CATEGORIES.map((category) => (
                <Card key={category.id} hover className="overflow-hidden">
                  <Link href={`/products?category=${category.id}`}>
                    <div className="relative h-48">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                        <Badge variant="default" size="sm">
                          {category.count} ürün
                        </Badge>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURED_PRODUCTS.map((product) => (
                <Card key={product.id} hover>
                  <Link href={`/products/${product.id}`}>
                    <div className="relative h-64 overflow-hidden rounded-t-2xl">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transform hover:scale-110 transition-transform duration-300"
                      />
                      {product.discount && (
                        <Badge
                          variant="error"
                          className="absolute top-4 right-4"
                        >
                          %{product.discount} İndirim
                        </Badge>
                      )}
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        <StarIcon className="w-5 h-5 text-yellow-400" />
                        <span className="ml-1 text-gray-700 dark:text-gray-300">
                          {product.rating}
                        </span>
                      </div>
                      <Badge variant="default" size="sm">
                        {product.reviews} değerlendirme
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        {product.originalPrice && (
                          <span className="text-gray-500 dark:text-gray-400 line-through mr-2">
                            {product.originalPrice.toLocaleString('tr-TR')} ₺
                          </span>
                        )}
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {product.price.toLocaleString('tr-TR')} ₺
                        </span>
                      </div>
                      
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image
                        })}
                        aria-label={`${product.name} ürününü sepete ekle`}
                      >
                        Sepete Ekle
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Özellikler */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURES.map((feature, index) => (
                <Card key={index} variant="bordered" className="text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
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
  );
}
