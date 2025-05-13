'use client'

import { ThemeProvider } from 'next-themes'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { PaymentProvider } from './context/PaymentContext'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <CartProvider>
          <PaymentProvider>
            {children}
          </PaymentProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
} 