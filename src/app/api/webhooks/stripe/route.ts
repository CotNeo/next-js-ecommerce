import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil'
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
        console.log('✅ Ödeme başarılı:', event.data.object)
        break
      case 'payment_intent.payment_failed':
        // Ödeme başarısız, siparişi iptal et
        console.log('❌ Ödeme başarısız:', event.data.object)
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