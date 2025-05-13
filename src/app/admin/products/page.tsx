'use client'

import { useState, useEffect } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import ProductForm from '../components/ProductForm'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { products as mockProducts } from '../../data/mockData'
import type { Product } from '../../types/product'

interface ProductFilters {
  search: string
  category: string
  minPrice: string
  maxPrice: string
  stockStatus: string
  status: string
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    stockStatus: '',
    status: ''
  })
  const router = useRouter()

  useEffect(() => {
    console.log('AdminProductsPage mounted')
    setProducts(mockProducts)
    setFilteredProducts(mockProducts)
  }, [])

  useEffect(() => {
    console.log('Filters changed:', filters)
    // Filtreleri uygula
    let result = [...products]

    // Arama filtresi
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      )
      console.log('Search filter applied:', filters.search, 'Results:', result.length)
    }

    // Kategori filtresi
    if (filters.category) {
      result = result.filter(product => product.categoryId === filters.category)
      console.log('Category filter applied:', filters.category, 'Results:', result.length)
    }

    // Fiyat aralığı filtresi
    if (filters.minPrice) {
      result = result.filter(product => product.price >= Number(filters.minPrice))
      console.log('Min price filter applied:', filters.minPrice, 'Results:', result.length)
    }
    if (filters.maxPrice) {
      result = result.filter(product => product.price <= Number(filters.maxPrice))
      console.log('Max price filter applied:', filters.maxPrice, 'Results:', result.length)
    }

    // Stok durumu filtresi
    if (filters.stockStatus) {
      if (filters.stockStatus === 'inStock') {
        result = result.filter(product => product.stock > 0)
      } else if (filters.stockStatus === 'outOfStock') {
        result = result.filter(product => product.stock === 0)
      }
      console.log('Stock status filter applied:', filters.stockStatus, 'Results:', result.length)
    }

    // Durum filtresi
    if (filters.status) {
      result = result.filter(product => 
        filters.status === 'active' ? product.isActive : !product.isActive
      )
      console.log('Status filter applied:', filters.status, 'Results:', result.length)
    }

    setFilteredProducts(result)
  }, [products, filters])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    console.log('Filter changed:', name, 'New value:', value)
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleResetFilters = () => {
    console.log('Resetting all filters')
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      stockStatus: '',
      status: ''
    })
  }

  const handleAddProduct = () => {
    console.log('Adding new product')
    setIsEditing(true)
    setSelectedProduct(null)
  }

  const handleEditProduct = (product: Product) => {
    console.log('Editing product:', product.id, product.name)
    setSelectedProduct(product)
    setIsEditing(true)
  }

  const handleDeleteProduct = async (id: string) => {
    console.log('Attempting to delete product:', id)
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      try {
        await fetch(`/api/products/${id}`, { method: 'DELETE' })
        console.log('Product deleted successfully:', id)
        setProducts(products.filter((p: Product) => p.id !== id))
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    } else {
      console.log('Product deletion cancelled')
    }
  }

  const handleSubmit = async (productData: Omit<Product, 'id'>) => {
    console.log('Submitting product data:', productData)
    try {
      if (selectedProduct) {
        console.log('Updating existing product:', selectedProduct.id)
        // Güncelleme
        const response = await fetch(`/api/products/${selectedProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        })
        const updatedProduct = await response.json()
        console.log('Product updated successfully:', updatedProduct)
        setProducts(products.map((p: Product) => 
          p.id === selectedProduct.id ? updatedProduct : p
        ))
      } else {
        console.log('Creating new product')
        // Yeni ürün ekleme
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        })
        const newProduct = await response.json()
        console.log('New product created successfully:', newProduct)
        setProducts([...products, newProduct])
      }
      setIsEditing(false)
      setSelectedProduct(null)
    } catch (error) {
      console.error('Error saving product:', error)
      throw error
    }
  }

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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Ürün Yönetimi
            </h1>
            <Button onClick={handleAddProduct} variant="primary">
              Yeni Ürün Ekle
            </Button>
          </div>

          {/* Filtreler */}
          <Card className="mb-8 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Arama */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Arama
                </label>
                <input
                  type="text"
                  id="search"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Ürün adı veya açıklama..."
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              {/* Kategori */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Kategori
                </label>
                <select
                  id="category"
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Tüm Kategoriler</option>
                  <option value="c1">Elektronik</option>
                  <option value="c2">Bilgisayar</option>
                  <option value="c3">Telefon</option>
                  <option value="c4">Tablet</option>
                </select>
              </div>

              {/* Fiyat Aralığı */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Min Fiyat
                  </label>
                  <input
                    type="number"
                    id="minPrice"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Min"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Max Fiyat
                  </label>
                  <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>

              {/* Stok Durumu */}
              <div>
                <label htmlFor="stockStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Stok Durumu
                </label>
                <select
                  id="stockStatus"
                  name="stockStatus"
                  value={filters.stockStatus}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Tümü</option>
                  <option value="inStock">Stokta Var</option>
                  <option value="outOfStock">Stokta Yok</option>
                </select>
              </div>

              {/* Durum */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Durum
                </label>
                <select
                  id="status"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Tümü</option>
                  <option value="active">Aktif</option>
                  <option value="inactive">Pasif</option>
                </select>
              </div>

              {/* Filtreleri Sıfırla */}
              <div className="flex items-end">
                <Button
                  onClick={handleResetFilters}
                  variant="secondary"
                  className="w-full"
                >
                  Filtreleri Sıfırla
                </Button>
              </div>
            </div>
          </Card>

          {/* Ürün Listesi */}
          <Card className="mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Ürün
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Fiyat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Stok
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={product.image}
                              alt={product.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {product.categoryId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {product.salePrice ? (
                            <>
                              <span className="line-through text-gray-500 dark:text-gray-400">
                                ₺{product.price.toLocaleString('tr-TR')}
                              </span>
                              <span className="ml-2 text-red-600 dark:text-red-400">
                                ₺{product.salePrice.toLocaleString('tr-TR')}
                              </span>
                            </>
                          ) : (
                            `₺${product.price.toLocaleString('tr-TR')}`
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {product.stock}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.isActive
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}
                        >
                          {product.isActive ? 'Aktif' : 'Pasif'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          onClick={() => handleEditProduct(product)}
                          variant="secondary"
                          className="mr-2"
                        >
                          Düzenle
                        </Button>
                        <Button
                          onClick={() => handleDeleteProduct(product.id)}
                          variant="danger"
                        >
                          Sil
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
} 