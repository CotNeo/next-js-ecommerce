export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  isRead: boolean
}

export interface Order {
  id: string
  userId: string
  userName: string
  userEmail: string
  items: OrderItem[]
  totalAmount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: {
    fullName: string
    address: string
    city: string
    postalCode: string
    phone: string
  }
  paymentMethod: 'credit_card' | 'bank_transfer'
  paymentStatus: 'pending' | 'paid' | 'failed'
  trackingNumber?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  image: string
} 