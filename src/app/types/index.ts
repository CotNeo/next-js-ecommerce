export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'customer' | 'seller'
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  totalAmount: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
} 