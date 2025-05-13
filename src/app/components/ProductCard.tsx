'use client'

import { Product } from '../types/product'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { useCart } from '../context/CartContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ShoppingBagIcon, StarIcon } from '@heroicons/react/24/outline'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
      quantity: 1
    })
  }

  return (
    <Card
      className="group cursor-pointer overflow-hidden"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      {/* Ürün Görseli */}
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.salePrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs md:text-sm">
            {Math.round(((product.price - product.salePrice) / product.price) * 100)}% İndirim
          </div>
        )}
      </div>

      {/* Ürün Bilgileri */}
      <div className="p-3 md:p-4">
        <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-1 md:mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Değerlendirme */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`w-3 h-3 md:w-4 md:h-4 ${
                  star <= product.rating
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            ({product.reviews})
          </span>
        </div>

        {/* Fiyat */}
        <div className="flex items-baseline space-x-2 mb-3 md:mb-4">
          {product.salePrice ? (
            <>
              <span className="text-base md:text-lg font-bold text-red-600 dark:text-red-400">
                ₺{product.salePrice.toLocaleString('tr-TR')}
              </span>
              <span className="text-sm md:text-base text-gray-500 dark:text-gray-400 line-through">
                ₺{product.price.toLocaleString('tr-TR')}
              </span>
            </>
          ) : (
            <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
              ₺{product.price.toLocaleString('tr-TR')}
            </span>
          )}
        </div>

        {/* Sepete Ekle Butonu */}
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <ShoppingBagIcon className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          {product.stock === 0 ? 'Stokta Yok' : 'Sepete Ekle'}
        </Button>
      </div>
    </Card>
  )
} 