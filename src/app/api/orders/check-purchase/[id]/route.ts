import { NextRequest, NextResponse } from 'next/server'

// Mock veri
const orders = [
  { id: 'o1', userId: 'u1', productId: 'p1', status: 'delivered', createdAt: '2024-03-10T14:30:00Z' },
  { id: 'o2', userId: 'u2', productId: 'p2', status: 'shipped', createdAt: '2024-03-12T09:15:00Z' },
  { id: 'o3', userId: 'u1', productId: 'p3', status: 'pending', createdAt: '2024-03-14T16:45:00Z' },
]

export async function GET(req: NextRequest) {
  // /api/orders/check-purchase/[id] => id'yi path'ten al
  const segments = req.nextUrl.pathname.split('/')
  const id = segments[segments.length - 1]
  const hasPurchased = orders.some(order => order.productId === id && order.status === 'delivered')
  return NextResponse.json({ hasPurchased })
} 