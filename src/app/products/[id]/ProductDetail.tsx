'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/components/CartContext'
import { useAuth } from '@/components/AuthContext'
import { Product, Review } from '@/types/product'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/Textarea'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/outline'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface ReviewFormData {
  rating: number
  comment: string
}

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart()
  const { user } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasPurchased, setHasPurchased] = useState(false)
  const [newReview, setNewReview] = useState<ReviewFormData>({
    rating: 5,
    comment: ''
  })

  useEffect(() => {
    console.log('🔄 [Client] Ürün detayları yükleniyor...')
    const startTime = performance.now()

    const fetchData = async () => {
      try {
        // Yorumları yükle
        const reviewsResponse = await fetch(`/api/products/${product.id}/reviews`)
        const reviewsData = await reviewsResponse.json()
        setReviews(reviewsData)

        // Kullanıcı giriş yapmışsa satın alma durumunu kontrol et
        if (user) {
          const purchaseResponse = await fetch(`/api/orders/check-purchase/${product.id}`)
          const purchaseData = await purchaseResponse.json()
          setHasPurchased(purchaseData.hasPurchased)
        }
      } catch (error) {
        console.error('❌ [Client] Veri yüklenirken hata:', error)
      } finally {
        setIsLoading(false)
        const endTime = performance.now()
        console.log(`✅ [Client] Veriler yüklendi (${(endTime - startTime).toFixed(2)}ms)`)
      }
    }

    fetchData()
  }, [product.id, user])

  const handleAddToCart = () => {
    console.log('🛒 [Client] Sepete ekleniyor:', product.name)
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
      quantity: 1
    })
  }

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) {
      alert('Yorum yapmak için giriş yapmalısınız')
      return
    }

    console.log('📝 [Client] Yorum gönderiliyor...')
    try {
      const response = await fetch(`/api/products/${product.id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReview)
      })

      if (!response.ok) {
        throw new Error('Yorum eklenirken bir hata oluştu')
      }

      const data = await response.json()
      setReviews([...reviews, data])
      setNewReview({ rating: 5, comment: '' })
      console.log('✅ [Client] Yorum başarıyla eklendi')
    } catch (error) {
      console.error('❌ [Client] Yorum eklenirken hata:', error)
      alert('Yorum eklenirken bir hata oluştu')
    }
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Ürün Görseli */}
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.salePrice && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                {Math.round(((product.price - product.salePrice) / product.price) * 100)}% İndirim
              </div>
            )}
          </div>

          {/* Ürün Bilgileri */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>
                      {star <= averageRating ? (
                        <StarIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                      ) : (
                        <StarOutlineIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                      )}
                    </span>
                  ))}
                </div>
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  ({reviews.length} değerlendirme)
                </span>
              </div>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                {product.description}
              </p>
            </div>

            {/* Fiyat */}
            <div className="flex items-center space-x-4">
              {product.salePrice ? (
                <>
                  <span className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400">
                    ₺{product.salePrice.toLocaleString('tr-TR')}
                  </span>
                  <span className="text-lg md:text-xl text-gray-500 dark:text-gray-400 line-through">
                    ₺{product.price.toLocaleString('tr-TR')}
                  </span>
                </>
              ) : (
                <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  ₺{product.price.toLocaleString('tr-TR')}
                </span>
              )}
            </div>

            {/* Stok Durumu */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                {product.stock > 0 ? `${product.stock} adet stokta` : 'Stokta yok'}
              </span>
            </div>

            {/* Sepete Ekle Butonu */}
            <Button
              variant="default"
              size="lg"
              className="w-full md:w-auto"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingBagIcon className="w-5 h-5 mr-2" />
              Sepete Ekle
            </Button>

            {/* Özellikler */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Özellikler</h3>
              <ul className="mt-4 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Teknik Özellikler */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Teknik Özellikler</h3>
              <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-t border-gray-200 pt-4">
                    <dt className="text-sm font-medium text-gray-500">{key}</dt>
                    <dd className="mt-1 text-sm text-gray-900">{value as string}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Yorumlar */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Değerlendirmeler
          </h2>

          {/* Yorum Formu */}
          {hasPurchased && (
            <Card className="mb-8">
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Puanınız
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="focus:outline-none"
                      >
                        {star <= newReview.rating ? (
                          <StarIcon className="w-6 h-6 text-yellow-400" />
                        ) : (
                          <StarOutlineIcon className="w-6 h-6 text-yellow-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Textarea
                    label="Yorumunuz"
                    value={newReview.comment}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                      setNewReview({ ...newReview, comment: e.target.value })}
                    required
                    rows={4}
                  />
                </div>

                <Button type="submit" variant="default">
                  Yorum Yap
                </Button>
              </form>
            </Card>
          )}

          {/* Yorum Listesi */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {review.userName}
                      </span>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star}>
                            {star <= review.rating ? (
                              <StarIcon className="w-4 h-4 text-yellow-400" />
                            ) : (
                              <StarOutlineIcon className="w-4 h-4 text-yellow-400" />
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {review.comment}
                  </p>
                </div>
              </Card>
            ))}

            {reviews.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  Henüz değerlendirme yapılmamış
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 