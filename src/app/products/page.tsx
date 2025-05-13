'use client'

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Product, ProductFilters } from '../types/product';
import { 
  FunnelIcon, 
  MagnifyingGlassIcon,
  StarIcon,
  ShoppingCartIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard'
import { products as mockProducts, categories as mockCategories } from '../data/mockData'

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState<string>('price-asc');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // URL'den filtreleri al
  useEffect(() => {
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') as ProductFilters['sortBy'];
    const sortOrder = searchParams.get('sortOrder') as ProductFilters['sortOrder'];
    const search = searchParams.get('search');

    setSelectedCategory(category || 'all');
    setPriceRange([minPrice ? parseInt(minPrice) : 0, maxPrice ? parseInt(maxPrice) : 100000]);
    setSortBy(sortBy || 'price-asc');
  }, [searchParams]);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, selectedCategory, priceRange, sortBy, searchQuery]);

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Arama filtresi
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    // Kategori filtresi
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.categoryId === selectedCategory);
    }

    // Fiyat aralığı filtresi
    filtered = filtered.filter(p => {
      const price = p.salePrice || p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sıralama
    filtered.sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;

      switch (sortBy) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
      quantity: 1
    });
  };

  const handlePriceRangeChange = (value: string, index: number) => {
    const newRange = [...priceRange] as [number, number];
    newRange[index] = parseInt(value) || 0;
    setPriceRange(newRange);
  };

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
    );
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
            <Button onClick={filterAndSortProducts} variant="primary">
              Tekrar Dene
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Arama Barı - Her zaman görünür */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
            <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ürün ara..."
                className="w-full pl-10"
            />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>
            
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Filtreler - Mobil */}
          <div className="lg:hidden">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="secondary"
              className="w-full"
            >
              <FunnelIcon className="w-5 h-5 mr-2" />
              Filtreler
            </Button>
          </div>

          {/* Filtreler - Desktop */}
          <div className={`lg:w-64 space-y-4 md:space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                  Filtreler
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              
              {/* Kategori Filtresi */}
              <div className="mb-4 md:mb-6">
                <h4 className="text-sm md:text-base font-medium text-gray-900 dark:text-white mb-2">
                  Kategori
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === 'all'}
                      onChange={() => setSelectedCategory('all')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
                      Tüm Kategoriler
                    </span>
                  </label>
                  {mockCategories.map((category) => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Fiyat Aralığı Filtresi */}
              <div className="mb-4 md:mb-6">
                <h4 className="text-sm md:text-base font-medium text-gray-900 dark:text-white mb-2">
                  Fiyat Aralığı
                </h4>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(e.target.value, 0)}
                    placeholder="Min"
                    className="w-24"
                  />
                  <span className="text-gray-500">-</span>
                  <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(e.target.value, 1)}
                    placeholder="Max"
                    className="w-24"
                  />
                </div>
              </div>
              
              {/* Filtreleri Sıfırla */}
              <Button
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange(['', '']);
                }}
                variant="secondary"
                className="w-full"
              >
                Filtreleri Sıfırla
              </Button>
            </div>
          </div>

          {/* Ürün Listesi */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 