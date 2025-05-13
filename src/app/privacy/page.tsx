'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Gizlilik Politikası
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Bu gizlilik politikası, web sitemizi kullanırken kişisel verilerinizin nasıl toplandığını, 
              kullanıldığını ve korunduğunu açıklar.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Toplanan Bilgiler
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Web sitemizi kullanırken aşağıdaki bilgileri toplayabiliriz:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
              <li>Ad ve soyad</li>
              <li>E-posta adresi</li>
              <li>Telefon numarası</li>
              <li>Adres bilgileri</li>
              <li>Ödeme bilgileri</li>
              <li>IP adresi</li>
              <li>Tarayıcı bilgileri</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Bilgilerin Kullanımı
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Topladığımız bilgileri aşağıdaki amaçlar için kullanırız:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
              <li>Siparişlerinizi işlemek ve teslim etmek</li>
              <li>Müşteri hizmetleri sağlamak</li>
              <li>Ürün ve hizmetlerimizi geliştirmek</li>
              <li>Güvenlik ve dolandırıcılık önleme</li>
              <li>Yasal yükümlülüklerimizi yerine getirmek</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Bilgi Güvenliği
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Kişisel verilerinizin güvenliği bizim için önemlidir. Verilerinizi korumak için 
              endüstri standardı güvenlik önlemleri kullanıyoruz.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Çerezler
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Web sitemizde çerezler kullanılmaktadır. Çerezler, web sitemizi daha iyi bir 
              deneyim sunmak için kullanılır.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Üçüncü Taraflar
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Kişisel verilerinizi, hizmet sağlayıcılarımız ve iş ortaklarımızla paylaşabiliriz. 
              Bu paylaşımlar, hizmetlerimizi sunmak için gereklidir.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Haklarınız
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Kişisel verilerinizle ilgili aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
              <li>Verilerinize erişim hakkı</li>
              <li>Verilerinizin düzeltilmesini isteme hakkı</li>
              <li>Verilerinizin silinmesini isteme hakkı</li>
              <li>Veri işlemeye itiraz etme hakkı</li>
              <li>Veri taşınabilirliği hakkı</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              İletişim
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Gizlilik politikamızla ilgili sorularınız için bize ulaşabilirsiniz:
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              E-posta: privacy@sirketim.com<br />
              Telefon: (0212) 123 45 67
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 