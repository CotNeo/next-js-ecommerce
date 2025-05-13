import { NextRequest, NextResponse } from 'next/server'
import { products } from '@/data/products'

// GET /api/products/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // URL'den gelen ID'yi al
    const productId = params.id
    
    // ID'yi sayıya çevir
    const numericId = parseInt(productId)
    
    // ID geçerli bir sayı değilse hata döndür
    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: 'Geçersiz ürün ID\'si' },
        { status: 400 }
      )
    }

    // Ürünü bul
    const product = products.find(p => p.id === numericId)
    
    if (!product) {
      return NextResponse.json(
        { error: 'Ürün bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Ürün detayları alınırken hata:', error)
    return NextResponse.json(
      { error: 'Ürün detayları alınırken bir hata oluştu' },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // URL'den gelen ID'yi al
    const productId = params.id
    
    // ID'yi sayıya çevir
    const numericId = parseInt(productId)
    
    // ID geçerli bir sayı değilse hata döndür
    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: 'Geçersiz ürün ID\'si' },
        { status: 400 }
      )
    }

    // Güncelleme işlemleri burada yapılacak (mock)
    return NextResponse.json({ message: `Ürün ${numericId} güncellendi (mock)` })
  } catch (error) {
    return NextResponse.json(
      { error: 'Ürün güncellenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // URL'den gelen ID'yi al
    const productId = params.id
    
    // ID'yi sayıya çevir
    const numericId = parseInt(productId)
    
    // ID geçerli bir sayı değilse hata döndür
    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: 'Geçersiz ürün ID\'si' },
        { status: 400 }
      )
    }

    // Silme işlemleri burada yapılacak (mock)
    return NextResponse.json({ message: `Ürün ${numericId} silindi (mock)` })
  } catch (error) {
    return NextResponse.json(
      { error: 'Ürün silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 