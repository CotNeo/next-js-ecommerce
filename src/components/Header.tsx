'use client'

import Link from 'next/link'
import { useCart } from './CartContext'
import { useAuth } from './AuthContext'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { Button } from './ui/button'

export default function Header() {
  const { items } = useCart()
  const { user, logout } = useAuth()

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
            NetKadraj
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/products" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Ürünler
            </Link>

            <Link href="/cart" className="relative">
              <ShoppingBagIcon className="h-6 w-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 dark:text-gray-300">
                  {user.name}
                </span>
                <Button variant="outline" size="sm" onClick={logout}>
                  Çıkış Yap
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Giriş Yap
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
} 