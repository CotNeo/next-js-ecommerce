'use client'

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product, ProductFilters } from '../types/product';
import { 
  FunnelIcon, 
  MagnifyingGlassIcon,
  StarIcon,
  ShoppingCartIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useCart } from '../context/CartContext';

// Geçici örnek veri (DB entegrasyonu için hazır)
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    description: "En yeni iPhone modeli, A16 Bionic çip ve 48MP kamera sistemi",
    price: 49999,
    originalPrice: 54999,
    discount: 10,
    image: "/images/phone.jpg",
    category: "Elektronik",
    categoryId: 1,
    stock: 50,
    rating: 4.8,
    reviews: 128,
    features: ["A16 Bionic", "48MP Kamera", "Dynamic Island"],
    specifications: {
      "Ekran": "6.1 inç Super Retina XDR",
      "RAM": "6GB",
      "Depolama": "128GB"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Diğer ürünler buraya eklenecek
];

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [filters, setFilters] = useState<ProductFilters>({
    category: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: 'newest',
    sortOrder: 'desc',
    search: ''
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // URL'den filtreleri al
  useEffect(() => {
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') as ProductFilters['sortBy'];
    const sortOrder = searchParams.get('sortOrder') as ProductFilters['sortOrder'];
    const search = searchParams.get('search');

    setFilters({
      category: category ? parseInt(category) : undefined,
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
      sortBy: sortBy || 'newest',
      sortOrder: sortOrder || 'desc',
      search: search || ''
    });
  }, [searchParams]);

  // Filtreleri uygula
  useEffect(() => {
    setLoading(true);
    try {
      // TODO: API çağrısı yapılacak
      // const response = await fetch(`/api/products?${new URLSearchParams(filters as any)}`);
      // const data = await response.json();
      // setProducts(data.products);
      
      // Şimdilik mock veriyi filtrele
      let filtered = [...MOCK_PRODUCTS];
      
      if (filters.category) {
        filtered = filtered.filter(p => p.categoryId === filters.category);
      }
      
      if (filters.minPrice) {
        filtered = filtered.filter(p => p.price >= filters.minPrice!);
      }
      
      if (filters.maxPrice) {
        filtered = filtered.filter(p => p.price <= filters.maxPrice!);
      }
      
      if (filters.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(search) || 
          p.description.toLowerCase().includes(search)
        );
      }
      
      // Sıralama
      filtered.sort((a, b) => {
        if (filters.sortBy === 'price') {
          return filters.sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        }
        if (filters.sortBy === 'rating') {
          return filters.sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        }
        return filters.sortOrder === 'asc' 
          ? a.createdAt.getTime() - b.createdAt.getTime()
          : b.createdAt.getTime() - a.createdAt.getTime();
      });
      
      setProducts(filtered);
    } catch (error) {
      console.error('Ürünler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Filtreleri güncelle
  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    
    // URL'i güncelle
    const params = new URLSearchParams();
    Object.entries(updated).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.set(key, value.toString());
      }
    });
    
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Üst Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Ürünler
          </h1>
          
          <div className="flex items-center gap-4">
            {/* Arama */}
            <Input
              placeholder="Ürün ara..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              leftIcon={<MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />}
            />
            
            {/* Filtre Butonu */}
            <Button
              variant="secondary"
              leftIcon={<FunnelIcon className="w-5 h-5" />}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              Filtreler
            </Button>
            
            {/* Sıralama */}
            <Select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-');
                updateFilters({ 
                  sortBy: sortBy as ProductFilters['sortBy'], 
                  sortOrder: sortOrder as ProductFilters['sortOrder'] 
                });
              }}
              options={[
                { value: 'newest-desc', label: 'En Yeni' },
                { value: 'price-asc', label: 'Fiyat (Düşükten Yükseğe)' },
                { value: 'price-desc', label: 'Fiyat (Yüksekten Düşüğe)' },
                { value: 'rating-desc', label: 'En Çok Değerlendirilen' }
              ]}
              aria-label="Ürünleri sırala"
            />
          </div>
        </div>
        
        {/* Filtreler */}
        {isFilterOpen && (
          <Card className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Kategori Filtresi */}
              <Select
                label="Kategori"
                value={filters.category?.toString() || ''}
                onChange={(e) => updateFilters({ category: e.target.value ? parseInt(e.target.value) : undefined })}
                options={[
                  { value: '', label: 'Tüm Kategoriler' },
                  { value: '1', label: 'Elektronik' },
                  { value: '2', label: 'Moda' },
                  { value: '3', label: 'Ev & Yaşam' },
                  { value: '4', label: 'Spor' },
                  { value: '5', label: 'Kozmetik' },
                  { value: '6', label: 'Kitap' }
                ]}
                fullWidth
              />
              
              {/* Fiyat Aralığı */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Fiyat Aralığı
                </label>
                <div className="flex gap-4">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice || ''}
                    onChange={(e) => updateFilters({ minPrice: e.target.value ? parseInt(e.target.value) : undefined })}
                    fullWidth
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice || ''}
                    onChange={(e) => updateFilters({ maxPrice: e.target.value ? parseInt(e.target.value) : undefined })}
                    fullWidth
                  />
                </div>
              </div>
              
              {/* Filtreleri Sıfırla */}
              <div className="flex items-end">
                <Button
                  variant="secondary"
                  leftIcon={<XMarkIcon className="w-5 h-5" />}
                  onClick={() => {
                    setFilters({
                      category: undefined,
                      minPrice: undefined,
                      maxPrice: undefined,
                      sortBy: 'newest',
                      sortOrder: 'desc',
                      search: ''
                    });
                    router.push('/products');
                  }}
                  fullWidth
                >
                  Filtreleri Sıfırla
                </Button>
              </div>
            </div>
          </Card>
        )}
        
        {/* Ürün Listesi */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : products.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Ürün bulunamadı.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
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
                      leftIcon={<ShoppingCartIcon className="w-5 h-5" />}
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
        )}
      </main>
      
      <Footer />
    </div>
  );
} 