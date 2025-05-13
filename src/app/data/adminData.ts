import { ContactMessage, Order } from '../types/admin'

export const contactMessages: ContactMessage[] = [
  {
    id: 'm1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    subject: 'Sipariş Takibi',
    message: 'Siparişimin durumunu öğrenmek istiyorum. Sipariş numaram: #12345',
    createdAt: '2024-03-15T10:30:00Z',
    isRead: false
  },
  {
    id: 'm2',
    name: 'Ayşe Demir',
    email: 'ayse@example.com',
    subject: 'Ürün Bilgisi',
    message: 'iPhone 14 Pro\'nun stok durumunu öğrenmek istiyorum.',
    createdAt: '2024-03-14T15:45:00Z',
    isRead: true
  },
  {
    id: 'm3',
    name: 'Mehmet Kaya',
    email: 'mehmet@example.com',
    subject: 'İade Talebi',
    message: 'Aldığım ürünü iade etmek istiyorum. İade sürecini nasıl başlatabilirim?',
    createdAt: '2024-03-13T09:15:00Z',
    isRead: false
  },
  {
    id: 'm4',
    name: 'Zeynep Şahin',
    email: 'zeynep@example.com',
    subject: 'Ürün Önerisi',
    message: 'Fotoğraf çekmek için hangi kamera modelini önerirsiniz?',
    createdAt: '2024-03-12T14:20:00Z',
    isRead: true
  },
  {
    id: 'm5',
    name: 'Ali Öztürk',
    email: 'ali@example.com',
    subject: 'Teknik Destek',
    message: 'MacBook Pro\'mda yaşadığım sorun için teknik destek almak istiyorum.',
    createdAt: '2024-03-11T11:30:00Z',
    isRead: false
  }
]

export const orders: Order[] = [
  {
    id: 'o1',
    userId: 'u1',
    userName: 'Ahmet Yılmaz',
    userEmail: 'ahmet@example.com',
    items: [
      {
        productId: 'p1',
        productName: 'iPhone 14 Pro',
        quantity: 1,
        price: 47999,
        image: 'https://images.unsplash.com/photo-1678652197831-2d1801b5d793?w=800&auto=format&fit=crop&q=60'
      }
    ],
    totalAmount: 47999,
    status: 'shipped',
    shippingAddress: {
      fullName: 'Ahmet Yılmaz',
      address: 'Atatürk Cad. No:123 D:4',
      city: 'İstanbul',
      postalCode: '34000',
      phone: '05551234567'
    },
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    trackingNumber: 'TR123456789',
    createdAt: '2024-03-10T14:30:00Z',
    updatedAt: '2024-03-12T09:15:00Z'
  },
  {
    id: 'o2',
    userId: 'u2',
    userName: 'Ayşe Demir',
    userEmail: 'ayse@example.com',
    items: [
      {
        productId: 'p2',
        productName: 'MacBook Pro M2',
        quantity: 1,
        price: 64999,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60'
      },
      {
        productId: 'p4',
        productName: 'AirPods Pro',
        quantity: 1,
        price: 6999,
        image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=60'
      }
    ],
    totalAmount: 71998,
    status: 'processing',
    shippingAddress: {
      fullName: 'Ayşe Demir',
      address: 'Bağdat Cad. No:456 D:7',
      city: 'İstanbul',
      postalCode: '34700',
      phone: '05559876543'
    },
    paymentMethod: 'bank_transfer',
    paymentStatus: 'paid',
    createdAt: '2024-03-14T16:45:00Z',
    updatedAt: '2024-03-14T16:45:00Z'
  },
  {
    id: 'o3',
    userId: 'u3',
    userName: 'Mehmet Kaya',
    userEmail: 'mehmet@example.com',
    items: [
      {
        productId: 'p7',
        productName: 'Sony WH-1000XM5',
        quantity: 1,
        price: 11999,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=60'
      }
    ],
    totalAmount: 11999,
    status: 'pending',
    shippingAddress: {
      fullName: 'Mehmet Kaya',
      address: 'İstiklal Cad. No:789 D:3',
      city: 'İstanbul',
      postalCode: '34430',
      phone: '05551234567'
    },
    paymentMethod: 'credit_card',
    paymentStatus: 'pending',
    createdAt: '2024-03-15T11:20:00Z',
    updatedAt: '2024-03-15T11:20:00Z'
  },
  {
    id: 'o4',
    userId: 'u4',
    userName: 'Zeynep Şahin',
    userEmail: 'zeynep@example.com',
    items: [
      {
        productId: 'p11',
        productName: 'Canon EOS R5',
        quantity: 1,
        price: 84999,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60'
      },
      {
        productId: 'p13',
        productName: 'DJI Mavic 3 Pro',
        quantity: 1,
        price: 64999,
        image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&auto=format&fit=crop&q=60'
      }
    ],
    totalAmount: 149998,
    status: 'delivered',
    shippingAddress: {
      fullName: 'Zeynep Şahin',
      address: 'Bağdat Cad. No:789 D:5',
      city: 'İstanbul',
      postalCode: '34700',
      phone: '05559876543'
    },
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    trackingNumber: 'TR987654321',
    createdAt: '2024-03-09T09:30:00Z',
    updatedAt: '2024-03-11T14:20:00Z'
  },
  {
    id: 'o5',
    userId: 'u5',
    userName: 'Ali Öztürk',
    userEmail: 'ali@example.com',
    items: [
      {
        productId: 'p15',
        productName: 'PlayStation 5',
        quantity: 1,
        price: 13999,
        image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=60'
      },
      {
        productId: 'p16',
        productName: 'Xbox Series X',
        quantity: 1,
        price: 14999,
        image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&auto=format&fit=crop&q=60'
      }
    ],
    totalAmount: 28998,
    status: 'processing',
    shippingAddress: {
      fullName: 'Ali Öztürk',
      address: 'İstiklal Cad. No:456 D:8',
      city: 'İstanbul',
      postalCode: '34430',
      phone: '05551234567'
    },
    paymentMethod: 'bank_transfer',
    paymentStatus: 'pending',
    createdAt: '2024-03-15T16:45:00Z',
    updatedAt: '2024-03-15T16:45:00Z'
  }
] 