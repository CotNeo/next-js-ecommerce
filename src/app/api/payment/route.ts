import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil'
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