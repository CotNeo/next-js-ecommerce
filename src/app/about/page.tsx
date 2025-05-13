'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { Card } from '../components/ui/Card'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Hakkımızda
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              2024 yılında kurulan şirketimiz, teknoloji ürünlerinde müşteri memnuniyetini ön planda tutan, 
              kaliteli ve güvenilir hizmet anlayışıyla faaliyet göstermektedir.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Misyonumuz
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Müşterilerimize en kaliteli teknoloji ürünlerini en uygun fiyatlarla sunmak, 
              satış sonrası destek hizmetlerimizle güvenilir bir alışveriş deneyimi yaşatmak.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Vizyonumuz
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Türkiye'nin lider teknoloji e-ticaret platformu olmak ve müşterilerimize 
              global standartlarda hizmet sunmak.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Kalite
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Sadece en kaliteli ürünleri müşterilerimize sunuyoruz.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Güven
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Güvenli alışveriş ve müşteri memnuniyeti bizim için öncelikli.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Hız
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Hızlı teslimat ve müşteri desteği ile yanınızdayız.
                </p>
              </Card>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                İletişim Bilgileri
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Adres
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Teknoloji Caddesi No:123<br />
                    Merkez/İstanbul
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    İletişim
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Telefon: (0212) 123 45 67<br />
                    E-posta: info@sirketim.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 