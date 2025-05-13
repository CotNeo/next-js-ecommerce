'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

/**
 * Footer bileşeni
 * Sayfanın alt kısmını oluşturur ve şirket bilgilerini gösterir
 * @returns {JSX.Element} Footer JSX bileşeni
 */
export default function Footer() {
  console.log('Footer component rendered')
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter subscription:', email)
    // API entegrasyonu burada yapılacak
    setEmail('')
  }

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Hakkımızda */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Hakkımızda
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              NetKadraj Ecommerce: Modern ve kullanıcı dostu e-ticaret platformumuz ile kaliteli ürünleri uygun fiyatlarla sizlere sunuyoruz.
            </p>
            <div className="flex space-x-6">
              <Link href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </Link>
              <Link href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Hızlı Linkler
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/products" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center group transition-colors duration-200">
                  <ArrowRightIcon className="h-4 w-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                  Ürünler
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center group transition-colors duration-200">
                  <ArrowRightIcon className="h-4 w-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                  Kategoriler
                </Link>
              </li>
              <li>
                <Link href="/campaigns" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center group transition-colors duration-200">
                  <ArrowRightIcon className="h-4 w-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                  Kampanyalar
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center group transition-colors duration-200">
                  <ArrowRightIcon className="h-4 w-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              İletişim
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start group">
                <MapPinIcon className="h-6 w-6 text-gray-400 mr-3 group-hover:text-blue-500 transition-colors duration-200" />
                <span className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Atatürk Cad. No:123<br />
                  Kadıköy, İstanbul
                </span>
              </li>
              <li className="flex items-center group">
                <PhoneIcon className="h-6 w-6 text-gray-400 mr-3 group-hover:text-blue-500 transition-colors duration-200" />
                <span className="text-gray-600 dark:text-gray-400">
                  +90 (212) 123 45 67
                </span>
              </li>
              <li className="flex items-center group">
                <EnvelopeIcon className="h-6 w-6 text-gray-400 mr-3 group-hover:text-blue-500 transition-colors duration-200" />
                <span className="text-gray-600 dark:text-gray-400">
                  info@example.com
                </span>
              </li>
            </ul>
          </div>

          {/* Bülten */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Bültenimize Abone Olun
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Kampanyalardan ve yeniliklerden haberdar olmak için bültenimize abone olun.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                required
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
              />
              <Button 
                type="submit" 
                variant="primary" 
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200 transform hover:scale-[1.02]"
              >
                Abone Ol
              </Button>
            </form>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2024 NetKadraj Ecommerce. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors duration-200">
                Gizlilik Politikası
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors duration-200">
                Kullanım Koşulları
              </Link>
              <Link href="/cookies" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors duration-200">
                Çerez Politikası
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 