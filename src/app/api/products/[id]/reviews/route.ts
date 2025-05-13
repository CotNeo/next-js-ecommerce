import { NextRequest, NextResponse } from 'next/server'

// Yorumları saklamak için basit bir veri yapısı
// Gerçek uygulamada bu veriler veritabanında saklanmalıdır
const reviews: {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}[] = []

export async function GET(req: NextRequest) {
  // /api/products/[id]/reviews => id'yi path'ten al
  const segments = req.nextUrl.pathname.split('/')
  const id = segments[segments.length - 3] // .../products/[id]/reviews
  const productReviews = reviews.filter(review => review.productId === id)
  return NextResponse.json(productReviews)
}

export async function POST(req: NextRequest) {
  try {
    // id'yi path'ten al
    const segments = req.nextUrl.pathname.split('/')
    const id = segments[segments.length - 3]
    // Session kontrolü (mock)
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Bu işlem için giriş yapmanız gerekiyor' }, { status: 401 })
    // }
    // Mock user
    const session = { user: { id: 'u1', name: 'Demo Kullanıcı' } }

    const body = await req.json()
    const { rating, comment } = body

    if (!rating || !comment) {
      return NextResponse.json(
        { error: 'Puan ve yorum alanları zorunludur' },
        { status: 400 }
      )
    }

    const newReview = {
      id: Math.random().toString(36).substr(2, 9),
      productId: id,
      userId: session.user.id,
      userName: session.user.name || 'Anonim',
      rating,
      comment,
      createdAt: new Date().toISOString()
    }

    reviews.push(newReview)

    return NextResponse.json(newReview)
  } catch (error) {
    return NextResponse.json(
      { error: 'Yorum eklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 