'use client'

import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { orders } from '../../data/adminData'
import { Order } from '../../types/admin'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}

const statusLabels = {
  pending: 'Beklemede',
  processing: 'İşleniyor',
  shipped: 'Kargoya Verildi',
  delivered: 'Teslim Edildi',
  cancelled: 'İptal Edildi'
}

export default function AdminOrdersPage() {
  const [orderList, setOrderList] = useState<Order[]>(orders)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [trackingNumber, setTrackingNumber] = useState('')

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrderList(orderList.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  const handleAddTrackingNumber = (orderId: string) => {
    if (!trackingNumber.trim()) return

    setOrderList(orderList.map(order => 
      order.id === orderId ? { ...order, trackingNumber } : order
    ))
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, trackingNumber })
    }
    setTrackingNumber('')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Sipariş Yönetimi
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sipariş Listesi */}
            <div className="lg:col-span-1">
              <Card className="p-4">
                <div className="space-y-4">
                  {orderList.map(order => (
                    <div
                      key={order.id}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        selectedOrder?.id === order.id
                          ? 'bg-blue-50 dark:bg-blue-900'
                          : 'bg-white dark:bg-gray-700'
                      }`}
                      onClick={() => setSelectedOrder(order)}
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
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          statusColors[order.status]
                        }`}>
                          {statusLabels[order.status]}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {order.items.length} ürün
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sipariş Detayı */}
            <div className="lg:col-span-2">
              {selectedOrder ? (
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Sipariş #{selectedOrder.id}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        {selectedOrder.userName} ({selectedOrder.userEmail})
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(selectedOrder.createdAt).toLocaleString('tr-TR')}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <select
                        className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        value={selectedOrder.status}
                        onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as Order['status'])}
                      >
                        {Object.entries(statusLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Ürünler */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Ürünler
                    </h3>
                    <div className="space-y-4">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {item.productName}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {item.quantity} adet x {item.price.toLocaleString('tr-TR')} TL
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Kargo Bilgisi */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Kargo Bilgisi
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Adres:</span> {selectedOrder.shippingAddress.address}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Şehir:</span> {selectedOrder.shippingAddress.city}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Telefon:</span> {selectedOrder.shippingAddress.phone}
                      </p>
                      {selectedOrder.trackingNumber && (
                        <p className="text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Takip No:</span> {selectedOrder.trackingNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Kargo Takip Numarası */}
                  {selectedOrder.status === 'shipped' && !selectedOrder.trackingNumber && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Kargo Takip Numarası Ekle
                      </h3>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                          placeholder="Kargo takip numarası"
                          className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        />
                        <Button
                          variant="primary"
                          onClick={() => handleAddTrackingNumber(selectedOrder.id)}
                        >
                          Ekle
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Ödeme Bilgisi */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Ödeme Bilgisi
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Toplam Tutar:</span>{' '}
                        {selectedOrder.totalAmount.toLocaleString('tr-TR')} TL
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Ödeme Yöntemi:</span>{' '}
                        {selectedOrder.paymentMethod === 'credit_card' ? 'Kredi Kartı' : 'Havale/EFT'}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Ödeme Durumu:</span>{' '}
                        {selectedOrder.paymentStatus === 'paid' ? 'Ödendi' : 'Beklemede'}
                      </p>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    Sipariş seçilmedi
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 