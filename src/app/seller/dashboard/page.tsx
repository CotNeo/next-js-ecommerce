'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'
import { Badge } from '../../components/ui/Badge'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

interface Product {
  id: string
  name: string
  price: number
  stock: number
  image: string
  description: string
}

export default function SellerDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    image: ''
  })

  // Örnek ürünler
  useEffect(() => {
    console.log('📦 Satıcı ürünleri yükleniyor...')
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Ürün 1',
        price: 99.99,
        stock: 50,
        image: '/images/product1.jpg',
        description: 'Ürün 1 açıklaması'
      },
      {
        id: '2',
        name: 'Ürün 2',
        price: 149.99,
        stock: 30,
        image: '/images/product2.jpg',
        description: 'Ürün 2 açıklaması'
      }
    ]
    setProducts(mockProducts)
  }, [])

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('➕ Yeni ürün ekleniyor:', newProduct)
    
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      image: newProduct.image,
      description: newProduct.description
    }

    setProducts([...products, product])
    setNewProduct({
      name: '',
      price: '',
      stock: '',
      description: '',
      image: ''
    })
    setIsAddProductModalOpen(false)
  }

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProduct) return

    console.log('📝 Ürün güncelleniyor:', selectedProduct)
    
    setProducts(products.map(p => 
      p.id === selectedProduct.id ? selectedProduct : p
    ))
    setIsEditProductModalOpen(false)
  }

  const handleDeleteProduct = (id: string) => {
    console.log('🗑️ Ürün siliniyor:', id)
    setProducts(products.filter(p => p.id !== id))
  }

  // Satıcı değilse ana sayfaya yönlendir
  useEffect(() => {
    if (user && user.role !== 'seller') {
      console.log('⚠️ Yetkisiz erişim, ana sayfaya yönlendiriliyor')
      router.push('/')
    }
  }, [user, router])

  if (!user || user.role !== 'seller') {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* İstatistikler */}
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Toplam Satış</p>
              <p className="text-2xl font-bold">₺12,500</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <ShoppingBagIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Toplam Ürün</p>
              <p className="text-2xl font-bold">{products.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <UserGroupIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Toplam Müşteri</p>
              <p className="text-2xl font-bold">150</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Ortalama Sipariş</p>
              <p className="text-2xl font-bold">₺250</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Ürün Listesi */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Ürünlerim</h2>
          <Button
            variant="primary"
            leftIcon={<PlusIcon className="w-5 h-5" />}
            onClick={() => setIsAddProductModalOpen(true)}
          >
            Yeni Ürün Ekle
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <Card key={product.id} className="p-6">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-blue-600">
                  ₺{product.price.toFixed(2)}
                </span>
                <Badge
                  variant={product.stock > 0 ? 'success' : 'error'}
                >
                  {product.stock > 0 ? `${product.stock} adet` : 'Stokta yok'}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<PencilIcon className="w-4 h-4" />}
                  onClick={() => {
                    setSelectedProduct(product)
                    setIsEditProductModalOpen(true)
                  }}
                >
                  Düzenle
                </Button>
                <Button
                  variant="error"
                  size="sm"
                  leftIcon={<TrashIcon className="w-4 h-4" />}
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Sil
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Yeni Ürün Modalı */}
      <Modal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        title="Yeni Ürün Ekle"
      >
        <form onSubmit={handleAddProduct} className="space-y-4">
          <Input
            label="Ürün Adı"
            value={newProduct.name}
            onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
            required
          />
          <Input
            label="Fiyat"
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
            required
          />
          <Input
            label="Stok"
            type="number"
            value={newProduct.stock}
            onChange={(e) => setNewProduct(prev => ({ ...prev, stock: e.target.value }))}
            required
          />
          <Input
            label="Açıklama"
            value={newProduct.description}
            onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
            required
          />
          <Input
            label="Resim URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
            required
          />
          <Button type="submit" variant="primary" fullWidth>
            Ürün Ekle
          </Button>
        </form>
      </Modal>

      {/* Ürün Düzenleme Modalı */}
      <Modal
        isOpen={isEditProductModalOpen}
        onClose={() => setIsEditProductModalOpen(false)}
        title="Ürün Düzenle"
      >
        {selectedProduct && (
          <form onSubmit={handleEditProduct} className="space-y-4">
            <Input
              label="Ürün Adı"
              value={selectedProduct.name}
              onChange={(e) => setSelectedProduct(prev => prev ? { ...prev, name: e.target.value } : null)}
              required
            />
            <Input
              label="Fiyat"
              type="number"
              value={selectedProduct.price}
              onChange={(e) => setSelectedProduct(prev => prev ? { ...prev, price: parseFloat(e.target.value) } : null)}
              required
            />
            <Input
              label="Stok"
              type="number"
              value={selectedProduct.stock}
              onChange={(e) => setSelectedProduct(prev => prev ? { ...prev, stock: parseInt(e.target.value) } : null)}
              required
            />
            <Input
              label="Açıklama"
              value={selectedProduct.description}
              onChange={(e) => setSelectedProduct(prev => prev ? { ...prev, description: e.target.value } : null)}
              required
            />
            <Input
              label="Resim URL"
              value={selectedProduct.image}
              onChange={(e) => setSelectedProduct(prev => prev ? { ...prev, image: e.target.value } : null)}
              required
            />
            <Button type="submit" variant="primary" fullWidth>
              Değişiklikleri Kaydet
            </Button>
          </form>
        )}
      </Modal>
    </div>
  )
} 