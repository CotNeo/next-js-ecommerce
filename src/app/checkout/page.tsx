'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../context/CartContext'
import { usePayment } from '../context/PaymentContext'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Elements } from '@stripe/react-stripe-js'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Header from '../components/Header'
import Footer from '../components/Footer'

// Stripe public key'inizi buraya ekleyin
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const { items, totalPrice } = useCart()
  const { processPayment, isLoading, error } = usePayment()
  const router = useRouter()

  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('📝 Ödeme formu gönderiliyor:', billingDetails)

    if (!stripe || !elements) {
      console.error('❌ Stripe yüklenemedi')
      return
    }

    try {
      await processPayment(totalPrice, items)
      console.log('✅ Ödeme başarılı, sipariş sayfasına yönlendiriliyor')
      router.push('/orders')
    } catch (err) {
      console.error('❌ Ödeme hatası:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Ad Soyad"
          value={billingDetails.name}
          onChange={(e) => setBillingDetails(prev => ({ ...prev, name: e.target.value }))}
          required
        />
        <Input
          label="Email"
          type="email"
          value={billingDetails.email}
          onChange={(e) => setBillingDetails(prev => ({ ...prev, email: e.target.value }))}
          required
        />
        <Input
          label="Adres"
          value={billingDetails.address}
          onChange={(e) => setBillingDetails(prev => ({ ...prev, address: e.target.value }))}
          required
        />
        <Input
          label="Şehir"
          value={billingDetails.city}
          onChange={(e) => setBillingDetails(prev => ({ ...prev, city: e.target.value }))}
          required
        />
        <Input
          label="Posta Kodu"
          value={billingDetails.postalCode}
          onChange={(e) => setBillingDetails(prev => ({ ...prev, postalCode: e.target.value }))}
          required
        />
        <Input
          label="Ülke"
          value={billingDetails.country}
          onChange={(e) => setBillingDetails(prev => ({ ...prev, country: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Kart Bilgileri
        </label>
        <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-md">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md">
          {error}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={isLoading || !stripe}
      >
        {isLoading ? 'Ödeme Yapılıyor...' : `₺${totalPrice.toLocaleString('tr-TR')} Öde`}
      </Button>
    </form>
  )
}

export default function CheckoutPage() {
  const { items, totalPrice } = useCart()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkCart = async () => {
      try {
        const savedCart = localStorage.getItem('cart')
        const parsedCart = savedCart ? JSON.parse(savedCart) : []
        
        if (!Array.isArray(parsedCart) || parsedCart.length === 0) {
      console.log('⚠️ Boş sepet, ana sayfaya yönlendiriliyor')
          await router.replace('/')
    } else {
      setIsLoading(false)
    }
      } catch (error) {
        console.error('Sepet kontrolü sırasında hata:', error)
        await router.replace('/')
      }
    }

    checkCart()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div>
                  <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Ödeme
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sipariş Özeti */}
            <div className="md:col-span-2">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Sipariş Özeti
                </h2>
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.quantity} adet x ₺{item.price.toLocaleString('tr-TR')}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        ₺{(item.price * item.quantity).toLocaleString('tr-TR')}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      Toplam
                    </span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ₺{totalPrice.toLocaleString('tr-TR')}
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Ödeme Formu */}
            <div>
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Ödeme Bilgileri
                </h2>
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 