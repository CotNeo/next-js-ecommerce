'use client'

import Image from 'next/image'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  description?: string
}

export function ProductCard({ id, name, price, image, description }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({ id, name, price, image })
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-square overflow-hidden rounded-t-2xl">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-neutral-800 transition-colors duration-200"
        >
          {isFavorite ? (
            <HeartSolidIcon className="h-5 w-5 text-error-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
          )}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1 font-heading">
          {name}
        </h3>
        {description && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3 line-clamp-2 font-body">
            {description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${price.toFixed(2)}
          </span>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            leftIcon={<ShoppingCartIcon className="h-5 w-5" />}
          >
            Sepete Ekle
          </Button>
        </div>
      </div>
    </Card>
  )
} 