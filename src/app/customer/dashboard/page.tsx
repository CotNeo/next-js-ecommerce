'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { 
  ShoppingBagIcon,
  HeartIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { UserRole } from '@/types'
import { products as mockProducts } from '../../data/mockData'

interface Order {
  id: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  total: number
  items: {
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }[]
}

interface FavoriteProduct {
  id: string
  name: string
  price: number
  image: string
  rating: number
}

export default function CustomerDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([])

  // Örnek siparişler
  useEffect(() => {
    setOrders([
      {
        id: '1',
        date: '2024-03-15',
        status: 'delivered',
        total: mockProducts[0].price * 2 + mockProducts[1].price,
        items: [
          { id: mockProducts[0].id, name: mockProducts[0].name, price: mockProducts[0].price, quantity: 2, image: mockProducts[0].image },
          { id: mockProducts[1].id, name: mockProducts[1].name, price: mockProducts[1].price, quantity: 1, image: mockProducts[1].image }
        ]
      },
      {
        id: '2',
        date: '2024-03-10',
        status: 'processing',
        total: mockProducts[2].price,
        items: [
          { id: mockProducts[2].id, name: mockProducts[2].name, price: mockProducts[2].price, quantity: 1, image: mockProducts[2].image }
        ]
      }
    ])
  }, [])

  // Örnek favoriler
  useEffect(() => {
    setFavorites([
      { id: mockProducts[0].id, name: mockProducts[0].name, price: mockProducts[0].price, image: mockProducts[0].image, rating: 4.5 },
      { id: mockProducts[1].id, name: mockProducts[1].name, price: mockProducts[1].price, image: mockProducts[1].image, rating: 5 }
    ])
  }, [])

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: { variant: 'warning', text: 'Beklemede' },
      processing: { variant: 'primary', text: 'İşleniyor' },
      shipped: { variant: 'success', text: 'Kargoda' },
      delivered: { variant: 'success', text: 'Teslim Edildi' }
    }
    const config = statusConfig[status]
    return <Badge variant={config.variant as any}>{config.text}</Badge>
  }

  // Müşteri değilse ana sayfaya yönlendir
  useEffect(() => {
    if (user && user.role !== UserRole.CUSTOMER) {
      console.log('⚠️ Yetkisiz erişim, ana sayfaya yönlendiriliyor')
      router.push('/')
    }
  }, [user, router])

  if (!user || user.role !== UserRole.CUSTOMER) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* İstatistikler */}
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingBagIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Toplam Sipariş</p>
              <p className="text-2xl font-bold">{orders.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <HeartIcon className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Favori Ürünler</p>
              <p className="text-2xl font-bold">{favorites.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <ClockIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Son Sipariş</p>
              <p className="text-2xl font-bold">{orders[0]?.date || '-'}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Siparişler */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Siparişlerim</h2>
        <div className="space-y-4">
          {orders.map(order => (
            <Card key={order.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500">Sipariş No: #{order.id}</p>
                  <p className="text-sm text-gray-500">Tarih: {order.date}</p>
                </div>
                {getStatusBadge(order.status)}
              </div>
              <div className="space-y-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.quantity} adet x ₺{item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ₺{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Toplam</span>
                  <span className="text-xl font-bold text-blue-600">
                    ₺{order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Favoriler */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Favori Ürünlerim</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(product => (
            <Card key={product.id} className="p-6">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-blue-600">
                  ₺{product.price.toFixed(2)}
                </span>
                <div className="flex items-center">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <span className="ml-1">{product.rating}</span>
                </div>
              </div>
              <Button variant="primary" fullWidth>
                Sepete Ekle
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 