'use client'

import { createContext, useContext, useState } from 'react'
import { CartItem } from '../types'

interface PaymentContextType {
  processPayment: (amount: number, items: CartItem[]) => Promise<void>
  isLoading: boolean
  error: string | null
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const processPayment = async (amount: number, items: CartItem[]) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount, items })
      })

      if (!response.ok) {
        throw new Error('Ödeme işlemi başarısız oldu')
      }

      const data = await response.json()
      return data.clientSecret
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PaymentContext.Provider value={{ processPayment, isLoading, error }}>
      {children}
    </PaymentContext.Provider>
  )
}

export function usePayment() {
  const context = useContext(PaymentContext)
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider')
  }
  return context
} 