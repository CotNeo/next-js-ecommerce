# Stripe Entegrasyonu

Bu döküman, Next.js Commerce uygulamasında Stripe ödeme sisteminin nasıl entegre edileceğini açıklar.

## 1. Gereksinimler

- Node.js 18 veya üzeri
- npm veya yarn
- Stripe hesabı
- SSL sertifikası (production ortamı için)

## 2. Kurulum

### 2.1. Paketlerin Yüklenmesi

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js stripe
```

### 2.2. Environment Değişkenleri

`.env.local` dosyasına aşağıdaki değişkenleri ekleyin:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
```

## 3. Backend Entegrasyonu

### 3.1. API Route Oluşturma

`src/app/api/payment/route.ts` dosyasını oluşturun:

```typescript
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export async function POST(req: Request) {
  try {
    const { amount, items } = await req.json()

    // Payment Intent oluştur
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe kuruş cinsinden çalışır
      currency: 'try',
      metadata: {
        items: JSON.stringify(items)
      }
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Ödeme hatası:', error)
    return NextResponse.json(
      { error: 'Ödeme işlemi başarısız oldu' },
      { status: 500 }
    )
  }
}
```

## 4. Frontend Entegrasyonu

### 4.1. Payment Context

`src/app/context/PaymentContext.tsx` dosyasını oluşturun:

```typescript
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
```

### 4.2. Checkout Sayfası

`src/app/checkout/page.tsx` dosyasını oluşturun (yukarıda oluşturuldu).

## 5. Güvenlik Önlemleri

1. Stripe secret key'ini asla frontend'de kullanmayın
2. Tüm ödeme işlemlerini backend'de gerçekleştirin
3. Webhook'ları kullanarak ödeme durumlarını takip edin
4. SSL sertifikası kullanın
5. CORS politikalarını doğru yapılandırın

## 6. Webhook Entegrasyonu

### 6.1. Webhook Endpoint

`src/app/api/webhooks/stripe/route.ts` dosyasını oluşturun:

```typescript
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const payload = await req.text()
  const sig = req.headers.get('stripe-signature')

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      webhookSecret
    )

    switch (event.type) {
      case 'payment_intent.succeeded':
        // Ödeme başarılı, siparişi onayla
        break
      case 'payment_intent.payment_failed':
        // Ödeme başarısız, siparişi iptal et
        break
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook hatası:', err)
    return NextResponse.json(
      { error: 'Webhook işlemi başarısız oldu' },
      { status: 400 }
    )
  }
}
```

## 7. Test Etme

1. Stripe test kartlarını kullanın:
   - Başarılı ödeme: 4242 4242 4242 4242
   - Başarısız ödeme: 4000 0000 0000 0002

2. Test webhook'ları için Stripe CLI kullanın:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

## 8. Production'a Geçiş

1. Test anahtarlarını production anahtarlarıyla değiştirin
2. Webhook URL'lerini güncelleyin
3. SSL sertifikasını yapılandırın
4. Hata yönetimini ve loglama sistemini gözden geçirin

## 9. Sık Karşılaşılan Sorunlar

1. CORS hataları
   - Backend'de CORS politikalarını doğru yapılandırın
   - Frontend'de doğru API endpoint'lerini kullanın

2. Webhook hataları
   - Webhook secret'ı doğru yapılandırıldığından emin olun
   - Stripe CLI ile webhook'ları test edin

3. Ödeme başarısızlıkları
   - Hata mesajlarını kullanıcıya gösterin
   - Retry mekanizması ekleyin
   - Loglama sistemini kullanın

## 10. İyi Pratikler

1. Ödeme işlemlerini asenkron yapın
2. Kullanıcı geri bildirimlerini anlık verin
3. Hata durumlarını düzgün yönetin
4. Güvenlik önlemlerini alın
5. Test senaryolarını kapsamlı hazırlayın
6. Loglama sistemini kullanın
7. Monitoring sistemini kurun

## 11. Kaynaklar

- [Stripe Dokümantasyonu](https://stripe.com/docs)
- [Next.js Dokümantasyonu](https://nextjs.org/docs)
- [Stripe API Referansı](https://stripe.com/docs/api)
- [Stripe Webhook Dokümantasyonu](https://stripe.com/docs/webhooks) 