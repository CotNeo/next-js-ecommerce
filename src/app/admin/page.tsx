'use client'

import { useState, useEffect } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import ProductForm from './components/ProductForm'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { products as mockProducts } from '../data/mockData'
import { contactMessages, orders } from '../data/adminData'
import type { Product } from '../types/product'

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Ürünleri API'den yükle
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setProducts(mockProducts)
  }

  const handleAddProduct = () => {
    setIsEditing(true)
    setSelectedProduct(null)
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsEditing(true)
  }

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      try {
        await fetch(`/api/products/${id}`, { method: 'DELETE' })
        setProducts(products.filter((p: Product) => p.id !== id))
      } catch (error) {
        console.error('Ürün silinirken hata oluştu:', error)
      }
    }
  }

  const handleSubmit = async (productData: Omit<Product, 'id'>) => {
    try {
      if (selectedProduct) {
        // Güncelleme
        const response = await fetch(`/api/products/${selectedProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        })
        const updatedProduct = await response.json()
        setProducts(products.map((p: Product) => 
          p.id === selectedProduct.id ? updatedProduct : p
        ))
      } else {
        // Yeni ürün ekleme
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        })
        const newProduct = await response.json()
        setProducts([...products, newProduct])
      }
      setIsEditing(false)
      setSelectedProduct(null)
    } catch (error) {
      console.error('Ürün kaydedilirken hata oluştu:', error)
      throw error
    }
  }

  // İstatistikler
  const totalProducts = products.length
  const totalOrders = orders.length
  const totalMessages = contactMessages.length
  const unreadMessages = contactMessages.filter(msg => !msg.isRead).length
  const pendingOrders = orders.filter(order => order.status === 'pending').length
  const processingOrders = orders.filter(order => order.status === 'processing').length

  if (isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {selectedProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
            </h1>
          </div>
          <ProductForm
            product={selectedProduct}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsEditing(false)
              setSelectedProduct(null)
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Admin Paneli
          </h1>

          {/* İstatistikler */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Ürünler
              </h2>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {totalProducts}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Toplam ürün sayısı
              </p>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Siparişler
              </h2>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {totalOrders}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Toplam sipariş sayısı
                </p>
                <div className="flex space-x-4 mt-2">
                  <span className="text-sm text-yellow-600 dark:text-yellow-400">
                    {pendingOrders} Bekleyen
                  </span>
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    {processingOrders} İşleniyor
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Mesajlar
              </h2>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {totalMessages}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Toplam mesaj sayısı
                </p>
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                  {unreadMessages} Okunmamış mesaj
                </p>
              </div>
            </Card>
          </div>

          {/* Hızlı Erişim */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link href="/admin/orders">
              <Card className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Sipariş Yönetimi
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Siparişleri görüntüle ve yönet
                </p>
              </Card>
            </Link>

            <Link href="/admin/messages">
              <Card className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Mesajlar
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  İletişim mesajlarını görüntüle
                </p>
              </Card>
            </Link>

            <Link href="/admin/products">
              <Card className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Ürün Yönetimi
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Ürünleri görüntüle ve yönet
                </p>
              </Card>
            </Link>
          </div>

          {/* Son Siparişler */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Son Siparişler
              </h2>
              <Link href="/admin/orders">
                <Button variant="secondary">Tümünü Gör</Button>
              </Link>
            </div>
            <Card className="p-4">
              <div className="space-y-4">
                {orders.slice(0, 3).map(order => (
                  <div
                    key={order.id}
                    className="p-4 rounded-lg bg-white dark:bg-gray-700"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Sipariş #{order.id}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {order.userName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {order.totalAmount.toLocaleString('tr-TR')} TL
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Son Mesajlar */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Son Mesajlar
              </h2>
              <Link href="/admin/messages">
                <Button variant="secondary">Tümünü Gör</Button>
              </Link>
            </div>
            <Card className="p-4">
              <div className="space-y-4">
                {contactMessages.slice(0, 3).map(message => (
                  <div
                    key={message.id}
                    className="p-4 rounded-lg bg-white dark:bg-gray-700"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {message.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {message.subject}
                        </p>
                      </div>
                      <div className="text-right">
                        {!message.isRead && (
                          <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                            Yeni
                          </span>
                        )}
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                          {new Date(message.createdAt).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 