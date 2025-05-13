import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { products } from '@/data/products'
import type { Product } from '@/types/product'
import ProductDetail from './ProductDetail'

// Statik sayfa oluşturma için generateStaticParams
export async function generateStaticParams() {
  console.log('🔍 [SSG] Statik sayfalar oluşturuluyor...')
  const paths = products.map((product) => ({
    id: product.id.toString(),
  }))
  console.log(`✅ [SSG] ${paths.length} ürün için statik sayfa oluşturuldu`)
  return paths
}

// Sayfa oluşturma zamanını kontrol etmek için
export const revalidate = 3600 // 1 saat

// Sayfa bileşeni
export default async function ProductPage({ params }: { params: { id: string } }) {
  console.log(`🔄 [SSG/ISR] Ürün sayfası oluşturuluyor: /products/${params.id}`)
  const startTime = performance.now()

  try {
    // ID'yi sayıya çevir
    const numericId = parseInt(params.id)
    
    // ID geçerli bir sayı değilse 404
    if (isNaN(numericId)) {
      console.error(`❌ [SSG/ISR] Geçersiz ürün ID'si: ${params.id}`)
      notFound()
    }

    // Ürünü bul
    const product = products.find(p => p.id === numericId)
    
    if (!product) {
      console.error(`❌ [SSG/ISR] Ürün bulunamadı: ${params.id}`)
      notFound()
    }

    const endTime = performance.now()
    console.log(`✅ [SSG/ISR] Ürün sayfası oluşturuldu: /products/${params.id} (${(endTime - startTime).toFixed(2)}ms)`)

    return (
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <ProductDetail product={product} />
      </Suspense>
    )
  } catch (error) {
    console.error(`❌ [SSG/ISR] Hata oluştu: ${error}`)
    throw error
  }
} 