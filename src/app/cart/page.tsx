'use client'

import { useCart } from '../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { 
  TrashIcon,
  ArrowLeftIcon,
  ShoppingBagIcon,
  MinusIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Alışveriş Sepeti
          </h1>
          <Badge variant="default" size="lg">
            {totalItems} ürün
          </Badge>
        </div>
        
        {items.length === 0 ? (
          <Card className="text-center py-12">
            <div className="flex flex-col items-center">
              <ShoppingBagIcon className="w-16 h-16 text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Sepetiniz Boş
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Sepetinizde henüz ürün bulunmuyor.
              </p>
              <Button
                variant="primary"
                leftIcon={<ArrowLeftIcon className="w-5 h-5" />}
                onClick={() => window.location.href = '/products'}
              >
                Alışverişe Başla
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ürün Listesi */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="flex gap-4">
                  {/* Ürün Resmi */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Ürün Bilgileri */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                          {item.name}
                        </h3>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        aria-label={`${item.name} ürününü sepetten kaldır`}
                      >
                        <TrashIcon className="w-5 h-5 text-red-500" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="px-3 py-2"
                          >
                            <MinusIcon className="w-4 h-4" />
                          </Button>
                          <span className="px-4 py-2 text-gray-900 dark:text-white bg-transparent">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2"
                          >
                            <PlusIcon className="w-4 h-4" />
                          </Button>
                        </div>
                        <span className="text-gray-600 dark:text-gray-300">
                          {item.price.toLocaleString('tr-TR')} ₺
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {(item.price * item.quantity).toLocaleString('tr-TR')} ₺
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Sipariş Özeti */}
            <div>
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Sipariş Özeti
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Ara Toplam</span>
                    <span>{totalPrice.toLocaleString('tr-TR')} ₺</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Kargo</span>
                    <span>Ücretsiz</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                      <span>Toplam</span>
                      <span>{totalPrice.toLocaleString('tr-TR')} ₺</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => window.location.href = '/checkout'}
                  >
                    Ödemeye Geç
                  </Button>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => window.location.href = '/products'}
                  >
                    Alışverişe Devam Et
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
} 