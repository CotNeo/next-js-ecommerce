'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Kullanım Koşulları
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Bu kullanım koşulları, web sitemizi kullanımınızı düzenleyen kuralları içerir. 
              Sitemizi kullanarak bu koşulları kabul etmiş sayılırsınız.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Hesap Oluşturma
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Sitemizde hesap oluştururken doğru ve güncel bilgiler vermeniz gerekmektedir. 
              Hesap güvenliğinizden siz sorumlusunuz.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Sipariş ve Ödeme
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Siparişleriniz, ödeme onayından sonra işleme alınır. Fiyatlar ve stok durumu 
              değişiklik gösterebilir.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Teslimat
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Teslimat süreleri tahminidir ve stok durumuna göre değişiklik gösterebilir. 
              Teslimat adresinin doğru olduğundan emin olun.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              İade ve İptal
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Ürünlerimizi teslim aldıktan sonra 14 gün içinde iade edebilirsiniz. 
              İade koşulları ürün kategorisine göre değişiklik gösterebilir.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Fikri Mülkiyet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Sitemizdeki tüm içerikler (metin, görsel, logo vb.) telif hakkı ile korunmaktadır. 
              İzinsiz kullanımı yasaktır.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Sorumluluk Reddi
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Sitemizde sunulan bilgilerin doğruluğunu garanti etmiyoruz. Kullanıcılar 
              sitedeki bilgileri kendi sorumluluklarında kullanırlar.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Değişiklikler
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Bu kullanım koşullarını önceden haber vermeksizin değiştirme hakkımız saklıdır. 
              Değişiklikler sitede yayınlandığı anda yürürlüğe girer.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Uygulanacak Hukuk
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Bu kullanım koşulları Türkiye Cumhuriyeti kanunlarına tabidir. 
              Anlaşmazlıklarda İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              İletişim
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Kullanım koşullarıyla ilgili sorularınız için bize ulaşabilirsiniz:<br />
              E-posta: legal@sirketim.com<br />
              Telefon: (0212) 123 45 67
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 